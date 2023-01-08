import type {AppProps} from "next/app";

import "../style.css";
import "../App.css";
import Head from "next/head";
import {store} from '../store/store';
import {Provider} from 'react-redux'
import {useEffect} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {tools_packet} from "../store/ssl";

import { useDispatch } from "react-redux";
import { updateField } from "../store/field";
import Init from "../components/init";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}: AppProps) {

    return (
        <Provider store={store}>
            <Init/>
            <Head>
                <title>Viewer - SSL</title>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}