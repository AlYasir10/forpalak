const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const containerHeight = containerRect.height;
  const containerWidth = containerRect.width;
  const btnRect = btnNo.getBoundingClientRect();
  const btnHeight = btnRect.height;
  const btnWidth = btnRect.width;
  
  // Get current position relative to container
  const containerTop = containerRect.top;
  const containerLeft = containerRect.left;
  const currentTop = btnRect.top - containerTop;
  const currentLeft = btnRect.left - containerLeft;
  
  let newTop, newLeft;
  let attempts = 0;
  
  // Generate new position that's far enough from current position
  do {
    newTop = getRandomNumber(0, Math.max(0, containerHeight - btnHeight));
    newLeft = getRandomNumber(0, Math.max(0, containerWidth - btnWidth));
    attempts++;
  } while (
    (Math.abs(newTop - currentTop) < containerHeight / 4 || 
     Math.abs(newLeft - currentLeft) < containerWidth / 4) && 
    attempts < 10
  );
  
  // Apply new position
  btnNo.style.position = "absolute";
  btnNo.style.top = newTop + "px";
  btnNo.style.left = newLeft + "px";
}

// Check if it's a mobile device
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isMobile) {
  // Mobile: Use touchstart for immediate response
  btnNo.addEventListener("touchstart", (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton();
  }, { passive: false });
  
  // Also handle click as a backup
  btnNo.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    moveNoButton();
  });
  
  // Prevent context menu on long press
  btnNo.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  
} else {
  // Desktop: Use mouseover
  btnNo.addEventListener("mouseover", (event) => {
    moveNoButton();
  });
}

// Yes button functionality
btnYes.addEventListener("click", (e) => {
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
});
