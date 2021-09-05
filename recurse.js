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
  ctx.beginPath();
  ctx.moveTo(p1[0], p1[1]);

  for (const dir of dirs) {
    const p2 = pointPlusDir(p1, dir);
    ctx.lineTo(p2[0], p2[1]);
    p1 = p2;
  }

  ctx.stroke();
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

document.addEventListener('readystatechange', onPageReady);
