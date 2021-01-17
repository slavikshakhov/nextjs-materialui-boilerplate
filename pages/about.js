import React from 'react'
//Multilanguage support
import { withTranslation } from '../i18n'

//Search Engine Optimization
import {NextSeo} from 'next-seo'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core'

//Context API
import {useContext} from 'react'
import DataContext from '../Context/DataContext';

import fetch from 'isomorphic-unfetch'

//API request with with auth
//import {parseCookies} from 'nookies'

//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();
//import Link from '../src/Link'
import Link from 'next/link'
const useStyles = makeStyles((theme) => ({
 
}));

const About = ({t}) => {   
    const {value, setValue} = useContext(DataContext)
    
    const classes = useStyles()
    const SEO = {
        title: 'About Page',                            // page.title  <-- backend
        description: 'Just your normal about page',

        openGraph: {
            title: 'About Page',
            description: 'Just your normal about page',
        }
    }
    return (
        <div>
            <NextSeo {...SEO} />                 
             {t('Title')}
             <Button href='/courses'>Courses</Button>
        </div>
    )
}

/*
export async function getServerSideProps(ctx) {    
    //const jwt = parseCookies(ctx).jwt
    //const {API_URL} = process.env
    //const {publicRuntimeConfig} = getConfig()

    // fetch data here ... use API_URL or publicRuntimeConfig.API_URL
    
    return {
        props: {
           
        }        
    }
}
*/

export default withTranslation('about')(About)

