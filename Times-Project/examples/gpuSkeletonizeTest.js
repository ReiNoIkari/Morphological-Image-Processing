/**
 * Display Skeletonize
 */
let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = cpu.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');

/**
 * GPU
 */
let gpuEnv = gpu.getGraphicsContext('skeletonize');
//gpu.invert(img0.getRaster(),gpuEnv);
gpuSkeletonize(img0.getRaster(),gpuEnv);