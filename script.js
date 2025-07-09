const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const stars = [
  {x: -0.4, y: -0.1},
  {x: -0.1, y: -0.3},
  {x: 0.2, y: -0.1},
  {x: 0.4, y: 0.2},
  {x: 0.1, y: 0.4},
  {x: -0.3, y: 0.3},
];

const connections = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,0]
];

let angle = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate(angle);
  const size = Math.min(canvas.width, canvas.height) / 3;

  // draw lines
  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  connections.forEach(([a,b]) => {
    ctx.moveTo(stars[a].x * size, stars[a].y * size);
    ctx.lineTo(stars[b].x * size, stars[b].y * size);
  });
  ctx.stroke();

  // draw stars
  ctx.fillStyle = '#fff';
  stars.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x * size, pt.y * size, 4, 0, Math.PI*2);
    ctx.fill();
  });

  ctx.restore();
  angle += 0.002;
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
