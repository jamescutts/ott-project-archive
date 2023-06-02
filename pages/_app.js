import { useEffect } from 'react'
import { clarity } from 'react-microsoft-clarity';
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    clarity.init("hdnbx1x1qc");
  })
  return <>
    <GoogleAnalytics trackPageViews />
    <Component {...pageProps} />
  </>
}
