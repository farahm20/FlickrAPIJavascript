/*I have split all lightBox functions and refreshPage in a seperate js file, 
This is done for clarity since; 
1: all the variables and functions used for lighbox are not required for the Flickr API functions 
2: they require more styling, further more if in future some modifications are 
required it will be easier to just access thees functions from a separate file. 
The same goes for the refreshPage function.  */

const galleryItems = document.querySelector(".gallerySection").children;
const lightBoxContainer = document.querySelector(".lightBox");
const lightBoxImage = document.querySelector(".lightBoxImage");
let index;
let imageSrc;

refreshPage() ; //refreshes the page in middle of a search output
//*****the refresh page button function
export function refreshPage() {
        let refrehButton = document.getElementById('refresh');
        refrehButton.addEventListener('click', function() {
        setTimeout(location.reload(true),t)
    });  
}

//******LightBOX event listener added to all the images recived from flickr api
export function addClickToImages(){
    for(let i = 0; i < galleryItems.length ; i++){
        console.log("For loop: all gallery Items " + galleryItems[i]);
        galleryItems[i].addEventListener("click", function(){
            console.log(i);
            index = i;

            selectImageforLightBox();
            lightBox();
        })
    }
}

//*******LightBOX will close if clicked outside the picture or on x
lightBoxContainer.addEventListener("click", function(event){
    if(event.target !== lightBoxImage){
        lightBox();
    }
})

//*******LightBOX: selects the picture to show in lightbox.
export function lightBox(){
    console.log("In teh lightbox function" + lightBoxContainer);
    lightBoxContainer.classList.toggle("open");
}

//*******LightBOX: this will select images to appear in the lightbox. 
export function selectImageforLightBox () {
    console.log(galleryItems[index])
    imageSrc = galleryItems[index].querySelector("img").getAttribute("src");
    console.log("In the selectImageforLightBox function " + imageSrc);
    lightBoxImage.src = imageSrc;
}

