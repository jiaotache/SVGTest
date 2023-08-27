//vh(単位なし、数字のみで記載)をピクセルに変換
export function vhToPx(vh) {
  let viewportHeight = window.innerHeight;
  let px = (vh * viewportHeight) / 100;
  return px;
}

/** Pathオブジェクトを生成するfunction
 * @param {string} pathStr d=に続く文字列　https://shanabrian.com/web/svg/draw-path.php
 * @param {string} strokeColor 線の色
 * @param {string} strokeWidth 線の幅
 * @param {string} fillColor 塗りつぶし色
 * @param {string} miterLimit 交点の重なり方調整
 * @returns pathオブジェクト
 */
export function drawPath(pathStr,strokeColor,strokeWidth,fillColor,miterLimit){
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathStr);
  path.setAttribute('stroke', strokeColor);
  path.setAttribute('stroke-width', strokeWidth);
  path.setAttribute('fill', fillColor);
  path.setAttribute('stroke-linejoin', 'miter'); 
  path.setAttribute('stroke-miterlimit',miterLimit);
  return path;
}

  /**　直線用文字列生成関数
   * 
   * @param {number} x1 直線始点のX座標
   * @param {number} y1 直線始点のY座標
   * @param {number} x2 直線終点のX座標
   * @param {number} y2 直線終点のY座標
   * @returns d=に続く文字列
   */
  export function getStraightLinePathStrByVh(x1,y1,x2,y2){
    const x1Pixels = vhToPx(x1);
    const y1Pixels = vhToPx(y1);
    const x2Pixels = vhToPx(x2);
    const y2Pixels = vhToPx(y2);

    const result = 'M ' + x1Pixels + ',' + y1Pixels + ' ' + x2Pixels + ',' + y2Pixels;
    return result;
  }

  /** 正六角形用文字列生成関数
   * 
   * @param {number} CenterX 正六角形の外接円の中心X座標 
   * @param {number} CenterY 正六角形の外接円の中心Y座標 
   * @param {number} edgeLength 正六角形の辺の長さ
   * @returns  d=に続く文字列
   */
  export function getRegularHexagonPathStrByVh(CenterX,CenterY,edgeLength){

    const CenterXPx = vhToPx(CenterX);
    const CenterYPx = vhToPx(CenterY);
    const edgeLengthPx = vhToPx(edgeLength);

    const edge1X = CenterXPx;
    const edge1Y = CenterYPx - edgeLengthPx;
    
    const edge2X = CenterXPx + edgeLengthPx;
    const edge2Y = CenterYPx - edgeLengthPx / 2;

    const edge3X = CenterXPx + edgeLengthPx;
    const edge3Y = CenterYPx + edgeLengthPx / 2;

    const edge4X = CenterXPx;
    const edge4Y = CenterYPx + edgeLengthPx;

    const edge5X = CenterXPx - edgeLengthPx;
    const edge5Y = CenterYPx + edgeLengthPx / 2;

    const edge6X = CenterXPx - edgeLengthPx;
    const edge6Y = CenterYPx - edgeLengthPx / 2;

    const result = 'M ' + edge1X + ',' + edge1Y + ' ' + edge2X + ',' + edge2Y + ' ' + edge3X + ',' + edge3Y + ' ' + edge4X + ',' + edge4Y + ' ' + edge5X + ',' + edge5Y + ' ' + edge6X + ',' + edge6Y+ ' ' + edge1X + ',' + edge1Y;

    return result;

  }

/** 正円オブジェクトを生成するfunction
 * @param {number} CenterX 
 * @param {number} CenterY 
 * @param {number} r 
 * @param {string} strokeColor 
 * @param {string} strokeWidth 
 * @param {string} fillColor 
 * @returns 
 */
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

/** 長方形オブジェクトを生成するfunction
 * 
 * @param {number} x 左上X座標
 * @param {number} y 右上Y座標
 * @param {number} width 幅 
 * @param {number} height 高さ
 * @param {string} strokeColor 線の色 
 * @param {string} strokeWidth 線の幅
 * @param {string} fillColor 塗りつぶし色
 * @returns 
 */
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

