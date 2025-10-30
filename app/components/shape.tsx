"use client";
import React, { useRef, useEffect } from 'react';


export default function Shape() {
 const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // 1. ロードした画像オブジェクトを保持するための ref
  const imageRef1 = useRef<HTMLImageElement | null>(null);
  const imageRef2 = useRef<HTMLImageElement | null>(null);
  const imageRef3 = useRef<HTMLImageElement | null>(null);
  
  // 2. 波を描画する関数 (変更なし)
  const drawWave = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 描画エリアをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 描画スタイルを設定
    ctx.fillStyle = "#E6E8F6"; // 波の色（薄い紫）
    
    const VIRTUAL_WIDTH = 1000;
    const VIRTUAL_HEIGHT = 300;
    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT;
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;

    // ... (波形の描画パス: moveTo, bezierCurveTo, ...) ...
    ctx.beginPath();
    ctx.moveTo(sx(0), sy(300));
    ctx.lineTo(sx(0), sy(210)); 
    ctx.bezierCurveTo(
      sx(400), sy(200), 
      sx(750), sy(0), 
      sx(800), sy(0)
    );
    ctx.bezierCurveTo(
      sx(900), sy(0), 
      sx(1000), sy(150),
      sx(1000), sy(300)
    );
    ctx.lineTo(sx(1000), sy(300));
    ctx.closePath();
    ctx.fill();
  };

  // 3. 画像を描画する関数
  const drawImageOnCanvas1 = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    img: HTMLImageElement
  ) => {
    // 波と同じスケーリングロジックを使用
    const VIRTUAL_WIDTH = 1000;
    const VIRTUAL_HEIGHT = 300;
    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT;
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;

    // 画像のサイズ (例: 80x80)
    const imgWidth = 120; 
    const imgHeight = 100;
    
    // 画像の描画位置 (坂の頂点 X=800, Y=0)
    // 画像の「中心下部」が (800, 0) に来るように座標を計算
    const imgX = sx(400) - (imgWidth / 2); // 頂点X座標 - (画像幅 / 2)
    const imgY = sy(90) - (imgHeight / 2); // 頂点Y座標 - (画像高さ / 2)
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    
  };

  const drawImageOnCanvas2 = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    img: HTMLImageElement
  ) => {
    // 波と同じスケーリングロジックを使用
    const VIRTUAL_WIDTH = 1000;
    const VIRTUAL_HEIGHT = 300;
    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT;
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;

    // 画像のサイズ (例: 80x80)
    const imgWidth = 120; 
    const imgHeight = 100;
    
    // 画像の描画位置 (坂の頂点 X=800, Y=0)
    // 画像の「中心下部」が (800, 0) に来るように座標を計算
    const imgX = sx(300) - (imgWidth / 2); // 頂点X座標 - (画像幅 / 2)
    const imgY = sy(120) - (imgHeight / 2); // 頂点Y座標 - (画像高さ / 2)

    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  };
const drawImageOnCanvas3 = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    img: HTMLImageElement
  ) => {
    // 波と同じスケーリングロジックを使用
    const VIRTUAL_WIDTH = 1000;
    const VIRTUAL_HEIGHT = 300;
    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT;
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;

    // 画像のサイズ (例: 80x80)
    const imgWidth = 140; 
    const imgHeight = 140;
    
    // 画像の描画位置 (坂の頂点 X=800, Y=0)
    // 画像の「中心下部」が (800, 0) に来るように座標を計算
    const imgX = sx(200) - (imgWidth / 2); // 頂点X座標 - (画像幅 / 2)
    const imgY = sy(140) - (imgHeight / 2); // 頂点Y座標 - (画像高さ / 2)

    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 4. 画像オブジェクトを作成・ロード
    const img1 = new Image();
    img1.src = "/img/komyu_deko1.png"; // ★★★ 画像パスを修正してください
    imageRef1.current = img1; // ref に保存

    const img2 = new Image();
    img2.src = "/img/komyu_deko2.png"; // ★★★ 画像パスを修正してください
    imageRef2.current = img2; // ref に保存

    const img3 = new Image();
    img3.src = "/img/komyu_deko3.png"; // ★★★ 画像パスを修正してください
    imageRef3.current = img3; // ref に保存

    // 5. 波と画像をまとめて再描画する関数
    const redrawAll = () => {
      if (!canvas || !ctx || !imageRef1.current || !imageRef1.current.complete) {
        // キャンバスや画像が準備できていない場合は何もしない
        // (img.complete は画像がロード完了しているかチェック)
        return; 
      }
      if (!canvas || !ctx || !imageRef2.current || !imageRef2.current.complete) {
        // キャンバスや画像が準備できていない場合は何もしない
        // (img.complete は画像がロード完了しているかチェック)
        return; 
      }
      if (!canvas || !ctx || !imageRef3.current || !imageRef3.current.complete) {
        // キャンバスや画像が準備できていない場合は何もしない
        // (img.complete は画像がロード完了しているかチェック)
        return; 
      }

      // (A) Canvasのサイズを親のサイズに合わせる
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // (B) 波の描画
      drawWave(ctx, canvas);
      
      // (C) 画像の描画
      drawImageOnCanvas1(ctx, canvas, imageRef1.current);
      drawImageOnCanvas2(ctx, canvas, imageRef2.current);
      drawImageOnCanvas3(ctx, canvas, imageRef3.current);
    };

    // 6. 画像ロード完了時に初回描画
    img1.onload = () => {
    console.log("画像ロード成功！ 描画します。"); // 成功ログ
    redrawAll();
  };

  // ★★★ これを追加 ★★★
  // 画像ロード失敗時のエラーハンドリング
  
    
    // 7. 画像が既にキャッシュされている場合の初回描画
    if (img1.complete) {
      redrawAll();
    }

    // 8. リサイズイベントリスナー
    const resizeListener = () => {
      redrawAll();
    };
    
    window.addEventListener('resize', resizeListener);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []); // 依存配列は空

  return (
    <div>
      <div className="w-full flex justify-center items-center bg-[#011051] ">
          <canvas 
            ref={canvasRef} 
            id="canvas" 
            className="w-full  h-[400px] aspect-square"
            aria-label="坂道"
          />
        </div>
    </div>
  );
}