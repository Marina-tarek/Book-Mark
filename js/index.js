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
    const inputElname = document.getElementById("SiteName").value;
    const inputElurl = document.getElementById("SiteURL").value;
    var site = {
        code: siteNameInput.value,
        link: siteLinkInput.value,
    }
    siteList.push(site);
    // if (inputElurl === "" || inputElname === "") {
    //     showSlider()
    // } else {
    displayProduct();
    clearInput();


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
            <td><button onclick="visitSite(${i})" class="btn btn-visit text-white rounded-2"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
            <td><button onclick="deleteInput(${i})" class='btn btn-delete  text-white rounded-2'><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
        </tr>`;
    }
    document.getElementById('tableContent').innerHTML = cartona;
}

// show slider
function showSlider() {
    isOpen = true;
    const inputElname = siteNameInput.value;
    const inputElurl = siteLinkInput.value;
    // let res = inputElname.charAt(inputElname.length - 1);
    // const count = inputElname.trim().split(/\s+/).length;
    if (inputElurl === "" || inputElname === "") {
        boxAlert.classList.replace("oldStyle", "newStyle");
        //   stop.displayProduct()
    }
}

// validate 
nameRegex = /^\w{3,}(\s+\w)?$/
urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
siteNameInput.addEventListener('input', function () {
    validation(siteNameInput, nameRegex)
})
siteLinkInput.addEventListener('input', function () {
    validation(siteLinkInput, urlRegex)
})
function validation(x, y) {
    var testReg = y
    if (testReg.test(x.value)) {
        x.classList.add("is-valid");
        x.classList.remove("is-invalid");
    } else {
        x.classList.add("is-invalid");
        x.classList.remove("is-valid");
    }
}

// visit site
function visitSite(y) {
    window.open(siteList[y].link);

}

// when need to delet url and siteNameInput
function deleteInput(deletIndex) {
    siteList.splice(deletIndex, 1);
    displayProduct();
    localStorage.setItem('sites', JSON.stringify(siteList));
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

