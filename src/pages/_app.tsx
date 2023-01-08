import type {AppProps} from "next/app";

import "../style.css";
import "../App.css";
import Head from "next/head";
import {store} from '../store/store';
import {Provider} from 'react-redux'
import {useEffect} from "react";
import { invoke } from "@tauri-apps/api/tauri";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        const id = setInterval(async () => {
            invoke("receive_packet").then((data) => console.log(data)).catch((_) => {});
        }, 16);
        return () => clearInterval(id);
    }, [])

    return (
        <Provider store={store}>
            <Head>
                <title>Viewer - SSL</title>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}