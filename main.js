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
  const containerHeight = container.getBoundingClientRect().height;
  const containerWidth = container.getBoundingClientRect().width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;
  const btnTop = btnNo.getBoundingClientRect().top;
  const btnLeft = btnNo.getBoundingClientRect().left;
  
  let newTop = btnTop;
  let newLeft = btnLeft;
  
  while (Math.abs(newTop - btnTop) < containerHeight / 3) {
    newTop = getRandomNumber(0, containerHeight - btnHeight);
  }
  
  while (Math.abs(newLeft - btnLeft) < containerWidth / 3) {
    newLeft = getRandomNumber(0, containerWidth - btnWidth);
  }
  
  btnNo.style.top = Math.floor(newTop) + "px";
  btnNo.style.left = Math.floor(newLeft) + "px";
}

// For desktop - mouseover
btnNo.addEventListener("mouseover", (event) => {
  moveNoButton();
});

// For mobile - touch events
btnNo.addEventListener("touchstart", (event) => {
  event.preventDefault(); // Prevent default touch behavior
  moveNoButton();
});

// Additional mobile support - click event (as backup)
btnNo.addEventListener("click", (event) => {
  // Only move on mobile devices, not desktop
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    event.preventDefault(); // Prevent the actual click
    moveNoButton();
  }
});

// Alternative approach: Also handle mousedown for faster response
btnNo.addEventListener("mousedown", (event) => {
  // Only on mobile devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    event.preventDefault();
    moveNoButton();
  }
});

btnYes.addEventListener("click", (e) => {
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
});
