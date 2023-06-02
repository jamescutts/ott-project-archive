import { clarity } from 'react-microsoft-clarity';
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    clarity.init("hdnbx1x1qc");
  })
  return <Component {...pageProps} />
}