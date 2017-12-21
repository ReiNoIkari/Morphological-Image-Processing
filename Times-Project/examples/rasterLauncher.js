let img0 = new T.Image('uint8',500,500);
let mask0= new T.Image('uint8',3,3);
let img1 = new T.Image('uint8',500,500);

img0.setPixels(b_image2);
mask0.setPixels(maskAngle);

let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');
img1.raster = hit_or_miss(img0, copy=true,mask0);
let win1 = new T.Window('Hit or Miss');
let view1 = T.view(img1.getRaster());
win1.addView(view1);
win1.addToDOM('workspace');