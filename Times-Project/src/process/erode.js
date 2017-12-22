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
