//Skeletonize
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
* @return {Boolean} true/false : the pixel is/isn't an interior pixel
* @see {thinning}
* @see {skeletonize}
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
* @return {Boolean} true/false : the pixel is/isn't removable
* @see {thinning}
* @see {is_interior}
* @see {skeletonize}
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
* @param {Boolean} copy - used for the copy of the raster
* @return {T.Raster} returns a binary T.Raster when the final T.Raster hasn't changed compared to the initial T.Raster, else returns thinning(T.Raster)
* @see {is_interior}
* @see {is_removable}
* @see {skeletonize}
* @see {T.Raster}
* @see {T.Raster.from}
* @author Rodolphe Tworek
*/
const thinning = (rast,copy=true) => {
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
	return (rast.pixelData.length==r_output.pixelData.length && rast.pixelData.every((v,i)=> v === r_output.pixelData[i])) ? r_output : thinning(r_output);
};

/**
*skeletonize  a copy of a binary T.Image
*
* @param {T.Image} img - a 8-bit (uint8) binary T.Image to skeletonize
* @param {Boolean} copy - used for the copy of the raster
* @return {T.Image} the skeletonized copy of the given T.Image
* @example skeletonize(image) returns skeletonized T.Image
* @see {thinning}
* @see {T.Image}
* @see {T.Image~getRaster}
* @see {T.Raster}
* @see {T.Raster.from}
* @author Rodolphe Tworek
*/
const skeletonize = (img,copy=true) => {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(thinning(T.Raster.from(img.getRaster(),copy)));
	return temp;
};
