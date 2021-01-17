import React from 'react'
//Multilanguage support
import { withTranslation } from '../../i18n'

//Search Engine Optimization
import {NextSeo} from 'next-seo'

//Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid, Button, Card, CardHeader, CardContent, CardActions, Typography} from '@material-ui/core'

//Context API
import {useContext} from 'react'
import DataContext from '../../Context/DataContext';

import fetch from 'isomorphic-unfetch'

import Link from '../Link'
import Image from 'next/image'

//API request with with auth
//import {parseCookies} from 'nookies'

//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 300
    }
}));

const ElItem = ({t, el}) => {   
    const {value, setValue} = useContext(DataContext)
    
    const classes = useStyles()
    const theme = useTheme()
    const SEO = {
        title: 'Els',                            // page.title  <-- backend
        description: 'All available els',

        openGraph: {
            title: 'Els',
            description: 'All available els',
        }
    }
    return (
        <div>
            <NextSeo {...SEO} />            
            <Card className={classes.card}>
                <CardHeader                    
                    title={el.title}
                    subheader="January 10, 2021"
                />
                {/* <Image src={process.env.API_URL + el.image.url} width={300} height={200} /> */}
                
                <CardContent>
                    <Typography 
                        variant="body2" 
                        text='textPrimary' 
                        component="p"
                        dangerouslySetInnerHTML={{__html: el.description}} />                   
                </CardContent>
                <CardActions disableSpacing>
                    <Button component={Link} href='/els/[slug]' as={`/els/${el.slug}`} style={{textDecoration: 'none'}}>{el.title}</Button>
                </CardActions>                
            </Card>
        </div>
    )
}


export default withTranslation('about')(ElItem)

