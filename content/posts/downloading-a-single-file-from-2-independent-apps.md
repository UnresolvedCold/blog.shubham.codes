+++
title = "Downloading a single file from 2 independent apps"
author = ["Shubham Kumar"]
date = 2024-09-01T00:11:00+05:30
categories = ["hugo"]
draft = false
+++

## Understanding the problem {#understanding-the-problem}

Let's say you have a very large log file.
And you want to create an app that can analyze this file and generate insights.
Also, let's say you want to create an another app that can simulate the work by reading the logs one-by-one.

Both these apps are dependent on the same log file.
Now, there are 2 scenarios.

1.  App1 starts, downloads the file and then App2 starts.
2.  App1 starts, downloading the file and App2 starts while the download is incomlete.

The first scenario is easy to deal with. We can check the `md5sum` of the local file and the file on the server.
If they match, nothing to worrry about. If they don't then we can have a complex logic to determine the life of the old log file and decide accordingly.

The second scenario is conflicting one and this we can solve in code.
The second scenario can also happen when the same app is ran twice simultaneously.
Both the instances will start downloading the same file and this will create a havoc.


## Solution {#solution}

The idea is to have an identifier that an app has already started the download and is still downloading the resouce.
If the first app has started the download, then wait for the first app to complete the download and then only start the application.

For accomplishing this, we generally use file locking mechanism.


### Download with file locking {#download-with-file-locking}

The process is modified to first create a lock file with extension `.lock`.
This lock file signifies that a download is already in progress.
If this lock file exists then wait for the download to complete by the second app.
The lock file will have `processid_threadid` as identifier.
This is useful in checking the race condition that can happen while writing the file.

{{< highlight java >}}
  public static void downloadFileWithLock(String filePath) {
    File lockFile = new File(filePath + ".lock");
    // Check if the file is being downloaded by another app
    // If it is being downloaded by an another app then wait for the download to finish
    // Else proceed with the download
    if (lockFile.exists()) {
      waitForDownloadToFinish(lockFile);
    } else {
      int processID = (int) ProcessHandle.current().pid();
      String identifier = thread + "_" + processID;
      String contents = String.valueOf(identifier);
      writeToFile(lockFile, contents);

      // May be due to race condition, the file is already downloaded by another app
      // Check if this process started the download
      String savedIdentifier = readFromFile(lockFile);

      if (identifier.equals(savedIdentifier)) {
        // Download the file
        System.out.println(thread + " - Downloading file...");
        File downloadFile = new File(filePath);
        try {
          RandomAccessFile randomAccessFile = new RandomAccessFile(downloadFile, "rw");
          randomAccessFile.write("Very important works".getBytes());
          Thread.sleep(5000);
        }
        catch (IOException e) {}
        catch (InterruptedException e) {}
        System.out.println(thread + " - File downloaded successflly.");
      } else {
        waitForDownloadToFinish(lockFile);
      }

      if (lockFile.exists()) {
        lockFile.delete();
      }

    }
  }
{{< /highlight >}}

The Utilities method - `waitFoDownloadToFinish`, `readFromFile` and `writeToFile` are as follows.

{{< highlight java >}}
  private static void writeToFile(File file, String contents) {
    try {
      Files.write(file.toPath(), contents.getBytes());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private static String readFromFile(File file) {
    try {
      return new String(Files.readAllBytes(file.toPath()));
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

  private static void waitForDownloadToFinish(File lockFile) {
    System.out.println(thread + " - File is already being downloaded by another app. Wait for it to finish.");
    while (lockFile.exists()) {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
    System.out.println(thread + " - File download completed.");
  }
{{< /highlight >}}

Now you can create 2 new apps that will call this method and we will run the apps simultaneously.

{{< highlight java >}}
public class App1 {
  public static void main(String[] args) {
    String filePath = "downloaded_file.txt";
    FileDownloadUtil.downloadFileWithLock(filePath);
    System.out.println(Thread.currentThread().getName() + " - App1 starting operation...");
  }
}
{{< /highlight >}}

{{< highlight java >}}
public class App2 {
  public static void main(String[] args) {
    String filePath = "downloaded_file.txt";
    FileDownloadUtil.downloadFileWithLock(filePath);
    System.out.println(Thread.currentThread().getName() + " - App2 starting operation...");
  }
}
{{< /highlight >}}


### Outputs {#outputs}

{{< highlight bash >}}
# For App1
main - Downloading file...
main - File downloaded successfully.
main - App1 starting operation...

# For App2
main - File is already being downloaded by another app. Wait for it to finish.
main - File download completed.
main - App2 starting operation...
{{< /highlight >}}

App1 started downloading the file and thus App2 waited for the download to complete.
After the download completes, both the apps resumed its operations.


## Conclusion and improvements {#conclusion-and-improvements}

This is just a basic code that lays the foundation of file locking mechanism for downloading a file simultaneously by multiple apps.
This code is not a production ready code.
A more complete solution should handle scenarios like downloads in chunks, resume functionality with unexpected shutdowns and other edge cases.
