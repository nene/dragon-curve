let ctx = undefined;
const LENGTH = 1;
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function onPageReady() {
  const c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  strokeSequence([500, 200], sequence([RIGHT], 18));
}

function sequence(dirs, n) {
  if (n === 0) {
    return dirs;
  }
  const newItems = dirs.map(rotate).reverse();
  return sequence([...dirs, ...newItems], n-1);
}

function strokeSequence(p1, dirs) {
  for (const dir of dirs) {
    const p2 = pointPlusDir(p1, dir);
    line(p1, p2);
    p1 = p2;
  }
}

function rotate(dir) {
  return (dir + 1) % 4;
}

function rotateCCW(dir) {
  return (dir + 3) % 4;
}

function pointPlusDir([x,y], dir) {
  if (dir === UP) {
    return [x,y-LENGTH];
  }
  else if (dir === RIGHT) {
    return [x+LENGTH,y];
  }
  else if (dir === DOWN) {
    return [x,y+LENGTH];
  }
  else { // LEFT
    return [x-LENGTH,y];
  }
}

function line(p1, p2, color = '#000') {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.closePath();
  ctx.stroke();
}


document.addEventListener('readystatechange', onPageReady);
