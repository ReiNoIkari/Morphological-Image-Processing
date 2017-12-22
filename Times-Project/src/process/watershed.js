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

//processes the raster and returns the gray-level distance map of the raster
//this distance map algorithm is based on the Borgefors’ Chamfer distance algorithm (CDA)
//rast = raster of the image containing the pixelData
//window_type = the type of window to apply for the distance map ( soon : EDM, chessboard, city block )
/**
*processes a uint8 binary T.Raster and returns a gray-level distance map T.Raster
*this distance map algorithm is based on the Borgefors’ Chamfer distance algorithm (CDA)
*
* @param {T.Raster} rast - uint8 binary T.Raster
* @param {string} window_type - either "CDA","chessboard" or "EDM" depending on the neighbor scoring
* @param {Boolean} copy - used for the copy of the raster
* @return {T.Raster} A grayscale uint8 T.Raster
* @see {check}
* @see {watershed}
* @see {T.Raster}
* @author Rodolphe Tworek
*/
const distance_map = (rast,window_type="CDA",copy=true) => {
  //todo : switch with window_type
  let dxy=4; // values for CDA window_type
  let dx=3;
  let dy=3;
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

//takes a rast from a flooded grayscale image
//returns true if one of the 4 neighbors is from an other flood level)
/**
* Tells if the considered pixel is part of the limit between 2 grayscale objects to segment
*
* @param {T.Raster} rast - a grayscale uint8 T.Raster
* @param {number} x - x coordinate of the considered pixel
* @param {number} y - y coordinate of the considered pixel
* @param {number} xy_value - value of the x,y pixel
* @return {Boolean} true if the pixel is the limit of 2 grayscale objects
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
* @param {Boolean} copy - used for the copy of the raster
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
* @param {Boolean} copy - used for the copy of the raster
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
