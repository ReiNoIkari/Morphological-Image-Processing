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

const dilate = function(img,copy=true,struct=[0,1,0,1,1,1,0,1,0]){

  let output = img;
  let r_output = output.getRaster();
  let struct_Center=(struct.length+1)/2; 
  let value_center_pixel=0;
  var outside = Boolean(false);


   for(let k=0; k<r_output.height; k++) { //parcours la liste de pixels de l'image en x
    for(let l=0; l=r_output.width; l++) {//parcours la liste de pixels de l'image en y
      if (r_output.getPixel(k,l)==struct_Center){ //cherche dans la liste de pixels valeur du centre de l'élement structurant
        for(let m = -(struct.length-struct_Center);m<struct.length-struct_Center;m++){// On cherche dans la liste de pixel (en x) dans une zone de la taille elmt struct 
          for(let n = -(struct.length-struct_Center);n<struct.length-struct_Center;n++){// On cherche dans la liste de pixel (en y) dans une zone de la taille elmt struct
            if (k + m < 0 || k + m > r_output.width - 1) {//check si on est à l'exterieur de l'image en x ou pas, si oui outside=true
              outside = true;
            }
            if (l + n < 0 || l + n > r_output.height - 1) {//check si on est à l'exterieur de l'image en y ou pas, si oui outside=true
              outside = true;
            }
            if (!outside) {//si on est à l'interieur de l'image :
            //todo : 
            //getpixels sur l'iamge
            //getpixels sur elmt
            //si dif prendre valeur de elmt
              
            }
          } 
        }
      }
    }
  }

  console.log("PixelsData");
  console.log(r_output.pixelData);
  console.log("old_version");
  console.log(img_pixel_list);
  return output;
}


//1st window
let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');

//2nd window

let img1 = dilate(img0);
let win1 = new T.Window('Dilated');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');
