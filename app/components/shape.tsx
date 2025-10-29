"use client";
import React, { useRef, useEffect } from 'react';


export default function Shape() {
     // Canvas要素への参照を保持
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

   // 描画ロジックをカプセル化する関数
  const drawWave = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 描画エリアをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 描画スタイルを設定
    ctx.fillStyle = "#E6E8F6"; // 波の色（薄い紫）

    // ----------------------------------------------------------------------
    // 描画座標の計算 (Canvasの幅に基づいてスケーリング)
    // ----------------------------------------------------------------------
    // 論理幅1000、論理高さ300として座標を定義し、実際のCanvasサイズにスケーリングします。
    const VIRTUAL_WIDTH = 1000;
    const VIRTUAL_HEIGHT = 300;
    
    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT; // canvas.height は 300 なので、 scaleY は 1
    
    // スケーリングされた座標を取得するヘルパー関数
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;

    // ----------------------------------------------------------------------
    // [修正] 山の左側を急に、頂点を尖らせ、右寄りに
    // ----------------------------------------------------------------------
    
    ctx.beginPath();
    
    // 1. M0, 300 (左下の角から開始)
    ctx.moveTo(sx(0), sy(300));
    
    // 2. L0, 220 (左端の波の開始点へ移動)
    ctx.lineTo(sx(0), sy(220)); 

    // 3. [変更] 1つ目の三次ベジェ曲線 (山の左側、急な上昇カーブ)
    //    制御点1 (400, 200): Xをかなり進んだ地点でもYが高い位置に維持し、急な上昇を始める
    //    制御点2 (750, 0): 頂点に非常に近い制御点を設定し、カーブを急峻に
    //    終点 (800, 0): 山の頂点 (X=800, Y=0) を設定
    ctx.bezierCurveTo(
      sx(400), sy(200), // 制御点1: 左側のカーブを急にするため、Yを比較的高く保つ
      sx(750), sy(0),   // 制御点2: 頂点(800,0)に近づきながらY=0を維持し、尖りを生む
      sx(800), sy(0)    // 終点 (山の頂点をX=800に移動)
    );
    
    // 4. [以前のまま] 2つ目の三次ベジェ曲線 (ピークから右下へ落ちるカーブ)
    //    制御点1 (900, 0): ピークの頂点を少し平らに維持
    //    制御点2 (1000, 150): 右端に向かって緩やかに落ちる
    //    終点 (1000, 300): 右下の角
    ctx.bezierCurveTo(
      sx(900), sy(0),    // 制御点1
      sx(1000), sy(150), // 制御点2
      sx(1000), sy(300)  // 終点 (右下)
    );

    // 5. L1000, 300 (右下の角)
    ctx.lineTo(sx(1000), sy(300));

    // 6. Z (パスを閉じる)
    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("2D context not supported.");
      return;
    }

    // 1. レスポンシブ対応のためのリサイズ処理
    const resizeCanvas = () => {
      // 親コンテナのサイズを取得してCanvasの論理サイズに設定
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // リサイズ後に再描画
      drawWave(ctx, canvas);
    };

    // 初期描画
    resizeCanvas();

    // 画面サイズ変更イベントリスナーを追加
    window.addEventListener('resize', resizeCanvas);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // 依存配列は空のままにし、マウント時とアンマウント時にのみ実行

  return (
    <div>
      <div className="w-full flex justify-center items-center bg-[#011051] ">
          <canvas 
            ref={canvasRef} 
            id="canvas" 
            className="w-full  h-[300px] aspect-square"
            aria-label="ベジェ曲線で描かれた赤いハート"
          />
        </div>
    </div>
  );
}