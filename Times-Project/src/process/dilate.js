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
 *
 * @author TODO
 */




/*const dilate2 = function (img,copy=true) {
  let ouput =  T.Raster.from(img.getRaster(),copy);
  let tmp = new T.Image('uint8',500,500);
  tmp.setPixels(b_image2);
  // TODO
    for (let i=0; i<img.length; i++){
      for (let j=0; j<img.length; j++){
        if (img[i][j]==1){ tmp[i][j]=1;
          if (i>0){ tmp[i-1][j] = 1;}
              if (j>0){ tmp[i][j-1] = 1;}   
              if (i+1<img.length){ tmp[i+1][j] = 1;}
              if (j+1<img[i].length){tmp[i][j+1] = 1;}
      }
    }
  }*/
 
/* 
  return img;
}        */  
const dilate = function(img,copy=true,struct=[0,1,0,1,1,1,0,1,0]){
  let output = img;
  let r_output = output.getRaster();
  let struct_Center=(struct.length+1)/2; 
  let value_center_pixel=0;
  let img_pixel_list=[];
  
  //Loop to store pixels value of the whole image, easier to check for neighbours later
  for (let j =0; j<r_output.height; j++){
    for(let i=0;i<r_output.width; i++){
      img_pixel_list.push(r_output.getPixel(j,i));
    }
  }
  for(let k=0; k<img_pixel_list.length; k++) { //parcours la liste de pixels de l'image en x
    for(let l=0; l=img_pixel_list[k].length; l++) {//parcours la liste de pixels de l'image en y
      if (img_pixel_list[k]==img_pixel_list[k][l]==struct_Center) //cherche dans la liste de pixels valeur du centre de l'élement structurant
        for(let m = -(struct.length-struct_Center);m<struct.length-struct_Center;m++){// On cherche dans la liste de pixel (en x) dans une zone de la taille elmt struct 
          for(let n = -(struct.length-struct_Center);n<struct.length-struct_Center;n++){// On cherche dans la liste de pixel (en y) dans une zone de la taille elmt struct
            if (k + m < 0 || k + m > r_output.width - 1) {//check si on est à l'exterieur de l'image en x ou pas, si oui outside=true
              outside = true;
            }
            if (l + n < 0 || l + n > r_output.height - 1) {//check si on est à l'exterieur de l'image en y ou pas, si oui outside=true
              outside = true;
            }
            if (!outside) {//si on est à l'interieur de l'image :
            
          }
            
        }
   

    }
  }

  return output;
}

/**
 * Display uint8 images
 */
/*let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');




let win1 = new T.Window('Dilated');

let view1 = T.view(dilate(img0());

win1.addView(view1);
win1.addToDOM('workspace');*/


let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');
// SKELETONIZE
let img1 = dilate(img0);
let win1 = new T.Window('Dilated');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');


