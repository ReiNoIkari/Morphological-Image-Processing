//Ma fonction
const EDMFonctionnel = (raster,copy=true) => {
	const EDM = function(backgroundValue, edgesAreBackground){
		const NO_POINT = -1; //no nearest point in array of nearest points
		let width = raster.width;//on prend la largeur
        let height = raster.height;//on prend la hauteur
		let fPixels=raster.pixelData;//on prend les valeurs de pixels du raster 
		//test pour les bytes 

       bPixels = raster.pixelData;
        let progressInterval = 100;
        let nProgressUpdates = height/progressInterval;  //how often the progress bar is updated when passing once through y range
        let progressAddendum = (nProgressUpdates>0) ? 0.5/nProgressUpdates : 0;
		fPixels.map((x,i)=>{(bPixels[i]!=backgroundValue) ? x = Number.MAX_VALUE : x;})
		let tab1 = [2];
		let tab2 = [width]
        let pointBufs = [tab1, tab2];  //two buffers for two passes; low short contains x, high short y
        let yDist = Number.MAX_SAFE_INTEGER;  //A CHECK        //this value is used only if edges are not background
        // pass 1 & 2: increasing y
        pointBufs.map((x)=> {x = NO_POINT;})
        for (let y=0; y<height; y++) {
            (edgesAreBackground) ? yDist = y+1 : yDist; //distance to nearest background point (along y) //A CHECK
            edmLine(bPixels, fPixels, pointBufs, width, y*width, y, backgroundValue, yDist, NO_POINT);// a faire
        }
        //pass 3 & 4: decreasing y
		pointBufs.map((x)=> {x = NO_POINT;})
        for (let y=height-1; y>=0; y--) {
            (edgesAreBackground) ? yDist = height-y : yDist;
            edmLine(bPixels, fPixels, pointBufs, width, y*width, y, backgroundValue, yDist);
        }
        fPixels=Math.sqrt(fPixels);
		//fp
        return fPixels;
    }
	let MyEDMFonc = EDM(0, false);
	let output = T.Raster.from(raster, true);
	return output;
}

const edmLine= function(bPixels,  fPixels, pointBufs, width, offset, y, backgroundValue, yDist, NO_POINT) {
        let points = pointBufs[0];        // the buffer for the left-to-right pass
        let pPrev = NO_POINT;
        let pDiag = NO_POINT;               // point at (-/+1, -/+1) to current one (-1,-1 in the first pass)
        let pNextDiag;
        edgesAreBackground = yDist != Number.MAX_SAFE_INTEGER;
        let distSqr = Number.MAX_SAFE_INTEGER;    // this value is used only if edges are not background
		let dist2;
		let other;

		for (let x=0; x<width; x++, offset++) {
          pNextDiag = points[x];
          if (bPixels[offset] ==	backgroundValue) {
              points[x] = x | y<<16;      // remember coordinates as a candidate for nearest background point
          } else {                        // foreground pixel:
              if (edgesAreBackground)
                  distSqr = (x+1 < yDist) ? (x+1)*(x+1) : yDist*yDist; //distance from edge
              let dist2 = minDist2(points, pPrev, pDiag, x, y, distSqr, NO_POINT);
              if (fPixels[offset] > dist2) fPixels[offset] = dist2;
          }
          pPrev = points[x];
          pDiag = pNextDiag;
        }
        offset--; //now points to the last pixel in the line
        points = pointBufs[1];              // the buffer for the right-to-left pass. Low short contains x, high short y
        pPrev = NO_POINT;
        pDiag = NO_POINT;
		
        for (let x=width-1; x>=0; x--, offset--) {
            pNextDiag = points[x];
			(bPixels[offset] == backgroundValue) ? points[x] = x | y<<16 : (((edgesAreBackground) ? distSqr = ((width-x < yDist) ? (width-x)*(width-x) : yDist*yDist):other), (dist2 = minDist2(points, pPrev, pDiag, x, y, distSqr, NO_POINT)), ((fPixels[offset] > dist2) ? fPixels[offset] = dist2 : other));
			pPrev = points[x];
			pDiag = pNextDiag;
        }
    } //private void edmLine

const minDist2 = function(points, pPrev, pDiag, x, y,	distSqr, NO_POINT) {
        let p0 = points[x];              // the nearest background point for the same x in the previous line
        let nearestPoint = p0;
		let x0=0;
		let y0=0;
		let dist1Sqr=0;
		let other;
		let x1 = 0;
		let y1 = 0;
		(p0 != NO_POINT) ? (x0 = p0& 0xffff,  y0 = (p0>>16)&0xffff,  dist1Sqr = (x-x0)*(x-x0)+(y-y0)*(y-y0), (dist1Sqr < distSqr) ? distSqr = dist1Sqr : distSqr) : distSqr;
		(pDiag!=p0 && pDiag!=NO_POINT) ? (x1 = pDiag&0xffff, y1 = (pDiag>>16)&0xffff, dist1Sqr = (x-x1)*(x-x1)+(y-y1)*(y-y1), ((dist1Sqr < distSqr) ? (nearestPoint = pDiag, distSqr = dist1Sqr) : other)) : other;
		(pPrev!=pDiag && pPrev!=NO_POINT) ? (x1 = pPrev& 0xffff, y1 = (pPrev>>16)&0xffff, dist1Sqr = (x-x1)*(x-x1)+(y-y1)*(y-y1),((dist1Sqr < distSqr) ? (nearestPoint = pPrev,  distSqr = dist1Sqr) : other)) : other;
        points[x] = nearestPoint;
        return distSqr;
    } //private float minDist2