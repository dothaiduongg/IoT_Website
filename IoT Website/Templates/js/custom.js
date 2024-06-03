// nav menu style
var nav = $("#navbarSupportedContent");
var btn = $(".custom_menu-btn");
btn.click
btn.click(function (e) {

    e.preventDefault();
    nav.toggleClass("lg_nav-toggle");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style")
});


function getCurrentYear() {
    var d = new Date();
    var currentYear = d.getFullYear()

    $("#displayDate").html(currentYear);
}

getCurrentYear();



// khoi tao cac thong so
let btn1 = document.querySelector('#btn1');
let img1 = document.querySelector('#bulb');
let btn2 = document.querySelector('#btn2');
// functions nut bam
// const database=firebase.database();
// const deviceRef=database.ref('quan1');

btn1.addEventListener('click', ()=>{
    img1.src = 'images/on_light.png'; 
    firebase.database().ref("thietbi1").set({Lamp:"ON"})
})
btn2.addEventListener('click', ()=>{
    img1.src = 'images/off_light.png';
    firebase.database().ref("thietbi1").set({Lamp:"OFF"})
})


// khoi tao cac thong so
let btn3 = document.querySelector('#btn3');
let img2 = document.querySelector('#air_con');
let btn4 = document.querySelector('#btn4');
// functions nut bam
btn3.addEventListener('click', ()=>{
    img2.src = 'images/air_conditioning_on.png'; 
    firebase.database().ref("thietbi2").set({AirConditioning:"ON"})
})

btn4.addEventListener('click', ()=>{
    img2.src = 'images/air_conditioning_off.png';
    firebase.database().ref("thietbi2").set({AirConditioning:"OFF"})
})


// khoi tao cac thong so
let btn5 = document.querySelector('#btn5');
let img3 = document.querySelector('#ceiling-fan');
let btn6 = document.querySelector('#btn6');
// functions nut bam
// const database=firebase.database();
// const deviceRef=database.ref('quan1');

btn5.addEventListener('click', ()=>{
    img3.src = 'images/air-conditioner.png'; 
    firebase.database().ref("thietbi3").set({Fan: "ON"})
})
btn6.addEventListener('click', ()=>{
    img3.src = 'images/ceiling-fan.png';
    firebase.database().ref("thietbi3").set({Fan:"OFF"})
})