"use client";
import { YouTubeEmbed } from '@next/third-parties/google'


export default function YoutubeModal() {
  return (
    <div className='object-contain'>
      <YouTubeEmbed videoid="TbakFPc4ZTw"  params="controls=0" />
    </div>
  );
}