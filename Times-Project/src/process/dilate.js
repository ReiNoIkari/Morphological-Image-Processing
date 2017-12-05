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

let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Boats');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');

const erode = function (img,copy=true) {
  let ouput =  TRaster.from(img,copy);
  // TODO
  return output;
}

const dilate = function (img,copy=true) {
  let ouput =  TRaster.from(img,copy);
  let tmp = new T.Image('uint8',500,500);
  // TODO
    for (let i=0; i<img.length; i++){
      for (let j=0; j<img[i].length; j++){
        if (image[i][j]==1){ tmp[i][j]=1;
          if (i>0){ tmp[i-1][j] = 1;}
              if (j>0){ tmp[i][j-1] = 1;}
              if (i+1<image.length){ tmp[i+1][j] = 1;}
              if (j+1<image[i].length){tmp[i][j+1] = 1;}
      }
    }
  }
 
 
  return tmp;
}

dilate(img0)


img1.setPixels(tmp);
let win1 = new T.Window('Dilated');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace1');