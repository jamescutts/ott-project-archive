import { useEffect } from 'react'
import { clarity } from 'react-microsoft-clarity';
import { GoogleAnalytics } from "nextjs-google-analytics";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { useState } from "react";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    clarity.init("hdnbx1x1qc");
  })

  const [queryClient] = useState(() => new QueryClient());

  return <>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  </>
}
