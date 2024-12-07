+++
title = "Object pool design pattern in Java"
author = ["Shubham Kumar"]
date = 2024-12-07T23:04:00+05:30
categories = ["hugo"]
draft = false
+++

## What is it? {#what-is-it}

The object pool design pattern exposes a manager to manage a pool of reusable objects.
The idea is to keep a know number of reusable objects (with a hard limit to initialize some more lazily).
Whenever someone need the object from the pool, it will ask the pool manager.
If there are free objects, the manager will engage one for your.
If there aren't any free objects but the hard limit is not breached, then the manager will initialize a new object and provide you.
Else if the hard limit is breached then you will return empty handed.


## Why is this? {#why-is-this}

This is used when we have an resource object which takes some time to initialize.
And once initialized, it can be reused over and over again without a performance hit.

Basically, creation is expensive and hence we want to reuse already created instances.
Generally, we put a soft limit on the number of resources initially initialized.
And we want to create more resources lazily if required.
To prevent a huge number of resources from being created, we also put a hard limit.


### Example {#example}

At GreyOrange, we use something called as IDC files.
These are huge binary files (sometimes 100-200 GBs).
They provide the time it takes to travel b/w 2 coordinates.
We created an IDC Manager to parse these files and provide us the required information.
The initialization takes a huge amount of time (sometimes 10s).
Once initialized, it takes less than 1ms to provide the information.

Right now, we are good with just once instance of this manager, so it is a singleton class with one buffer linked to an IDC file.
But if the demands for parallel calls increases, we might want to implement the manager as a Object Pool.


## How to implement this? {#how-to-implement-this}

There are 3 requirements.

1.  An Object Pool Manager
2.  The initial number of objects - m
3.  The maximum number of objects - n

The Object Pool Manager will be a singleton class.
We cannot allow multiple Object Pool Manager objects as they will create max, n objects each.

We will create 2 lists, `availableResources` and `enagaedResources`.
Initially, we will populate the `availableResources` with m new resource objects.

Each getter call will check the `availableResources` list for available objects.
If the objects are available then it will move the last object to engagedObjects.
If the objects are not available then there are 2 choices.
Check the hard limit, if not reached then create more objects and add to `availableResources`.
Else return null.

A pseudo code for the manager is as follows.

{{< highlight java >}}
class PoolManager {
    private static PoolManager instance;
    private List<Object> availableResources;
    private List<Object> engagedResources;
    private Integer initialLimit;
    private Integer hardLimit;

    private PoolManager() {
        // Get these properties from already defined config
        // Assume this is defined as per standard or equivalent configurations
        initialLimit = Properties.getInstance().getIntegerValue("POOL_INITIAL_LIMIT");
        hardLimit = Properties.getInstance().getIntegerValue("POOL_HARD_LIMIT");

        // Initialize the initial number of resources in the pool
        for (int i=0; i<initialLimit; i++) {
            availableResources.add(new ResourceObject());
        }
    }

    public PoolManager getInstance() {
        if (instance == null) {
            syncronized(PoolManager.class) {
                if (instance == null) {
                    instance = new PoolManager();
                }
            }
        }

        return instance;
    }

    public Object getObject() {
        if (!freeObjects.isEmpty()) {
            // A sync is required as 2 thread may want to get a free object at the same time
            syncronized(freeObjects) {
                Object freeObject = freeObjects.remove(freeObjects.size());
                engagedObjects.add(freeObject);
                return freeObject;
            }
        }
        else if (engagedObjects.size() < MAX_LIMIT) {
            Object freeObject = new ResourceObject();
            freeObjects.add(freeObject);
            return getObject();
        }
        else {
            return null;
        }
    }

    public void releaseObject(Object engagedObject) {
        if (engagedObject != null) {
            try {
                syncronized(engagedObjects) {
                    Object freeObject = engagedObjects.remove(engagedObject);
                    freeObjects.add(freeObject);
                }
            } catch (Exception e){}
        }
    }

}
{{< /highlight >}}
