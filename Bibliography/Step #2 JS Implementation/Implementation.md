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

The main function of the erode process if *erode(img,struct)*. It takes as input 2 parameters, the first one if the image that need to be eroded,the second argument if an image of the structurent element you wish to erode your image with.
This functions acts like a main, in the regard that apart from creating a copy of the original image(so we don't work in the original one) it will call two functions : *erode_process(r_img,struct)* and *process_operation_erode(r_output)* and return an eroded image. We will describe those function below.

In order to do the erode operation, *process_operation_erode(raster,struct)* is the first function call. The first step if to determine the number of the foreground pixels that are present in our kernel, we use for this the map function in such a way that we scan all the kernek and if a pixel as a value of 255, then we add a +1 to a constant named "values_foreground". The number of this constant is then egual to the number of foreground pixel in our kernel.

Then, we iterate in height and width the raster (that we took care to create) from the source image, and we fix a constant "values" to 0. This variable will have the same goal as the previous constant, it will allow us to determine the number of foreground pixels in the raster(we will come back to it).

From here, for each y,x values in height and width if a pixel as the same value as the one of the center pixel of our kernel, then from those coordinates, we check using once again two for loops this time of the height and width of the structuring element and from minus the radius of the kernel and radius of the kernel the values of neighbors in both the image and the kernel. If the pixel value from those first coordinates of a lenght of minus the radius of the kernel and the radius of the kernel is 255 then we had a +1 to our variable "values. If this constant and the "values_foreground" constant have the same values, then it means that the foreground pixels of the kernel have an exact match with the pixels of the raster of the image and so we set for those x,y coordinates a value of 2. We then return the raster with containing those intermediate pixels.

The last function *process_operation_erode(r_output)* is the intermediate function we talked earlier. It will iterate through the raster in heigh and width, and in the case of the erode, change all the pixels with a value of 2 to foreground pixel(255), and all the other pixels will be set to background pixel(0). It return the final raster containing the good pixel values.

The *erode(img,struct)* is then in charge to call those two functions, and return the eroded image that will be diplayed.

### Dilation

As said in the erosion part, dilation is the other fundamental operations (the first one being erosion) in morphological image processing from which all other morphological operations are based. The same way as the erosion, the dilation was implemented in a naive way, using the definition itself. If we refer to Wikipedia, the dilation definition it the follow :

*Let E be a Euclidean space or an integer grid, A a binary image in E, and B a structuring element regarded as a subset of Rd.
If B has a center on the origin, then the dilation of A by B can be understood as the locus of the points covered by B when the center of B moves inside A*

Part of the procedure is really similar to the erode process. We will once more iterate through the entire image but this time we won't need to use counting values. However, in contrary of erosion, we will have to take care of one problem we encountered : the concern of the boundaries of the image. Since the dilation and the erosion are two close operators, the code and our approach for those two operators are very similar.

The main function of the dilate process if *dilate(img,struct)*. It takes as input 2 parameters, the first one if the image that need to be eroded, the second argument if an image of the structurent element you wish to erode your image with.
This functions acts like a main, in the regard that apart from creating a copy of the original image(so we don't work in the original one) it will call two functions : *dilate_process(r_img,struct)* and *process_operation_dilate(r_output)* and return a dilated image. We will describe those function below.


In order to do the dilate operation, *process_operation_dilate(raster,struct)* is the first function call. We iterate in height and width the raster (that we took care to create) from the source image.

From here, for each y,x values in height and width, if a pixel as the same value as the one of the center pixel of our kernel, then from those coordinates, we check using once again two for loops this time of the height and width of the structuring element and from minus the radius of the kernel and radius of the kernel the values of neighbors in both the image and the kernel. Two steps will occurs under those if conditions.

First, we will check that when we check for the neighbors we are still in the interior of the image. Indeed, during our tests, we have observed that our initial functial without that conditions will considerer a pixel of the opposite side od the image as a neighbord, instead to have pixels with "no value" or "out of bound" values. Therefore, we created a condition that will check if the neighors at a x,y coordinates are inferior of 0 or superior of the height/widht of the raster. If it's the case, then those neightbors coordinated are not processed. But if there are in the interior of the image, then we check if those neighbors have a value of 0 whereas for a same pad, the pixel value for the kernel is 255. If that is the case, then for those given x,y we set an intermediate value of 2 in the raster image that we will then treat.

The last function *process_operation_dilate(r_output)* is an intermediate function. It will iterate through the raster in heigh and width, and in the case of the dialtion, change all the pixels with a value of 2 to foreground pixel(255) whitout touching the others values. It return the final raster containing the good pixel values.

The *dilate(img,struct)* is then in charge to call those two functions, and return the dilated image that will be diplayed.

### Opening

Opening is mathematical morphology operator that is used for noise removal. Opening removes small objects from the foreground of an image, placing them in the background. Opening is the dilation of the erosion of a set A by a structuring element B. In this case, using the opening operation definition, the opening result of an image, is just an erosion of this image followed by a dilation of the eroded image.
This why for the opening operator, we just call the *erode(img,struct)* and we put the result of this function in the *dilate(img,struct)* function. This result in obtaining an opened image.

### Closing

Together with opening, closing in an mathematical morphlogy operator used for noise removal.At the difference of closing removes small holes.
Closing is the erosion of the dilation of a set A by a structuring element B. The same way as we did for the opening operator, we just call the *dilate(img,struct)* and we put the result of this function in the *erode(img,struct)*. This result in obtaining a closed image.

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
