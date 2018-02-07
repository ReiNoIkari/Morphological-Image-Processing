/**
 * first attempt to convert the java script to javascript
 */

// 2012/09/16: 3,0 1->0
// 2012/09/16: 24,0 2->0
const table =
	//0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1
	 [0,0,0,0,0,0,1,3,0,0,3,1,1,0,1,3,0,0,0,0,0,0,0,0,0,0,2,0,3,0,3,3,
	  0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,2,2,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,3,0,2,0,
	  0,0,3,1,0,0,1,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	  3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  2,3,1,3,0,0,1,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  2,3,0,1,0,0,0,1,0,0,0,0,0,0,0,0,3,3,0,1,0,0,0,0,2,2,0,0,2,0,0,0];

// 2013/12/02: 16,6 2->0
// 2013/12/02: 24,5 0->2
const table2 =
	  //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1
	 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
	  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	  0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


const skeletonize = (img,copy=true) => {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(skeletonize_process(T.Raster.from(img.getRaster(),copy)));
	return temp;
};

const skeletonize_process = (raster) =>{
    let pass = 0;
	let pixelsRemoved;
    do {
		pixelsRemoved = thin(pass++, table, raster);
		pixelsRemoved += thin(pass++, table, raster);
	} while (pixelsRemoved>0);
	do { // use a second table to remove "stuck" pixels
		pixelsRemoved = thin(pass++, table2, raster);
		pixelsRemoved += thin(pass++, table2, raster);
	} while (pixelsRemoved>0);
	return raster;
};

const thin = (pass, table, raster) => {
	let pixels = raster.pixelData;
    let p1, p2, p3, p4, p5, p6, p7, p8, p9;
	let bgColor = 0;
	let pixels2 = pixels.slice(); // 2 copies de la liste des pixels (pour ne pas prendre en compte les modif en cours)
	let v, index, code;
    let offset, rowOffset = raster.width;
    let pixelsRemoved = 0;
	let count = 100;
	for (let offset=0;offset<pixels.length;offset++){
		p5 = pixels2[offset];
		v = p5;
		if (v!=bgColor) {
			//cette partie recup les pixels voisins du p5
			p1 = pixels2[offset-rowOffset-1]; // recupère le pixel a la fin du raster ?
			p2 = pixels2[offset-rowOffset];
			p3 = pixels2[offset-rowOffset+1];
			p4 = pixels2[offset-1];
			p6 = pixels2[offset+1];
			p7 = pixels2[offset+rowOffset-1];
			p8 = pixels2[offset+rowOffset];
			p9 = pixels2[offset+rowOffset+1];
            index = 0;
            // if (truc) a |= b -> if (truc) {a=a} else {a=b}
			if (p1!=bgColor) index |= 1;
			if (p2!=bgColor) index |= 2;
			if (p3!=bgColor) index |= 4;
			if (p6!=bgColor) index |= 8;
			if (p9!=bgColor) index |= 16;
			if (p8!=bgColor) index |= 32;
			if (p7!=bgColor) index |= 64;
			if (p4!=bgColor) index |= 128;
			code = table[index];
			if ((pass&1)==1) { //odd pass
				if (code==2||code==3) {
					v = bgColor;
					pixelsRemoved++;
				}
			} else { //even pass
				if (code==1||code==3) {
					v = bgColor;
					pixelsRemoved++;
				}
			}
		}
		pixels[offset] = v;
    }
    // retourne le nb de pixels modifiés 
    // donc savoir si on continue ou pas le skeletonize
	raster.pixelData = pixels;
    return pixelsRemoved;
};