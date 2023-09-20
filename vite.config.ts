import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include:[
        /\.[tj]sx?$/, 
        /\.vue$/, 
        /\.vue\?vue/, 
        /\.md$/,
      ],
      imports:[
        'vue',
        'vue-router',
        'pinia'
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: './auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    //自动注册组件
    Components({
      dirs:['src/components'],
      resolvers: [ElementPlusResolver()],
      extensions:['vue'],
      dts:'src/components.d.ts'
    }),
  ],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    }
  }
})
