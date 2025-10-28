"use client";
import { YouTubeEmbed } from '@next/third-parties/google'


export default function YoutubeModal() {
  return (
    <div>
      <YouTubeEmbed videoid="TbakFPc4ZTw" width={1000} params="controls=0" />
    </div>
  );
}