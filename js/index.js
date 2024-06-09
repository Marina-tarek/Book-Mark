
var siteNameInput = document.getElementById('SiteName');
var siteLinkInput = document.getElementById('SiteURL');
var SubmitBtn = document.getElementById("SubmitBtn")

var boxAlert = document.getElementById("boxAlert");
var boxAlerSection = document.getElementById("boxAlerSection");

var btnVisit = document.querySelectorAll(".btn-visit");
var btnDelete = document.querySelectorAll(".btn-delete");;
var closeIcon = document.getElementById('closeIcon');
var siteList;
var isOpen = false



if (localStorage.getItem('sites') == null) {
    siteList = [];
}
else {
    // zbon adim 
    siteList = JSON.parse(localStorage.getItem('sites'));
    displayProduct();
}
SubmitBtn.addEventListener('click', addproduct)
function addproduct() {
    var site = {
        code: siteNameInput.value,
        link: siteLinkInput.value,
    }
    siteList.push(site);
    clearInput();
    displayProduct()
    localStorage.setItem('sites', JSON.stringify(siteList));

}
// clear input after submit
function clearInput() {
    siteNameInput.value = "";
    siteLinkInput.value = "";
}
function displayProduct(x) {

    var cartona = '';
    for (var i = 0; i < siteList.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${siteList[i].code}</td>
        <td><button  class="btn btn-visit text-white rounded-2"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
        <td><button onclick="deleteInput(${i})" class='btn btn-delete  text-white rounded-2'><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
      </tr>`;
    }
    document.getElementById('tableContent').innerHTML = cartona;
}


// when need to delet url and siteNameInput
function deleteInput(deletIndex) {
    siteList.splice(deletIndex, 1);
    displayProduct();
    localStorage.setItem('sites', JSON.stringify(siteList));
}



// show slider
function showSlider() {
    isOpen = true;
    boxAlert.classList.replace("oldStyle", "newStyle");
}


// close slider
// 1 clos Btn
closeIcon.addEventListener('click', hideSlider)
// 2 
boxAlerSection.addEventListener('click', function (e) { e.stopPropagation(); })
boxAlert.addEventListener('click', hideSlider);
function hideSlider() {
    isOpen = false;
    boxAlert.classList.replace("newStyle", "oldStyle");
}
// 3 Esc key
document.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') {
        hideSlider();
    }
})

