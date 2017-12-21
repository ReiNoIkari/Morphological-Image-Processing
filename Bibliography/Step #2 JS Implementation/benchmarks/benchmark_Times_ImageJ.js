const benchmarking = (img_List,func()) => {
    for image in img_List {	
	for (i=0;i<100;i++) {
	    func(image);
	}
	for (i=0;i<1000;i++) {
	    func(image)
	}
    }
}



/*
Benchmark of a choosen transform with a pool of given binary images
*/
let img_50_50 = new T.Image('uint8',50,50);
img_50_50.setPixels(b_50_50);
let img_150_150 = new T.Image('uint8',150,150);
img_150_150.setPixels(b_150_150);
let img_250_250 = new T.Image('uint8',250,250);
img_250_250.setPixels(b_250_250);
let img_350_350 = new T.Image('uint8',350,350);
img_350_350.setPixels(b_350_350);
let img_550_550 = new T.Image('uint8',550,550);
img_550_550.setPixels(b_550_550);
let img_750_750 = new T.Image('uint8',750,750);
img_750_750.setPixels(b_750_750);
let img_1050_1050 = new T.Image('uint8',1050,1050);
img_1050_1050.setPixels(b_1050_1050);
let img_1250_1250 = new T.Image('uint8',1250,1250);
img_1250_1250.setPixels(b_1250_1250);
let img_1450_1450 = new T.Image('uint8',1450,1450);
img_1450_1450.setPixels(b_1450_1450);
let img_1600_1600 = new T.Image('uint8',1600,1600);
img_1600_1600.setPixels(b_1600_1600);
