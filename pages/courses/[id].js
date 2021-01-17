

import getConfig from 'next/config'


//Multilanguage support
import { withTranslation } from '../../i18n'

//Search Engine Optimization
import {NextSeo} from 'next-seo'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

//Context API
import {useContext} from 'react'
import DataContext from '../../Context/DataContext';

import fetch from 'isomorphic-unfetch'

//API request with with auth
//import {parseCookies} from 'nookies'

//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles((theme) => ({
 
}));


function El({el, t}) {    
    const classes = useStyles()
    const SEO = {
        title: `Site Name | ${el.title}`,
        description: el.description,

        openGraph: {
            title: `Site Name | ${el.title}`,
            description: el.description,
        }
    }

    return (
        <>
            <NextSeo {...SEO} />
            <Grid variant="container" direction='column'>
                <Grid item>{el.title}</Grid>
                <Grid item>
                    <p dangerouslySetInnerHTML={{__html: el.description}}></p>
                </Grid>
            </Grid>
        </>
    )
}

const {publicRuntimeConfig} = getConfig()


//in Strapi as El Content Type, slug text field as 'el'
export async function getServerSideProps(ctx) {
    const {slug} = ctx.query
    const res = await fetch(`${publicRuntimeConfig.API_URL}/courses?slug=${slug}`)
    const data = await res.json()
    return {
        props: {
            el: data[0]
        },
    }
}

export default withTranslation()(El)
