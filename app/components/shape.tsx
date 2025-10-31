"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';

const imageDefinitions = [
  {
    src: "/img/komyu_deko1.png",
    width: 120, height: 100,
    initialX: 400, initialY: 90, 
    animationPhase: 0 
  },
  {
    src: "/img/komyu_deko2.png",
    width: 120, height: 100,
    initialX: 300, initialY: 120,
    animationPhase: Math.PI / 2 
  },
  {
    src: "/img/komyu_deko3.png",
    width: 140, height: 140,
    initialX: 200, initialY: 140,
    animationPhase: Math.PI 
  },
];

export default function Shape() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const imageRefs = useRef<HTMLImageElement[]>([]);

  const imageDynamicStates = useRef(
    imageDefinitions.map(() => ({ yOffset: 0 }))
  );

  const VIRTUAL_WIDTH = 1000;
  const VIRTUAL_HEIGHT = 300;

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

  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWave(ctx, canvas);

    imageDefinitions.forEach((imgDef, index) => {
      const imgState = imageDynamicStates.current[index]; 
      const imgElement = imageRefs.current[index];
      if (imgState && imgElement && imgElement.complete) {
        drawImageOnCanvas(ctx, canvas, imgDef, imgState, imgElement);
      }
    });
  }, [drawWave, drawImageOnCanvas]);

  const animate = useCallback((time: number) => {
    
    const speed = 0.002; 
    const amplitude = 10; 

    imageDynamicStates.current = imageDynamicStates.current.map((imgState, index) => {
        const imgDef = imageDefinitions[index];
        const newYOffset = Math.sin(time * speed + imgDef.animationPhase) * amplitude;
        return { ...imgState, yOffset: newYOffset };
    });

    redrawAll();

    animationFrameId.current = requestAnimationFrame(animate);
  }, [redrawAll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let imagesLoadedCount = 0;
    const totalImages = imageDefinitions.length;

    const startAnimationLoop = () => {
      imagesLoadedCount++;
      if (imagesLoadedCount === totalImages && animationFrameId.current === null) {
        redrawAll(); 
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    imageDefinitions.forEach((imgDef, index) => {
      if (!imageRefs.current[index]) {
        imageRefs.current[index] = new Image();
      }
      const img = imageRefs.current[index];

      if (img.src) {
        startAnimationLoop();
        return;
      }
      img.src = imgDef.src;

      img.onload = startAnimationLoop;
      img.onerror = () => {
        console.error(`画像のロードに失敗しました: ${imgDef.src}`);
        startAnimationLoop();
      };

      if (img.complete) {
        startAnimationLoop();
      }
    });

    const resizeListener = () => {
      redrawAll();
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
    
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