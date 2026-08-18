function toggleProductGrid(lines) {
    
    const productGrid = document.getElementById('main-collection-product-grid');
    
    productGrid.classList.remove('collection__page-products-6');
    productGrid.classList.remove('collection__page-products');
    productGrid.classList.remove('collection__page-products-2');
    productGrid.classList.remove('collection__page-products-1');
    productGrid.classList.remove('collection__page-products-3');
    
     if (lines === 2) {
        productGrid.classList.add('collection__page-products-2');
    } else if (lines === 1) {
        productGrid.classList.add('collection__page-products-1');
    }else if (lines === 3) {
        productGrid.classList.add('collection__page-products-3');
    }else if (lines === 4) {
        productGrid.classList.add('collection__page-products');
    }else if (lines === 6) {
        productGrid.classList.add('collection__page-products-6');
    }
    const gridButtons = document.querySelectorAll('.st-grid-changer button');
const currentColumns = parseInt(lines); // Assuming 'lines' is the variable containing the current column value

gridButtons.forEach(button => {
    const buttonColumns = parseInt(button.getAttribute('data-grid-layout-columns'));
    const isActive = button.classList.contains('active');

    if (buttonColumns === currentColumns && !isActive) {
        button.classList.add('active'); // Add 'active' class
    } else if (buttonColumns !== currentColumns && isActive) {
        button.classList.remove('active'); // Remove 'active' class
    }
});

  const stImageSelector = document.querySelectorAll('image-element[data-aos]');

stImageSelector.forEach(function (element) {
    if (!element.classList.contains('aos-init')) {
        element.classList.add('aos-init');
    }
    if (!element.classList.contains('aos-animate')) {
        element.classList.add('aos-animate');
    }
});


}

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('main-collection-product-grid');
    const gridButtons = document.querySelectorAll('.st-grid-changer button');

    if (window.innerWidth <= 768) { 
        gridButtons.forEach(button => {
            const buttonColumns = parseInt(button.getAttribute('data-grid-layout-columns'));
            if (buttonColumns === 4) {
                button.classList.add('active'); // Add 'active' class to button for collection__page-products-1
            } else {
                button.classList.remove('active'); // Remove 'active' from other buttons
            }
        });
        productGrid.classList.remove('collection__page-products-1'); // Mobile-specific class removal
    }
});


// JavaScript Function to Toggle Class
function toggleGridClass(value) {

  const gridElement = document.querySelector(".collection_wrapper");

  // Check if the element exists
  if (gridElement) {
    // Remove all possible grid classes to ensure a clean toggle
    gridElement.classList.remove("collection__page-products", "collection__page-products-6", "collection__page-products-2");

    // Add the appropriate class based on the slider value
    if (value === "1") {
      gridElement.classList.add("collection__page-products-2");
    } else if (value === "2") {
      gridElement.classList.add("collection__page-products");
    } else if (value === "3") {
      gridElement.classList.add("collection__page-products-6");
    }
  } else {
    console.error("The element with the class 'product-loop' was not found.");
  }
}


// Slider Element
const slider = document.getElementById("gridToggleSlider");

// Add Event Listener to Handle Input
if (slider) {
  slider.addEventListener("input", function () {
    toggleGridClass(this.value);
  });
} else {
  // console.error("The slider element was not found.");
}
