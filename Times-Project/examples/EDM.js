//Ma fonction
const EDMnonFonctionnel = (raster,copy=true) => {
	const EDMIJ = function(backgroundValue, edgesAreBackground){
		const NO_POINT = -1; //no nearest point in array of nearest points
		let width = raster.width;//largeur
        let height = raster.height;//hauteur
		let fPixels=raster.pixelData;//on prend les valeurs de pixels du raster 

       bPixels = raster.pixelData;
        let progressInterval = 100;
        let nProgressUpdates = height/progressInterval;  //how often the progress bar is updated when passing once through y range
        let progressAddendum = (nProgressUpdates>0) ? 0.5/nProgressUpdates : 0;

        for (let i=0; i<width*height; i++)
            if (bPixels[i]!=backgroundValue) fPixels[i] = Number.MAX_VALUE;
		
		//let pointBufs = [2,width];
		let tab1 = [2];
		let tab2 = [width]
        let pointBufs = [tab1, tab2];  //two buffers for two passes; low short contains x, high short y
        let yDist = Number.MAX_SAFE_INTEGER;  //this value is used only if edges are not background

        // pass 1 & 2: increasing y
        for (let x=0; x<width; x++) {
            pointBufs[0][x] = NO_POINT;
            pointBufs[1][x] = NO_POINT;
        }
        for (let y=0; y<height; y++) {
            if (edgesAreBackground) yDist = y+1; //distance to nearest background point (along y) //A CHECK
            edmLine(bPixels, fPixels, pointBufs, width, y*width, y, backgroundValue, yDist, NO_POINT);// a faire
        }
        //pass 3 & 4: decreasing y
        for (let x=0; x<width; x++) {
            pointBufs[0][x] = NO_POINT;
            pointBufs[1][x] = NO_POINT;
        }
        for (let y=height-1; y>=0; y--) {
            if (edgesAreBackground) yDist = height-y;
            edmLine(bPixels, fPixels, pointBufs, width, y*width, y, backgroundValue, yDist);
        }
        fPixels=Math.sqrt(fPixels);
		//fp
        return fPixels;
    }
	let MyEDMIJ = EDMIJ(0, false);
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
            if (bPixels[offset] == backgroundValue) {
                points[x] = x | y<<16;      // remember coordinates as a candidate for nearest background point
            } else {                        // foreground pixel:
                if (edgesAreBackground)
                    distSqr = (width-x < yDist) ? (width-x)*(width-x) : yDist*yDist;
                let dist2 = minDist2(points, pPrev, pDiag, x, y, distSqr, NO_POINT);
                if (fPixels[offset] > dist2) fPixels[offset] = dist2;
            }
            pPrev = points[x];
            pDiag = pNextDiag;
        }
    } //private void edmLine



const minDist2 = function(points, pPrev, pDiag, x, y,	distSqr, NO_POINT) {
        let p0 = points[x];              // the nearest background point for the same x in the previous line
        let nearestPoint = p0;

        if (p0 != NO_POINT) {
            let x0 = p0& 0xffff; let y0 = (p0>>16)&0xffff;
            let dist1Sqr = (x-x0)*(x-x0)+(y-y0)*(y-y0);
            if (dist1Sqr < distSqr)
                distSqr = dist1Sqr;
        }
        if (pDiag!=p0 && pDiag!=NO_POINT) {
            let x1 = pDiag&0xffff; let y1 = (pDiag>>16)&0xffff;
            let dist1Sqr = (x-x1)*(x-x1)+(y-y1)*(y-y1);
            if (dist1Sqr < distSqr) {
                nearestPoint = pDiag;
                distSqr = dist1Sqr;
            }
        }
        if (pPrev!=pDiag && pPrev!=NO_POINT) {
            let x1 = pPrev& 0xffff; let y1 = (pPrev>>16)&0xffff;
            let dist1Sqr = (x-x1)*(x-x1)+(y-y1)*(y-y1);
            if (dist1Sqr < distSqr) {
                nearestPoint = pPrev;
                distSqr = dist1Sqr;
            }
        }
        points[x] = nearestPoint;
        return distSqr;
    } //private float minDist2
