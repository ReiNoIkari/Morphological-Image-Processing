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

            //si pixel le meme mettre une valeur intermédiaire dans une copie
            //parcourir copie et si que des 2 dans un radius du struct 


/**
 * Description: TODO
 *
 * @param {type} <name> - <Description>
 * @return {type} - <Description>
 
 * @author Adrien MENDES SANTOS
 */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */

const process_operation_erode = function(r_output,copy=true){
    for(let i=0;i<=r_output.height;i++){
    	for (let j=0;j<=r_output.width;j++){
	      if (r_output.getPixel(i,j)==2){
		      r_output.setPixel(i,j,255); 
	      }
	      else 
		      r_output.setPixel(i,j,0);
	    }
    }
    return r_output;
};

const erode_process=function(raster,struct,copy=true){
    let r_output = T.Raster.from(raster,copy);
    let r_struct=struct.getRaster();
    let struct_Center=(r_struct.length+1)/2; 
    let value_struc_center=r_struct.xy(struct_Center);
    let x_value_struc_element=value_struc_center[0];
    let y_value_struc_element=value_struc_center[1];
    let value_center_pixel=r_struct.getPixel(x_value_struc_element,y_value_struc_element);
    let radius_struct_y = r_struct.height-value_struc_center[1];
    let radius_struct_x = r_struct.width-value_struc_center[0];

    var values_foreground=0;
    var values=0;

    console.log('rstruc');
    console.log(r_struct.pixelData);

    for(let a=0; a<r_struct.height; a++){
	    for(let b=0; b<r_struct.width; b++){
        if(r_struct.getPixel(a,b)==255){
          values_foreground+=1;
        }
      }
    }

    for(let y=0; y<raster.height; y++) {
	    for(let x=0; x<raster.width; x++) {
        values=0;
	      if (raster.getPixel(x,y)==value_center_pixel){
		      for (let rx = -radius_struct_x; rx <= radius_struct_x; rx++) {
		        for (let ry = -radius_struct_y; ry <= radius_struct_y; ry++) {
              if(r_struct.getPixel(x_value_struc_element-rx,y_value_struc_element-ry)==255){
                if (raster.getPixel(x-rx,y-ry) == 255) {
                  values+=1;
                }
              }
		        } 
		      }
		    if (values==values_foreground){
		      r_output.setPixel(x,y,2)
		    }
	      } 
	    }
    }
    return r_output;
}

const erode = function(img,struct,copy=true){
    let temp = new T.Image('uint8',img.width,img.height);
    temp.setRaster(T.Raster.from(img.getRaster(),copy));
    let r_output = erode_process(temp.getRaster(),struct);
    r_output = process_operation_erode(r_output);
    temp.setRaster(r_output);
    return temp;
};

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
    let r_struct=struct.getRaster();
    let struct_Center=(r_struct.length+1)/2; 
    let value_struc_center=r_struct.xy(struct_Center);
    let x_value_struc_element=value_struc_center[0];
    let y_value_struc_element=value_struc_center[1];
    let value_center_pixel=r_struct.getPixel(x_value_struc_element,y_value_struc_element);
    let radius_struct_y = r_struct.height-value_struc_center[1];
    let radius_struct_x = r_struct.width-value_struc_center[0];
  
    for(let y=0; y<raster.height; y++) { //parcours le raster de l'image en x
      for(let x=0; x<raster.width; x++) {//parcours le raster de l'image en y
        if (raster.getPixel(x,y)==value_center_pixel){
          for (let rx = -radius_struct_x; rx <= radius_struct_x; rx++) {
            for (let ry = -radius_struct_y; ry <= radius_struct_y; ry++) {
              if (raster.getPixel(x-rx,y-ry)==0 && r_struct.getPixel(x_value_struc_element-rx,y_value_struc_element-ry)==255){
                  r_output.setPixel(x-rx,y-ry,2);
              }
            } 
          }   
        }
      }
    }
  
    return r_output;
  }
  const dilate = function(img,struct,copy=true){
  
    let temp = new T.Image('uint8',img.width,img.height);
    temp.setRaster(T.Raster.from(img.getRaster(),copy));
    let r_output = dilate_process(temp.getRaster(),struct,copy=true);
    r_output = process_operation_dilate(r_output,true);
    temp.setRaster(r_output);
      return temp;
  };
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */
/*PROVISOIRE AVANT TOUT METTRE DANS MEME FICHIER */



const opening= function(img,struct,copy=true){
    let temp = new T.Image('uint8',img.width,img.height);
    temp.setRaster(T.Raster.from(img.getRaster(),copy));
    let r_output = erode_process(temp.getRaster(),struct,copy=true);
    r_output = process_operation_erode(r_output,true);
    r_output=dilate_process(r_output,true)
    r_output=process_operation_dilate(r_output,true)
    temp.setRaster(r_output);
    return temp;
  };

//1st window :original 

// let img0 = new T.Image('uint8',500,500);
// img0.setPixels(b_image2);
// let win0 = new T.Window('Original');
// let view0 = T.view(img0.getRaster());
// // Create the window content from the view
// win0.addView(view0);
// // Add the window to the DOM and display it
// win0.addToDOM('workspace');

let img0 = new T.Image('uint8',446,446);
img0.setPixels(b_image3);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');


let img4 = new T.Image('uint8',446,446);
img4.setPixels(b_image3);


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

let img1 = erode(img0,img3);
let win1 = new T.Window('Eroded');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');
