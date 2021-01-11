import React from 'react'
import {Grid} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch'
import LanguageSwitcher from './LanguageSwitcher'

//import {parseCookies} from 'nookies'
//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles((theme) => ({
 
}));

const Header = () => {   
    const classes = useStyles()
    return (
        <div>      
            <LanguageSwitcher />
        </div>
    )
}

export async function getServerSideProps(ctx) {    
    //const jwt = parseCookies(ctx).jwt
    //const {API_URL} = process.env
    //const {publicRuntimeConfig} = getConfig()

    // fetch data here ... use API_URL or publicRuntimeConfig.API_URL
    
    return {
        props: {
           
        },
        
    }
}

export default Header

