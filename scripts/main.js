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
// Products Slider
let products = document.querySelectorAll(".products-list .product-details");
let productsSection = document.querySelector(".products-section");
let productContainer = document.querySelector("#product");
let thumsSlider = document.querySelector("#thums-slider");
let thums = document.querySelectorAll(".thums li");
let thumsEl = document.querySelector(".thums");
let thumsContainer = document.querySelector(".thums-container");
let firstThum = document.querySelector(".thums li");
const thumsGap =
  thumsEl &&
  Number.parseInt(getComputedStyle(thumsEl, "").getPropertyValue("gap"));
const thumWidth =
  firstThum &&
  Number.parseInt(getComputedStyle(firstThum, "").getPropertyValue("width"));
let nextThum = document.querySelector(".next-thum");
let prevThum = document.querySelector(".prev-thum");
const scrollDistance = thumWidth + thumsGap;
let translateValue = 0;
let firstThumView = thumsSlider && +thumsSlider.dataset.start;
let lastThumView = thumsSlider && +thumsSlider.dataset.end;
let sliderHeight = productsSection.clientHeight;
let newSliderHeight = sliderHeight + 100;

// Remove & add Active Class
function activeClass(target) {
  products.forEach((product, i) => {
    product.classList.remove("active");
    thums[i].classList.remove("active");
  });
  target.classList.add("active");
  thumsSlider.dataset.activeIndex = target.dataset.index;
  thums[target.dataset.index].classList.add("active");
}
// Update Showing Product Content
function updateActiveContent(target) {
  productContainer.querySelector(".product-name").textContent =
    target.querySelector(".product-name").textContent;
  productContainer.querySelector(".product-description").innerHTML =
    target.querySelector(".product-description").title;
  productContainer.querySelector(".product-price").textContent =
    target.querySelector(".product-price").textContent;
}
// Update Product Image
function updateActiveImage(target) {
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
// Call Methods that Update Product Slider
function updateActiveProduct(target) {
  activeClass(target);
  updateActiveContent(target);
  updateActiveImage(target);
}
// Trunc Overflow Description Text
function trunctOverflowText() {
  products.forEach((product) => {
    let productDescription = product.querySelector(".product-description");
    let productName = product.querySelector(".product-name");
    if (!productDescription.title.length) {
      productName.title = productName.textContent;
      productDescription.title = productDescription.innerHTML
        .split("\n")
        .join("")
        .split(" ")
        .filter((s) => s !== "")
        .join(" ");
    }
    productDescription.innerHTML = `${productDescription.title.slice(
      0,
      80
    )}...`;
  });
  let targetDescription = document.querySelector(
    ".product-details.active .product-description"
  );
  targetDescription.innerHTML = `${targetDescription.title
    .split("<br>")
    .join("")
    .slice(0, 65)}...`;
}
// Next Thum Slide
function nextThumSlide(target, disVal, maxSlide) {
  let activeIndex = document.querySelector(".product-details.active").dataset
    .index;
  if (!nextThum.classList.contains("noscroll")) {
    prevThum.classList.remove("noscroll");
    prevThum.classList.remove("disabled");
    let maxDistance = scrollDistance * (thums.length - 5);
    translateValue = maxSlide ? maxDistance : translateValue + disVal;
    thumsEl.style.translate = `${translateValue}px`;
    // if last slide in view
    if (lastThumView == --thums.length) {
      nextThum.classList.add("noscroll");
    }
    updateActiveProduct(target);
  } else if (!nextThum.classList.contains("disabled")) {
    thumsSlider.dataset.activeIndex = ++activeIndex;
    updateActiveProduct(target);
    // if last slide active
    if (activeIndex == --thums.length) {
      nextThum.classList.add("disabled");
    }
  }
}
// Prev Thum Slide
function prevThumSlide(target, disVal, minSlide) {
  let activeIndex = document.querySelector(".product-details.active").dataset
    .index;
  if (!prevThum.classList.contains("noscroll")) {
    nextThum.classList.remove("noscroll");
    nextThum.classList.remove("disabled");
    let minDistance = 0;
    translateValue = minSlide ? minDistance : translateValue - disVal;
    thumsEl.style.translate = `${translateValue}px`;
    // if first slide in view
    if (firstThumView == 0) {
      prevThum.classList.add("noscroll");
    }
    updateActiveProduct(target);
  } else if (!prevThum.classList.contains("disabled")) {
    thumsSlider.dataset.activeIndex = --activeIndex;
    updateActiveProduct(target);
    // if last slide active
    if (activeIndex == 0) {
      prevThum.classList.add("disabled");
    }
  }
}

function switchThumSlide(target) {
  let currentIndex = document.querySelector(".product-details.active").dataset
    .index;
  if (target) {
    let multiVal = 0;
    let disVal = 0;
    if (target.dataset.index > currentIndex) {
      if (target.dataset.index < thums.length - 2) {
        multiVal = +target.dataset.index + 2 - lastThumView;
        multiVal = multiVal > 0 ? multiVal : 0;
        firstThumView += multiVal;
        lastThumView += multiVal;
        thumsSlider.dataset.start = firstThumView;
        thumsSlider.dataset.end = lastThumView;
        disVal = scrollDistance * multiVal;
        nextThumSlide(target, disVal, false);
      } else if (target.dataset.index == thums.length - 2) {
        firstThumView = thums.length - 5;
        lastThumView = thums.length - 1;
        thumsSlider.dataset.start = firstThumView;
        thumsSlider.dataset.end = lastThumView;
        nextThumSlide(target, disVal, true);
      } else {
        firstThumView = thums.length - 5;
        lastThumView = thums.length - 1;
        thumsSlider.dataset.start = firstThumView;
        thumsSlider.dataset.end = lastThumView;
        nextThumSlide(target, disVal, true);
        nextThum.classList.add("disabled");
      }
    } else {
      if (target.dataset.index > 1) {
        multiVal = lastThumView - target.dataset.index;
        multiVal -= 2;
        multiVal = multiVal > 0 ? multiVal : 0;
        firstThumView -= multiVal;
        lastThumView -= multiVal;
        thumsSlider.dataset.start = firstThumView;
        thumsSlider.dataset.end = lastThumView;
        disVal = scrollDistance * multiVal;
        prevThumSlide(target, disVal, false);
      } else if (target.dataset.index == 1) {
        firstThumView = 0;
        lastThumView = 4;
        thumsSlider.dataset.start = firstThumView;
        thumsSlider.dataset.end = lastThumView;
        prevThumSlide(target, disVal, true);
      } else {
        firstThumView = 0;
        lastThumView = 4;
        thumsSlider.dataset.start = firstThumView;
        thumsSlider.dataset.end = lastThumView;
        prevThumSlide(target, disVal, true);
        prevThum.classList.add("disabled");
      }
    }
  }
}
function onScreenResized() {
  if (innerWidth > 768) {
    thumsEl.style.width = "auto";
    thumsContainer.style.width = "auto";
    let thumsElWidth = thumsEl.clientWidth;
    let thumsContainerWidth = thumWidth * 5 + thumsGap * 4;
    thumsEl.style.width = `${thumsElWidth}px`;
    thumsContainer.style.width = `${thumsContainerWidth}px`;
    setTimeout(() => {
      productsSection.style.minHeight = `${sliderHeight}px`;
      removeEventListener("resize", onScreenResized);
    }, 2000);
  } else {
    productsSection.style.minHeight = `${newSliderHeight}px`;
  }
}
if (products.length) {
  window.addEventListener("resize", onScreenResized);
  if (innerWidth <= 768) {
    productsSection.style.minHeight = `${newSliderHeight}px`;
  } else {
    onScreenResized();
  }
  trunctOverflowText();

  products.forEach((product, index) => {
    // Product Clicked Functionality
    product.onclick = (e) => {
      let target = e.currentTarget;

      if (!target.classList.contains("active")) {
        switchThumSlide(target);
        trunctOverflowText();
      }
    };
    // Sync Thumnails
    thums.forEach((thum) => {
      thum.onclick = (e) => {
        let target = e.currentTarget;
        if (!target.classList.contains("active")) {
          let productIndex = target.dataset.index;
          switchThumSlide(products[productIndex]);
        }
      };
    });
  });
  nextThum.onclick = () => {
    let currentIndex = +thumsSlider.dataset.activeIndex + 1;
    switchThumSlide(products[currentIndex], scrollDistance);
  };
  prevThum.onclick = () => {
    let currentIndex = +thumsSlider.dataset.activeIndex - 1;
    switchThumSlide(products[currentIndex], scrollDistance);
  };
}
