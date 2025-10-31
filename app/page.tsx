"use client";
import Image from 'next/image';
import Link from 'next/link';
import Game from '../app/components/game';
import YoutubeModal from './components/YoutubeModal';
import React, { useState } from 'react';
import Shape from './components/shape';
import { shadow } from 'three/tsl';
import type { MouseEvent } from 'react';
import BottomStars from './components/BottomStars';

// import{ Button }from '@mui/material'

const StarIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg 
    className="absolute text-[#FBF835] twinkle-star" // アニメーション用のクラスを追加
    style={style} // 位置やサイズ、遅延をランダムに適用
    width="36" 
    height="36" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z"/>
  </svg>
);


// 2. 画像オブジェクトの型を定義
interface ImageItem {
  src: string;
  alt: string;
}

export default function Home() {

// 4. 選択された画像の「src」を管理するstate
  // (初期値 null = 何も選択されていない)
  // 4. 選択された画像の「src」を管理するstate
  // (初期値 null = 何も選択されていない)
// 4. useState に型 (<string | null>) を指定
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);

  // 5. 'src' パラメータに string 型を指定
  const openImageModal = (src: string) => {
    setSelectedImageSrc(src);
  };

  const closeImageModal = () => {
    setSelectedImageSrc(null);
  };

   // ポップアップの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false);

  // ポップアップを開く関数
  // モーダル表示中は背景のスクロールを禁止
  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // ポップアップを閉じる関数
  interface CloseModal {
    (e?: React.MouseEvent<HTMLElement>): void;
  }

  const closeModal: CloseModal = (e) => {
    // イベントの伝播を停止（ボタンクリックが背景のクリックとして扱われないように）
    e?.stopPropagation();
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // モーダルの背景クリックで閉じる処理
  const handleOverlayClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

   const numStars = 30; // 星の数
  const stars = React.useMemo(() => 
    Array.from({ length: numStars }, (_, i) => {
      const style = {
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 100}%`,
        transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`,
        animationDelay: `${Math.random() * 5}s`, // 瞬きのタイミングをずらす
      };
      return <StarIcon key={i} style={style} />;
    })
  , []); // コンポーネントの再レンダリングで星の位置が変わらないよう useMemo を使用


  return (
      <main >
        <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .twinkle-star {
          animation: twinkle 4s infinite ease-in-out;
          will-change: opacity; /* アニメーションのパフォーマンスを最適化 */
        }
      `}</style>
        <div className='flex  flex-col justify-center items-center bg-[#011051] '>
        <div className='w-full  flex justify-center bg-gradient-to-b from-[#5FFAA1] via-[#011051] to-[#011051] h-screen'>
          <Image src="/img/logo.svg" alt="Halloween 25 Lit" width={1600} height={900} className='z-10  m-auto h-full w-[60%] py-24 ' />
          {stars}
          
        </div>
        
        <div className='flex flex-row w-full gap-8 justify-center-safe px-16 pb-4 '>
          <div className='w-full aspect-video mt-24 '>
            <Link href="https://unityroom.com/games/frionhalloween" className=" text-[#5FFAA1] drop-shadow-[0px_0px_4px_#5FFAA1] font-toge-maru-gothic font-bold text-[24px] mb-4  border-4 border-[#5FFAA1] shadow-inner  shadow-[#5FFAA1]/50 rounded-lg font-toge-maru-gothic p-2   hover:bg-[#5FFAA1]/30 transition"><span className='font-gotham'>Unity room</span>で開く</Link>
            <div className='relative  w-full  aspect-video  '>
            
            <div className='absolute  w-full h-full z-20'>
            <Game />
            </div>
            
            <Image 
              src="/img/background.png" 
              alt="Game Placeholder" 
              width={800} 
              height={450} 
              className='absolute inset-0 w-full h-full object-contain rounded-md z-0' 
            />
  <Image 
    src="/img/loading.png" 
    alt="Loading" 
    width={30} 
    height={30} 
    className='
      absolute 
      z-10 
      top-11/12 
      left-1/2
      -translate-x-1/2 
      -translate-y-1/2 
      animate-spin
    ' 
  />
  </div>     
            <div className='text-[#F2F3FF] font-toge-maru-gothic text-[32px] w-full font-black ju flex-grow  pt-4 f'>
    <h3>操作方法</h3>
    <p>移動：<span className='font-gotham'>WASD</span>キー（ <span className='font-gotham'>or</span> 矢印キー）</p>
    <p>視点：マウス</p>
    <p>カーソル表示,設定画面表示：<span className='font-gotham'>Esc</span>キー</p>
  </div>
          </div>
        <div className='flex flex-col justify-start w-[30%]'>
         <button 
        onClick={openModal} 
        // ★変更: 'justify-end' を 'justify-center' に変更して中央揃えに
        className="btn btn-primary flex justify-center cursor-pointer text-[28px] font-bold  border-4 border-[#5FFAA1] shadow-inner  shadow-[#5FFAA1]/50 rounded-lg font-toge-maru-gothic py-4   hover:bg-[#5FFAA1]/30 transition"
        style={{
         boxShadow: '0 0 20px #5FFAA1,inset 0 0 20px #5FFAA1'
        }}
      >

     {isOpen && (
       <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeModal} // 背景クリックで閉じる
        >
          {/* モーダル本体（画像コンテナ）。背景へのクリック伝播を停止 */}
          <div 
            className="relative w-[90vw] max-w-[1000px] aspect-video  "
            onClick={(e) => e.stopPropagation()}
          >
            
            <video 
              src="/movie/final_fix.mp4" // 11. 選択された動画の src を表示
              className='object-contain rounded-md'
              controls
            />

          </div>
          

          {/* 閉じるボタン */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 border-4  border-[#5FFAA1] text-[#5FFAA1] rounded-full w-16 h-16 flex items-center justify-center font-bold text-4xl shadow-lg cursor-pointer z-50 hover:bg-[#5FFAA1]/30 transition"
          >
            &times;
          </button>
        </div>
     )}
        
        
        {/* ボタンのコンテンツ (アイコン + テキスト) */}
        <div className='flex flex-row justify-center items-center'>
          <svg
            id="play-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            // ★変更: textShadowを削除し、Tailwindのdrop-shadowクラスを追加
            className='text-[#5FFAA1] drop-shadow-[0px_0px_4px_#5FFAA1]'
            // style={{ ... }} は削除 (もしくはfilterプロパティに変更)
          >
            <path d="M8 5V19L19 12L8 5Z" />
          </svg>
          <p className='text-[#5FFAA1]'
             style={{
               textShadow: '0px 0px 4px #5FFAA1' // テキストは textShadow のままでOK
             }}
          >
            動画を再生
          </p>
        </div>
        </button>
        {/* 1. 親divに 'flex flex-col' を追加 
   (コンテナの高さが定義されていない場合、'h-full' などが必要な場合があります) */}
<div className='flex flex-col grow'> 
  <div className='py-4 w-full h-full'>
        <div className='border-4 border-[#7D56E5] rounded-md flex flex-col items-center-safe p-2 pb-8  w-full h-[750px]  overflow-hidden'
          style={{
              boxShadow: '0 0 20px #7D56E5,inset 0 0 20px #7D56E5'
             }}
          >
            <div className='flex flex-row  w-full justify-center-safe items-center-safe'>
              <Image src="/img/komyu2.png" alt="Halloween 25 Lit Logo" width={80} height={50} className='animate-bounce duration-[7s] [animation-delay:-0.2s]'/>
              <h3 className='text-[#F2F3FF] font-toge-maru-gothic text-[28px] font-bold'>提供写真</h3>
              <Image src="/img/komyu1.png" alt="Halloween 25 Lit Logo" width={80} height={50} className='animate-bounce duration-[7s] [animation-delay:-0.8s]'/>
            </div>
              <div className='flex flex-col grow justify-start overflow-y-scroll w-full pt-4 pb-8'>
                <div className='m-4 pr-6 transition duration-300 hover:scale-105'  >
                  <Image src="/img/photo1.webp" alt="Photo 1" width={350} height={250} onClick={() => openImageModal("/img/photo1.webp")} className='rounded-md bg-white m-4 rotate-6 pt-4 pb-8 px-2 cursor-pointer'/>
                  <div className='w-[350px] h-auto'></div>
                </div>
                <div className='m-4  pr-6 transition duration-300 hover:scale-105' >
                  <Image src="/img/photo2.webp" alt="Photo 2" width={350} height={250} onClick={() => openImageModal("/img/photo2.webp")} className='rounded-md bg-white m-4 -rotate-6 pt-4 pb-8 px-2 cursor-pointer'/>
                  <div className='w-[350px] h-auto'></div>
                </div>
                <div className='m-4  pr-6 transition duration-300 hover:scale-105' >
                  <Image src="/img/photo3.webp" alt="Photo 3" width={350} height={250} onClick={() => openImageModal("/img/photo3.webp")} className='rounded-md bg-white m-4 rotate-6 pt-4 pb-8 px-2 cursor-pointer'/>
                  <div className='w-[350px] h-auto'></div>
                </div>
                <div className='m-4  pr-6 transition duration-300 hover:scale-105' >
                  <Image src="/img/photo4.webp" alt="Photo 4" width={350} height={250} onClick={() => openImageModal("/img/photo4.webp")} className='rounded-md bg-white m-4 -rotate-6 pt-4 pb-8 px-2 cursor-pointer'/>
                  <div className='w-[350px] h-auto'></div>
                </div>
                <div className='m-4 pr-6 transition duration-300 hover:scale-105' >
                  <Image src="/img/photo5.webp" alt="Photo 5" width={350} height={250} onClick={() => openImageModal("/img/photo5.webp")} className='rounded-md bg-white m-4 rotate-6 pt-4 pb-8 px-2 cursor-pointer'/>
                  <div className='w-[350px] h-auto'></div>
                  
                </div>
              </div>
              {selectedImageSrc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeImageModal} // 背景クリックで閉じる
        >
          {/* モーダル本体（画像コンテナ）。背景へのクリック伝播を停止 */}
          <div 
            className="relative w-[90vw] max-w-[1000px] aspect-video"
            onClick={(e) => e.stopPropagation()} // 画像クリックで閉じないようにする
          >
            <Image 
              src={selectedImageSrc} // 11. 選択された画像の src を表示
              alt="Popup Image" // alt も動的に変更可能
              fill
              className='object-contain rounded-md'
            />
          </div>

          {/* 閉じるボタン */}
          <button
            onClick={closeImageModal}
            className="absolute top-6 right-6 border-4  border-[#7D56E5] text-[#7D56E5] rounded-full w-16 h-16 flex items-center justify-center font-bold text-4xl shadow-lg cursor-pointer z-50 hover:bg-[#7D56E5]/30 transition"
          >
            &times;
          </button>
        </div>
      )}
          </div>
          </div>


  {/* <div className="flex justify-end">
    <Image 
      src="/img/kabotya.png" 
      alt="Operation Guide" 
      width={200} 
      height={50} 
      className='h-auto w-24' 
    />
  </div> */}

</div>
        </div>
        </div>
        
        

       {/* 親要素 (基準) */}
<div className='w-full relative '>
  
  {/* 1. 背景 (星) */}
  {/* absolute で親いっぱいに広げ、z-0 で背面に配置 */}
  <div className="absolute inset-0 z-0">
    <BottomStars />
  </div>

  {/* 2. 前景 (テキスト) */}
  {/* relative を追加し、z-10 で手前に配置 */}
  <div className='w-full relative text-[28px] flex flex-col items-start text-[#F2F3FF] font-toge-maru-gothic font-regular pl-16 pt-16 z-10'>
    <p><span className='font-gotham'>PM</span>：ピナ</p>
    <p>ゲーム制作：さとたい ぺんぎん アンビ ピナ</p>
    <p>デザイナー：むた りっちゃん みるぷ かめさん </p>
    <p><span className='font-gotham'>WEB</span>制作：あーる</p>
    <p>バーチャル背景制作：にとりん こーた きゅる</p>
    <p>映像制作：ゆきま こーた にとりん</p>
    <p>謎：むた</p>
    <p><span className='font-gotham'>MC</span>：りょうさん</p>
  </div>
  
  {/* BottomStars は上記でラップしたため、ここからは削除 */}
</div>
      
      </div>
     <Shape />
      </main>
      
  );
}
