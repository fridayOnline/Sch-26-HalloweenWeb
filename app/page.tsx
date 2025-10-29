"use client";
import Image from 'next/image';
import Game from '../app/components/game';
import YoutubeModal from './components/YoutubeModal';
import React, { useState } from 'react';
import Shape from './components/shape';
import { shadow } from 'three/tsl';
// import{ Button }from '@mui/material'

const StarIcon = ({ style }) => (
  <svg 
    className="absolute text-[#FBF835] twinkle-star" // アニメーション用のクラスを追加
    style={style} // 位置やサイズ、遅延をランダムに適用
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
  </svg>
);

export default function Home() {
   // ポップアップの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false);

  // ポップアップを開く関数
  // モーダル表示中は背景のスクロールを禁止
  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // ポップアップを閉じる関数
  const closeModal = (e) => {
    // イベントの伝播を停止（ボタンクリックが背景のクリックとして扱われないように）
    e.stopPropagation(); 
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
        top: `${Math.random() * 50}%`,
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
        <div className='flex  flex-col justify-center items-center bg-[#011051] '
         
        >
        <div className='w-full  flex justify-center bg-gradient-to-b from-[#5FFAA1] via-[#011051] to-[#011051] '>
          <Image src="/img/logo.png" alt="Halloween 25 Lit" width={800} height={600} className='z-10  m-auto' />
          {stars}
          
        </div>
        <div className='flex flex-row w-full gap-8 justify-center-safe px-16 '>
          <div className='w-full'>
            <Game  
              
            />
            <div className='text-[#F2F3FF] font-toge-maru-gothic text-[36px] w-full font-black my-4'>
              <h3>操作方法</h3>
              <p>移動：<span className='font-gotham'>WASD</span>キー（ <span className='font-gotham'>or</span> 矢印キー）</p>
              <p>視点：マウス</p>
            </div>
          </div>
        <div className='flex flex-col justify-center'>
         <button onClick={openModal} className="btn btn-primary cursor-pointer text-[36px] font-bold  border-4 border-[#5FFAA1] shadow-inner  shadow-[#5FFAA1]/50 rounded-lg font-toge-maru-gothic py-4  mb-4 items-center flex flex-col  hover:bg-[#5FFAA1]/30 transition"
         style={{
          boxShadow: '0 0 20px #5FFAA1,inset 0 0 20px #5FFAA1'
         }}
        >
          {isOpen && (
        // モーダルのオーバーレイ（背景）
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // 背景クリックで閉じる
           
            if (e.target === e.currentTarget) {
              closeModal(e);
            }
          }}
        >
          {/* モーダルのコンテンツエリア */}
          <div style={{
            position: 'relative',
            // ここに元のYouTubeEmbedコンポーネントを配置
          }}>
            <YoutubeModal />
            <button
              onClick={closeModal}
              className="absolute -top-4 right-48 border-4 border-[#5FFAA1] text-[#5FFAA1] rounded-full w-16 h-16 flex items-center justify-center font-bold text-4xl shadow-lg cursor-pointer z-50 hover:bg-[#5FFAA1]/30 transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}
          <div className='flex flex-row justify-center items-center gap-4'>
            <Image src="/img/play.svg" alt="Play Icon" width={32} height={32} className='absolute left-32 '/>
            <p className='text-[#5FFAA1]'
             style={{
              textShadow: '0px 0px 4px #5FFAA1'
             }}
            >動画を再生</p>
          </div>
        </button>
          <div className='border-4 border-[#7D56E5] rounded-md flex flex-col items-center-safe p-4 pb-8 pr-4'
          style={{
              boxShadow: '0 0 20px #7D56E5,inset 0 0 20px #7D56E5'
             }}
          >
            <div className='flex flex-row  w-full justify-center-safe items-center'>
              <Image src="/img/komyu2.png" alt="Halloween 25 Lit Logo" width={100} height={50} />
              <h3 className='text-[#F2F3FF] font-toge-maru-gothic text-[36px] font-bold'>提供写真</h3>
              <Image src="/img/komyu1.png" alt="Halloween 25 Lit Logo" width={100} height={50} />
            </div>
            
            <div className='flex flex-col justify-start overflow-y-scroll flex-nowrap max-h-[850px]'>
              <Image src="/photo1.jpg" alt="Photo 1" width={300} height={400} className='rounded-md bg-amber-50 m-4'/>
              <Image src="/photo2.jpg" alt="Photo 2" width={300} height={400} className='rounded-md bg-amber-50 m-4'/>
              <Image src="/photo3.jpg" alt="Photo 3" width={300} height={400} className='rounded-md bg-amber-50 m-4'/>
              <Image src="/photo4.jpg" alt="Photo 4" width={300} height={400} className='rounded-md bg-amber-50 m-4'/>
              <Image src="/photo5.jpg" alt="Photo 5" width={300} height={400} className='rounded-md bg-amber-50 m-4'/>
            </div>
          </div>
        </div>
        </div>
        <div className='text-[28px] flex flex-col items-start text-[#F2F3FF] font-toge-maru-gothic font-regular w-full pl-16 pt-16'>
          <p>ディレクター：ピナ</p>
          <p>ゲーム制作：さとたい ぺんぎん アンビ</p>
          <p>デザイナー：りっちゃん かめさん みるぷ むた</p>
          <p><span className='font-gotham'>WEB</span>制作：あーる</p>
          <p>バーチャル背景制作：きゅる にとりん</p>
          <p>映像制作：ゆきま こーた にとりん</p>
          <p>謎：むた</p>
          <p><span className='font-gotham'>MC</span>：りょうさん</p>
        </div>
      
      </div>
      <Shape />
      </main>
      
  );
}
