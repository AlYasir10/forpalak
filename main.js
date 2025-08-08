const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

function getRandomNumber(min, max) {
  // Calculate the random number between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function moveNoButton() {
  const containerRect = container.getBoundingClientRect();
  const containerHeight = containerRect.height;
  const containerWidth = containerRect.width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;
  
  // Get current position relative to container
  const currentTop = parseInt(btnNo.style.top) || 0;
  const currentLeft = parseInt(btnNo.style.left) || 0;
  
  let newTop = currentTop;
  let newLeft = currentLeft;
  
  // Ensure minimum movement distance
  while (Math.abs(newTop - currentTop) < containerHeight / 3) {
    newTop = getRandomNumber(0, containerHeight - btnHeight);
  }
  
  while (Math.abs(newLeft - currentLeft) < containerWidth / 3) {
    newLeft = getRandomNumber(0, containerWidth - btnWidth);
  }
  
  btnNo.style.position = "absolute";
  btnNo.style.top = Math.floor(newTop) + "px";
  btnNo.style.left = Math.floor(newLeft) + "px";
}

// For desktop - mouseover
btnNo.addEventListener("mouseover", (event) => {
  moveNoButton();
});

// Check if it's a mobile device
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isMobile) {
  // For mobile devices - use touch events
  btnNo.addEventListener("touchstart", (event) => {
    event.preventDefault(); // Prevent default touch behavior
    moveNoButton();
  });
  
  btnNo.addEventListener("touchend", (event) => {
    event.preventDefault(); // Prevent click from firing after touchend
  });
  
  // Backup for mobile click
  btnNo.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the actual click
    moveNoButton();
  });
} else {
  // For desktop - keep original mouseover behavior
  btnNo.addEventListener("mouseover", (event) => {
    moveNoButton();
  });
}

btnYes.addEventListener("click", (e) => {
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
});
