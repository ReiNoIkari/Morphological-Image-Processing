/**
 * Benchmark of a choosen transform with a pool of given binary images
 * @param {function} foo the function to benchmark
 * @param {T.Image[]} img_List the Array containing the test images
 * @param {*} options extra options for the foo funtion (default = true for the copy parameter)
 */
const benchmarking = (foo,img_List,options=true) => {
	timelist = {};
	// for each image
    for (i=0;i<img_List.length;i++) {
		// pre-heat
	for (j=0;j<100;j++) {
	    foo(img_List[i],options);
	}
	// benchmark
	let start = performance.now();
	for (j=0;j<1000;j++) {
	    foo(img_List[i],options);
	    }
	let end = performance.now();
	timelist['image'+i]=(end-start);
    }
    console.log(timelist);
}


//set of images resized
let img_50 = new T.Image('uint8',50,50);
img_50.setPixels(b_50_50);
let img_150 = new T.Image('uint8',150,150);
img_150.setPixels(b_150_150);
let img_250 = new T.Image('uint8',250,250);
img_250.setPixels(b_250_250);
let img_350 = new T.Image('uint8',350,350);
img_350.setPixels(b_350_350);
let img_550 = new T.Image('uint8',550,550);
img_550.setPixels(b_550_550);
let img_750 = new T.Image('uint8',750,750);
img_750.setPixels(b_750_750);
let img_1050 = new T.Image('uint8',1050,1050);
img_1050.setPixels(b_1050_1050);
let img_1250 = new T.Image('uint8',1250,1250);
img_1250.setPixels(b_1250_1250);
let img_1450 = new T.Image('uint8',1450,1450);
img_1450.setPixels(b_1450_1450);
let img_1600 = new T.Image('uint8',1600,1600);
img_1600.setPixels(b_1600_1600);

let mask = new T.Image('uint8',3,3);
mask.setPixels(mask3by3Star);

let img_Array = [img_50,img_150,img_250,img_350,img_550,img_750,img_1050,img_1250,img_1450,img_1600];
console.log("Skeletonize");
benchmarking(skeletonize,img_Array,true); // remplacer true par false évite la copie d'image => execution plus rapide ?