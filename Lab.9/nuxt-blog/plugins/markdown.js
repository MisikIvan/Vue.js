// plugins/markdown.js

import { defineNuxtPlugin } from '#app'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'

export default defineNuxtPlugin((nuxtApp) => {
  
  nuxtApp.hook('content:file:beforeParse', (file) => {
    if (file.extension === '.md') {
      
    }
  })
})
