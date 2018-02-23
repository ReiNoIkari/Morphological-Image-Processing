//IMAGES CONCATENATION
 let listeImages = []

let img1 = new T.Image('uint8',256,254);
img1.setPixels(new Uint8Array(binary_blobs_pixels));
listeImages.push(img1);

 let raster1 = img1.getRaster();
 let workflow1 = cpu.pipe(cpu.view);
 let view1 = workflow1(raster1);
 let win1 = new T.Window('Blobs_256x254');
 win1.addView(view1);
 win1.addToDOM('workspace');

let img2 = new T.Image('uint8',256,508);
console.log("img2");
let mypix2 = binary_blobs_pixels.concat(binary_blobs_pixels);
img2.setPixels(new Uint8Array(mypix2));
listeImages.push(img2);

 let raster2 = img2.getRaster();
 let workflow2 = cpu.pipe( cpu.view);
 let view2 = workflow2(raster2);
 let win2 = new T.Window('Blobs_256x508');
 win2.addView(view2);
 win2.addToDOM('workspace');


let img3 = new T.Image('uint8',256,762);
 console.log("img3");
let mypix3 = binary_blobs_pixels.concat(binary_blobs_pixels).concat(binary_blobs_pixels);
img3.setPixels(new Uint8Array(mypix3));
listeImages.push(img3);

 let raster3 = img3.getRaster();
 let workflow3 = cpu.pipe(cpu.view);
 let view3 = workflow3(raster3);
 let win3 = new T.Window('Blobs_256x762');
 win3.addView(view3);
 win3.addToDOM('workspace');


let img4 = new T.Image('uint8',256,1016);
console.log("img4");
let mypix4 = binary_blobs_pixels.concat(binary_blobs_pixels).concat(binary_blobs_pixels).concat(binary_blobs_pixels);
img4.setPixels(new Uint8Array(mypix4));
listeImages.push(img4);

 let raster4 = img4.getRaster();
 let workflow4 = cpu.pipe(cpu.view);
 let view4 = workflow4(raster4);
 let win4 = new T.Window('Blobs_256x1016');
 win4.addView(view4);
 win4.addToDOM('workspace');


let img5 = new T.Image('uint8',256,1270);
console.log("img5");
let mypix5 = binary_blobs_pixels.concat(binary_blobs_pixels).concat(binary_blobs_pixels).concat(binary_blobs_pixels).concat(binary_blobs_pixels);
img5.setPixels(new Uint8Array(mypix5));
listeImages.push(img5);

 let raster5 = img5.getRaster();
 let workflow5 = cpu.pipe(cpu.view);
 let view5 = workflow5(raster5);
 let win5 = new T.Window('Blobs_256x1270');
 win5.addView(view5);
 win5.addToDOM('workspace');

let img6 = new T.Image('uint8',256,1524);
console.log("img6");
let mypix6 = binary_blobs_pixels.concat(binary_blobs_pixels).concat(binary_blobs_pixels).concat(binary_blobs_pixels).concat(binary_blobs_pixels).concat(binary_blobs_pixels);
img6.setPixels(new Uint8Array(mypix6));
listeImages.push(img6);

 let raster6 = img6.getRaster();
 let workflow6 = cpu.pipe(cpu.view);
 let view6 = workflow6(raster6);
 let win6 = new T.Window('Blobs_256x1524');
 win6.addView(view6);
 win6.addToDOM('workspace');

//BENCHMARK
results=[];
for (i=0; i<listeImages.length; i++){
  let raster2 = listeImages[i].getRaster();
  let binary = EDMIJ(raster2);
  //warmup
  for (j=0; j<100; j++){
    EDMIJ(raster2);
  }
performance.now();
//processing
  for (j=0; j<1000; j++){
    EDMIJ(raster2);
  }
let executionTime = performance.now();
results.push(executionTime/1000);
}
console.log("Results");
console.log(results);
