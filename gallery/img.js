var listImages = null;
var currentPage = 1;
function onLoad(){
    const url= "https://jsonplaceholder.typicode.com/albums/1/photos";
    fetch(url)
    .then(res => res.json())
    .then((listImage) => {
        listImages = listImage;
        buildPagination(listImages);
        changePage(1, listImages);
    })
    .catch(err => { throw err });
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
    modal.style.display = "none";
    }
}

function getHtmlDiv(i){
    var div = document.createElement("div");
    div.id = "div" + i;
    div.classList.add("divPlace");
    return div;
}

function getHtmlImage(image, i){
    var img = document.createElement("img");
    img.id = i;
    img.classList.add("myImg");
    img.src = image.url;
    img.alt = image.title;
    return img;
}

function getHtmlDeleteImage(index){
    var span = document.createElement("span");
    span.title = index;
    span.classList.add("delete")
    span.innerHTML = '&times;';
    span.onclick = function(span){
                listImages.splice(parseInt(span.currentTarget.title), 1);
                span.currentTarget.parentElement.innerHTML = '';
                buildPagination(listImages);
                changePage(currentPage, listImages);
            }
    return span;
}

function buildPagination (listImages) {
    document.getElementsByClassName("pagination")[0].innerHTML = "";
    var numberOgPages = numPages(listImages);
    var prevPageButton = document.createElement("a");
    prevPageButton.id = "btn_prev";
    prevPageButton.href = "javascript:prevPage()";
    prevPageButton.innerHTML = '&raquo;';
    var nextPageButton = document.createElement("a");
    nextPageButton.id = "btn_next";
    nextPageButton.href = "javascript:nextPage()";
    nextPageButton.innerHTML = '&laquo;';
    document.getElementsByClassName("pagination")[0].appendChild(prevPageButton);
    for (var i = 1; i <= numberOgPages; i++) {
        var pageNumber = document.createElement("a");
        pageNumber.id = "p" + i;
        pageNumber.href = "javascript:changePage(" + i + ")";
        pageNumber.innerHTML = '&nbsp;&nbsp;' + i + '&nbsp;&nbsp;';
        document.getElementsByClassName("pagination")[0].appendChild(pageNumber);
    }
    document.getElementById("p1").classList.add("pageActive");
    document.getElementsByClassName("pagination")[0].appendChild(nextPageButton);
}

function prevPage() {
    if (currentPage > 1) {
        hihglightPageNumber(currentPage);
        currentPage--;
        changePage(currentPage, listImages);
    }
}

function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        hihglightPageNumber(currentPage);
        changePage(currentPage, listImages);
    }
}

function numPages(images) {
    if(images === null || images === undefined)
        images = listImages;
    var numberOgPages = Math.ceil(images.length / 4);
    return numberOgPages;
}

function changePage(page, images) {
    clear();
    if (images === null || images === undefined) {
            images = listImages;
    }
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");

    if (page < 1) 
        page = 1;
    if (page > numPages(images))
        page = numPages(images);


    for (var i = (page - 1) * 4; i < (page * 4); i++) {
        var imgDiv = document.getElementById("imgDiv");
        var modal = document.getElementById("modal");
        imgDiv.appendChild(getHtmlDiv(i));
        var thisDiv = document.getElementById("div" + i);
        thisDiv.appendChild(getHtmlDeleteImage(i));
        thisDiv.appendChild(getHtmlImage(images[i], i));
        var img = document.getElementById(i);
        var modalImg = document.getElementById("imgModal");
        // var captionText = document.getElementById("caption");
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            // captionText.innerHTML = this.alt;
        }
    }
    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } 
    else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages(listImages)) {
        btn_next.style.visibility = "hidden";
    } 
    else {
        btn_next.style.visibility = "visible";
    }
    hihglightPageNumber(page);
}

function hihglightPageNumber(pageNumber){
    currentPage = pageNumber;
    document.getElementsByClassName("pageActive")[0].classList.remove("pageActive");
    document.getElementById("p" + pageNumber).classList.add("pageActive");
}

function clear() {
    var imgDiv = document.getElementById("imgDiv");
    imgDiv.innerHTML = "";
}