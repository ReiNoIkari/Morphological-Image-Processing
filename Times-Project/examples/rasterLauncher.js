let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
win0.addView(view0);
win0.addToDOM('workspace');

let mask0= new T.Image('uint8',3,3);
mask0.setPixels(maskAngle);

let img1 = new T.Image('uint8',500,500);
img1 = hit_or_miss(img0, mask0);
let win1 = new T.Window('Hit or Miss');
let view1 = T.view(img1.getRaster());
win1.addView(view1);
win1.addToDOM('workspace');




// Create the window content from the view

// Add the window to the DOM and display it

