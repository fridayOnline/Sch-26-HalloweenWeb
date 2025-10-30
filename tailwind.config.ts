import type { Config } from 'tailwindcss'
import iconsPlugin, { getIconCollections } from '@egoist/tailwindcss-icons'

const config : Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      gotham: ['gotham', 'sans-serif'],
   },
  },
  plugins: [
    // iconsPlugin を一時的に無効化 (動的 require により Next のバンドラでエラーになるため)
    // 再導入する場合は、プラグインのドキュメントに従いビルド時のみ実行されるように設定してください。
    // iconsPlugin({ collections: getIconCollections(["tabler", "lucide", "material-symbols"]) }),
  ],
}
export default config