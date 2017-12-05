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
const erode = function (img,copy=true) {
  let ouput =  TRaster.from(img,copy);
  // TODO
  return output;
}

const dilate = function (img,copy=true) {
  let ouput =  TRaster.from(img,copy);
  // TODO
  
  for (let i=0; i<img.length; i++){
    for (let j=0; j<img[i].length; j++){
      if (image[i][j]==1){ imgcopy[i][j]=1;
        if (i>0){ imagecopy[i-1][j] = 1;}
            if (j>0){ imagecopy[i][j-1] = 1;}
            if (i+1<image.length){ imagecopy[i+1][j] = 1;}
            if (j+1<image[i].length){ imagecopy[i][j+1] = 1;}
      }
    }
  }
 
 
  return output;
}

