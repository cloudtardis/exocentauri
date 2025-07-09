const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStarField();
}
window.addEventListener('resize', resize);
resize();

// approximate centaur constellation
const stars = [
  {x: -0.5, y: -0.1}, // tail
  {x: -0.2, y: -0.3},
  {x: 0.1, y: -0.2},
  {x: 0.3, y: -0.1},
  {x: 0.5, y: 0.1},
  {x: 0.4, y: 0.4}, // front hoof
  {x: 0.0, y: 0.0},
  {x: 0.1, y: 0.2},
  {x: 0.2, y: 0.4}, // head
  {x: -0.3, y: 0.2},
  {x: -0.4, y: 0.4}, // rear hoof
];

const connections = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [2,6],[6,7],[7,8],
  [2,9],[9,10]
];

let fieldStars = [];
function createStarField() {
  fieldStars = [];
  const count = Math.floor((canvas.width + canvas.height) / 10);
  for (let i = 0; i < count; i++) {
    fieldStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5
    });
  }
}

let angle = 0;
let targetAngle = 0;
canvas.addEventListener('pointermove', e => {
  targetAngle = (e.clientX / canvas.width - 0.5) * Math.PI * 2;
});
canvas.addEventListener('pointerdown', e => {
  targetAngle = (e.clientX / canvas.width - 0.5) * Math.PI * 2;
});

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw background stars
  ctx.fillStyle = '#555';
  fieldStars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  angle += (targetAngle - angle) * 0.05; // smooth follow
  ctx.rotate(angle);
  const size = Math.min(canvas.width, canvas.height) / 3;

  // draw lines
  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  connections.forEach(([a, b]) => {
    ctx.moveTo(stars[a].x * size, stars[a].y * size);
    ctx.lineTo(stars[b].x * size, stars[b].y * size);
  });
  ctx.stroke();

  // draw constellation stars
  ctx.fillStyle = '#fff';
  stars.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x * size, pt.y * size, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
  requestAnimationFrame(draw);
}

createStarField();
requestAnimationFrame(draw);
