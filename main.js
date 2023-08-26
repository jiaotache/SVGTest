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

/**draw()の注意点
 * ●strokeWidthは、vhを使わずに数値のみで指定する
 * ●svgCanvasのx座標・y座標・width・height・viewboxはvhで指定する
 * ●図形描画の関数の引数は、基本vhだが、strokeWidthは数字のみで指定
 * ●vhは、SVG出力の際に、0に置換する仕様としている(80vhなら800のように、元の値の10倍となる)
 * →vh単位のままだと、Inkscapeで開けないので、単位削除とサイズ調整を兼ねて、10倍することとした
 */

function draw(){

  //描画先の要素を取得
    let targetDom = document.getElementById('container');

  //初期化(既存の描画を削除)
    Array.from(targetDom.childNodes).forEach(function (a) {
      a.remove();
    })

  //svgキャンバスを作成
    let svgCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgCanvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgCanvas.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svgCanvas.setAttribute('id', 'svgArt');
    svgCanvas.setAttribute('width', '80vh');
    svgCanvas.setAttribute('height', '80vh');
    svgCanvas.setAttribute('viewbox', '0 0 80vh 80vh');
    
  //背景塗りつぶし用正方形を追加
    svgCanvas.appendChild(drawRectangle('0','0','80vh','80vh','none','0','#ccc'));

  //背景の上に描画したい図形を追加
    svgCanvas.appendChild(drawLine('10vh','40vh','70vh','40vh','black','2'));
    svgCanvas.appendChild(drawLine('10vh','40vh','70vh','20vh','red','2'));
    svgCanvas.appendChild(drawCircle('25vh','40vh','15vh','green','2','none'));
    svgCanvas.appendChild(drawRectangle('40vh','25vh','30vh','30vh','blue','2','none'));
  
  //div要素内にSVGタグを埋め込む
    targetDom.appendChild(svgCanvas);
   
}

//直線オブジェクトを生成するfunction
function drawLine(x1,y1,x2,y2,color,strokeWidth){
  let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', strokeWidth);
  return line;
}

//正円オブジェクトを生成するfunction
function drawCircle(CenterX,CenterY,r,strokeColor,strokeWidth,fillColor){
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', CenterX);
  circle.setAttribute('cy', CenterY);
  circle.setAttribute('r', r);
  circle.setAttribute('stroke', strokeColor);
  circle.setAttribute('stroke-width', strokeWidth);
  circle.setAttribute('fill', fillColor);
  return circle;
}

//長方形オブジェクトを生成するfunction
function drawRectangle(x,y,width,height,strokeColor,strokeWidth,fillColor){
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
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