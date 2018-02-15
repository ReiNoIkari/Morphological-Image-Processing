/**
 * Invert colors
 *
 * @author Jean-Christophe Taveau
 */
 
// Create an Image containing boats (from ImageJ))
let img1 = new T.Image('uint8',256,254);
img1.setPixels(new Uint8Array(binary_blobs_pixels));
let raster = img1.getRaster();
let workflow1 = cpu.pipe(EDMFonctionnel, cpu.view);
let view1 = workflow1(raster);
// Create the window content from the view
let win1 = new T.Window(`EDM_FONCTIONNEL`);
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

// cpu.convole(img.getRaster(),gpuEnv);
