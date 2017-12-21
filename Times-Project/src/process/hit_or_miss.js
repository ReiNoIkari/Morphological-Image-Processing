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
	let centerMask = (masqueRaster.length+1)/2-1; //on va de 0 à 8
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
			if(rasterDetectionPattern.getPixel(i,j)==valueCenterMask || ((masqueRaster.getPixel(centerMask_X,centerMask_Y) != 0) && (masqueRaster.getPixel(centerMask_X,centerMask_Y)!= 255))){//si la valeur de pixel de l'image est égale au centre du masque ou si le centre du masque est égal à une valeur de non interet
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
