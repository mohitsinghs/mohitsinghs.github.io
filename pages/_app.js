import '@fontsource/poppins/latin.css'
import '../styles/index.css'
import Head from 'next/head'

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </Head>
    <Component {...pageProps} />
  </>
)

export default App
