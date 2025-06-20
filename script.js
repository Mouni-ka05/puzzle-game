const images = [
  "meta.jpg",
  "amazon.jpg",
  "deep.png",
  "openai.jpg",
  "copilot.png",
  "ibm.png",
  "mc.png",
  "benz.png"
];

let currentIndex = 0;
let blocks = [];
let revealedCount = 0;
const rows = 5;
const cols = 6;
const totalBlocks = rows * cols;

function loadImage(imageName) {
  const wrapper = document.getElementById("imageWrapper");
  wrapper.innerHTML = ""; // clear old

  const img = document.createElement("img");
  img.src = `images/${imageName}`;
  wrapper.appendChild(img);

  blocks = [];
  revealedCount = 0;

  const blockWidth = wrapper.clientWidth / cols;
  const blockHeight = wrapper.clientHeight / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.style.width = `${blockWidth}px`;
      block.style.height = `${blockHeight}px`;
      block.style.left = `${c * blockWidth}px`;
      block.style.top = `${r * blockHeight}px`;
      block.style.opacity = 1;

      wrapper.appendChild(block);
      blocks.push(block);
    }
  }

  shuffle(blocks);
}

function revealStep() {
  const step = 3; // number of pieces revealed per click
  const remaining = blocks.filter(b => b.style.opacity != "0");
  const revealCount = Math.min(step, remaining.length);

  for (let i = 0; i < revealCount; i++) {
    const randIndex = Math.floor(Math.random() * remaining.length);
    remaining[randIndex].style.opacity = 0;
    remaining.splice(randIndex, 1);
  }

  revealedCount += revealCount;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  loadImage(images[currentIndex]);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Initialize first image
window.onload = () => loadImage(images[currentIndex]);
