import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import getConfig from 'next/config'

import ContextWrapper from '../Context/ContextWrapper'
import { appWithTranslation } from '../i18n'
import Router from 'next/router'
import { parseCookies  } from 'nookies'

import Header from '../src/components/Header'

import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'


const MyApp = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />
      <ContextWrapper>
        <Head>          
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </ContextWrapper>      
    </React.Fragment>
  );
}
const { publicRuntimeConfig } = getConfig()
function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

//fetch initial site-wide data here
MyApp.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {}
    const jwt = parseCookies(ctx).jwt
  

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    // restricted-content --- any route requiring authorization
    if (!jwt) {
        if (ctx.pathname === "/restricted-content") {
            redirectUser(ctx, "/login");
        }
    }

    return {
        pageProps        
    }
}



export default appWithTranslation(MyApp)