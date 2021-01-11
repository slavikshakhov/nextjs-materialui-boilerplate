import React from 'react'
import {Grid} from '@material-ui/core'
import { withTranslation } from '../i18n'
import { makeStyles } from '@material-ui/core/styles';

//import {parseCookies} from 'nookies'
//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles((theme) => ({
 
}));

const login = () => {   
    const classes = useStyles()
    return (
        <div>
             from login
        </div>
    )
}

export async function getServerSideProps(ctx) {    
    //const jwt = parseCookies(ctx).jwt`        if protected route
    //const {API_URL} = process.env
    //const {publicRuntimeConfig} = getConfig()

    // fetch data here ... use API_URL or publicRuntimeConfig.API_URL
    
    return {
        props: {
           
        }
    }
}



export default withTranslation()(login)

