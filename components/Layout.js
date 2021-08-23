import clsx from 'clsx'
import Head from 'next/head'

export default function Layout({
  children,
  title = 'Mohit Singh',
  description = 'Mohit Singh is a Software Engineer, Open Sourcerer, Physics Enthusiast and Fitness Freak',
  url = '',
  home = false,
  header,
}) {
  return (
    <>
      {header && header}
      <main
        className={clsx([!home && 'flex flex-col', 'flex-grow flex-shrink-0'])}
      >
        <Head>
          <title>{title}</title>
          <meta name='description' content={description} />
          <link
            href='https://mohitsingh.in/sitemap.xml'
            rel='sitemap'
            type='application/xml'
            title='Sitemap'
          />
          <meta
            content='wmG9n4x_BUWryqpD2K4wEF9Edfh_LNapQe-qfbv4D3o'
            name='google-site-verification'
          />
          <link rel='canonical' href={`https://mohitsingh.in/${url}`} />
        </Head>
        {children}
      </main>
      <footer className='w-full py-4 text-center'>
        <p className='text-xs text-gray-700'>
          Copyright &copy; 2021 Mohit Singh
        </p>
      </footer>
    </>
  )
}
