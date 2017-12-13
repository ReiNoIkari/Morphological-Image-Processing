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

const erode = function(img,copy=true,mask){
	let imgRaster = img.getRaster();
	let masqueRaster = mask.getRaster();
	let output = T.Raster.from(imgRaster,copy=true);//fait copie du raster de l'image, celui qu'on va traiter (raster 119)
	let masque = T.Raster.from(masqueRaster,copy=true);//copie du raster du masque
	let small_image= new T.Image('uint8',3,3);
	let tmp = 0;
	//let small_raster = output.pad(0,0,small_image);
	//console.log(small_raster);
	//LE RASTER CONTIENT TOUTES LES INFOS DE L IMAGE
	//boucle pour parcourir l'image
	/*let milieuMasque=(masque.length+1)/2;
	let milieuSmallImage =(small_raster.length+1)/2;
	for(i=0; i<output.length;i++){
		let small_raster = output.pad(0,0,small_image);//on degage le petit bout d'image a comparer
		//console.log(small_raster);
		//on compare
		if (small_raster.getPixel(milieuSmallImage,milieuSmallImage) == masque.getPixel(milieuMasque,milieuMasque){
		//on erode
			
		}
	}*/
	return output;
}