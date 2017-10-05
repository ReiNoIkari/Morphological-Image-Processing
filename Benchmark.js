function startBenchmark(img, functionName, parameter)
{
    //Warm-up 

    //Initialazing the classes ( no recording at this point )

    var timeList = [];
    var memoryList = [];


    for(var i = 0; i<100; i++)
    {
        var temp= img.duplicate();
	var startTime = System.nanoTime();
	IJ.freeMemory();
	IJ.run(temp, functionName, parameter);
	var endTime = System.nanoTime();   
	var memoryUsage= IJ.currentMemory();      
	var spentTime = endTime - startTime;
        temp.close();
	IJ.run("Close All", "");
    }

    //Benchmarking

    for (var i=0; i<10;i++)
    {
        var time = 0.0;
        var memory = 0;
	
        for(var j = 0; j < 1000; j++)
        {
            var temp = img.duplicate();
	    IJ.freeMemory();
	    var startTime = System.nanoTime();
	    IJ.run(temp, functionName, parameter);
	    var endTime = System.nanoTime();   
	    var memoryUsage= IJ.currentMemory();      
	    var spentTime = endTime - startTime;
            time += spentTime
            memory += memoryUsage
            temp.close();
	    IJ.run("Close All", "");
        }
	

        // calculating the average value of the 1000 runs
        var avg_time = time/1000/1000000; ///1000 for 1000 runs, then /1000000 to convert ns to ms
        var avg_mem = memory/1000;
	
        avg_mem = avg_mem/1048576; //convert bytes to Mebibytes
        IJ.log("The average execution time for "+functionName+" is "+avg_time.toFixed(5)+" ms.\n");
        IJ.log("The average used memory is "+avg_mem.toFixed(5)+" MiB.\n");
        timeList.push(avg_time);
        memoryList.push(avg_mem);
    }

    IJ.log("End of benchmark\n");
    IJ.log("Time | Memory\n");
    for(var i=0;i<timeList.length;i++)
    {
        IJ.log(timeList[i]+" | "+memoryList[i]+"\n");
    }
    IJ.log("\n");
}


// Main

//Loading image and convert it to binary
imp = IJ.openImage("http://wsr.imagej.net/images/embryos.jpg");
Prefs.blackBackground = true;
IJ.run(imp, "Make Binary", "");
IJ.run("Options...", "iterations=1 count=1 black edm=8-bit");

//list of our IJ functions/plugins to use, and the corresponding options (obtained via IJ macro recorder)
functionList= ["Erode","Dilate","Open","Close-","Skeletonize","Distance Map","Ultimate Points","Morphological Filters","Morphological Filters","Morphological Filters","Morphological Filters"];
parameterList = ["","","","","","overwrite","","operation=Erosion element=Disk radius=2","operation=Dilation element=Disk radius=2","operation=Opening element=Disk radius=2","operation=Closing element=Disk radius=2"];

for (var i=0;i<functionList.length;i++)
{
    IJ.log("Function : "+functionList[i]+"\n");
    startBenchmark(imp, functionList[i] , parameterList[i]);
}
