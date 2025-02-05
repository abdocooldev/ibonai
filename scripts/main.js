// Toggle Mobile Menu
let menuToggler = document.querySelector(".menu.icon");
let mobileMenu = document.querySelector(".mobile-menu");
let menuOverlay = document.querySelector(".overlay");
menuToggler.addEventListener("click", (e) => {
  mobileMenu.classList.toggle("active");
});
menuOverlay.onclick = (e) => {
  mobileMenu.classList.remove("active");
};

// Hide Menu on Scroll
window.onscroll = (e) => {
  if (scrollY > 110) {
    mobileMenu.classList.remove("active");
  }
};

// Products Slider
let products = document.querySelectorAll(".products-list .product-details");
let productContainer = document.querySelector("#product");
let thums = document.querySelectorAll(".thums li");

products.forEach((product) => {
  product.onclick = (e) => {
    let target = e.currentTarget;
    if (!target.classList.contains("active")) {
      products.forEach((product) => product.classList.remove("active"));
      target.classList.add("active");
      //   Replace Content
      productContainer.querySelector(".product-name").textContent =
        target.querySelector(".product-name").textContent;
      productContainer.querySelector(".product-description").textContent =
        target.querySelector(".product-description").textContent;
      productContainer.querySelector(".product-price").textContent =
        target.querySelector(".product-price").textContent;
      // Animate PRoduct Image
      productContainer.querySelector(".product-image").classList.add("scaling");
      setTimeout(() => {
        productContainer.querySelector(".product-image img").src =
          target.querySelector(".product-image img").src;
        setTimeout(() => {
          productContainer
            .querySelector(".product-image")
            .classList.remove("scaling");
        }, 300);
      }, 300);
    }
  };
  thums.forEach((thum) => {
    thum.onclick = (e) => {
      let target = e.currentTarget;
      if (!target.classList.contains("active")) {
        thums.forEach((thum) => thum.classList.remove("active"));
        target.classList.add("active");
      }
    };
  });
});
// Sections Observer (Homepage Sections)
const observer = new IntersectionObserver(
  (sections) => {
    sections.forEach((section) => {
      const intersecting = section.isIntersecting;
      if (intersecting && !section.target.classList.contains("showing")) {
        section.target.classList.add("showing");
      }
    });
  },
  {
    rootMargin:
      innerHeight >= 1000
        ? "0px 0px -400px"
        : innerWidth > 700
        ? "0px 0px -200px"
        : "0px 0px -250px",
  }
);
let sections = document.querySelectorAll("section");
sections.forEach((section) => {
  observer.observe(section);
});
