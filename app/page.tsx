import Image from 'next/image';

export default function Home() {
  return (
      <main className='flex  flex-col justify-center items-center gap-4 p-4 bg-[#011051]'>
        <div>
          <Image src="/img/test.png" alt="Halloween 25 Lit" width={600} height={400} />
        </div>

        <button className="btn btn-primary bg-[#5FFAA1] rounded-full font-toge-maru-gothic py-4  mx-4 w-full">動画を再生</button>

        <div className='flex flex-row w-full gap-4 mx-4 justify-center-safe'>
          <div>
            <p>webGLをここに</p>
            <div className='text-[#F2F3FF] font-toge-maru-gothic'>
              <h3>操作方法</h3>
              <p>移動：WASDキー（or 矢印キー）</p>
              <p>視点：マウス</p>
            </div>
          </div>
          <div className='bg-[#7D56E5] rounded-md flex flex-col items-center-safe'>
            <h3 className='text-[#F2F3FF] font-toge-maru-gothic '>提供写真</h3>
            <div className='flex flex-col justify-center'>
              <Image src="/photo1.jpg" alt="Photo 1" width={200} height={150} />
              <Image src="/photo2.jpg" alt="Photo 2" width={200} height={150} />
              <Image src="/photo3.jpg" alt="Photo 3" width={200} height={150} />
              <Image src="/photo4.jpg" alt="Photo 4" width={200} height={150} />
              <Image src="/photo5.jpg" alt="Photo 5" width={200} height={150} />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start text-[#F2F3FF] font-toge-maru-gothic w-full'>
          <p>ディレクター：ピナ</p>
          <p>ゲーム制作：さとたい ぺんぎん アンビ</p>
          <p>デザイナー：りっちゃん かめさん みるぷ むた</p>
          <p>WEB制作：あーる</p>
          <p>バーチャル背景制作：きゅる にとりん</p>
          <p>映像制作：ゆきま こーた にとりん</p>
          <p>謎：むた</p>
          <p>MC：りょうさん</p>
        </div>
      </main>
  );
}
