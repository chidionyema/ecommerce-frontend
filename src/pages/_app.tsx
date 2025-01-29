import React from "react";
import { AppProps } from "next/app";
import { Router } from "next/router";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import Head from "next/head";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Box,
  responsiveFontSizes,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "../components/ErrorBoundary";
import * as branding from "../theme/branding"; // Import branding tokens
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { GlobalStyles as CustomGlobalStyles } from "../theme/GlobalStyles"; // Import global typography settings

// Dynamically load AnalyticsProvider to prevent SSR issues
const AnalyticsProvider = dynamic(
  () => import("../components/AnalyticsProvider"),
  { ssr: false }
);

interface MyAppInnerProps extends AppProps {
  router: Router;
}

const MyAppInner: React.FC<MyAppInnerProps> = ({ Component, pageProps, router }) => {
  return <Component {...pageProps} router={router} />;
};

const MyApp: React.FC<AppProps & { router: Router }> = ({ Component, pageProps, router }) => {
  const currentTheme = responsiveFontSizes(
    createTheme({
      ...branding,
      typography: {
        ...branding.typography, // ✅ Use branding typography settings
        fontFamily: `"InterVariable", sans-serif`, // ✅ Ensures InterVariable is the main font
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            "@font-face": branding.fontLoader, // ✅ Ensure InterVariable is loaded
            html: {
              fontSize: "16px",
            },
          },
        },
      },
    })
  );

  return (
    <AnalyticsProvider>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <CustomGlobalStyles /> {/* Ensures enhanced typography settings */}
        <LazyMotion features={domAnimation}>
          <ErrorBoundary>
            <Head>
              <meta name="theme-color" content={currentTheme.palette.primary.main} />
            </Head>
            <NavBar />
            <Box sx={{ marginTop: '64px' }}/> 
            <Layout>
              <MyAppInner Component={Component} pageProps={pageProps} router={router} />
            </Layout>
            <ToastContainer />
          </ErrorBoundary>
        </LazyMotion>
      </ThemeProvider>
    </AnalyticsProvider>
  );
};

export default MyApp;
