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

import * as drawLib from "./drawLib.js";

window.addEventListener('DOMContentLoaded', function() {
 
  // 実行したい処理を書く
  let targetDom = document.getElementById('container');

  targetDom.style.height = drawLib.vhToPx(80);
  targetDom.style.width = drawLib.vhToPx(80);

})


/**draw()の注意点
 * ●svgCanvasのx座標・y座標・width・height・viewboxは、function vhToPx()で、ピクセル単位に変換する
 * ●図形描画の関数の引数は、基本vh単位の数値部分だが、strokeWidthはピクセル単位の数字のみで指定
*/

window.draw = () =>{

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
    svgCanvas.setAttribute('width', drawLib.vhToPx(canvasSizeVh));
    svgCanvas.setAttribute('height',drawLib.vhToPx(canvasSizeVh));
    svgCanvas.setAttribute('viewbox', [0,0,drawLib.vhToPx(canvasSizeVh),drawLib.vhToPx(canvasSizeVh)]);
    
  //背景塗りつぶし用正方形を追加
    svgCanvas.appendChild(drawLib.drawRectangle(0,0,80,80,'none','0','#ccc'));

  //背景の上に描画したい図形を追加
    svgCanvas.appendChild(drawLib.drawPath(drawLib.getStraightLinePathStrByVh(10,40,70,40),'black','2','5'));
    svgCanvas.appendChild(drawLib.drawCircle(25,40,15,'green','2','none'));
    svgCanvas.appendChild(drawLib.drawRectangle(40,25,30,30,'blue','2','none'));

  //div要素内にSVGタグを埋め込む
    targetDom.appendChild(svgCanvas);
   
}

//SVG出力ボタン用function
window.downloadSvg = (elementId, filename) => {
  const svgNode = document.getElementById(elementId); 
  const svgText = new XMLSerializer().serializeToString(svgNode);
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
window.downloadPng = (elementId, filename)  =>{

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
  const svgData = new XMLSerializer().serializeToString(svg);
  // この時点で、上記のonloadが走る
  image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(decodeURIComponent(encodeURIComponent(svgData)));
}