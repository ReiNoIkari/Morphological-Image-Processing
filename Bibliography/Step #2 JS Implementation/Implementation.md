# Tiny Image in JavaScript : Mathematical Morphology

Vincent DEJONGHE, Adrien MENDES SANTOS, Rodolphe TWOREK\*

Link to Github : https://github.com/ReiNoIkari/Morphological-Image-Processing

## Introduction


Nowadays, scientists have access to huge image databases which can make studying organisms easier.  One problem still persist : those collected datas are worthless if they are not interpreted and the concern is that a lifetime won't be enough for a scientist to follow the flow. That’s were informatics come in order to help to analyse those huge amount of raw data, and in our case more precisely Image Processing. Indeed, the developement of some Image processing tool made that easier to computerize and analyse [^GON1992],[^JAI1989].

Mathematical morphology has been invented in 1964 by Georges Matheron and Jean Serra in the MINES ParisTech's laboratories. Its development was always motivated by industrial application. At the begining, the main purpose was to answer issues in the mining exploitation field. Then this purpose diversified itself to biology, medical imagery, material science, industrial vision, multimedia, teledetection, geophisic, etc. It consist in a mathematical and informatical theory and technique which is linked with algebra, the lattice theory, topology and probabilities [^SCH1993] .

Currently, one of the mathematical morphology’s main field is Image Processing. It particularly allows to use filtering, segmentation and quantification tools. Since it’s emergence in 1964, it knows a growing success and constitutes a part of many Image Processing softwares yet.

For the purposes of object identification required in industrial vision applications, the operations of mathematical morphology are more useful than the convolution operations employed in signal processing because the morphological operators relate directly to shape.

For this second step corresponding to the Javascript implementation, we had to do our own implementation of the morphological operators(erode,dilate,close,open,hit or miss, watershed and skeletonized) described in the first step which was Literature Search.

In this report, we will focus firstly describe in detail each function in the Material & Methods, then we will present our results using one precise example, followed by a comparison about our implementation and the implementation available in ImageJ. Finaly, we will conclude our work and make some possible improvements.

## Material & Methods

[//]: # (Material and Methods: Describe in detail for each function the algorithm used in the implementation. Add a diagram or pseudo-code if necessary. This section is very important because it must help the reading of the source code.)

All our functions are build the same way. We can note the presence of an equivalent of a main function usually with the name of the morphological operation, that will call all our secondaries functions used to make the different steps.

Another thing to note, is that in our functions we use an intermediate value of 2. The reason is because if we would process our image at the given time(and so while the process is still running) this would interfere with the remaining treatment and false our results. For this reason, the primary function will set an intermediate value if needed, and then an intermediate function will exchange those intermediate value by the correct ones.

### Erosion

As a reminder, erosion is one of two fundamental operations (the other being dilation) in morphological image processing from which all other morphological operations are based. It was originally defined for binary images, later being extended to grayscale images, and subsequently to complete lattices. Our part of the project(Morphological operation) targeted binary images, so the implementation of our erosion(and most of our operations) use some binary property like a pixel can only be in two state : foreground (and so it's value is 255) and background (it's value is 0).

The erosion operation was implemented in Javascript using a candid approach which is the definition itself of an erosion. An erosion is defined as follow by wikipedia (for further details refer to the report from step 1) : 

*Let E be a Euclidean space or an integer grid, and A a binary image in E.
When the structuring element B has a center, and this center is located on the origin of E, then the erosion of A by B can be understood as the locus of points reached by the center of B when B moves inside A. For example, the erosion of a square of side 10, centered at the origin, by a disc of radius 2, also centered at the origin, is a square of side 6 centered at the origin.*

To rephrase it with our own word, when a structuring fits in our image(i.e. when all foreground pixels in the structuring element are the same in our image), then all the others pixels are turned off except for the center pixel. 

To summarize this approach, we had to convert our two images(the one we are working on, and the kernel image) in Traster so we could work more easily with predefine properties. From here, we had to parse our entire image using the kernel and for each pixel in the original image that have the same value as the center pixel of our kernel check if from this set of corrdinates, if the both the kernel and the image has the same neighbors. If so then, we just needed to light off the neighbors pixels if that was the case and return an eroded image.

The main function of the erode process is *erode()*. It takes as input 2 parameters, the first one if the image that need to be eroded,the second argument if an image of the structurent element you wish to erode your image with.
This functions acts like a main, in the regard that apart from creating a copy of the original image(so we don't work in the original one) it will call two functions : *erode_process()* and *process_operation_erode()* and return an eroded image. We will describe those function below.

In order to do the erode operation, *process_operation_erode()* is the first function call. The first step if to determine the number of the foreground pixels that are present in our kernel, we use for this the map function in such a way that we scan all the kernek and if a pixel as a value of 255, then we add a +1 to a constant named "values_foreground". The number of this constant is then egual to the number of foreground pixel in our kernel.

Then, we iterate in height and width the raster (that we took care to create) from the source image, and we fix a constant "values" to 0. This variable will have the same goal as the previous constant, it will allow us to determine the number of foreground pixels in the raster(we will come back to it).

From here, for each y,x values in height and width if a pixel as the same value as the one of the center pixel of our kernel, then from those coordinates, we check using once again two for loops this time of the height and width of the structuring element and from minus the radius of the kernel and radius of the kernel the values of neighbors in both the image and the kernel. If the pixel value from those first coordinates of a lenght of minus the radius of the kernel and the radius of the kernel is 255 then we had a +1 to our variable "values. If this constant and the "values_foreground" constant have the same values, then it means that the foreground pixels of the kernel have an exact match with the pixels of the raster of the image and so we set for those x,y coordinates a value of 2. We then return the raster with containing those intermediate pixels.

The last function *process_operation_erode()* is the intermediate function we talked earlier. It will iterate through the raster in heigh and width, and in the case of the erode, change all the pixels with a value of 2 to foreground pixel(255), and all the other pixels will be set to background pixel(0). It return the final raster containing the good pixel values.

The *erode()* is then in charge to call those two functions, and return the eroded image that will be diplayed.

### Dilation

As said in the erosion part, dilation is the other fundamental operations (the first one being erosion) in morphological image processing from which all other morphological operations are based. The same way as the erosion, the dilation was implemented in a naive way, using the definition itself. If we refer to Wikipedia, the dilation definition it the follow :

*Let E be a Euclidean space or an integer grid, A a binary image in E, and B a structuring element regarded as a subset of Rd.
If B has a center on the origin, then the dilation of A by B can be understood as the locus of the points covered by B when the center of B moves inside A*

Part of the procedure is really similar to the erode process. We will once more iterate through the entire image but this time we won't need to use counting values. However, in contrary of erosion, we will have to take care of one problem we encountered : the concern of the boundaries of the image. Since the dilation and the erosion are two close operators, the code and our approach for those two operators are very similar.

The main function of the dilate process if *dilate()*. It takes as input 2 parameters, the first one if the image that need to be eroded, the second argument if an image of the structurent element you wish to erode your image with.
This functions acts like a main, in the regard that apart from creating a copy of the original image(so we don't work in the original one) it will call two functions : *dilate_process()* and *process_operation_dilate()* and return a dilated image. We will describe those function below.


In order to do the dilate operation, *process_operation_dilate()* is the first function call. We iterate in height and width the raster (that we took care to create) from the source image.

From here, for each y,x values in height and width, if a pixel as the same value as the one of the center pixel of our kernel, then from those coordinates, we check using once again two for loops this time of the height and width of the structuring element and from minus the radius of the kernel and radius of the kernel the values of neighbors in both the image and the kernel. Two steps will occurs under those if conditions.

First, we will check that when we check for the neighbors we are still in the interior of the image. Indeed, during our tests, we have observed that our initial functial without that conditions will considerer a pixel of the opposite side od the image as a neighbord, instead to have pixels with "no value" or "out of bound" values. Therefore, we created a condition that will check if the neighors at a x,y coordinates are inferior of 0 or superior of the height/widht of the raster. If it's the case, then those neightbors coordinated are not processed. But if there are in the interior of the image, then we check if those neighbors have a value of 0 whereas for a same pad, the pixel value for the kernel is 255. If that is the case, then for those given x,y we set an intermediate value of 2 in the raster image that we will then treat.

The last function *process_operation_dilate()* is an intermediate function. It will iterate through the raster in heigh and width, and in the case of the dialtion, change all the pixels with a value of 2 to foreground pixel(255) whitout touching the others values. It return the final raster containing the good pixel values.

The *dilate()* is then in charge to call those two functions, and return the dilated image that will be diplayed.

### Opening

Opening is mathematical morphology operator that is used for noise removal. Opening removes small objects from the foreground of an image, placing them in the background. Opening is the dilation of the erosion of a set A by a structuring element B. In this case, using the opening operation definition, the opening result of an image, is just an erosion of this image followed by a dilation of the eroded image.
This why for the opening operator, we just call the *erode()* and we put the result of this function in the *dilate()* function. This result in obtaining an opened image.

### Closing

Together with opening, closing in an mathematical morphlogy operator used for noise removal.At the difference of closing removes small holes.
Closing is the erosion of the dilation of a set A by a structuring element B. The same way as we did for the opening operator, we just call the *dilate()* and we put the result of this function in the *erode()*. This result in obtaining a closed image.

### Hit or Miss

Hit or miss is can also be defined as a basic operation. It is used to detect occurrences of given binary patterns in fixed orientations. In order to do so, a structural element representative from the pattern to detect is set up. This structural element contains both foreground and background pixel, and also contains “don’t care” values that are used for a better structural element/image to process fitting. 

The hit-and-miss operation is performed in much the same way as other morphological operators, by translating the origin of the structuring element to all points in the image, and then comparing the structuring element with the underlying image pixels. If the foreground and background pixels in the structuring element exactly match foreground and background pixels in the image, then the pixel underneath the origin of the structuring element is set to the foreground color. If it doesn't match, then that pixel is set to the background color.

The Hit_or_Miss’ function takes two parameters as input: the image to process and the structural element used to find pattern within it. It returns an output image’s raster, which consists of the image’s raster copy. Indeed, the original image’s raster will be used for convolutive iterations in order to determine the patterns. When a pattern is determined, the corresponding center of the structuring element is set to the foreground color at the emplacement of the pixel in the ouput copy. The “don’t care” values figurate on the structural element as every pixel values that differs from 0 and 255.

In a first step, the correspondance between the center of the structural element’s pixel value and each image’s pixel value is tested. We also consider the situation where the center of the structural element’s pixel value corresponds to a “don’t care” value. 
If the first condition is verified, we compare each of the structuring element’s pixel with it’s counterpart on the image to process by iterating with it’s radius. The “don’t care” values aren’t taken in consideration by the add of a selection condition. Then, if the pattern seeked matches the it counterpart, the coordinates of the pixel that corresponds to the center of the structural element applied to the image is set to the foreground value at the same coordinates on the output raster. 

This function also returns the number of matching patterns within the input image.



### Skeletonized

The skeletonization is part of the morphological operators that will from and image, transform the different shapes in it, in a thin version of those shapes that is equidistant to their boundaries. It's mainly use in optical character recognition and fingerprint recognition. Skeletons have several different mathematical definitions in the technical literature, and there are many different algorithms for computing them. For our project we decide to implement the algorithm of (??????name?????). This algorithm could be sum up in three main steps. First is to detect the edge of the different objects in our image, the second step is to remove the edge pixels and finaly to do a thinning and to determine what would be the last thinning possible before the final stage where the object dissapear.

In order to do this skeletonize function we had to implement our own personal version of edge detection, but the final version of edge detection will be added by another group.

This function is composed as multiple function like the others. A main function is present, called *skeletonize()*. It takes an image as input, return a skeletonized of it in output. It creates a raster of the input image, and then call one of the secondary functions : *thinning()*.

This *thinning()* function uses two additional functions which are *is_interior()* and *is_removable()*.
The first one, will check the neighbors of pixel at the n index position. Ff a foreground pixel is not neighbor of a background pixel (in x-1,x+1,y-1 or y+1 postion) then it will return a true boolean.

The second one, works and is build in the same way, but instead it will returns true if a specific pixel is a foreground pixel next to an interior(value of 2) pixel in x-1,x+1,y-1 or y+1 postions.

Finaly, after callng those two function in order to detect the edge of the objects and removing all the edge pixel in contact with an interior pixel, the *thinning()* function will turn back all the non background pixels to a foreground pixel value.

The *skeletonize()* function then return a skeletonized image of the original image.

### Watershed

The watershed transform is a transformation defined on a grayscale image that will result of objects beiing separated. There is many metaphor to describe this transformation, one of them is an image from geopgraphy.

Let's imagine a landscape being immersed in a lake, with holes pierced in local minima. Basins will fill up with water starting at these local minima, and, at points where water coming from different basins would meet, dams are built.  When the water level has reached the highest
peak in the landscape, the  process is stopped. As a result, the landscape is partitioned into regions or basins separated by dams, called watershed lines or simply watershed.
When simulating this process for image segmentation, two approaches may be used:  either
one first finds basins, then watersheds by taking a set complement. We took the first approach.(mettre la reference ici)

This image, is what we tried to do implement in our *watershed()* function.

Before filling those basins, we need to determine the depth of those, which is done by calculating a distance map. Our *distance_map()* function was implemented using the Borgefors’ Chamfer distance algorithm (CDA). It takes as an input a binary raster of an image and the windows(either CDA 3×3, city block or chessboard) and return as an output the raster which score values. This function call another function in it : *check()*. This *check()* takes as an argument, the coordinates of the processed pixel, their coordinates of the neighbors point, the raster of the image beeing processed and the distance map calculed right before containing the different score value.

Those two function work as follow. We parse the image using it coordinates values(but the function is built using the forEach method, so in practice it will use the index postion) and we look for the neighboorr from the left side to the right top angle corner. The *check()* will then check those neighbors and set as coordinates the lowest neighbors value. According to with neighbord is chosen (those neighbors don't have the same weight/value) the score value will vary. This is our first pass.

In theory, we should do a second pass, starting from the end, and going all the opposite way. The goals of this second pass is to equalize the obtained scores. Indeed, during the first pass, we only consider half of the neighbors, so the more we go on the more the score values are high.

However, in functional Javascript it's not possible to start from the end of an array and go all the way up to the start (or at least we didn't manage to find how to do it). We managed to get around by using the *reverse()* method, doing an other pass(the same as the first one) and then reverse once more the array so that at the end this will correspond to process al of our neighbors.

All of those tasks are mandatory to find the best score. A high score meaning that the background is deep.

The second step match with our secondary main function *segmentation()*. It take as an input a gray level raster and return a grayscale raster segmented. Using a secondary function *nearestMaxValue()* it will check for a given position all the neighbors and more precisely their score value in order to chech the highest one. From there and for every x value, if the pixel is a foreground pixel, then it will check once more for all the neighbors and check for the highest score. This step is repeated until reaching the maximum score. This could be imagined as a runoff, where the water will continue to move until reaching the deepest well. When a pixel as found the closest pixel with the higher value, then the *segmentation()* function will change the value of the processed pixel to the maximum pixel value.

At the end, we will be in presence of areas of pixels (which different values depending of the nearest maximum) arround the postion of the maximum value pixel, all the pixels from one area having the same value as there closest maxium value. It will then be possible to separates those different area.

The seperation of the different areas is done using the *isFloodLimit()* function. If take for input a rast from a flooded grayscale image and returns true if one of the 4 neighbors is from an other flood level. In other words, it will check for each pixels if the it's neighbors have the same value as itself. If that's the case then it meaning that all of those pixels are part of the same area, however if a pixels has a different value from one of it's neighbord then it means that we are at the boundary of two objects. If it's the case, then one of those pixels either from the first area, or the second area is then set as a background pixel.

During the implementation of this operator we ran into a problem that we were not able to resolve. This problem concern the plateau identification. Indeed, in our implementation if all the direct neighbors of a pixels have the same value of the processed pixel then the function will consider that there is not superior value even though the next pixel from one of the neighbors has a higher value. This plateau issue causes our image to be more divided than what it should be.

## Results

[//]: # (Results: Present one example of your function(s). Then, calculate benchmarks with the same image at different size. Recalculate the benchmarks for 8-bit, 16-bit, and float32 images. Display them as diagram. Don't forget to describe them in your text, add a legend.)


Now that we have explained our implmentation, we will compare the results obtained for each of our process using the implementation of ImageJ and our implementation in Javascript. The same image will be used for every operations and the input image will always be a binary image and we will use a 3x3 cross kernel, the one used by ImageJ. 

Our benchmarks for the imageJ process were done using a custom plugin created by ourselves. The benchmark of our implementation are done using also a custom script. The function *Performance.now()*(or *startBenchmark()* for the ImageJ plugin) will give us a time of executions in ms (and ImageJ in ns). Both of our script do a preheating phase, running over 100 images in order to initialise the classes. We were not able to calculate the memory usage using firefox methods, so we won't be able to talk about it.

### Erode and Dilate

The erosion and dilates methods have been runing the default functions available in ImageJ. The parameters used are iterations=1, count=1, black background, and edm=8-bit. Our function will use the same parameters as those previously mentioned.

The differents output obtained for the erode process are those :

![Fig.X](Results/erode_mixed.png)

**Figure 1: Result of the erode operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

As we can see some circles that were stick together have form more disctinct borders. The results obtained between the two process are quite the same. We can see some minor differences from a display view, but the results seems to be the same whatever we use the ImageJ plugin or our own implementation.

For the dilation, we obtained the results below.

![Fig.X](Results/dilation_mixed.png)

**Figure 2: Result of the dilate operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

We can observe that the same way as the erode operation, the dilate results obtained for both the Image J function and our own implemenantation have the same general outcome. Even tough we can see at some locations that some circles are more dilated by the ImageJ implementation. However, the general results can be considered as the same.

Now that we have proven that the results obtained by both of our plugins are the same, let's take a look at the benchmark obtained :

The values obtained from the benchmark for our erode operation result in this graph.
![Fig.X](Results/erode_benchmark.png)

**Figure 3: Benchmark graph representing the time processing in ms of an image of different size for the erode process**

As we can note, until the image of a size of 150\*150 pixels our performance are really close to the ImageJ erosion. From the 250\*250 pixels image to the one at 550\*550 we can observe a difference of a ration of 7. This means that for an image with 550\*500 pixels our implementation will take 7 more times than the ImageJ implementation to erode one image (14.999ms for our implementation against 2.09466ms for the ImageJ one).
However, is we couls be satisfied with our results from a small image until the 550\*550 images, we can't say the same for the rest.
From this size until our biggest size, the results we obtained from our implementation are quite(to not say very) bad. Indeed, where we had a ration difference of 7 for an image of size 550\*550 pixels, for images of bigger size we double this ration to obtain a value of 15. Yet this ratio don't change whatever we use a 750\*750 pixel or a 1600\*1600 pixel image.

The values obtained from the benchmark for our dilation operation result in this graph.
![Fig.X](Results/dilate_benchmark.png)

**Figure 4: Benchmark graph representing the time processing in ms of an image of different size for the dilate process**

The observation are quite similar to the the results obtained for the erosion even the ration difference for an image of 550\*500 pixels is the same (ratio of 7). The ration after this critical size if also the same (ratio of 16).

### Open and Close

The same way as we did for the erosion and dilation, the open and close methods have been runing the default functions available in ImageJ. The parameters used are the same as the erode and close operations.

The differents output obtained for the open process are those :

![Fig.X](Results/open_mixed.png)

**Figure 5: Result of the open operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

As we can inspect after the open operation, the circles from the original image are more pixeled in the their border, for both of the implementation, even tough it seems that ImageJ implementation result in more pixeled border than our implementation.

The ouput results for the close operation are those below. 

![Fig.X](Results/closing_mixed.png)

**Figure 6: Result of the close operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

The results obtained after a close operation are in a general way the same for both of the implementation, resulting in the removal of small holes. However, as we can note, the ImageJ implementation closes gaps between object in a more important radius than our own implementation.

Let's take a look at the benchmark results.

The benchmark for the opening is :

![Fig.X](Results/opening_benchmark.png)

**Figure 7: Benchmark graph representing the time processing in ms of an image of different size for the opening process**

Since closing and opening, are the erosion of the dilation and vice verse, the issue encountered for the erode and dilate operation will be present here too.
Indeed, as we can see the observation are quite similar to the the results obtained for the erosion/dilation even the ration difference for an image of 550\*500 pixels is the same (ratio of 7). The ratio after this critical size if also the same (ratio of 15-16).

The associated benchmark of the close operation is as follows.
![Fig.X](Results/closing_benchmark.png)

**Figure 8: Benchmark graph representing the time processing in ms of an image of different size for the closing process**

The observation we can do for the closing operation are exactly the same as the opening one, and so the same as the erode/dilate.
We can see the observation are similar to the the results obtained for the erosion/dilation even the ration difference for an image of 550\*500 pixels is the same (ratio of 7). The ratio after this critical size if also the same (ratio of 15-16).

### Hit or Miss
![Fig.X](Results/hit_or_miss_mixed.png)

**Figure 9: Result of the close operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

![Fig.X](Results/hit_or_miss_benchmark.png)

**Figure 10: Benchmark graph representing the time processing in ms of an image of different size for the closing process**

### Skeletonize

![Fig.X](Results/skeletonize_mixed.png)

**Figure 11: Result of the close operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

![Fig.X](Results/skeletonize_benchmark.png)

**Figure 12: Benchmark graph representing the time processing in ms of an image of different size for the closing process**

### Watershed

The wathershed methods have been runing the default functions available in ImageJ.

The images output from the watershed process are those those one below.
![Fig.X](Results/watershed_mixed.png)

**Figure 13: Result of the close operation using as a structuring element a cross of 3 by 3 size. Left: Original image, Middle: made with ImageJ default function, Right: made with our own implementation**

We can obeserve than there is the presence of an element that is not present in the ImageJ implementation : the appearence of black triangles within some circles. This is due to a bug in our implementation and how the plateau are treated(see, chapter 2-watershed for more details).  Appart from this, the circles are well delimited the same way as ImageJ.

As we can see some circles that were stick together have form more disctinct borders. The results obtained between the two process are quite the same. We can see some minor differences from a display view, but the results seems to be the same whatever we use the ImageJ plugin or our own implementation.


The benchmark associated to the watershed operation is the following one.
![Fig.X](Results/watershed_benchmark.png)

**Figure 14: Benchmark graph representing the time processing in ms of an image of different size for the closing process**

We can see that the pattern present in the erode/dilate part is also noticable here. For smal image of 50\*50 pixels until 350\*350 pixels the performances are quite similar to those obtained with ImageJ.
From 350\*350 image pixels to the biggest one there is a ratio difference betwen our implementation and the ImageJ implementation between 13 and 17(even tough it would seems from the graph that for a 1250\*1250 image pixels the ration is higher in reality it's not)
## Discussion

[//]: # (Discussion: Comparison of your implementation with those of ImageJ. Is it faster, better, less memory consuming, ...?)

## Conclusion

[//]: # (Conclusion: Conclusion and possible improvements, ...)

## References

[//]: # (References. To complete if required. Be sure that all of your references are called in the text.)
