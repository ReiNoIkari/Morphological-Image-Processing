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
 
 * @author Adrien MENDES SANTOS
 */

const process_operation_dilate = function(r_output,copy=true){
  for(let i=0;i<r_output.height;i++) {
		for (let j=0;j<r_output.width;j++){
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
            let imgEdge = false;
            if (x-rx<0 || x-rx>raster.height-1){
              imgEdge=true;
            }
            if (y-ry<0 || y-ry>raster.width-1){
              imgEdge=true;
            }
            if(imgEdge==false) {           
              if (raster.getPixel(x-rx,y-ry)==0 && r_struct.getPixel(x_value_struc_element-rx,y_value_struc_element-ry)==255){
                r_output.setPixel(x-rx,y-ry,2);
              }
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

