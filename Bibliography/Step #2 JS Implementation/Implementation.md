# Tiny Image in JavaScript : Mathematical Morphology

Vincent DEJONGHE, Adrien MENDES SANTOS, Rodolphe TWOREK\*

Link to Github : https://github.com/ReiNoIkari/Morphological-Image-Processing

## Introduction


Nowadays, scientists have access to huge image databases which can make studying organisms easier. One problem still persist : those collected datas are worthless if they are not interpreted and the concern is that a lifetime won't be enough for a scientist to follow the flow. That’s were informatics come in order to help to analyse those huge amount of raw data, and in our case more precisely Image Processing. Indeed, the developement of some Image processing tool made that easier to computerize and analyse [^GON1992],[^JAI1989].
Mathematical morphology has been invented in 1964 by Georges Matheron and Jean Serra in the MINES ParisTech's laboratories. Its development was always motivated by industrial application. At the begining, the main purpose was to answer issues in the mining exploitation field. Then this purpose diversified itself to biology, medical imagery, material science, industrial vision, multimedia, teledetection, geophisic, etc. It consist in a mathematical and informatical theory and technique which is linked with algebra, the lattice theory, topology and probabilities [^SCH1993] .

Currently, one of the mathematical morphology’s main field is Image Processing. It particularly allows to use filtering, segmentation and quantification tools. Since it’s emergence in 1964, it knows a growing success and constitutes a part of many Image Processing softwares yet.

For the purposes of object identification required in industrial vision applications, the operations of mathematical morphology are more useful than the convolution operations employed in signal processing because the morphological operators relate directly to shape.
For this second step corresponding to the Javascript implementation, we had to make our own implementation of the morphological operators (erode, dilate, close, open, hit or miss, watershed and skeletonized) related to the Literature Search.
In this report, we will focus on describe in detail each function in the Material & Methods part. We will then present our results with the use of the same input image sample, followed by a comparison about our implementation and the ImageJ processes. Finally, we will discuss about our work and some possible improvements.

## Material & Methods

[//]: # (Material and Methods: Describe in detail for each function the algorithm used in the implementation. Add a diagram or pseudo-code if necessary. This section is very important because it must help the reading of the source code.)

Each of our functions is built with the same way. We can note the presence of an equivalent of a main function usually associated with the name of the morphological operation, that calls all our secondaries functions used to process the different steps.

Another thing to note is that most of our functions use an intermediate value of 2. Indeed, we set each pixels values at given times pixel by pixel, which would interfere with the global image’s remaining treatment and falsify our results. The primary function will thus set an intermediate value if needed, and then an intermediate function will exchange those intermediate value by the correct ones.


### Erosion

As a reminder, erosion is one of two fundamental operations (the other being dilation) in morphological image processing from which all other morphological operations are based. It was originally defined for binary images, later being extended to grayscale images, and subsequently to complete lattices. Our part of the project (Morphological operation) is focused on binary images, hence the implementation of our erosion (and most of our operations) are based in some binary property like the fact that a pixel can only be in two state : foreground (it’s value thus corresponding to 255) and background (it’s value thus corresponding to 0).

The erosion operation was implemented in Javascript using a candid approach which is the definition itself of an erosion. An erosion is defined as follow by wikipedia (for further details refer to the report from step 1) :

Let E be a Euclidean space or an integer grid, and A a binary image in E. When the structuring element B has a center, and this center is located on the origin of E, then the erosion of A by B can be understood as the locus of points reached by the center of B when B moves inside A. For example, the erosion of a square of side 10, centered at the origin, by a disc of radius 2, also centered at the origin, is a square of side 6 centered at the origin.

To rephrase it with our own word, when a structuring element fits our image (i.e. when all foreground pixels values in the structuring element corresponds to their counterpart in our image), then all the others pixels are turned off except for the center pixel.
To summarize this approach, we had to convert our two images (the one we are working on, and the kernel image) in their raster so we could work more easily with predefine properties. From this point, we had to parse our entire image using the kernel. For each pixel in the original image that have the same value as the center pixel of our kernel, the concordance between the neighbourhood of the center structuring element’s pixel and its counterpart in the image are checked. If those neighbourhoods fits, we just needed to light off the neighbours pixels and return an eroded image.

The main function of the erode process takes as input 2 parameters, the first one is the image that have to be processed, the second argument if an image of the structuring element to apply in order to erode the image. This functions acts like a main, in the regard that apart from creating a copy of the original image (so we don't work in the original one) it will call two functions.

The first function is acting as follows:

The first step if to determine the number of the foreground pixels that are present in our kernel, we use for this the map function in such a way that we scan all the kernel and if a pixel has a value of 255 linked with a counter called "values_foreground”.
Then, we iterate in height and width the raster from the source image, and we fix an other counter named "values" to 0. This variable will have the same goal as the previous one: it will allow us to determine the number of foreground pixels in the raster (we will come back to it later by describing the second function).

From here, for each values in height and width, the concordance between the pixel value associated to this coordinates and the one from the center pixel of our kernel is checked. If the case those values are fitting, the concordance of neighbourhood between kernel and its related is checked using the radius of the kernel. 

If the pixel value from the coordinates of a lenght of minus the radius of the kernel and the radius of the kernel is 255, we add a +1 to our variable "values”. If “values” and "values_foreground" have the same values, the foreground pixels of the kernel have an exact match with the pixels of the raster of the image. As a consequence we set for those coordinates a value of 2. We then return the raster with containing those intermediate pixels.

The second function  is the intermediate function we talked earlier. It will iterate through the raster in heigh and width, and in the case of erosion, change all the pixels with a value of 2 to foreground pixel value (255), and all the other pixels will be set to background pixel ones (0). It returns the final raster containing the good pixel values.

The main function is then in charge to call those two functions, and return the eroded image that will be displayed.

### Dilation

As said in the erosion part, dilation is the other fundamental operations (the first one being erosion) in morphological image processing from which all other morphological operations are based. The same way as the erosion, the dilation was implemented in a naive way, using the definition itself. If we refer to Wikipedia, the dilation definition is as follows:

Let E be a Euclidean space or an integer grid, A a binary image in E, and B a structuring element regarded as a subset of Rd. If B has a center on the origin, then the dilation of A by B can be understood as the locus of the points covered by B when the center of B moves inside A

A great part of the procedure is really similar to the erode process. We will once more iterate through the entire image but this time we won't need to use counters. However, reversely as erosion, we will have to take care of one problem we encountered: the treatment of the image’s boundaries. Since the dilation and the erosion are two close operators, the code and our approach for those two operators are very similar.

The main function of the dilate process takes as input 2 parameters. The first one is the image that have to be processed whereas the second is the structuring element that will dilate the image. This function acts like a main, in the regard that apart from creating a copy of the original image (so we don't work in the original one) it will call two functions.
The first function is acting as follows:

We iterate in height and width the raster from the source image. From here, for each coordinates’ values in height and width, if a pixel as the same value as the one of the center pixel of our kernel, the values of neighbours in both the image and the kernel are checked using once again two for loops this time of the height and width of the structuring element and from minus the radius of the kernel and radius of the kernel. Two steps will occur under those conditions.

First, we will check if we are still in the inner of the image when checking the neighbours. Indeed, during our tests, we have observed that our initial implementation created without those conditions was considering a pixel of the opposite side of the image as a neighbour, instead to have pixels with "no value" or "out of bound" values. Therefore, we created a condition that checks if the neighbours at a given coordinates are inferior of 0 or superior of the height/width of the raster. If it's the case, then those neighbours coordinates aren’t processed. But if there are in the interior of the image, then we check if those neighbours have a value of 0 whereas for a same pad, the pixel value for the kernel is 255. If that is the case, then we set an intermediate value of 2 in the raster image that we will then treat for those given coordinates.

The second function is an intermediate function. It will iterate through the raster in height and width, and in the case of the dilatation, change all the pixels with a value of 2 to foreground pixel (255) without touching others values. It returns the final raster containing the processed pixel values.

The main function is then in charge to call those two functions, and return the dilated image that will be displayed.

### Opening

Opening is a mathematical morphology operator that is used for noise removal. Opening removes small objects from the foreground of an image, placing them in the background. Opening consists in the dilation of the erosion of a set A with a structuring element B. In this case, using the opening operation definition, the opening result of an image, is just an erosion of this image followed by a dilation of the eroded image. This why for the opening operator, we just call the erode main and we put the result of this function into the dilate main function. It results on an opened image.

### Closing

Closing is also a mathematical morphology operator used for noise removal with a difference consisting in that closing removes small holes. Closing consists in the erosion of the dilation of a set A by a structuring element B. As a same way we did for the opening operator, we just call the dilate main and we put the result of this function into the erode main. It results a closed image.

### Hit or Miss

Hit or miss is can also be defined as a basic operation. It is used to detect occurrences of given binary patterns in fixed orientations. In order to do so, a structural element representative from the pattern to detect is set up. This structural element contains both foreground and background pixel, and also contains “don’t care” values that are used for a better structural element/image to process fitting.

The hit-and-miss operation is performed in much the same way as other morphological operators, by translating the origin of the structuring element to all points in the image, and then comparing the structuring element with the underlying image pixels. If the foreground and background pixels in the structuring element exactly match foreground and background pixels in the image, then the pixel underneath the origin of the structuring element is set to the foreground color. If it doesn't match, then that pixel is set to the background color.

The Hit_or_Miss’ function takes two parameters as input: the image to process and the structural element used to find pattern within it. It returns an output image’s raster, which consists of the image’s raster copy. Indeed, the original image’s raster will be used for convolutive iterations in order to determine the patterns. When a pattern is determined, the corresponding center of the structuring element is set to the foreground color at the emplacement of the pixel in the ouput copy. The “don’t care” values figurate on the structural element as every pixel values that differs from 0 and 255.

In a first step, the correspondance between the center of the structural element’s pixel value and each image’s pixel value is tested. We also consider the situation where the center of the structural element’s pixel value corresponds to a “don’t care” value. If the first condition is verified, we compare each of the structuring element’s pixel with it’s counterpart on the image to process by iterating with it’s radius. The “don’t care” values aren’t taken in consideration by the add of a selection condition. Then, if the pattern seeked matches the it counterpart, the coordinates of the pixel that corresponds to the center of the structural element applied to the image is set to the foreground value at the same coordinates on the output raster.

This function also returns the number of matching patterns within the input image.



### Skeletonized

The skeletonization is a part of the morphological operators that will transform the different shapes from image in a thinner version equidistant to their boundaries. It is mainly use in optical character recognition and fingerprint recognition. Skeletons have several different mathematical definitions in the technical literature, and there are many different algorithms for computing them. For our project we decide to implement the algorithm of (??????name?????). This algorithm could be summed up in three main steps. The first one consists in the detection of the edge of the different objects in our image. The second one consists to the removal of the edge’s pixels and the third one consists to do a thinning and to determine what would be the last thinning possible before the final stage where the object dissapear.

In order to do this skeletonize function we had to implement our own personal version of edge detection, but the final version of edge detection will be added by another group.

This function is composed as multiple function like the others. A main function is present, called skeletonize(). It takes an image as input, return a skeletonized of it in output. It creates a raster of the input image, and then call one of the secondary functions : thinning().

This thinning() function uses two additional functions which are is_interior() and is_removable(). The first one, will check the neighbors of pixel at the n index position. Ff a foreground pixel is not neighbor of a background pixel (in x-1,x+1,y-1 or y+1 postion) then it will return a true boolean.

The second one, works and are build in the same way, but instead it will returns true if the a specific pixel is a foreground pixel next to an interior(value of 2) pixel in x-1,x+1,y-1 or y+1 postions.

### Watershed

avant de pouvoir remplir les puis d'eau il faut calculer profondeur des puit, donc distance map prend du binaire re sssort du nivreau de gris(plutot score) Plus le score est eleve plus le background est profond
Passe image en x, pour chaque pixek regarde un angle de la longeur et de la larger au niveau de la longeur pixel.
(angle en haut a gauche). Prend la distance la plus petite des voisins pour coordonées donnée. Check feuille pour savoir les 4 voisins qui sont pris en compte. Selon le voisin concerné la valeur du score n'a pas le meme poids. On cherche le score le plus petit possible qui cocreepond dont au voix voisin le plus proche.
2eme passage : en theorie on fait l'inverse dans le passage on go dans le sens contraire. Permet d'egaliser les scores car au premier passage les valleurs de profoncdeur dons trop elevé.
Toutegoid en fonctione pas possible de faire de fin au début, donc reverse array, et on realiser le premier passage mais comme array inversé bah ça correspond à un 2eme passage, on reinverse ensuite l'array pour obtenir les valeurs finals.
Tout ça pour trouver le meilleues score.




D'abord, regarde tout les max voisins parr apport a un x donnéee
Mainstenant que on a niveau de gris, pour tout x si background on fait rien, des que arrrive pixel, regarde tout les voisins
Pour chaque pixel, regarde tourjous le score plus fort jusqu'a arrivé au score maximum(corredponc au plus profond du puit).
A la fin tout les pixld de la azone qui entoruse la valeurs max auront tours la meme valeurs, ceux d'une autre zoe valeront un autre max, et il y aura donc un separation de zones. 
Code apres is isfloodlimit, si un pixel a une valeur diff de son voisin(sans compter les background) on supprime le pixel ou on est situé.


Probleme rencontré : 
Soucis de plateau, c'est à dire que algo nearmaxvalue regarde les voisins autour d'une positions donnéee. Si les voisins donnée d'une valeur X pour une valeur elle meme egal a X, la fonction va considerer qu'il nexiste pas  de superieur parce que seul les voisins a proximité imédiate sont consideré.
C'est plateau, font donc former des images mal "édecoupé"
voisin doivent etre strictement supérieur

Segmentation faite via le ruisselement,










distance map
segmentation

## Results

[//]: # (Results: Present one example of your function(s). Then, calculate benchmarks with the same image at different size. Recalculate the benchmarks for 8-bit, 16-bit, and float32 images. Display them as diagram. Don't forget to describe them in your text, add a legend.)

## Discussion

[//]: # (Discussion: Comparison of your implementation with those of ImageJ. Is it faster, better, less memory consuming, ...?)

## Conclusion

[//]: # (Conclusion: Conclusion and possible improvements, ...)

## References

[//]: # (References. To complete if required. Be sure that all of your references are called in the text.)
