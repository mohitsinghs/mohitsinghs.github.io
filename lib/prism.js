import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'
import { visit } from 'unist-util-visit'

loadLanguages([
  'html',
  'css',
  'js',
  'json',
  'bash',
  'python',
  'go',
  'rust',
  'js-extras',
  'jsdoc',
])

export default function prism() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang !== null) {
        node.type = 'html'
        node.value = [
          `<div class="highlight">`,
          `<pre class="language-${node.lang}">`,
          `<code class="language-${node.lang}">`,
          Prism.highlight(node.value, Prism.languages[node.lang], node.lang),
          '</code>',
          '</pre>',
          `</div>`,
        ]
          .filter(Boolean)
          .join('')
      }
    })
    visit(tree, 'inlineCode', (node) => {
      const marker = '-->'
      if (node.value.includes(marker)) {
        const [lang, rest] = node.value.split('-->', 2)
        node.lang = lang.toLowerCase()
        if (lang && rest) {
          node.value = rest
        }
      } else {
        node.lang = 'text'
      }

      if (node.lang !== null) {
        node.type = 'html'
        node.value = [
          `<code class="language-${node.lang}">`,
          Prism.highlight(node.value, Prism.languages[node.lang], node.lang),
          '</code>',
        ]
          .filter(Boolean)
          .join('')
      }
    })
  }
}
