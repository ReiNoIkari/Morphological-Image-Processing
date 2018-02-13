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

//ERODE//

/**
 * Description:
 *
 * @param {TRaster} -  r_output - Take as input a Traster and change all the intermediate value of 2 by 255. Else all other values are set to 0. So only the pixels corresponding to the kernel will remain.
 * @return {TRaster} - return a Traster with valued changed.

 * @author Adrien MENDES SANTOS
 */


const process_operation_erode = (r_output,copy=true) => {

  r_output.pixelData = r_output.pixelData.map((x,i,a) => x==2 ? 255 : 0);

  return r_output;
};

/**
* Description:
*
* @param {TRaster,img} -  raster, struct - Take as input a Traster and the structuring element an image. Various variable are then determined like radius of the kernel, the number of foreground pixels. If the kernel pass through an area containing the same foreground pixels in the raster of the image then, fixes the center to an intermediate value of 2.
* @return {TRaster} - return a Traster with the pixels that will be be set to foreground set to a value of 2.

* @author Adrien MENDES SANTOS
*/

const erode_process=(raster,struct,copy=true)=>{
  let r_output = T.Raster.from(raster,copy);
  let r_struct=struct.getRaster();
  let struct_Center=(r_struct.length-1)/2;
  let value_struc_center=r_struct.xy(struct_Center);

  let x_value_struc_element=value_struc_center[0];
  let y_value_struc_element=value_struc_center[1];
  let value_center_pixel=r_struct.getPixel(x_value_struc_element,y_value_struc_element);
  let radius_struct_y = (r_struct.height-1)-value_struc_center[1];
  let radius_struct_x = (r_struct.width-1)-value_struc_center[0];

  let values=0;

  let values_foreground = r_struct.pixelData.filter(i => i == 255).length;

  for(let y=0; y<raster.height; y++) {
    for(let x=0; x<raster.width; x++) {
      values=0;
      if (raster.getPixel(x,y)==value_center_pixel){
        for (let rx = -radius_struct_x; rx <= radius_struct_x; rx++) {
          for (let ry = -radius_struct_y; ry <= radius_struct_y; ry++) {
            if(r_struct.getPixel(x_value_struc_element-rx,y_value_struc_element-ry)==255 && raster.getPixel(x-rx,y-ry)==255){
                values+=1;

            }
          }
        }
      if (values==values_foreground){
        r_output.setPixel(x,y,2)
      }
      }
    }
  }
  //create "total_match" function => return true if values == values_foreground after counting your matching values
  //NOT WORKING !
  //const total_match = (index) {
  //  let values = r_struct.pixelData.filter((x,i,a) => x == 255 && rast.get(index-(i+r_struct.pixelData.length/2))==255);
  //  return values == values_foreground;
  //}
  //This part should work once total_match working
  //for x y : si total match ( )
  //r_output.pixelData = r_output.pixelData.map((x,i,a) => total_match(i) ? 2 : x);
  return r_output;
}
/**
* Description:
*
* @param {img,img} -  img, struct - Take as input 2 images. One is the image that will be processed, the other is the  structuring element. This function is equivalent as the main, it will call the different functions to do the erode operation.
* @return {img} - return an image that is a copy of the original image with processed pixels i.e. an eroded image.

* @author Adrien MENDES SANTOS
*/

const erode = (img,struct,copy=true)=>{
  let temp = new T.Image('uint8',img.width,img.height);
  temp.setRaster(T.Raster.from(img.getRaster(),copy));
  let r_output = erode_process(temp.getRaster(),struct);
  r_output = process_operation_erode(r_output);
  temp.setRaster(r_output );

  return temp;
};

//Dilate
/**
 * Description:
 *
 * @param {TRaster} -  r_output - Take as input a Traster and change all the intermediate value of 2 by 255. We don't touch the others pixels.
 * @return {TRaster} - return a Traster with valued changed from 2 to 255.

 * @author Adrien MENDES SANTOS
 */

const process_operation_dilate = (r_output,copy=true) => {

  r_output.pixelData = r_output.pixelData.map((x,i,a) => x==2 ? 255 : x);

  return r_output;
};

/**
 * Description:
 *
 * @param {TRaster,img} -  raster, struct - Take as input a Traster and the structuring element an image. Various variable are then determined like radius of the kernel, the number of foreground pixels(same methodology is used in the erode function). If the center of the kernel pass through a pixel in the raster of the same value as the center of kernel, then it would check if the neighbors of the pixel in raster has the same foreground neighbors than the kernel. If not change those values with the kernel values. Conditions are also present to take care of the border of the image.
 * @return {TRaster} - return a Traster with the pixels that will be be set to foreground set to a value of 2.

 * @author Adrien MENDES SANTOS
 */

const dilate_process=(raster,struct,copy=true)=>{
  let r_output = T.Raster.from(raster,copy);
  let r_struct=struct.getRaster();
  let struct_Center=(r_struct.length-1)/2;
  let value_struc_center=r_struct.xy(struct_Center);

  let x_value_struc_element=value_struc_center[0];
  let y_value_struc_element=value_struc_center[1];
  let value_center_pixel=r_struct.getPixel(x_value_struc_element,y_value_struc_element);
  let radius_struct_y = (r_struct.height-1)-value_struc_center[1];
  let radius_struct_x = (r_struct.width-1)-value_struc_center[0];

  for(let y=0; y<raster.height; y++) {
    for(let x=0; x<raster.width; x++) {
      if (raster.getPixel(x,y)==value_center_pixel){
        for (let rx = -radius_struct_x; rx <= radius_struct_x; rx++) {
          for (let ry = -radius_struct_y; ry <= radius_struct_y; ry++) {
            let img_edge = false;
            if (!(x-rx<0 || x-rx>raster.height-1 || y-ry<0 || y-ry>raster.width-1) &&
            (raster.getPixel(x-rx,y-ry)==0 && r_struct.getPixel(x_value_struc_element-rx,y_value_struc_element-ry)==255)){
            r_output.setPixel(x-rx,y-ry,2);
            }
          }
        }
      }
    }
  }
  return r_output;
}

/**
 * Description:
 *
 * @param {img,img} -  img, struct - Take as input 2 images. One is the image that will be processed, the other is the  structuring element. This function is equivalent as the main, it will call the different functions to do the dilate operation.
 * @return {img} - return an image that is a copy of the original image with processed pixels i.e. a dilated image.

 * @author Adrien MENDES SANTOS
 */

const dilate = (img,struct,copy=true)=>{

  let temp = new T.Image('uint8',img.width,img.height);
  temp.setRaster(T.Raster.from(img.getRaster(),copy));
  let r_output = dilate_process(temp.getRaster(),struct,copy=true);
  r_output = process_operation_dilate(r_output,true);

  temp.setRaster(r_output);
	return temp;
};

//Open

/**
 * Description:
 *
 * @param {img,img} -  img, struct - Take as input 2 images. One is the image that will be processed, the other is the  structuring element. This function calls the different functions to do the opening  operation.
 * @return {img} - return an image that is a copy of the original image with processed pixels i.e. an opened image.

 * @author Adrien MENDES SANTOS
 */

const opening= (img,struct,copy=true)=>{
  let temp = new T.Image('uint8',img.width,img.height);
  temp.setRaster(T.Raster.from(img.getRaster(),copy));
  let r_output = erode_process(temp.getRaster(),struct);
  r_output = process_operation_erode(r_output);
  let r_output2=dilate_process(r_output,struct)
  r_output2=process_operation_dilate(r_output2)
  temp.setRaster(r_output2);
  return temp;
};

//Close

/**
 * Description:
 *
 * @param {img,img} -  img, struct - Take as input 2 images. One is the image that will be processed, the other is the  structuring element. This function calls the different functions to do the closing operation.
 * @return {img} - return an image that is a copy of the original image with processed pixels i.e. an closed image.

 * @author Adrien MENDES SANTOS
 */

const closing= (img,struct,copy=true)=>{
  let temp = new T.Image('uint8',img.width,img.height);
  temp.setRaster(T.Raster.from(img.getRaster(),copy));
  let r_output = dilate_process(temp.getRaster(),struct);
  r_output = process_operation_dilate(r_output);

  let r_output2=erode_process(r_output,struct)
  r_output2=process_operation_erode(r_output2)

  temp.setRaster(r_output2);
  return temp;
};

//Hit or miss

/**
 * Description: Returns a raster showing where were the correspondances between an input image and a kernel's pattern
 *
 * @param {type} <Images> - <img and mask are images given as parameters>
 * @return {type} - <The hit or miss function returns a modified copy of the original image's raster>
 *
 * @author Vincent Dejonghe
 */

const hit_or_miss_process = function(raster,mask,copy=true){

	let rasterDetectionPattern = T.Raster.from(raster,copy=true);
	let output = T.Raster.from(raster,copy=true);
	let masqueRaster = mask.getRaster();
	let masque = T.Raster.from(masqueRaster,copy=true);//copie du raster du masque
	console.log(masque, output);
	let centerMask = (masqueRaster.length+1)/2-1; //on va de 0 � 8
	console.log(centerMask);
	let xyCenterMask = masqueRaster.xy(centerMask);
	console.log(xyCenterMask);
	let centerMask_X = xyCenterMask[0]; //1
	let centerMask_Y = xyCenterMask[1];//1
	let valueCenterMask = masqueRaster.getPixel(centerMask_X,centerMask_Y);
	console.log(valueCenterMask);
	let halfMask_Y = masqueRaster.height-centerMask_Y;
	let halfMask_X = masqueRaster.height-centerMask_X;
	console.log(halfMask_Y,halfMask_X);
	let compteur=0;

	/*
	//Use for applying on the borders by extending them ?
	let leftPadding = -masque.width%2;// pixel distance from the center to the left border
	let rightPadding = masque.width%2;// pixel distance from the center to the right border
	let topPadding = -masque.height%2;// pixel distance from the center to the top border
	let bottomPadding = masque.height%2;// pixel distance from the center to the bottom border
	console.log(leftPadding, rightPadding, topPadding, bottomPadding);
	*/

	for (i=0;i<rasterDetectionPattern.width;i++){
		for (j=0;j<rasterDetectionPattern.height;j++){
			if(rasterDetectionPattern.getPixel(i,j)==valueCenterMask || ((masqueRaster.getPixel(centerMask_X,centerMask_Y) != 0) && (masqueRaster.getPixel(centerMask_X,centerMask_Y)!= 255))){//si la valeur de pixel de l'image est �gale au centre du masque ou si le centre du masque est �gal � une valeur de non interet
				for (let rayon_x=-halfMask_X;rayon_x<=halfMask_X;rayon_x++){
					for (let rayon_y=-halfMask_Y;rayon_y<=halfMask_Y;rayon_y++){
					            let img_edge = false;
								if (i-rayon_x<0 || i-rayon_x>rasterDetectionPattern.height-1){
									img_edge=true;
								}
								if (j-rayon_y<0 || j-rayon_y>rasterDetectionPattern.width-1){
									img_edge=true;
								}
								if(img_edge==false) {
									if(masqueRaster.getPixel(centerMask_X-rayon_x,centerMask_Y-rayon_y) == 0 || masqueRaster.getPixel(centerMask_X-rayon_x,centerMask_Y-rayon_y) == 255){
										if(rasterDetectionPattern.getPixel(i-rayon_x, j-rayon_y)==masqueRaster.getPixel(centerMask_X-rayon_x, centerMask_Y-rayon_y)){
											output.setPixel(i-rayon_x, j-rayon_y,255);
										}
										else{
											output.setPixel(i-rayon_x, j-rayon_y,0);
										}
									}
								}
					}
				}
			}
		}
	}
	console.log(output);
	for (c=0;c<output.width;c++){
		for(d=0;d<output.height;d++){
			if (output.getPixel(c,d)==255){
				compteur++;
			}
		}
	}
	console.log("Fetch pattern number =" + compteur);




	return output;
}

const hit_or_miss=function(img,mask,copy=true){
	let imageSec=new T.Image('uint8',img.width,img.height);
	imageSec.setRaster(T.Raster.from(img.getRaster(),copy));
	let output = hit_or_miss_process(imageSec.getRaster(),mask,copy=true);
	imageSec.setRaster(output);
	return imageSec;
};



// SKELETONIZE : NEW VERSION
// Modified version of imageJ 's skeletonize algorithm 
// original available at "https://github.com/imagej/imagej1/blob/master/ij/process/BinaryProcessor.java"

/**
 * A lookup table to repeatably remove pixels from the edges of objects in a binary image.
 * An entry of '1' means delete pixel on first pass, '2' means delete pixel on
 * second pass, and '3' means delete on either pass.
 * This table is from imageJ "https://github.com/imagej/imagej1/blob/master/ij/process/BinaryProcessor.java"
 * this table is used first part of the thinning
 * @alias skel_table
 * @type {number[]}
 * @see {skeletonize_process}
 */
const table =
	//0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1
	 [0,0,0,0,0,0,1,3,0,0,3,1,1,0,1,3,0,0,0,0,0,0,0,0,0,0,2,0,3,0,3,3,
	  0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,2,2,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,3,0,2,0,
	  0,0,3,1,0,0,1,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	  3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  2,3,1,3,0,0,1,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    2,3,0,1,0,0,0,1,0,0,0,0,0,0,0,0,3,3,0,1,0,0,0,0,2,2,0,0,2,0,0,0]
;

/**
 * A lookup table to repeatably remove pixels from the edges of objects in a binary image.
 * An entry of '1' means delete pixel on first pass, '2' means delete pixel on
 * second pass, and '3' means delete on either pass.
 * This table is from imageJ "https://github.com/imagej/imagej1/blob/master/ij/process/BinaryProcessor.java"
 * this table is used for the second part of the thinning (removing "stuck" pixels)
 * @alias skel_table2
 * @type {number[]}
 * @see {skeletonize_process}
 */
const table2 =
	//0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1
	 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
;

/**
 * Skeletonize a copy of a binary T.Image
 * @param {T.Image} img - a 8-bit (uint8) binary T.Image to skeletonize
 * @param {boolean} copy - used for the copy of the raster
 * @return {T.Image} the skeletonized copy of the given T.Image
 * @example skeletonize(T.image) returns a skeletonized T.Image
 * @see {skeletonize_process}
 * @see {T.Image}
 * @see {T.Image~getRaster}
 * @see {T.Image~setRaster}
 * @see {T.Raster}
 * @see {T.Raster.from}
 * @author Rodolphe Tworek
 */
const skeletonize = (img,copy=true) => {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(skeletonize_process(T.Raster.from(img.getRaster(),copy)));
	return temp;
};

/**
 * Takes a T.Raster and returns it skeletonized
 * 
 * This function is inspired from imageJ "https://github.com/imagej/imagej1/blob/master/ij/process/BinaryProcessor.java"
 * @param {T.Raster} raster - Raster of a binary 8-bit
 * @return {T.Raster} the modified T.Raster
 * @see {skel_table}
 * @see {skel_table2}
 * @see {thin}
 * @see {skeletonize}
 * @see {T.Raster}
 * @author Rodolphe Tworek
 */
const skeletonize_process = (raster) =>{
  let pass = 0;
	let pixelsRemoved;
	const thinRaster = thin(raster);
	const thinFirstTable = thinRaster(table);
  const thinSecondTable = thinRaster(table2);
  do {
		pixelsRemoved = thinFirstTable(pass++);
		pixelsRemoved += thinFirstTable(pass++);
	} while (pixelsRemoved>0);
	do { // use a second table to remove "stuck" pixels
		pixelsRemoved = thinSecondTable(pass++);
		pixelsRemoved += thinSecondTable(pass++);
	} while (pixelsRemoved>0);
	return raster;
};

/**
 * Tells if a pixel is or not at the border of a T.Raster
 * @param {number} n the position of your pixel in the Array
 * @param {T.Raster} rast a T.Raster your pixel comes from
 * @return {boolean} true : the pixel is a border pixel | false : the pixel is not a border pixel
 * @see {thin}
 * @see {T.Raster}
 * @see {T.Raster.width}
 * @see {T.Raster.length}
 * @author Rodolphe Tworek
 */
const is_border = (n,rast) => (n < rast.width || n > rast.length-rast.width || n % rast.width == 0 || n % rast.width == rast.width-1 );

/**
 * Removes pixels from a T.Raster according to a given table.
 * 
 * This is a curried version of the thin() method found in ImageJ : "https://github.com/imagej/imagej1/blob/master/ij/process/BinaryProcessor.java"
 * @param {T.Raster} raster the T.Raster we want to remove pixels from
 * @example thin(a_TRaster)(a_table)(number_of_passes) => number_of_removed_pixels
 * @see {T.Raster}
 * @see {skel_table}
 * @see {skel_table2}
 * @see {is_border}
 * @author Rodolphe Tworek
 */
const thin = (raster) => 
  /**
   * The second layer of the curried thin() method
   * @param {number[]} table an Array containing the behaviour for each neighborhood of pixels
   * @example foo(a_table)(number_of_passes) => number_of_removed_pixels
   * @see {thin}
   * @see {skel_table}
   * @see {skel_table2}
   */ 
  (table) => 
  /**
   * The last layer of the curried thin() method
   * @param {number} pass the number of times the function has been called (number of passes)
   * @return {number} the number of pixel removed from the T.Raster
   * @example foo(number_of_passes) => number_of_removed_pixels
   * @see {thin}
   * @see {is_border}
   */
  (pass) => {
	let pixels = raster.pixelData;
  let p1, p2, p3, p4, p5, p6, p7, p8, p9;
	let bgColor = 0;
	let pixels2 = pixels.slice(); // create a copy of the original pixelData (so one pixel change doesn't affect it's neighbors processing)
	let v, index, code;
  let rowOffset = raster.width;
  let pixelsRemoved = 0;
	for (let offset=0;offset<pixels.length;offset++){
		p5 = pixels2[offset];
		v = p5;
		if (v!=bgColor) {
			// Set pixel to background if the pixel is in the border of the image
			if (is_border(offset,raster)) {
				pixels[offset] = bgColor;
				continue;
			}
			// Get all neighbors value (3x3 kernel)
			p1 = pixels2[offset-rowOffset-1];
			p2 = pixels2[offset-rowOffset];
			p3 = pixels2[offset-rowOffset+1];
			p4 = pixels2[offset-1];
			p6 = pixels2[offset+1];
			p7 = pixels2[offset+rowOffset-1];
			p8 = pixels2[offset+rowOffset];
			p9 = pixels2[offset+rowOffset+1];
			// Set a "score" considering neighbors' values
			index = 0;
			if (p1!=bgColor) index |= 1;
			if (p2!=bgColor) index |= 2;
			if (p3!=bgColor) index |= 4;
			if (p6!=bgColor) index |= 8;
			if (p9!=bgColor) index |= 16;
			if (p8!=bgColor) index |= 32;
			if (p7!=bgColor) index |= 64;
			if (p4!=bgColor) index |= 128;
			// Determinate if the pixel must be removed ( = set to background value)
			code = table[index];
			if ((pass&1)==1) { //odd pass
				if (code==2||code==3) {
					v = bgColor;
					pixelsRemoved++;
				}
			} else { //even pass
				if (code==1||code==3) {
					v = bgColor;
					pixelsRemoved++;
				}
			}
		}
		pixels[offset] = v;
  }
	raster.pixelData = pixels;
  return pixelsRemoved;
};

/**
 * skeletonize OLD VERSION
 */
//Magic numbers :
//0 = value of background pixels in 8-bit binary images
//255 = value of foreground pixels in 8 bit binary images
//2 = value selected to represent "interior" pixels in the processed image
/**
* returns true if a foreground pixel (=255) is not neighbor of a background pixel (=0).
* comparing the North South, East and West neighbors
*
* @param {number} n - Pixel index
* @param {T.Raster} rast - Raster of a 8-bit binary image (0/255)
* @return {boolean} true/false : the pixel is/isn't an interior pixel
* @see {thinning_old}
* @see {skeletonize_old}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const is_interior = (n,rast) => {
	return (rast.get(n) != 0 && (rast.x(n)-1) >= 0 && rast.getPixel(rast.x(n)-1,rast.y(n)) != 0 &&
	(rast.x(n)+1) <= rast.width-1 && rast.getPixel(rast.x(n)+1,rast.y(n)) != 0 &&
	(rast.y(n)-1) >= 0 && rast.getPixel(rast.x(n),rast.y(n)-1) != 0 &&
	(rast.y(n)+1) <= rast.height-1 && rast.getPixel(rast.x(n),rast.y(n)+1) != 0 );
};

/**
* returns true if the n pixel is an exterior (=255) pixel next to an interior(=2) pixel
* comparing the North, South, East and West neighbors.
*
* @param {number} n - Pixel index
* @param {T.Raster} rast - Raster of a 8-bit binary image (0/255) with "interior" pixels =2
* @return {boolean} true/false : the pixel is/isn't removable
* @see {thinning_old}
* @see {is_interior}
* @see {skeletonize_old}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const is_removable = (n,rast) => {
	return (rast.get(n) == 255 &&
	((rast.x(n)-1 >= 0 && rast.getPixel(rast.x(n)-1,rast.y(n)) == 2) ||
	(rast.x(n)+1 <= rast.width-1 && rast.getPixel(rast.x(n)+1,rast.y(n)) == 2) ||
	(rast.y(n)-1 >= 0 && rast.getPixel(rast.x(n),rast.y(n)-1) == 2) ||
	(rast.y(n)+1 <= rast.height-1 && rast.getPixel(rast.x(n),rast.y(n)+1) == 2)));
};

/**
* takes a 0/255 binary T.Raster and returns a skeletonized binary T.Raster
*
* @param {T.Raster} rast - Raster of a binary 8-bit
* @param {boolean} copy - used for the copy of the raster
* @return {T.Raster} returns a binary T.Raster when the final T.Raster hasn't changed compared to the initial T.Raster, else returns thinning_old(T.Raster)
* @see {is_interior}
* @see {is_removable}
* @see {skeletonize_old}
* @see {T.Raster}
* @see {T.Raster.from}
* @author Rodolphe Tworek
*/
const thinning_old = (rast,copy=true) => {
	/**
	*copying the initial raster
	*/
	let r_output = T.Raster.from(rast,copy);
	/**
	*edge detection (background = 0, edge = 255, interior =2)
	*/
	r_output.pixelData = r_output.pixelData.map((x,i,a) => is_interior(i,rast) ? 2 : x);
	/**
	*removing all edge pixels in contact with an interior pixel
	*/
	r_output.pixelData = r_output.pixelData.map((x,i,a) => is_removable(i,r_output) ? 0 : x);
	/**
	*turning back all non-background pixels to 255
	*/
	r_output.pixelData = r_output.pixelData.map((x,i,a) => x !=0 ? 255 : x);
	return (rast.pixelData.length==r_output.pixelData.length && rast.pixelData.every((v,i)=> v === r_output.pixelData[i])) ? r_output : thinning_old(r_output);
};

/**
*skeletonize a copy of a binary T.Image
*
* @param {T.Image} img - a 8-bit (uint8) binary T.Image to skeletonize
* @param {boolean} copy - used for the copy of the raster
* @return {T.Image} the skeletonized copy of the given T.Image
* @example skeletonize_old(image) returns skeletonized T.Image
* @see {thinning_old}
* @see {T.Image}
* @see {T.Image~getRaster}
* @see {T.Raster}
* @see {T.Raster.from}
* @author Rodolphe Tworek
*/
const skeletonize_old = (img,copy=true) => {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(thinning_old(T.Raster.from(img.getRaster(),copy)));
	return temp;
};

//Watershed
/**
* Considers a pixel from a T.Raster and change it's score to the lowest neighbor score possible
*
* @param {number} n - index of the current pixel
* @param {number} x - x coordinate of the neighbor point.
* @param {number} y - y coordinate of the neighbor point.
* @param {number} dist - distance score to add to the x,y neighbor pixel
* @param {T.Raster} rast - A uint8 binary or greyscale raster
* @see {distance_map}
* @see {watershed}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const check = (n,x,y,dist,rast) => {
  //background check
  //do not process if the pixel is background ( ==0 )
  if (rast.get(n)==0) {
    return;
  }
  //boundary check
  //If y or x is out of boundaries, the x,y pixel is considered background
  if (x<0 || y<0 || x > rast.width || y > rast.height) {
    rast.set(n,0);
  }
  else {
    //let's determinate the distance score (d) of the neighbor :
    let d = (rast.getPixel(x,y)+dist);
    //is the processed pixel's score greater than his neighbor's score(according to the window_type) ?
    if (rast.get(n) > d) {
      //update current pixel's distance
      rast.set(n,d);
    }
  }
}

/**
*processes a uint8 binary T.Raster and returns a gray-level distance map T.Raster
*this distance map algorithm is based on the Borgefors’ Chamfer distance algorithm (CDA)
*this algorithm can be found here : https://www.springer.com/cda/content/document/cda_downloaddocument/9780387312019-c1.pdf
*
* @param {T.Raster} rast - uint8 binary T.Raster
* @param {string} window_type - either "CDA","chessboard" or "cityblock" depending on the neighbor scoring
* @param {boolean} copy - used for the copy of the raster
* @return {T.Raster} A grayscale uint8 T.Raster
* @see {check}
* @see {watershed}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const distance_map = (rast,window_type="CDA",copy=true) => {
  //todo : switch with window_type
  switch (window_type){
   case "CDA":
   let dxy=4,dx=3,dy=3;break;
   case "chessboard":
   let dxy=1,dx=1,dy=1;break;
   case "cityblock":
   let dxy=255,dx=1,dy=1;break;
   default:
   let dxy=4,dx=3,dy=3;break;
 }
  rast.pixelData.forEach((x,i,a) => {
    check(i,rast.x(i)-1,rast.y(i)-1,dxy,rast); //checking top-left neighbor
    check(i,rast.x(i),rast.y(i)-1,dy,rast); //checking top neighbor
    check(i,rast.x(i)+1,rast.y(i)-1,dxy,rast); //checking top-right neighbor
    check(i,rast.x(i)-1,rast.y(i),dx,rast);// checking left neighbor
  });
  rast.pixelData.reverse().forEach((x,i,a) => {
    check(i,rast.x(i)-1,rast.y(i)-1,dxy,rast); //checking top-left neighbor
    check(i,rast.x(i),rast.y(i)-1,dy,rast); //checking top neighbor
    check(i,rast.x(i)+1,rast.y(i)-1,dxy,rast); //checking top-right neighbor
    check(i,rast.x(i)-1,rast.y(i),dx,rast);// checking left neighbor
  });
  rast.pixelData.reverse();
  return rast;
}

/**
*Finds and returns the nearest max value of a x,y pixel in a grayscale raster
*This methods isn't properly working, especially when neighbor pixels have the same value due to a plateau (stopping since no max is strictly > than actual value)
*
* @param {T.Raster} rast - a uint8 grayscale
* @param {number} x - x coordinate of the considered pixel
* @param {number} y - y coordinate of the considered pixel
* @return returns a grayscale T.Raster when no greater neighbor is found, else returns nearestMaxValue() of the greatest neighbor
* @see {segmentation}
* @see {watershed}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const nearestMaxValue = (rast,x,y) => {
  //finding the max value between 8 neighbors to x,y
  maxValue=Math.max(rast.getPixel(x-1,y),rast.getPixel(x,y-1),rast.getPixel(x+1,y),rast.getPixel(x,y-1),
  rast.getPixel(x-1,y-1),rast.getPixel(x+1,y+1),rast.getPixel(x-1,y+1),rast.getPixel(x+1,y-1))
  for (i=-1;i<2;i++){
    for (j=-1;j<2;j++){
      if ((x+i >=0 && y+j >= 0 && x+i <= rast.width && y+j <= rast.height) &&
      (rast.getPixel(x+i,y+j) == maxValue && rast.getPixel(x+i,y+j) > rast.getPixel(x,y))) {
        return nearestMaxValue(rast,x+i,y+j);
      }
    }
  }
  //return max value if x,y is max neighbor
  return rast.getPixel(x,y);
}


/**
* Tells if the considered pixel is part of the limit between 2 grayscale objects to segment
*
* @param {T.Raster} rast - a grayscale uint8 T.Raster
* @param {number} x - x coordinate of the considered pixel
* @param {number} y - y coordinate of the considered pixel
* @param {number} xy_value - value of the x,y pixel
* @return {boolean} true if the pixel is the limit of 2 grayscale objects
* @see {segmentation}
* @see {watershed}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const isFloodLimit = (rast,x,y,xy_value) => {
  return ((rast.getPixel(x-1,y) != xy_value && rast.getPixel(x-1,y) !=0) ||
  (rast.getPixel(x,y-1) != xy_value && rast.getPixel(x,y-1) !=0) ||
  (rast.getPixel(x+1,y) != xy_value && rast.getPixel(x+1,y) !=0) ||
  (rast.getPixel(x,y+1) != xy_value && rast.getPixel(x,y+1) !=0))
}

/**
*takes a gray-level raster and returns a binary raster segmented
*
* @param {T.Raster} rast - a uint8 grayscale T.Raster
* @param {boolean} copy - used for the copy of the raster
* @return {T.Raster} the segmented binary version of the uint8 grayscale T.Raster
* @see {nearestMaxValue}
* @see {isFloodLimit}
* @see {watershed}
* @see {T.Raster}
* @see {T.Raster.from}
* @author Rodolphe Tworek
*/
const segmentation = (rast,copy=true) => {
  let r_output = T.Raster.from(rast,copy);
  //flooding the items to the nearest max value
  r_output.pixelData = r_output.pixelData.map((x,i,a) => x !=0  ?
  nearestMaxValue(rast,rast.x(i),rast.y(i)) : x);
  r_output.pixelData = r_output.pixelData.map((x,i,a) => x != 0 && isFloodLimit(r_output,rast.x(i),rast.y(i),x)  ?
  0 : x);
  //returning the raster back to binary raster (0/255 pixels)
  r_output.pixelData = r_output.pixelData.map((x,i,a) =>  x != 0 ? 255 : 0 );
  return r_output;
}

/**
*process the watershed method on a binary T.Image
*
* @param {T.Image} img - a 8-bit (uint8) binary T.Image to segment
* @param {string} window_type - either "CDA","chessboard" or "EDM" depending on the wanted neighbor scoring
* @param {boolean} copy - used for the copy of the raster
* @return {T.Image} the segmented copy of the given T.Image
* @example watershed(image) returns segmented T.Image
* @see {distance_map}
* @see {segmentation}
* @see {T.Image}
* @see {T.Image~getRaster}
* @see {T.Raster}
* @see {T.Raster.from}
* @author Rodolphe Tworek
*/
const watershed = (img,window_type="CDA",copy=true) => {
    let temp = new T.Image('uint8',img.width,img.height);
    temp.setRaster(segmentation(distance_map(T.Raster.from(img.getRaster(),copy),window_type)));
    return temp;
};
