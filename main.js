/*
参考ページ:上から順に読むと良さそうです。

  SVGについて – ドキュメント内にSVGを表示する(createElementNS) │ propansystem開発ブログ
    https://propansystem.net/blog/2022/10/13/post-8277/

  JavaScript | createElementNSでSVGの図形を描画する基本 | ONE NOTES
    https://1-notes.com/javascript-draw-svg-shapes-with-createelementns/

  コードで描くSVG　図形/テキスト編 | チルチルミチルブログ
    https://tiltilmitil.co.jp/blog/1494

応用編：ポリゴン(一筆書き)
  JavaScriptで五角形の座標を計算 SVGで星を作成し背景にも
    https://b-moon.net/create-stars-with-svg-and-pentagon-coordinate-calculation/

画像保存
  SVG イメージを JavaScript から保存する方法 - Qiita
  https://qiita.com/aster-mnch/items/d89f1d1be43d89a6fe70

*/

window.addEventListener('DOMContentLoaded', function() {
 
  // 実行したい処理を書く
  let targetDom = document.getElementById('container');

  targetDom.style.height = vhToPx(80);
  targetDom.style.width = vhToPx(80);

})


/**draw()の注意点
 * ●svgCanvasのx座標・y座標・width・height・viewboxは、function vhToPx()で、ピクセル単位に変換する
 * ●図形描画の関数の引数は、基本vh単位の数値部分だが、strokeWidthはピクセル単位の数字のみで指定
*/

function draw(){

  //描画先の要素を取得
    let targetDom = document.getElementById('container');

  //初期化(既存の描画を削除)
    Array.from(targetDom.childNodes).forEach(function (a) {
      a.remove();
    })

  //svgキャンバスを作成
    const canvasSizeVh = 80;
    let svgCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgCanvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgCanvas.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svgCanvas.setAttribute('id', 'svgArt');
    svgCanvas.setAttribute('width', vhToPx(canvasSizeVh));
    svgCanvas.setAttribute('height',vhToPx(canvasSizeVh));
    svgCanvas.setAttribute('viewbox', [0,0,vhToPx(canvasSizeVh),vhToPx(canvasSizeVh)]);
    
  //背景塗りつぶし用正方形を追加
    svgCanvas.appendChild(drawRectangle(0,0,80,80,'none','0','#ccc'));

  //背景の上に描画したい図形を追加
    svgCanvas.appendChild(drawPath(getStraightLinePathStrByVh(10,40,70,40),'black','2','5'));
    svgCanvas.appendChild(drawCircle(25,40,15,'green','2','none'));
    svgCanvas.appendChild(drawRectangle(40,25,30,30,'blue','2','none'));

  //div要素内にSVGタグを埋め込む
    targetDom.appendChild(svgCanvas);
   
}

//vh(単位なし、数字のみで記載)をピクセルに変換
function vhToPx(vh) {
  let viewportHeight = window.innerHeight;
  let px = (vh * viewportHeight) / 100;
  return px;
}

//Pathオブジェクトを生成するfunction
function drawPath(pathStr,strokeColor,strokeWidth,miterLimit){
  path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathStr);
  path.setAttribute('stroke', strokeColor);
  path.setAttribute('stroke-width', strokeWidth);
  path.setAttribute('stroke-linejoin', 'miter'); 
  path.setAttribute('stroke-miterlimit',miterLimit);
  return path;
}

//vhをピクセルに変換
function getStraightLinePathStrByVh(x1,y1,x2,y2){
  const x1Pixels = vhToPx(x1);
  const y1Pixels = vhToPx(y1);
  const x2Pixels = vhToPx(x2);
  const y2Pixels = vhToPx(y2);

  const result = 'M ' + x1Pixels + ',' + y1Pixels + ' ' + x2Pixels + ',' + y2Pixels;
  return result;
}

//正円オブジェクトを生成するfunction
function drawCircle(CenterX,CenterY,r,strokeColor,strokeWidth,fillColor){
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
function drawRectangle(x,y,width,height,strokeColor,strokeWidth,fillColor){
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

//SVG出力ボタン用function
function downloadSvg(elementId, filename) {
  const svgNode = document.getElementById(elementId); 
  // vh単位のままだと、Inkscapeで開けないので、単位削除とサイズ調整を兼ねて、10倍する(vhを0に置換)
  const svgText = new XMLSerializer().serializeToString(svgNode).replaceAll('vh','0');
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);

  const a = document.createElement('a');
  a.href = svgUrl;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(svgUrl);
}

//png出力ボタン用function
//Canvasって何・・・・？ | パンショクのIT/WEB備忘録 https://pan-shoku.com/canvas/
function downloadPng(elementId, filename) {

  // 倍率指定
  const upscaleRatio = 10;

  // svg domを取得
  const svg = document.getElementById(elementId);

  // canvasを準備
  let canvas = document.createElement('canvas');
  canvas.width = svg.width.baseVal.value * upscaleRatio;
  canvas.height = svg.height.baseVal.value * upscaleRatio;

  // 描画をするための、canvasの組み込みオブジェクトを準備
  const ctx = canvas.getContext('2d');
  // imgオブジェクトを準備
  let image = new Image();

  // imageの読み込みが完了したら、onloadが走る
  image.onload = () => {
    // SVGデータをPNG形式に変換する
    // canvasに描画する drawImage(image, x座標, y座標, 幅, 高さ)
    ctx.drawImage(image, 0, 0, image.width * upscaleRatio, image.height * upscaleRatio);

    // ローカルにダウンロード
    let link = document.createElement("a");
    link.href = canvas.toDataURL(); // 描画した画像のURIを返す data:image/png;base64
    link.download = filename;
  link.click();
  }
  // 読み込みに失敗したらこっちが走る
  image.onerror = (error) => {
    console.log(error);
  }

  // SVGデータをXMLで取り出す
  const svgData = new XMLSerializer().serializeToString(svg).replaceAll('vh','0');
  // この時点で、上記のonloadが走る
  image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(decodeURIComponent(encodeURIComponent(svgData)));
}