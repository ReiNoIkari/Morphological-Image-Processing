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

const process_operation = function(r_output){
  for(let i=0;i<=r_output.height;i++) {
		for (let j=0;j<=r_output.width;j++){
			if (r_output.getPixel(i,j)==2) {
				r_output.setPixel(i,j,255);
			}
		}
  }
  return r_output;
};

const dilate = function(img,struct,copy=true){

  let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(T.Raster.from(img.getRaster(),copy));
  // let output = img;
  // let r_output = output.getRaster();
  let r_struct=struct.getRaster();
  let struct_Center=(r_struct.length+1)/2; 
  let value_struc_center=r_struct.xy(struct_Center);
  let x_value_struc_element=value_struc_center[0];
  let y_value_struc_element=value_struc_center[1];
  let value_center_pixel=r_struct.getPixel(x_value_struc_element,y_value_struc_element);
  let radius_struct_y = r_struct.height-struct_Center;
  let radius_struct_x = r_struct.width-struct_Center;


 
  for(let y=0; y<temp.getRaster().height; y++) { //parcours le raster de l'image en x
    for(let x=0; x<temp.getRaster().width; x++) {//parcours le raster de l'image en y
      if (temp.getRaster().getPixel(x,y)==value_center_pixel){    
        for (let i=0;i<=radius_struct_x;i++){
          for (let j=0;j<=radius_struct_y;j++){
            if (temp.getRaster().getPixel(x-i,y-j)==0 && r_struct.getPixel(x_value_struc_element-i,y_value_struc_element-j)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x-i,y)==0 && r_struct.getPixel(x_value_struc_element-i,y_value_struc_element)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x-i,y+i)==0 && r_struct.getPixel(x_value_struc_element-i,y_value_struc_element+j)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x,y-i)==0 && r_struct.getPixel(x_value_struc_element,y_value_struc_element-j)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x,y+j2)==0 && r_struct.getPixel(x_value_struc_element,y_value_struc_element+j)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x+i,y-j)==0 && r_struct.getPixel(x_value_struc_element+i,y_value_struc_element-j)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x+i,y)==0 && r_struct.getPixel(x_value_struc_element+i,y_value_struc_element)==255){
              temp.getRaster().setPixels(x,y,2);
            }
            if (temp.getRaster().getPixel(x+i,y+j)==0 && r_struct.getPixel(x_value_struc_element+i,y_value_struc_element+j==255)){
              temp.getRaster().setPixels(x,y,2);
            }           
          }
        }
      }
    }
  }

  let r_output = process_operation(temp.getRaster());
	temp.setRaster(r_output);
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


//2nd windows : struc element

let img3 = new T.Image('uint8',45,41);
img3.setPixels(struc_cross);
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
