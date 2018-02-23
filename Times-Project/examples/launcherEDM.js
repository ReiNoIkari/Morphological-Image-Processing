/**
 * Invert colors
 *
 * @author Jean-Christophe Taveau
 */
 
// Create an Image containing boats (from ImageJ))
let img0 = new T.Image('uint8',256,254);
img0.setPixels(new Uint8Array(binary_blobs_pixels));
let raster = img0.getRaster();
let workflow0 = cpu.pipe(EDMIJ, cpu.view);
let view0 = workflow0(raster);
// Create the window content from the view
let win0 = new T.Window(`EDM_JAVASCRIPT`);
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');