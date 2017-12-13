let img0 = new T.Image('uint8',500,500);
let mask0= new T.Image('uint8',3,3);
let img1 = new T.Image('uint8',500,500);

img0.setPixels(blobby);
mask0.setPixels(mask3by3Star);

img1.raster = erode(img0, copy=true,mask0);

let win0 = new T.Window('Original');
let view0 = T.view(img1.getRaster());

// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');