# Mathematical Morphology

Vincent DEJONGHE\*, Adrien MENDES SANTOS, Rodolphe TWOREK

## Introduction

The developement of some bioinformatics tool, more speciﬁcally, DNA sequencer made that every day a huge number of genomes are sequenced. Therefore, scienctifcs have access to huge databases with raw sequences which can make studing organism easier. One problem still persist : those collected data are worthless if they are not interpretednad the concern is that a lifetime won't be enough for a scientific to follow the flow. That’s were informatics come in order to help to analyse those huge amount of raw data, and in our case more precisely Image Processing. 

The mathematical morphology’s main field is Image Processing. It allows to use particularly filtering, segmentation and quantification tools. Since it’s emergence in 1964, it knows a growing success and constitues a part of many Image Processing softwares yet.
The main purpose of mathematical morphology is to study or process a set with an other set called structuring element, wich is used as a probe. For each position of this structing element, a look is taken about its ability to touch or be inclued on the main set. The result of this process is an output set.
This involves a loss of information, but also a great elimination of structures that do not fits to certains criteria such as width or volume.
For the purposes of object or defect identification required in industrial vision applications, the operations of mathematical morphology are more useful than the convolution operations employed in signal processing because the morphological operators relate directly to shape.

In this project, we will focus on the Morphology part from Image Processing, and we will initially explain some main operations in this area, and observe some obtained results to finally discuss about it.

(maybe saying : this first month we will focus...)

## Material & Methods
In order to be able to compare and discuss about the different algorithms in a practical and effective way we decided to create a benchmark.

It could be described this way:

First, we initialise our classes a hundred times as a warm up phase so that we limit the wasted time corresponding to the initializing phase during the critical phase.
Then, in the benchmark part itself, we run our operations 1000 times to be sure to get enough data and we run those operations 10 times in order to limit variations (meaning that in the end we ran 10000 times each operation)

**Line des 45 degrés pour verifier**

### Hit-or-Miss
Hit or miss is what could be defined as the basic operation of the morphological area of image processing. It is used to detect occurrences given binary patterns in fixed orientations. It can be used to look for several patterns (or alternatively, for the same pattern in several orientations) simply by running successive transforms using different structuring elements, and then running OR operation between all the results. Therefore, Most of the other morphological operations are derived from this notion(opening, closing, erosion, dilation...).
If any "on" pixels of the image to process' targeted area is covered by "on" pixel of the structuring element, it is called "hit".
If none of the image that have to be processed' "on" pixel in a targeted area is covered by a "on" pixel or the structuring element, it is called "miss". 
If all "on" pixels on structuring element is cover all "on" pixels of an image to process targeted area, it is called "fit".
In general, the hit or miss transform is defined as :

<p align="center">
<img src="images/hit_or_miss_formule.PNG" alt="alt text" width="340" weight="center">
</p>
With the condition that B1 ∩ B2 = Ø, because if B1 is not a negative mask of B2, the hit-miss transform would result in the empty set.
<p align="center">
<img src="images/hit_or_miss.gif" alt="alt text" width="340" weight="center">
</p>

### Dilate & Erode (FORMULES A AJOUTER)

The dilation operator takes two pieces of data as inputs. The first one is the image which is going to be dilated and the second one is the structuring element. Thus, the tructuring element determines the precise effect of the dilation on the first image.

It mathematically goes like this :

In one hand, X is the set of Euclidean coordinates which corresponds to the image that has to be dilated. In an other hand, S is the set of Euclidean coordinates for the structuring element. o cooresponds to the origin of S and the translation of the structuring element upon the image that have to be processed is called So. The the dilatation of X by S then correspond to the set of corresponding points between o and X. In an other way, it corresponds to the set of all points o such that the intersection of So with X is non-empty.

As an example of binary dilation, suppose that the structuring element is a 3×3 square, with the origin at its center, as shown in Figure 1. Note that in this and subsequent diagrams, foreground pixels are represented by 1's and background pixels by 0's.


<p align="center">
<img src="images/kern3x3.gif" alt="alt text" width="340" weight="center">
</p>

**Figure 1 : A 3×3 square structuring element**

To compute the dilation of a binary input image by this structuring element, we consider each of the background's pixels in the input image that has to be precessed. For each of those, the structuring element is superimposed upon the input image so that the origin of the structuring element matches with image to be processed's pixel position. If at least one pixel in the structuring element matches with a foreground pixel in the image underneath, then the input pixel is set to the foreground value. If all the corresponding pixels in the image are background, however, the input pixel is left at the background value.

For our example 3×3 structuring element, the effect of this operation is to set to the foreground color any background pixels that have a neighboring foreground pixel. Such pixels must lie at the edges of white regions, and so the practical upshot is that foreground regions grow (and holes inside a region shrink).

<p align="center">
<img src="/images/combined_bridge_dila.png" alt="alt text" width="1000" weight="center">
</p>
**Fig.8: Result of the Dilate operation on 8 using as a structuring element a disk of 3 by 3 size. This operation is done 2 times in a row**

The erosion operator is the dilatiation operator's dual. Indeed, each of the foreground pixels in the input image in turn are considered. For each foreground pixel we superimpose the structuring element on top of the input image so that the origin of the structuring element coincides with the input pixel coordinates. If for every pixel in the structuring element, the corresponding pixel in the image underneath is a foreground pixel, then the input pixel is left as it is. If any of the corresponding pixels in the image are background, however, the input pixel is also set to background value. **A MODIFIER**

For our example 3×3 structuring element, the effect of this operation is to remove any foreground pixel that is not completely surrounded by other white pixels (assuming 8-connectedness). Such pixels must lie at the edges of white regions, and so the practical upshot is that foreground regions shrink (and holes inside a region grow). **A MODIFIER**

<p align="center">
<img src="/images/combined_bridge_ero.png" alt="alt text" width="1000" weight="center">
</p>
**Fig.9: Result of the Erode operation on 8 using as a structuring element a disk of 3 by 3 size. This operation is done 2 times in a row**

### Opening and Closing


Opening and closing are two secondary operations that play an important role in morphological image processing. Both could be defined as the combination of erosions and dilations and since they are derived from eroding and dilate they posses the same limits as the original techniques which means they can only be applied to binary images (or a graylevel image in particular cases). The general aims of those two operations are quite simple: making an image as smooth as possible without size change (or at least limited).
Let's take a closer look to the opening operation.

The opening technique consist of an erosion followed by a dilation using the same structuring element for both operations

<p align="center">
<img src="images/opening_formula.png" alt="alt text" width="200" weight="center">
</p>

**Equation.10: Mathematical definition of the opening morphological transformation** 





In a simple way opening will have for effect to opens black holes inside white regions and separates touching white regions (in the case that the objects are bright on a dark foreground).It will have as effect the removal of capes, isthmus and islands smaller than the structuring element.
Here is a pratical application :

<p align="center">
<img src="/images/combined_bridge_open.png" alt="alt text" width="1000" weight="center">
</p>


**Fig.10: Result of the Opening operation on fig.10 using as a structuring element a disk of 3 by 3 size**



As we can see in fig. 11 some black areas that were inside white figures have been connected with the outside due to some foreground pixel removal.
Here is an explanation : the erosion is done first, which is shrinking the boundaries of your objects. After that we perform dilation, which is expanding the boundaries of the objects. Thus, because small ones were removed in erosion step, bring back biggest elementsare brought back.

Closing is the dual of opening and can be described mathemacaly with :

<p align="center">
<img src="images/opening_formula.png" alt="alt text" width="200" weight="center">
</p>



**Equation.11: Mathematical definition of the closing morphological transformation** 

This could be described like this : closing is a dilation followed by an erosion using the same structuring element for both operations
Closing is similar in some ways to dilation in that it tends to enlarge the boundaries foreground (bright) regions in an image (and shrink background color holes in such regions).

Let's use once more a pratical application : 

<p align="center">
<img src="/images/combined_bridge_close.png" alt="alt text" width="1000" weight="center">
</p>



**Fig.12: Result of the Closing operation on fig.10 using as a structuring element a disk of 3 by 3 size**



We can observe that closing have the opposite effect of opening : instead of opening the black areas inside our white figures, closing closes them which have for effect to make them disappear.
It is important to note that opening and closing are less destructive of the original boundary shape than erode and dilate.

### Skeletonize

Skeletonization (also called "Medial Axis Transform" or MAT) allows the user to reduce a focused region from a binary image to its skeletal remnant. Indeed, most of the foreground pixels are throwwed when the connectivity is concerved. 
This process is mostly compared as an explanation to a slow-burning material. Fire is set simultaneously to all the boundary of the area of interest. This fire slowly moves into the interior of the area. A trace remains at each point when the fire coming from each area meets itself. This trace is called "quench line" and represents the skeleton of the area.
The skeleton/MAT can be produced in two main waysusing the erode operator or the distance transform. The first successively erodes away pixels from the boundary (while preserving the end points of line segments) until no more thinning is possible whereas the second calculates the distance transform of the image. The skeleton then lies along the singularities in the distance transform. The latter approach seems to be more adapted to the MAT calculation. Indeed, the MAT is the same as the distance transform but with all points off the skeleton suppressed to zero.
 Whether differents skeletonization algorithm exist, the general effects are all similar, as are the uses to which the skeletons are put.

Mathematically, skeletonize is reprensented by :

<p align="center">
<img src="images/skeletonyze_formula.PNG" alt="alt text" width="340" weight="center">
</p>

Where <img src="images/signe1.PNG" alt="alt text" width="40" weight="center"> and <img src="images/signe2.PNG" alt="alt text" width="40" weight="center"> are the morphological erosion and opening.

The skeleton aims to provide a simple representation of a shape that preserves many of the topological and size characteristics of the original. Thus, for instance, we can get a rough idea of the length of a shape by considering just the end points of the skeleton and finding the maximally separated pair of end points on the skeleton. Similarly, we can distinguish many qualitatively different shapes from one another on the basis of how many 'triple points' there are, i.e. points where at least three branches of the skeleton meet.

In addition, to this, the MAT  has the property that it can be used to exactly reconstruct the original shape if necessary.

As with thinning, slight irregularities in a boundary may interfere with recognition processes based on the topological properties of the skeleton. 

<p align="center">
<img src="/images/combined_bridge_skeleton.png" alt="alt text" width="1000" weight="center">
</p>


**Fig.13: Result of the euclidean distance mapping transform on fig.13 using as a structuring element a disk of 3 by 3 size**


### Euclidean Distance Mapping
The Euclidean Distance Mapping (or EDM), is one of several Distance transform techniques in Image Processing. The shortest distance to the nearest pixel in the background for each objects is labeled. The result looks pretty similar to the original inputed image in terms of shape, but the pixel's greyscale values are changed to show the distance to the closest boundary from each point.
Once again, the metaphor of a fire cunsumming a slow burning material is often used to describe the process. Just as the skeletonize tranform, a fire starts at each point of the object's boundaries and moves into the interior. Each point in the interiour is labeled with the amount of time that the fire took to reach it.  

Several kind of distance transform exists, depending upon which distance metric is being used to determine the distance between pixels. The 'chessboard distance' and the 'city block' transform can be quoted, using respectively 3×3 square and cross shaped structuring elements whereas the Euclidean distance mapping uses a disk shaped one.
From a measurement perspective, the Euclidean distance is the most useful because it corresponds to the way objects are measured in the real world.

<p align="center">
<img src="/images/EDFTransform.PNG" alt="alt text" width="200" weight="center">
</p>

Where <img src="images/Capture.PNG" alt="alt text" width="40" weight="center">, is some two-dimensional distance metric. Different distance metrics result in different distance transformations. The Euclidean distance metric uses the L2 norm.
This metric is isotropic in that distances measured are independent of object orientation, subject of course to the limitation that the object boundary is digital, and therefore in discrete locations. The major limitation of the Euclidean metric, however is that it is not easy to calculate efficiently for complex shapes. 

<p align="center">
<img src="/images/combined_bridge_edm.png" alt="alt text" width="200" weight="center">
</p>


**Fig.13: Result of the Skeletonization on fig.13 using as a structuring element a disk of 3 by 3 size**


### Ultimate eroded point

Ultimate eroded point (or UEP) is derived from the erosion operator and is defined as the last point that would be present after recursively erodes until the last pass before the object would be visible. 
In order to apply multiple UEP on an image, each object is considered separately, which makes possible to use different numbers of erosions for each object and so having the ultimate eroded point not only for an image but for each object which is useful for cells images for example. 

The ultimate erode point is represented as follow :

<p align="center">
<img src="images/UEP_formula.png" alt="alt text" width="400" weight="center">
</p>

In an image, the algorithm will search for the brightest pixel for each objet and be sure that none of is neighbors are as bright as it. If it is the sole point, then it will be the only one to be part of the UEP, if there are multiple pixels of the same object, then the center of the brightest pixels will be used. Furthermore, in order to be categorized as a UEP, the determined pixel besides being the brightest need to be a point that is equidistant from at least two (but usually three) boundary locations. In order to find the brightest point, the UEP method uses the peaks or local maxima of the EDM.
Usualy,The Ultimate eroded point operation is used as a marker for objects locations

<p align="center">
<img src="/images/combined_bridge_uep.png" alt="alt text" width="400" weight="center">
</p>

**Fig.14: Result of the ultimate erode point on fig.14 using as a structuring element a disk of 3 by 3 size**


## Results

This section is dedicated to the results obtained using the default operations in ImageJ and if there are available some third party plugins. The image used is one of the sample available by default in ImageJ, called "Embryos". The input image will always be in binary mode.
**ajouter la ligne diagonale dans chaque résultats**

### Erode and Dilate

The erosion and dilates methods have been runing the default functions available in ImageJ and plugins created by the Institut Jean-Pierre Bourgin - INRA(MorphoLibJ). The original file have to be be a binary image, and the process' result will be of the same type. We encountered a problem by searching how to select a specific structuring element in ImageJ. Indeed, if the option exists, we didn't find it, this one being a disk of size 3 whereas the MorphoLibJ plugin allows the user to choose.

<p align="center">
<img src="/Results/combined_erode.png" width="1000" weight="center">
</p>



**Fig.12: Result of the erode operation using as a structuring element a disk of 3 by 3 size. Left : Original image, middle : made with ImageJ default function, right : made with MorphoLibJ plugin**


As we can see some black areas that were inside white figures have been connected with the outside due to some foreground pixel removal. This is due to the fact that some foreground pixel have been removed (due to not being surrounded by other foreground pixels). Moreover, the results seems to be the same whatever we use one plugin or the other.
(peut etre faire une image avec une strucruting element COMPLETEMENT DIFF pour montrer que le kernel joue son role??)

The same results have been obtained by the dilation operation as we can see :

<p align="center">
<img src="/Results/combined_dilation.png" width="1000" weight="center">
</p>


**Fig.13: Result of the dilation operation using as a structuring element a disk of 3 by 3 size. Left : Original image, middle : made with ImageJ default function, right : made with MorphoLibJ plugin**


This time, it's background pixels that are removed in favour of foreground pixels.

A benchmark has also been done in order to compare the excution time and the usage of memory for both plugins which are below :

<p align="center">
<img src="/Results/combined_benchmark_erode.png" width="1000" weight="center">
</p>
<p align="center">
<img src="/Results/combined_benchmark_dilate.png" width="1000" weight="center">
</p>
As we can see the average excution time from 10000 runs as the average memory used for the default ImageJ plugin are less than the MorphoLibJ plugin for both of the operations. For ImageJ we have an average excution time of 13.683 ms and average memory used of 52.066 MiB while for the MorphoLibJ we have an average excution time of 55.496 ms and average memory used of 57.509 MiB

**Fig.13: Benchmarks of the erosion and dilation operation using as a structuring element a disk of 3 by 3 size. Left : Results of the ImageJ plugin  right : Results of the MorphoLibJ plugin**

### Open and Close

The opening and closing operation take as input a binary image and conserve the same type as output.
As for the erosion and dilation method, we used the same protocol using ImageJ default function and the plugin created by the INRA.
The result obtains for the opening are as follow :


<p align="center">
<img src="/Results/combined_opening.png" width="1000" weight="center">
</p>


**Fig.14: Result of the opening operation using as a structuring element a disk of 3 by 3 size. Left : Original image, middle : made with ImageJ default function, right : made with MorphoLibJ plugin**


As a reminder, an opening operator could be resumed as an erode followed by a dilation. As a consequence, we should see some traces of it.
By having a closer look, we can see that indeed an erosion has been applied to the picture, but that compared to the fig.12 the black areas are little less more present. We can explain this as the fact that compared to the fig.12, just after the initial erosion, the dilation will have for effect to expand the boundaries of the objects. Thus, because small ones were removed in erosion step, biggest elements are brought back.

The results obtained from the closing operation are the follow :

<p align="center">
<img src="/Results/combined_closing.png" width="1000" weight="center">
</p>


**Fig.15: Result of the closing operation using as a structuring element a disk of 3 by 3 size. Left : Original image, middle : made with ImageJ default function, right : made with MorphoLibJ plugin**


We can observe that closing have the opposite effect of opening : instead of opening the black areas inside our white figures, closing closes them which have for effect to make them disappear.

It is important to note that opening and closing are less destructive of the original boundary shape than erode and dilate.

As for the erosion and dilate methods, we have performed some benchmarks :


<p align="center">
<img src="/Results/combined_benchmark_open.png" width="1000" weight="center">
</p>
<p align="center">
<img src="/Results/combined_benchmark_close.png" width="1000" weight="center">
</p>
As we can see the average excution time from 10000 runs as the average memory used for the default ImageJ plugin are less than the MorphoLibJ plugin for both of the operations. For the erode operation, for ImageJ we have an average excution time of 13.683 ms and average memory used of 52.066 MiB while for the MorphoLibJ we have an average excution time of 55.496 ms and average memory used of 57.509 MiB. For the dilate operation, for ImageJ we have an average excution time of 17.695 ms and average memory used of 52.336 MiB while for the MorphoLibJ we have an average excution time of 47.629 ms and average memory used of 55.863 MiB

### Skeletonize

The Skeletonize operator is used in order to only have left a skeleton (from the boundary of an object). It takes as input a binary image, and as output a binary too.
Only the default ImageJ default function was used as we didn't find any ready to use plugin that we thought interesting.

The skeletonize operation give an image as follows :

<p align="center">
<img src="/Results/combined_skeletonize.png" alt="alt text" width="1000" weight="center">
</p>

**Fig.15: Result of the skeletonize operation using as a structuring element a disk of 3 by 3 size. Left : Original image, right : made with ImageJ default function**

The cell that only (or almost) contained foreground pixels only leave a little trace as a skeleton. This is due to the lack of background pixels that doesn't allows to obtain a clean skeleton.
The second thing to point out is that the more background pixels an object contains the more detailed (and complex) a skeleton can be.
In a complex environment like a biological culture, the skeletonize operation alone cannot be enough to have an idea of the shape.

### Euclidean distance map

Euclidean distance map (or EDM) is a method which consist in calculating the distance between a foreground pixels and the closet background neighborgt pixels.
The image obtained is as follow :


<p align="center">
<img src="/Results/combined_edm.png" alt="alt text" width="9000" weight="center">
</p>

**Fig.16: Result of the EDM operation using as a structuring element a disk of 3 by 3 size. Left : Original image, middle : made with ImageJ default function, right : made with MorphoLibJ plugin**

As we can see, we have two main results. The objects containing no (or almost) background pixels inside in the original picture, have a better score(which can be seen with their brigthness, the more they are the higher score thet got).
The others object, containg many background pixels have more mitigated scores. This is due to the fact that the background pixels have an influence in the distance(vicent passe par la, thanks) reducing the score.


### Ultimate eroded point

The Ultimate eroded point is a variant of the erosion method, but instead of eroding only one time it will erode multiple times only one and only point remains for each object present in an image. The input is a binary image, but the output will be a graylevel image.
 The obtained result is:

<p align="center">
<img src="/Results/combined_UEP.png" alt="alt text" width="8000" weight="center">
</p>

**Fig.17: Result of the closing operation using as a structuring element a disk of 3 by 3 size. From left to right : original image, the UEP original image wihout process, the UEP original transformed to binary, the transformed UEP with a dilation applied**

After an UEP using the default ImageJ function the output image seems to be only black. In order to check this theory, we transformed the image to binary, and we could already see some points corresponding to the last point that would be eroded for each object. Finally, in order to make the result more usable, we applied a dilation.
As we can, see the more "perfect" the object is, in our case a cell containing only foreground pixels, the more the theoretical ultimate eroded point is valid. However, as soon as we start getting more complex object, we can see that those objects can have multiples ultimate eroded point. This can be explained as the computer is not capable to determine the object in his whole (cause of the background pixels inside the cells) and so is treats which should be considered as one object in multiples, which explain those multiple UEP.

## Discussion 

Let's analyse the images we obtained during the result phase. As we can see, using the same structuring element result in having the same output image has no significative effect, but using a completely different structuring element results some differences. It can be  explained by the fact the other plugin we used, are only an amelioration of the origial ImageJ functions(the mathematical algorithm being the same for all the erosions for example) but instead the basic function has been modified in order to add more parameters like the starting element change (INRA plugins).
Therefore, the output image obtained by the "Line 45 degree" which correspond to the diagonal of the kernel, is of course not completely different but the differences obtained are easily seeable by eye.

This proves that the result obtained during Mathematical Morphology is dependent on the choice of the Kernel and not of the plugin since the method used is the same.

Let's continue with the benchmarks results.
Between the original ImageJ function and the plugin created by the INRA, there is quite a difference as it can be observed. 
In a first sight, the ImageJ's function tends to use less memory and to run faster than the INRA plugin. Indeed, ImageJ's erode operator would takes about 13.68 milliseconds (ms) to run and use about 52.07 MiB when the INRA's plugin would have an about 55.50 ùs runtime and a 57.60 MiB memory use. This kind of result is seeable for every operation and transform. However, those results can't be compared since the INRA's plugins perform more operation than the "by default" operations. Indeed, we noticed for example that each turn of a INRA's plug run causes a resulting image to be launched. This induces a significative increasment of the runtime. In an other hand, the INRA's plugin is more modular from its implementation that allows the user to set some parameters such as the size and shape of the kernel. 


## Conclusion

Image Processing is a wide domain that contain numerous branches and applications (from **quelque chose** to robot vision). What we studied is just a tiny part of the whole tools proposed by ImageJ.

on a utilisé des processus permettant d'automatiser le traitement de donnees de mathématique morphologique sur images binaires.
Il existe différentes approches pour étudier la morphologie mathématique d'une image suivant le rendu souhaité et l'étude a mener, et ces différents moyens peuvent être implémentés de différentes facons et n'ont pas précisément les mêmes résultats et les mêmes caractéristiques à l'exécution. 

Nous n'avons pas trouvé de plugin pertinent à comparer aux fonction présentes dans ImageJ. 
Pour ce faire, la gestion des paramètres présente une grande importance. En effet, 

References test [^GIL2002],[^LEG2016],[^GON1992],[^HAR1992],[^JAI1989],[^VER1991]

## References
  
  [^GIL2002]: J. Gil R. Kimmel Efficient Dilation, Erosion, Opening, and Closing Algorithms, 2002.
  
  [^LEG2016]: D. Legland, I. Arganda-Carreras, P. Andrey; MorphoLibJ: integrated library and plugins for mathematical morphology with ImageJ. Bioinformatics, 2016.
  
  [^GON1992]: R. Gonzalez and R. Woods Digital Image Processing, Addison-Wesley Publishing Company, 1992.
  
  [^HAR1992]: R. Haralick and L. Shapiro Computer and Robot Vision, Vol. 1, Addison-Wesley Publishing Company, 1992.
  
  [^JAI1989]: A. Jain Fundamentals of Digital Image Processing, Prentice-Hall, 1989.
  
  [^VER1991]: D. Vernon Machine Vision, Prentice-Hall, 1991. 
  
  [^BAI2004]: D. G Bailey, An Efficient Euclidean Distance Transform, 2004. 
  
  

