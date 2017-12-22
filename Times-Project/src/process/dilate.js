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
