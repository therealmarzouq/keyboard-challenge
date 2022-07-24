import '@assets/main.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { Provider } from 'react-redux'
import { store } from 'store/store'

const Noop: FC<any> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <Provider store={store}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}
