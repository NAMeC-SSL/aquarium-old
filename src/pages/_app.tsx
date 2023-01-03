import type {AppProps} from "next/app";

import "../style.css";
import "../App.css";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Viewer - SSL</title>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}