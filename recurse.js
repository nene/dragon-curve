const LENGTH = 3;
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function onPageReady() {
  const c = document.getElementById('canvas');
  const ctx = c.getContext('2d');
  const seq = sequence([LEFT], 5);
  const [len, startPos] = scale(size(seq), [1024, 1024]);

  strokeSequence(ctx, startPos, len, seq);
}

function sequence(dirs, n) {
  if (n === 0) {
    return dirs;
  }
  const newItems = dirs.map(rotate).reverse();
  return sequence([...dirs, ...newItems], n-1);
}

function size(dirs) {
  let p = [0,0];
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;
  for (const dir of dirs) {
    p = pointPlusDir(p, dir, 1);
    const [x, y] = p;
    xMin = Math.min(xMin, x);
    xMax = Math.max(xMax, x);
    yMin = Math.min(yMin, y);
    yMax = Math.max(yMax, y);
  }
  return [[xMin, yMin], [xMax, yMax]];
}

function scale([[xMin, yMin], [xMax, yMax]], [width, height]) {
  const abs = Math.abs;
  // Size of graph
  const gWidth = abs(xMin) + abs(xMax);
  const gHeight = abs(yMin) + abs(yMax);

  // How much it should be scaled up or down
  const scaleX = width / gWidth;
  const scaleY = height / gHeight;
  const minScale = scaleX < scaleY ? scaleX : scaleY;

  // How its starting point should be positioned
  const startPos = [abs(xMin)*minScale, abs(yMin)*minScale];

  return [minScale, startPos];
}

function strokeSequence(ctx, p1, len, dirs) {
  ctx.beginPath();
  ctx.moveTo(p1[0], p1[1]);

  for (const dir of dirs) {
    const p2 = pointPlusDir(p1, dir, len);
    ctx.lineTo(p2[0], p2[1]);
    p1 = p2;
  }

  ctx.stroke();
}

function rotate(dir) {
  return (dir + 1) % 4;
}

function pointPlusDir([x,y], dir, len) {
  if (dir === UP) {
    return [x,y-len];
  }
  else if (dir === RIGHT) {
    return [x+len,y];
  }
  else if (dir === DOWN) {
    return [x,y+len];
  }
  else { // LEFT
    return [x-len,y];
  }
}

document.addEventListener('readystatechange', onPageReady);
