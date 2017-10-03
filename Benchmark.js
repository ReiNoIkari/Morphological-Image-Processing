
function getExecutionTime(img, functionName, parameter)
{
    var startTime = System.currentTimeMillis();
    IJ.run(img, functionName, parameter);
    var endTime = System.currentTimeMillis();        
    var spentTime = endTime - startTime;
    return spentTime;
}

function getMemoryUsage(img, functionName, parameter)
{
    //Flushing memory to reduce noises
    IJ.freeMemory();
    IJ.run(img, functionName, parameter);
    var memoryUsage= IJ.currentMemory(); 
    //returning the memory usage
    return memoryUsage ;
}

function startBenchmark(img, functionName, parameter)
{
    //Warm-up 

    //Initialazing the classes ( no recording at this point )

    var timeList = [];
    var memoryList = [];


    for(var i = 0; i<100; i++)
    {
        var temp= img.duplicate();
        getExecutionTime(temp,functionName,parameter);
	getMemoryUsage(temp,functionName,parameter);
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
            time += getExecutionTime(temp,functionName,parameter);
            memory += getMemoryUsage(temp,functionName,parameter);
            temp.close();
	    IJ.run("Close All", "");
        }
	

        // calculate average value of  and return to user explaining how many iterations were used for the average.
        var average = time/1000;
        var avg_mem = memory/1000;
	
        avg_mem = avg_mem/1048576; //convert bytes to MB
        IJ.log("The average execution time for "+functionName+" is "+average+" ms.\n");
        IJ.log("The average used memory is "+avg_mem.toFixed(2)+" MB.\n");
        timeList.push(average);
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

//"Erode","Dilate","Open","Close-","Skeletonize",
functionList= ["Distance Map","Ultimate Points","Morphological Filters","Morphological Filters","Morphological Filters","Morphological Filters"];
//"","","","","",
parameterList = ["overwrite","","operation=Erosion element=Disk radius=2","operation=Dilation element=Disk radius=2","operation=Opening element=Disk radius=2","operation=Closing element=Disk radius=2"];

for (var i=0;i<functionList.length;i++)
{
    IJ.log("Function : "+functionList[i]+"\n");
    startBenchmark(imp, functionList[i] , parameterList[i]);
}
