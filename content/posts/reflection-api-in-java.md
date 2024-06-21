+++
title = "Reflection API in Java"
author = ["Shubham Kumar"]
date = 2024-06-22T00:03:00+05:30
tags = ["java", "reflection-api"]
categories = ["hugo"]
draft = false
+++

## Where is this used? {#where-is-this-used}

This is used to analyze/modify the behaviour of a class at runtime.
Using this, you can view or change the private/public fields at wish (without exposing any getter/setter).
Personally, I have used this in one of our projects at GreyOrange to write unit test cases.
Using this in main code is a big no-no as it exposed you critical fields to the world.


## Main Class {#main-class}

Let's create a main class for which we will write some test cases.
But we want to test some private fields for which we don't have a direct getter.
The idea is to use reflection api to access such fields and fetch their current value or modify them if required.

Here is a Duck class which has 3 fields of which 1 is static.
Each time a duck class is created count which is the static field is increased by one.
Each duck has an associated name and age.

{{< highlight java >}}
public class Duck {
    private String name;
    private int age;
    private static int count = 0;

    public Duck(String name, int age) {
        this.name = name;
        this.age = age;
        count++;
    }

    public static boolean canCreateMoreDucks() {
        return count < 10;
    }

    public String getName() {
        return name;
    }

    public boolean canDrinkAlcohol() {
        return age >= 18;
    }
{{< /highlight >}}


## Test Class -- uses reflection API {#test-class-uses-reflection-api}


### Change the value of a private field inside a class {#change-the-value-of-a-private-field-inside-a-class}

`Field` and `getDeclaredField` are used to access a variable.
Using `setAccessible` as true will expose any private fields which can be manipulated.

{{< highlight java >}}
@Test
public void testDuckCanDrinkAlcohol() {
    Duck duck = new Duck("Donald", 5);
    assertEquals("Donald", duck.getName());
    assertFalse(duck.canDrinkAlcohol());

    // change age and check if duck can drink alcohol
    // But I don't want to create a setter for this
    // Use reflection API to change the age
    try {
        Class<Duck> duckClass = Duck.class;
        Field ageField = duckClass.getDeclaredField("age");
        ageField.setAccessible(true);
        ageField.setInt(duck, 20);
    }
    catch (Exception e) {
        e.printStackTrace();
        assert false;
    }

    assertTrue(duck.canDrinkAlcohol());

}
{{< /highlight >}}


### Get the value of a static private variable in a class {#get-the-value-of-a-static-private-variable-in-a-class}

A `static` field can be accessed in the similar way.

{{< highlight java >}}
@Test
public void testDuckCanCreateMoreDucks() {
    // Instead of creating more ducks
    // I will use reflection API to change the count
    Duck duck = new Duck("Donald", 5);
    assertTrue(Duck.canCreateMoreDucks());

    // Also assert count was 1
    // But I don't want to create a getter for this
    try {
        Class<Duck> duckClass = Duck.class;
        Field countField = duckClass.getDeclaredField("count");
        countField.setAccessible(true);

        // Don't need to pass an instance as count is static
        Object countObject = countField.get(null);
        int count  = (int) countObject;
        assertEquals(1, count);
    }
    catch (Exception e) {
        e.printStackTrace();
        assert false;
    }
}
{{< /highlight >}}


### Change the value of a static private variable in a class {#change-the-value-of-a-static-private-variable-in-a-class}

You can use `setInt` to change the value of the `Field`.

{{< highlight java >}}
@Test
public void testDuckCannotCreateMoreDucks() {
    // Instead of creating more ducks
    // I will use reflection API to change the count
    Duck duck = new Duck("Donald", 5);

    // change count to 10
    try {
        Class<Duck> duckClass = Duck.class;
        Field countField = duckClass.getDeclaredField("count");
        countField.setAccessible(true);
        countField.setInt(null, 10);
    }
    catch (Exception e) {
        e.printStackTrace();
        assert false;
    }

    assertFalse(Duck.canCreateMoreDucks());

}
{{< /highlight >}}
