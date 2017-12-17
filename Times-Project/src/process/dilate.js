/*
 *  TIMES: Tiny Image ECMAScript Application
 *  Copyright (C) 2017  Jean-Christophe Taveau.
 *
 *  This file is part of TIMES
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,Image
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with TIMES.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use script';

/**
 * Description: TODO
 *
 * @param {type} <name> - <Description>
 * @return {type} - <Description>
 
 * @author TODO
 */

function differences(a, b) {
  var missings = [];
  var matches = false;

  for ( var i = 0; i < a.length; i++ ) {
      matches = false;
      for ( var e = 0; e < b.length; e++ ) {
          if ( a[i] === b[e] ) matches = true;
      }
      if(!matches) missings.push( a[i] );
  }
  return missings;
}



const process_operation = function(r_output,copy=true){
  for(let i=0;i<=r_output.height;i++) {
		for (let j=0;j<=r_output.width;j++){
			if (r_output.getPixel(i,j)==2) {
				r_output.setPixel(i,j,255);
			}
		}
  }
  return r_output;
};

const dilate_process=function(raster,struct,copy=true){
  let r_output = T.Raster.from(raster,copy);
  let r_output_copy = T.Raster.from(raster,copy);
  let r_struct=struct.getRaster();
  let struct_Center=(r_struct.length+1)/2; 
  let value_struc_center=r_struct.xy(struct_Center);
  let x_value_struc_element=value_struc_center[0];
  let y_value_struc_element=value_struc_center[1];
  let value_center_pixel=r_struct.getPixel(x_value_struc_element,y_value_struc_element);

  //valeur abérante radius_struct_y(-878)
  let radius_struct_y = r_struct.height-value_struc_center[1];
  let radius_struct_x = r_struct.width-value_struc_center[0];

  var size_struc_element = 5;
  var radius_struc = Math.floor(size_struc_element / 2);

  console.log("r_output");
  console.log(r_output.pixelData);

  console.log("raster");
  console.log(raster.pixelData);

  console.log("value_center_pixel");
  console.log(value_center_pixel);

  console.log("value_struc_center is");
  console.log(value_struc_center);

  console.log("r_struct height is");
  console.log(r_struct.height);

  console.log("r_struct width is");
  console.log(r_struct.width);

  console.log("x_value_struc_element is");
  console.log(x_value_struc_element);

  console.log("y_value_struc_element is");
  console.log(y_value_struc_element);

  console.log("radius x is");
  console.log(radius_struct_x);

  for(let y=0; y<r_output.height; y++) { //parcours le raster de l'image en x
    for(let x=0; x<r_output.width; x++) {//parcours le raster de l'image en y
      if (r_output.getPixel(x,y)==value_center_pixel){
        for (var rx = -radius_struct_x; rx <= radius_struct_x; rx++) {
          for (var ry = -radius_struct_y; ry <= radius_struct_y; ry++) {
            //doublon je crois bien
            // if (r_output.getPixel(x+rx,y+ry)==0 && r_struct.getPixel(x_value_struc_element-rx,y_value_struc_elementry)==255){
            //   r_output.setPixel(x,y,2);       
            // }  
            // if (r_output.getPixel(x+rx,y+ry)==0 && r_struct.getPixel(x_value_struc_elementrx,y_value_struc_element-ry)==255){
            //   r_output.setPixel(x,y,2);       
            // } 
            
            //aucun pixel valoir de 2, pourquoiiii?
            if (r_output.getPixel(x-rx,y-ry)==0 && r_struct.getPixel(x_value_struc_element-rx,y_value_struc_element-ry)==255){
              r_output.setPixel(x-rx,y-ry,2);       
            }
          } 
        }   
      }
    }
  }
  console.log("this is r_output before conversion there should be 2 values");
  console.log(r_output.pixelData);
  console.log("difference");
  console.log(differences(r_output_copy,r_output));
  return r_output;
}
const dilate = function(img,struct,copy=true){

  let temp = new T.Image('uint8',img.width,img.height);
  temp.setRaster(T.Raster.from(img.getRaster(),copy));

  
  let r_output = dilate_process(temp.getRaster(),struct,copy=true);
  
	r_output = process_operation(r_output,true);
	return temp;
};


//1st window :original 

let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');


let img3 = new T.Image('uint8',3,3);
img3.setPixels(mask3by3Star);
let win3 = new T.Window('Structuring element');
let view3 = T.view(img3.getRaster());
// Create the window content from the view
win3.addView(view3);
// Add the window to the DOM and display it
win3.addToDOM('workspace');

//3nd window :result 

let img1 = dilate(img0,img3);
let win1 = new T.Window('Dilated');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');
