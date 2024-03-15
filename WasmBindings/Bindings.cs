using System;
using Bootsharp;
using System.Collections.Generic;
using FastSort;

public static partial class Bindings
{
    public static void Main()
    {
        OnMainInvoked($".NET Bindings were loaded in {GetFrontendName()}.");
    }

    [JSEvent] // Used in JS as Program.onMainInvoked.subscribe(..)
    public static partial void OnMainInvoked (string message);

    [JSFunction] // Set in JS as Program.getFrontendName = () => ..
    public static partial string GetFrontendName();

    [JSInvokable]
    public static int[] BubbleSort(int[] numbers) {
        return FastSort.BubbleSort.Sort(numbers);
    } 
}