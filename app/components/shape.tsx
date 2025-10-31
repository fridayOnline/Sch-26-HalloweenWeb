"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';

// 画像の静的なプロパティ (変更されない定義)
const imageDefinitions = [
  {
    src: "/img/komyu_deko1.png",
    width: 120, height: 100,
    initialX: 400, initialY: 90, // 仮想座標
    animationPhase: 0 // アニメーションの位相 (0度)
  },
  {
    src: "/img/komyu_deko2.png",
    width: 120, height: 100,
    initialX: 300, initialY: 120,
    animationPhase: Math.PI / 2 // 90度 (少しずらす)
  },
  {
    src: "/img/komyu_deko3.png",
    width: 140, height: 140,
    initialX: 200, initialY: 140,
    animationPhase: Math.PI // 180度 (逆の動き)
  },
];

export default function Shape() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // 画像オブジェクトを保持するRefs
  const imageRefs = useRef<HTMLImageElement[]>(
    imageDefinitions.map(() => new Image())
  );

  // ★★★ 変更点 1: アニメーションの動的な状態を useState から useRef に変更 ★★★
  // useState を使うと毎フレーム再描画が走り、ループが停止してしまうため。
  const imageDynamicStates = useRef(
    imageDefinitions.map(() => ({ yOffset: 0 }))
  );

  const VIRTUAL_WIDTH = 1000;
  const VIRTUAL_HEIGHT = 300;

  // 波を描画する関数 (変更なし)
  const drawWave = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.fillStyle = "#E6E8F6";
    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT;
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;
    ctx.beginPath();
    ctx.moveTo(sx(0), sy(300));
    ctx.lineTo(sx(0), sy(210));
    ctx.bezierCurveTo(sx(400), sy(200), sx(750), sy(0), sx(800), sy(0));
    ctx.bezierCurveTo(sx(900), sy(0), sx(1000), sy(150), sx(1000), sy(300));
    ctx.lineTo(sx(1000), sy(300));
    ctx.closePath();
    ctx.fill();
  }, []);

  // 画像を描画する関数 (変更なし)
  const drawImageOnCanvas = useCallback((
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    imgDef: typeof imageDefinitions[0], 
    imgState: { yOffset: number }, 
    imgElement: HTMLImageElement
  ) => {
    if (!imgElement || !imgElement.complete) return;

    const scaleX = canvas.width / VIRTUAL_WIDTH;
    const scaleY = canvas.height / VIRTUAL_HEIGHT;
    const sx = (x: number) => x * scaleX;
    const sy = (y: number) => y * scaleY;

    const imgX = sx(imgDef.initialX) - (imgDef.width / 2);
    const imgY = sy(imgDef.initialY) - (imgDef.height / 2) - imgState.yOffset; 

    ctx.drawImage(imgElement, imgX, imgY, imgDef.width, imgDef.height);
  }, []);

  // 全ての要素を再描画する関数
  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 波の描画
    drawWave(ctx, canvas);

    // 各画像の描画 (★ 状態を useRef から読み取る)
    imageDefinitions.forEach((imgDef, index) => {
      const imgState = imageDynamicStates.current[index]; // .current から取得
      const imgElement = imageRefs.current[index];
      if (imgState && imgElement && imgElement.complete) {
        drawImageOnCanvas(ctx, canvas, imgDef, imgState, imgElement);
      }
    });
  }, [drawWave, drawImageOnCanvas]); // これで依存関係が固定される

  // アニメーションループ
  const animate = useCallback((time: number) => {
    
    const speed = 0.002; 
    const amplitude = 10; 

    // ★★★ 変更点 2: useState(setImageStates) の代わりに ref を直接更新 ★★★
    imageDynamicStates.current = imageDynamicStates.current.map((imgState, index) => {
        const imgDef = imageDefinitions[index];
        const newYOffset = Math.sin(time * speed + imgDef.animationPhase) * amplitude;
        return { ...imgState, yOffset: newYOffset };
    });

    // ★★★ 変更点 3: 状態更新後に、手動で再描画を呼び出す ★★★
    redrawAll();

    // 常に次のフレームをリクエスト
    animationFrameId.current = requestAnimationFrame(animate);
  }, [redrawAll]); // 依存関係が固定される

  // ★★★ 変更点 4: 状態(imageStates)に依存した useEffect を削除 ★★★
  // ( animate 関数内で redrawAll を呼ぶようにしたため不要になった )

  // 初期化、画像ロード、リサイズ、アニメーション開始
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let imagesLoadedCount = 0;
    const totalImages = imageDefinitions.length;

    // アニメーション開始関数
    const startAnimationLoop = () => {
      imagesLoadedCount++;
      // すべての画像がロード完了したらアニメーションを開始
      if (imagesLoadedCount === totalImages && animationFrameId.current === null) {
        redrawAll(); // 初回描画
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    // 画像のロード
    imageDefinitions.forEach((imgDef, index) => {
      const img = imageRefs.current[index];
      // 既に src が設定されている場合は再ロードしない (開発環境の再実行対策)
      if (img.src) {
        startAnimationLoop();
        return;
      }
      img.src = imgDef.src;

      img.onload = startAnimationLoop;
      img.onerror = () => {
        console.error(`画像のロードに失敗しました: ${imgDef.src}`);
        startAnimationLoop(); // エラーでもカウントは進める
      };

      // 画像が既にキャッシュされている場合
      if (img.complete) {
        startAnimationLoop();
      }
    });

    // リサイズイベントリスナー
    const resizeListener = () => {
      redrawAll(); // リサイズ時は再描画のみ
    };
    window.addEventListener('resize', resizeListener);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', resizeListener);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
    
    // ★★★ 変更点 5: 依存配列を修正 ★★★
    // これでこの useEffect はコンポーネントのマウント時に1回だけ実行される
  }, [redrawAll, animate]); 

  return (
    <div>
      <div className="w-full flex justify-center items-center bg-[#011051] ">
        <canvas
          ref={canvasRef}
          id="canvas"
          className="w-full h-[400px] aspect-square"
          aria-label="坂道"
        />
      </div>
    </div>
  );
}