const searchButton = document.querySelector('#search');
const imagesCollection = document.querySelector('.main');
const galleryItems = document.querySelector(".gallerySection").children;
//console.log("The galelrySection Div: " + galleryItems);

const lightBoxContainer = document.querySelector(".lightBox");
const lightBoxImage = document.querySelector(".lightBoxImage");
let index;
let imageSrc;
refreshPage() ;
function addClickToImages(){
    for(let i = 0; i < galleryItems.length ; i++){
        console.log("For loop: all gallery Items " + galleryItems[i]);
        galleryItems[i].addEventListener("click", function(){
            console.log(i);
            index = i;

            changeImage();
            lightBox();
        })
    }
}
lightBoxContainer.addEventListener("click", function(event){
    if(event.target !== lightBoxImage){
        lightBox();
    }
})

function lightBox(){
    console.log("In teh lightbox function" + lightBoxContainer);
    lightBoxContainer.classList.toggle("open");
}

function changeImage () {
    console.log(galleryItems[index])
    imageSrc = galleryItems[index].querySelector("img").getAttribute("src");
    console.log("In the changeImage function " + imageSrc);
    lightBoxImage.src = imageSrc;
}

function showImagesInHtml(data) {
    console.log("In the show images in HTML function");
    let sendAsOutput = document.getElementById("gallery");
    data.photos.photo.forEach(element => {
        let galleryDiv = document.createElement('div')
     galleryDiv.innerHTML = (`<img src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg"/>`);
        gallery.appendChild(galleryDiv); 
    });

    addClickToImages();
}

async function searchTheApi(imageName, imageNum)
{
    let tagName = imageName;
    let noOfImages = imageNum;
    let page = 1;

    const BASE_URL = 'https://api.flickr.com/services/rest?'
    const METHOD = 'method=flickr.photos.search'
    const KEY = '&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d'
    const FORMAT = '&format=json&nojsoncallback=1'
    const SORT_RELEVANCE = '&sort=relevance'
    const PER_PAGE = '&per_page=' + noOfImages;
    console.log("The image number goes in url: " + noOfImages);
    const url = `${BASE_URL}${METHOD}${KEY}${SORT_RELEVANCE}${FORMAT}&text=${tagName}${PER_PAGE}&page=${page}`;

//here will come the title and num of photos user wants
//    console.log("The Url " + url);

    try {
        let response = await fetch(url);
        let data = await response.json();
   //   console.log("The data " + data);
        showImagesInHtml(data);
   //     addInHtml(data);
     } catch(error) {
         console.log('ERROR IN FTECH: ', error);
     }

    console.log(" " + imageName + " " + imageNum);
}

searchButton.addEventListener('click', function() {
    let imageName = document.querySelector('#searchBarId').value;
    let imageNum = document.querySelector('#numberBarId').value;
    searchTheApi(imageName, imageNum);
});

function refreshPage() {
    let refrehButton = document.getElementById('refresh');
    refrehButton.addEventListener('click', function() {
         setTimeout(location.reload(true),t)
    });  
 }


