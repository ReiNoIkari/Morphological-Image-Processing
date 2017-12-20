
  let img0 = new T.Image('uint8',446,446);
  img0.setPixels(b_image4);
  let win0 = new T.Window('Original');
  let view0 = T.view(img0.getRaster());
  // Create the window content from the view
  win0.addView(view0);
  // Add the window to the DOM and display it
  win0.addToDOM('workspace');
  
  
  let img4 = new T.Image('uint8',446,446);
  img4.setPixels(b_image4);
  
  
  let img3 = new T.Image('uint8',3,3);
  img3.setPixels(mask3by3Star);
  let win3 = new T.Window('Structuring element');
  let view3 = T.view(img3.getRaster());
  //Create the window content from the view
  win3.addView(view3);
  //Add the window to the DOM and display it
  win3.addToDOM('workspace');
  
  
  // let img3 = new T.Image('uint8',45,41);
  // img3.setPixels(struc_cross);
  // let win3 = new T.Window('Structuring element');
  // let view3 = T.view(img3.getRaster());
  // //Create the window content from the view
  // win3.addView(view3);
  // //Add the window to the DOM and display it
  // win3.addToDOM('workspace');
  
  //3rd window :result 
  
let img1 = opening(img0,img3);
let win1 = new T.Window('Opening');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');
