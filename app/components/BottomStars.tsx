"use client";
import React, { useRef, useEffect } from 'react';

// 1. 星のプロパティを定義する型
interface StarProps {
  virtualX: number; // 仮想X座標 (0-1000)
  virtualY: number; // 仮想Y座標 (0-300)
  size: number;
  rotation: number; // 角度 (degree)
  color: string;
  outlineColor: string;
}

// 2. 描画する6個の星のデータを定義
const starList: StarProps[] = [
  // (X座標, Y座標, サイズ, 回転角度, 色, 枠色)
  { virtualX: 700, virtualY: 170, size: 20, rotation: 10, color: "#5FFAA1", outlineColor: "#5FFAA1" },
  { virtualX: 800, virtualY: 100,  size: 40, rotation: -15, color: "#5FFAA1", outlineColor: "#5FFAA1" },
  { virtualX: 580, virtualY: 270, size: 20, rotation: 30, color: "#FBF835", outlineColor: "#FBF835" },
  { virtualX: 480, virtualY: 350, size: 10, rotation: 0, color: "#5FFAA1", outlineColor: "#5FFAA1" },
  { virtualX: 900, virtualY: 160, size: 20, rotation: 45, color: "#FBF835", outlineColor: "#FBF835" },
  { virtualX: 850, virtualY: 250,  size: 10, rotation: -30, color: "#FB9535", outlineColor: "#FB9535" },
];

// 3. 星1個を描画する関数 (引数でプロパティを受け取る)
const drawFourPointStar = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  props: StarProps
) => {
  // スケーリングロジック
  const VIRTUAL_WIDTH = 1000;
  const VIRTUAL_HEIGHT = 400; // このコンポーネントの仮想高さ
  const scaleX = canvas.width / VIRTUAL_WIDTH;
  const scaleY = canvas.height / VIRTUAL_HEIGHT;
  const sx = (x: number) => x * scaleX;
  const sy = (y: number) => y * scaleY;

  // プロパティを展開
  const { virtualX, virtualY, size, rotation, color, outlineColor } = props;
  const innerRatio = 0.3; // 星の谷の深さ
  const innerSize = size * innerRatio;

  // 描画の中心 (仮想座標から計算)
  const pivotX = sx(virtualX);
  const pivotY = sy(virtualY);

  ctx.save();
  ctx.translate(pivotX, pivotY); // 原点を移動
  const rotationAngle = rotation * Math.PI / 180; // 角度をラジアンに変換
  ctx.rotate(rotationAngle); // 回転

  // 星の描画
  ctx.fillStyle = color;
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(0, -size); // 頂点1 (上)
  ctx.lineTo(innerSize, -innerSize);
  ctx.lineTo(size, 0); // 頂点2 (右)
  ctx.lineTo(innerSize, innerSize);
  ctx.lineTo(0, size); // 頂点3 (下)
  ctx.lineTo(-innerSize, innerSize);
  ctx.lineTo(-size, 0); // 頂点4 (左)
  ctx.lineTo(-innerSize, -innerSize);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

// 4. 6個の星を描画するコンポーネント本体
export default function BottomStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 5. すべての星を再描画する関数
    const redrawAll = () => {
      if (!canvas || !ctx) return;

      // (A) Canvasのサイズを親のサイズに合わせる
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // (B) Canvasをクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // (C) starList をループして6個の星をすべて描画
      starList.forEach(starProps => {
        drawFourPointStar(ctx, canvas, starProps);
      });
    };

    // 6. 初回描画
    redrawAll();

    // 7. リサイズイベントリスナー
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
    // 8. Canvasのコンテナ (サイズをTailwindで指定)
    // 背景色 (bg-[#011051]) は例です。不要なら削除してください。
    <div className="w-full h-[400px] bg-[#011051]">
      <canvas 
        ref={canvasRef} 
        id="star-canvas" 
        className="w-full h-full"
        aria-label="6個の星"
      />
    </div>
  );
}