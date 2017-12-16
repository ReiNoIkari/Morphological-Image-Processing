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

//check all the 8 neighbors for a pixel i
//not cute to see but w/e
//check raisonement es ce que les coordonée x du raster_struct coorepondent à ceux image?? Petit doute...
const worskpace = function(x,y,r_output,r_struct) {
  
  let struct_Center=(struct.length+1)/2; 
  let radius_struct_y = struct.height-struct_Center
  let radius_struct_x = struct.width-struct_Center
  //i et j sont les radius en X et Y permmetant de parcours tout les voirsins d'un pixels donnée quelques soit la taille du structurement element (3*3,5*5...)
  //i et j start 1 car radius minimum
  //peut etre redondance?? 
  for (let i=1;i<=radius_struct_x;i++){
    for (let j=1:j<=radius_struct_y;j++){
      //k et l permettend de limité la zone de travail en partant d'un pixel donnée de -radius à +radius
      for(k;k>=-radius_struct_y && <=radius_struct_y;k++) {
        for (l;l>=-radius_struct_x && <=radius_struct_x;l++){
          //conditions pour les 8 voisins autour d'un pixels donnée, demande plus de travail théorique mais en théorique prend tout les voisins quelques soit la taille du struc element--need check more in detail work in progress
         //Condition pour une dilate toujours pas appliqué need changer ça, pas finis !
          if (r_output.getPixel(x-i,y-j)!=struct_raster.getPixel(x-i,y-j)){
            r_output.setPixels(x,y,struct_raster.getPixel(x-i,y-j));
          }
          if (r_output.getPixel(x-i,y)!=struct_raster.getPixel(x-i,y)){
            r_output.setPixels(x,y,struct_raster.getPixel(x-i,y));
          }
          if (r_output.getPixel(x-i,y+i)!=struct_raster.getPixel(x-i,y+j)){
            r_output.setPixels(x,y,struct_raster.getPixel(x-i,y+j));
          }
          if (r_output.getPixel(x,y-i)!=struct_raster.getPixel(x,y-j)){
            r_output.setPixels(x,y,struct_raster.getPixel(x,y-j));
          }

          if (r_output.getPixel(x,y+j)!=struct_raster.getPixel(x,y+j)){
            r_output.setPixels(x,y,struct_raster.getPixel(x,y+j));
          }
          if (r_output.getPixel(x+i,y-j)!=struct_raster.getPixel(x+i,y-j)){
            r_output.setPixels(x,y,struct_raster.getPixel(x+i,y-j));
          }
          if (r_output.getPixel(x+i,y)!=struct_raster.getPixel(x+i,y)){
            r_output.setPixels(x,y,struct_raster.getPixel(x+i,y));
          }
          if (r_output.getPixel(x+i,y+j)!=struct_raster.getPixel(x+i,y+j)){
            r_output.setPixels(x,y,struct_raster.getPixel(x+i,y+j));
          }
        }
      }
    }
  }
};

const dilate = function(img,copy=true,struct=[0,1,0,1,1,1,0,1,0]){

  let output = img;
  let r_output = output.getRaster();
  let r_struct=struct.getRaster();
  let struct_Center=(struct.length+1)/2; 
  let value_struc_center=struct.xy(struct_Center);
  let radius_y = struct.height-struct_Center
  let radius_x = struct.width-struct_Center
  let value_center_pixel=0;//a chnger valeur fausse pour l'instant

  var outside = Boolean(false);


   for(let k=0; k<r_output.height; k++) { //parcours la liste de pixels de l'image en x
    for(let l=0; l=r_output.width; l++) {//parcours la liste de pixels de l'image en y
      if (r_output.getPixel(k,l)==struct_Center){ //cherche dans la liste de pixels valeur du centre de l'élement structurant
        for(let m = -radius_x;m<radius_x;m++){// On cherche dans la liste de pixel (en x) dans une zone de la taille elmt struct 
          for(let n = -radius_y;n<radius_y;n++){// On cherche dans la liste de pixel (en y) dans une zone de la taille elmt struct
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
