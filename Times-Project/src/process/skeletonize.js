//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ remove edge pixels ( if next to interior pixel )
// 3/ test end of thinning (else return to 1/)
//Magic numbers :
//0 = value of background pixels in 8-bit binary images
//255 = value of foreground pixels in 8 bit binary images
//2 = value selected to represent "interior" pixels in the processed image

//returns true if a foreground pixel (=1) is not neighbor of a background pixel
const is_interior = (n,rast) => {
	return (rast.get(n) != 0 && (rast.x(n)-1) >= 0 && rast.getPixel(rast.x(n)-1,rast.y(n)) != 0 &&
		(rast.x(n)+1) <= rast.width-1 && rast.getPixel(rast.x(n)+1,rast.y(n)) != 0 &&
		(rast.y(n)-1) >= 0 && rast.getPixel(rast.x(n),rast.y(n)-1) != 0 &&
		(rast.y(n)+1) <= rast.height-1 && rast.getPixel(rast.x(n),rast.y(n)+1) != 0 );
};

//returns true if the n pixel is an exterior (=255) pixel next to an interior(=2) pixel (north, south ,east ,west)
const is_removable = (n,rast) => {
    //is the pixel exterior and next to an interior pixel?
    return (rast.get(n) == 255 &&
	    ((rast.x(n)-1 >= 0 && rast.getPixel(rast.x(n)-1,rast.y(n)) == 2) ||
	     (rast.x(n)+1 <= rast.width-1 && rast.getPixel(rast.x(n)+1,rast.y(n)) == 2) ||
	     (rast.y(n)-1 >= 0 && rast.getPixel(rast.x(n),rast.y(n)-1) == 2) ||
	     (rast.y(n)+1 <= rast.height-1 && rast.getPixel(rast.x(n),rast.y(n)+1) == 2)));
};

//takes a 0/255 binary T.Raster, returns a skeletonized binary T.Raster
const thinning = (rast,copy=true) => {
    let r_output = T.Raster.from(rast,copy);
    //edge detection (background = 0, edge = 255, interior =2)
    r_output.pixelData = r_output.pixelData.map((x,i,a) => is_interior(i,rast) ? 2 : x);
    //removing all edge pixel in contact with an interior pixel
    r_output.pixelData = r_output.pixelData.map((x,i,a) => is_removable(i,r_output) ? 0 : x);
    //turning back all non-background pixels to 255
    r_output.pixelData = r_output.pixelData.map((x,i,a) => r_output.get(i) !=0 ? 255 : x);
    return (rast.pixelData.length==r_output.pixelData.length && rast.pixelData.every((v,i)=> v === r_output.pixelData[i])) ? r_output : thinning(r_output);
};

//skeletonize a binary image, returns a copy of the image skeletonized
const skeletonize = (img,copy=true) => {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(thinning(T.Raster.from(img.getRaster(),copy)));
	return temp;
};
