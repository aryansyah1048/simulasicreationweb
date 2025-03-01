// Slide
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function (event) {
  event.preventDefault();
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};
//event prev click
prev.onclick = function (event) {
  event.preventDefault();
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};
// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 1000000);
function showSlider() {
  // remove item active old
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  // active new item
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");
  setPositionThumbnail();

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
}
function setPositionThumbnail() {
  let thumbnailActive = document.querySelector(".thumbnail .item.active");
  let rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

// hamburger menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden"); // Sembunyikan/munculkan menu
  mobileMenu.classList.toggle("block"); // Pastikan muncul saat di-toggle
});

// navbar
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled", "py-0");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.remove("scrolled", "py-0");
    navbar.classList.add("bg-transparent");
  }
});

// our team
document.querySelectorAll(".open-modal").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = this.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

document.querySelectorAll(".close-modal").forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".member-modal").style.display = "none";
  });
});

window.addEventListener("click", function (e) {
  document.querySelectorAll(".member-modal").forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
