"use client";
import Image from 'next/image';
import Game from '../app/components/game';
import YoutubeModal from './components/YoutubeModal';
import React, { useState } from 'react';
import Shape from './components/shape';

export default function Home() {
  // ポップアップの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false);

  // ポップアップを開く関数
  const openModal = () => setIsOpen(true);

  // ポップアップを閉じる関数
  const closeModal = () => setIsOpen(false);

  return (
      <main >
        <div className='flex  flex-col justify-center items-center gap-8 p-4 bg-[#011051] px-16'>
        <div className='w-full my-32 flex justify-center'>
          <Image src="/img/logo.png" alt="Halloween 25 Lit" width={800} height={600} />
        </div>

        <button onClick={openModal} className="btn btn-primary text-[36px] font-bold bg-[#5FFAA1] rounded-full font-toge-maru-gothic py-4  mx-4 w-full">
          {isOpen && (
        // モーダルのオーバーレイ（背景）
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // 半透明の黒い背景
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000 // 他の要素より手前に表示
        }}>
          {/* モーダルのコンテンツエリア */}
          <div style={{
            position: 'relative',
            // ここに元のYouTubeEmbedコンポーネントを配置
          }}>
            <YoutubeModal />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                border: 'none',
                background: 'transparent',
                color: '#fff', // 白いX
                fontSize: '100px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              &times; 
            </button>
          </div>
        </div>
      )}
          <div className='flex flex-row justify-center items-center gap-4'>
            <Image src="/img/play.svg" alt="Play Icon" width={32} height={32} className='absolute left-32'/>
            <p className='text-black'>動画を再生</p>
          </div>
        </button>

        <div className='flex flex-row w-full gap-4 mx-4 justify-center-safe'>
          <div className='w-full'>
            <Game />
            <div className='text-[#F2F3FF] font-toge-maru-gothic text-[36px] w-full font-black'>
              <h3>操作方法</h3>
              <p>移動：<span className='font-gotham'>WASD</span>キー（ <span className='font-gotham'>or</span> 矢印キー）</p>
              <p>視点：マウス</p>
            </div>
          </div>
          <div className='bg-[#7D56E5] rounded-md flex flex-col items-center-safe p-4'>
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
        <div className='text-[36px] flex flex-col items-start text-[#F2F3FF] font-toge-maru-gothic font-bold w-full'>
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
