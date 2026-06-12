/* ===================================
   THEME TOGGLE
=================================== */

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeToggle.innerHTML = "☀️";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeToggle.innerHTML = "☀️";
    }else{
        localStorage.setItem("theme","light");
        themeToggle.innerHTML = "🌙";
    }

});


/* ===================================
   MOBILE MENU
=================================== */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if(hamburger){

    hamburger.addEventListener("click", () => {

        if(navLinks.style.display === "flex"){
            navLinks.style.display = "none";
        }else{
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "80px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "#111";
            navLinks.style.padding = "20px";
        }

    });

}


/* ===================================
   MENU FILTERING
=================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        menuItems.forEach(item => {

            if(
                filter === "all" ||
                item.classList.contains(filter)
            ){
                item.style.display = "block";
            }else{
                item.style.display = "none";
            }

        });

    });

});


/* ===================================
   SHOPPING CART
=================================== */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const cartItemsContainer =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

const cartCount =
document.getElementById("cartCount");

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.toggle("active");
});

const addButtons =
document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const item = {
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };

        cart.push(item);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCart();

        showToast(
            `${item.name} added to cart`
        );

    });

});


function updateCart(){

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price;

        const div =
        document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        `;

        cartItemsContainer.appendChild(div);

    });

    totalPrice.innerText = total;

    cartCount.innerText = cart.length;

}

updateCart();


/* ===================================
   CHECKOUT
=================================== */

const checkoutBtn =
document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        showToast(
            "Cart is empty!"
        );

        return;
    }

    showToast(
        "Checkout successful (Demo)"
    );

    cart = [];

    localStorage.removeItem("cart");

    updateCart();

});


/* ===================================
   RESERVATION FORM
=================================== */

const reservationForm =
document.getElementById(
    "reservationForm"
);

reservationForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    showToast(
        "Reservation request submitted!"
    );

    reservationForm.reset();

});


/* ===================================
   REVIEW CAROUSEL
=================================== */

const reviews =
document.querySelectorAll(".review");

let reviewIndex = 0;

function rotateReviews(){

    reviews.forEach(review =>
        review.classList.remove("active")
    );

    reviewIndex++;

    if(reviewIndex >= reviews.length){
        reviewIndex = 0;
    }

    reviews[reviewIndex]
    .classList.add("active");

}

setInterval(
    rotateReviews,
    4000
);


/* ===================================
   TOAST NOTIFICATION
=================================== */

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add("show");
    },100);

    setTimeout(()=>{
        toast.remove();
    },3000);

}


/* ===================================
   TOAST STYLES
=================================== */

const toastStyle =
document.createElement("style");

toastStyle.innerHTML = `
.toast{
position:fixed;
bottom:30px;
right:30px;
background:#C62828;
color:#fff;
padding:15px 25px;
border-radius:10px;
opacity:0;
transform:translateY(20px);
transition:.3s;
z-index:99999;
}

.toast.show{
opacity:1;
transform:translateY(0);
}
`;

document.head.appendChild(toastStyle);


/* ===================================
   SCROLL ANIMATIONS
=================================== */

const revealElements =
document.querySelectorAll(
"section, .menu-item, .gallery-grid img"
);

const observer =
new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity = "1";
entry.target.style.transform =
"translateY(0)";

}

});

},
{
threshold:0.15
}
);

revealElements.forEach(el=>{

el.style.opacity = "0";
el.style.transform =
"translateY(40px)";
el.style.transition =
"all 0.8s ease";

observer.observe(el);

});


/* ===================================
   SMOOTH ACTIVE NAV LINKS
=================================== */

const sections =
document.querySelectorAll("section");

const navAnchors =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const top =
section.offsetTop - 150;

if(pageYOffset >= top){

current = section.getAttribute("id");

}

});

navAnchors.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
=== "#" + current
){

link.classList.add("active");

}

});

});


/* ===================================
   PWA REGISTRATION
=================================== */

if(
"serviceWorker" in navigator
){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker.register(
"./service-worker.js"
)
.then(()=>{

console.log(
"Service Worker Registered"
);

})
.catch(error=>{

console.log(error);

});

});

}


/* ===================================
   ONLINE STATUS
=================================== */

window.addEventListener(
"offline",
()=>{

showToast(
"You're offline"
);

});

window.addEventListener(
"online",
()=>{

showToast(
"Back online"
);

});


/* ===================================
   INSTAGRAM MOCK API
=================================== */

console.log(
"Instagram API integration placeholder"
);

/*
Real integration requires:

Instagram Graph API
Access Token
Backend Proxy

Example:

fetch(
'https://graph.instagram.com/me/media?...'
)

*/


/* ===================================
   GOOGLE MAP READY
=================================== */

console.log(
"Google Maps loaded"
);


/* ===================================
   FUTURE PAYMENT INTEGRATIONS
=================================== */

/*
Stripe

Razorpay

Backend Required

Example:

fetch('/create-order')

*/

console.log(
"Payment integrations ready"
);