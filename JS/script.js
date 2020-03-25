import {addClickToImages, addEventListener, lightBox, selectImageforLightBox} from 'lightBoxScript.js';

const searchButton = document.querySelector('#search'); //getting the search button


refreshPage() ; //refreshes the page in middle of a search output

//*****the refresh page button function
function refreshPage() {
        let refrehButton = document.getElementById('refresh');
        refrehButton.addEventListener('click', function() {
        setTimeout(location.reload(true),t)
    });  
 }


//*******appends img src in html for every image recieved from Flickr Api
function showImagesInHtml(data) {
//  console.log("In the show images in HTML function");
    let sendAsOutput = document.getElementById("gallery");
    sendAsOutput.innerHTML = '';
   
    data.photos.photo.forEach(element => {
        let galleryDiv = document.createElement('div')
        galleryDiv.innerHTML = (`<img src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg"/>`);
        gallery.appendChild(galleryDiv); 
    });

    addClickToImages();
}

//*******async funtion that connects with flickr API. Function takes images title search and no of images.
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
//  console.log("The image number goes in url: " + noOfImages);
    const url = `${BASE_URL}${METHOD}${KEY}${SORT_RELEVANCE}${FORMAT}&text=${tagName}${PER_PAGE}&page=${page}`;

//console.log("The Url " + url);
    try {
        let response = await fetch(url);
        let data = await response.json();
   //   console.log("The data " + data);
        showImagesInHtml(data);
     } catch(error) {
         console.log('ERROR IN FTECH: ', error);
     }
//    console.log(" " + imageName + " " + imageNum);
}

//*******buttons that take values from the search bar and send those values to function searchTheAPi
searchButton.addEventListener('click', function() {
    let imageName = document.querySelector('#searchBarId').value;
    let imageNum = document.querySelector('#numberBarId').value;
    searchTheApi(imageName, imageNum);
});