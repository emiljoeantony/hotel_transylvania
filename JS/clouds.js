let width = document.body.clientWidth;
let height = document.body.clientHeight;

let c = document.createElement('canvas');
document.body.appendChild(c);
c.width = width;
c.height = height;

addEventListener('resize', () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight;

  c.width = width;
  c.height = height;
});

let ctx = c.getContext('2d');
ctx.lineCap = 'round';
ctx.font = '1em Arial';

let clouds = [];
let rain = [];
let time = 0;

(function render() {
  window.requestAnimationFrame(render);

  time++;

  // add rain
  if (time % 5 == 0) {
    let length = Math.random() * 10 + 10;

    rain.push({
      length: length,
      x: Math.random() * (width + height / 2),
      y: -length,
      z: Math.random() * 1.5 + 0.1
    });
  }

  // add clouds
  if (time % 100 == 0) {
    let r = Math.random() * 100 + 100;

    clouds.push({
      r: r,
      x: -r
    });
  }

  // clear
  ctx.fillStyle = '#161621';
  ctx.fillRect(0, 0, width, height);

  // draw rain
  ctx.strokeStyle = '#212126';

  for (let i = 0; i < rain.length; i++) {
    let drop = rain[i];

    // move drop
    drop.x -= 0.5 * drop.z;
    drop.y += 1.5 * drop.z;

    // draw drop
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x - drop.length / 2, drop.y + drop.length);

    ctx.strokeStyle = `rgba(38, 38, 49, ${1.6 / drop.z})`;
    ctx.lineWidth = 2.5 * drop.z;
    ctx.stroke();

    // remove rain beyond view
    if (drop.y > height / 1.125 || drop.x < 0) {
      rain.splice(i, 1);
      i--;
    }
  }

  // draw clouds
  ctx.fillStyle = '#212126';

  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];

    // move cloud
    cloud.x++;

    // // draw cloud
    // ctx.beginPath();
    // ctx.ellipse(cloud.x, height / 1.125, cloud.r, cloud.r, 0, 0, Math.PI * 2);
    // ctx.fill();

    // remove cloud if beyond screen width
    if (cloud.x > width + cloud.r) {
      clouds.splice(i, 1);
      i--;
    }
  }

  ctx.fillRect(0, height / 1.125, width, height / 1.125);
})();
