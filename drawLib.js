//vh(単位なし、数字のみで記載)をピクセルに変換
export function vhToPx(vh) {
  let viewportHeight = window.innerHeight;
  let px = (vh * viewportHeight) / 100;
  return px;
}

//Pathオブジェクトを生成するfunction
export function drawPath(pathStr,strokeColor,strokeWidth,miterLimit){
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathStr);
  path.setAttribute('stroke', strokeColor);
  path.setAttribute('stroke-width', strokeWidth);
  path.setAttribute('stroke-linejoin', 'miter'); 
  path.setAttribute('stroke-miterlimit',miterLimit);
  return path;
}

//vhをピクセルに変換
export function getStraightLinePathStrByVh(x1,y1,x2,y2){
  const x1Pixels = vhToPx(x1);
  const y1Pixels = vhToPx(y1);
  const x2Pixels = vhToPx(x2);
  const y2Pixels = vhToPx(y2);

  const result = 'M ' + x1Pixels + ',' + y1Pixels + ' ' + x2Pixels + ',' + y2Pixels;
  return result;
}

//正円オブジェクトを生成するfunction
export function drawCircle(CenterX,CenterY,r,strokeColor,strokeWidth,fillColor){
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', vhToPx(CenterX));
  circle.setAttribute('cy', vhToPx(CenterY));
  circle.setAttribute('r', vhToPx(r));
  circle.setAttribute('stroke', strokeColor);
  circle.setAttribute('stroke-width', strokeWidth);
  circle.setAttribute('fill', fillColor);
  return circle;
}

//長方形オブジェクトを生成するfunction
export function drawRectangle(x,y,width,height,strokeColor,strokeWidth,fillColor){
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', vhToPx(x));
  rect.setAttribute('y', vhToPx(y));
  rect.setAttribute('width', vhToPx(width));
  rect.setAttribute('height',vhToPx(height));
  rect.setAttribute('stroke', strokeColor);
  rect.setAttribute('stroke-width', strokeWidth);
  rect.setAttribute('fill', fillColor);
  return rect;
}

