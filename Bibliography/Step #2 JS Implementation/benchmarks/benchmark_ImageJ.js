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
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_50_50.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_150_150.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_250_250.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_350_350.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_550_550.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_750_750.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_1050_1050.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_1250_1250.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_1450_1450.png"));
imageList.push(IJ.openImage("https://raw.githubusercontent.com/ReiNoIkari/Morphological-Image-Processing/master/Bibliography/Step%20%232%20JS%20Implementation/benchmarks/Images/b_1600_1600.png"));
Prefs.blackBackground = true;

//list of our IJ functions/plugins to use, and the corresponding options (obtained via IJ macro recorder)
let functionList= ["Erode","Dilate","Open","Close-"];
//let functionList= ["Skeletonize","watershed"];
let parameterList = ["","","",""];
//let parameterList = ["",""];
IJ.log("starting...\n");
for (let i=0;i<functionList.length;i++)
{
  for (let j=0;i<imageList.length;j++){
    IJ.run(imageList[j], "Make Binary", "");
    IJ.run("Options...", "iterations=1 count=1 black edm=8-bit");
    IJ.log("Function : "+functionList[i]+"on image n° "+j+"\n");
    startBenchmark(imageList[j], functionList[i] , parameterList[i]);
  }
}
