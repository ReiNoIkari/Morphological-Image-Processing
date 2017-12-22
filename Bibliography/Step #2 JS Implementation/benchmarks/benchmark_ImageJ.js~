function startBenchmark(img, functionName, parameter)
{
  //Warm-up
  //Initializing the classes ( no recording at this point )
  let time = 0.0;
  for(let i = 0; i<100; i++)
  {
    let temp= img.duplicate();
    let startTime = System.nanoTime();
    IJ.run(temp, functionName, parameter);
    let endTime = System.nanoTime();
    temp.close();
    IJ.run("Close All", "");
  }

  //Benchmarking and storing execution times
  for(let i = 0; i < 1000; i++)
  {
    let temp = img.duplicate();
    let startTime = System.nanoTime();
    IJ.run(temp, functionName, parameter);
    let endTime = System.nanoTime();
    time += endTime - startTime;
    temp.close();
    IJ.run("Close All", "");
  }
  // calculating the average value of the 1000 runs
  let avg_time = time/1000/1000000; ///1000 for 1000 runs, then /1000000 to convert ns to ms
  IJ.log("The average execution time for "+functionName+" is "+avg_time.toFixed(5)+" ms.\n");
}


// Main

//Loading image and convert it to binary
let imageList =[];
imageList.push(IJ.openImage("http://wsr.imagej.net/images/embryos.jpg"));
Prefs.blackBackground = true;

//list of our IJ functions/plugins to use, and the corresponding options (obtained via IJ macro recorder)
let functionList= ["Erode","Dilate","Open","Close-"]
//let functionList= ["Skeletonize"];
let parameterList = ["","","",""]
//let parameterList = [""];

for (let i=0;i<functionList.length;i++)
{
  for (let j=0;i<imageList.length;j++){
    IJ.run(imageList[j], "Make Binary", "");
    IJ.run("Options...", "iterations=1 count=1 black edm=8-bit");
    IJ.log("Function : "+functionList[i]+"on image n° "+j+"\n");
    startBenchmark(imageList[j], functionList[i] , parameterList[i]);
  }
}
