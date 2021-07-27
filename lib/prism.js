import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'
import visit from 'unist-util-visit'
import languages from 'lib/languages'

loadLanguages([...Object.keys(languages), 'js-extras', 'jsdoc'])

export default function prism() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang !== null) {
        node.type = 'html'
        node.value = [
          `<pre class="language-${node.lang}">`,
          `<span class="lang">${languages[node.lang]}</span>`,
          `<code class="language-${node.lang}">`,
          Prism.highlight(node.value, Prism.languages[node.lang], node.lang),
          '</code>',
          '</pre>',
        ]
          .filter(Boolean)
          .join('')
      }
    })
  }
}
