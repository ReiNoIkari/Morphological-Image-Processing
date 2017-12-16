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
    for (let j=1;j<=radius_struct_y;j++){
      //k et l permettend de limité la zone de travail en partant d'un pixel donnée de -radius à +radius
      for(k;k >=-radius_struct_y && k<= radius_struct_y;k++){
        for (l;l >=-radius_struct_x && l<= radius_struct_x;l++){
          //conditions pour les voisins autour d'un pixels donnée tourne de en haut à gauche sens aiguille montre
          //Cherhe dans la zone taille struct element les 0 dans raster image. Si 0 mais 1 dans raster struc change valeur par 2 pour eviter
          //résultat de dilation n'est lieu

          // if (r_output.getPixel(x-i,y-j)!=struct_raster.getPixel(x-i,y-j)){
          //   r_output.setPixels(x,y,struct_raster.getPixel(x-i,y-j));
          // }
          
          if (r_output.getPixel(x-i,y-j)==0 && struct_raster.getPixel(x-i,y-j)==255){
            r_output.setPixels(x,y,2);
          }
          if (r_output.getPixel(x-i,y)==0 && struct_raster.getPixel(x-i,y)==255){
            r_output.setPixels(x,y,2);
          }
          if (r_output.getPixel(x-i,y+i)==0 && struct_raster.getPixel(x-i,y+j)==255){
            r_output.setPixels(x,y,struct_raster.getPixel(x-i,y+j));
          }
          if (r_output.getPixel(x,y-i)==0 && struct_raster.getPixel(x,y-j)==255){
            r_output.setPixels(x,y,2);
          }

          if (r_output.getPixel(x,y+j)==0 && struct_raster.getPixel(x,y+j)==255){
            r_output.setPixels(x,y,2);
          }
          if (r_output.getPixel(x+i,y-j)==0 && struct_raster.getPixel(x+i,y-j)==255){
            r_output.setPixels(x,y,2);
          }
          if (r_output.getPixel(x+i,y)==0 && struct_raster.getPixel(x+i,y)==255){
            r_output.setPixels(x,y,2);
          }
          if (r_output.getPixel(x+i,y+j)==0 && struct_raster.getPixel(x+i,y+j==255)){
            r_output.setPixels(x,y,2);
          }
        }
      }
    }
  }
  return r_output;
};

const process = function(r_output){
  for(let i=0;i<=rast.height;i++) {
		for (let j=0;j<=rast.width;j++){
			if (r_output.getPixel(x,y)==2) {
				r_output.setPixel(x,y,255);
			}
		}
  }
};
const dilate = function(img,struct,copy=true){

  let output = img;
  let r_output = output.getRaster();
  let r_struct=  struct.getRaster();
  let struct_Center=(r_struct.length+1)/2; 
  let radius_y = struct.height-struct_Center
  let radius_x = struct.width-struct_Center
  let value_struc_center=r_struct.xy(struct_Center);
  //let value_struc_center=r_struct.getPixel(struct.width/2,struct.height/2)
  console.log("heaaa");
  console.log(value_struc_center);
  let value_center_pixel=255;//a chnger valeur fausse pour l'instant


  for(let k=0; k<r_output.height; k++) { //parcours la liste de pixels de l'image en x
    for(let l=0; l=r_output.width; l++) {//parcours la liste de pixels de l'image en y
      if (r_output.getPixel(k,l)==value_struc_center){ //cherche dans la liste de pixels valeur du centre de l'élement structurant
        worskpace(k,l,r_output,r_struct);      
      }
    }
  }


  return output;
}


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
