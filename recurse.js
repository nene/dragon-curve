const LENGTH = 3;
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function onPageReady() {
  const c = document.getElementById('canvas');
  const ctx = c.getContext('2d');
  strokeSequence(ctx, [600, 200], sequence([LEFT], 15));
}

function sequence(dirs, n) {
  if (n === 0) {
    return dirs;
  }
  const newItems = dirs.map(rotate).reverse();
  return sequence([...dirs, ...newItems], n-1);
}

function strokeSequence(ctx, p1, dirs) {
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
