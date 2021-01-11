import React from 'react'
//Multilanguage support
import { withTranslation } from '../../i18n'

//Search Engine Optimization
import {NextSeo} from 'next-seo'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core'

//Context API
import {useContext} from 'react'
import DataContext from '../../Context/DataContext';

import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'


//API request with with auth
//import {parseCookies} from 'nookies'

//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();

import ElItem from '../../src/components/ElItem';
const elsPerPage = 2       // set number of Els per page
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    pagination: {       
        marginTop: theme.spacing(4)        
    },
}));

// to remove pagination, remove page, numberOfEls, import 'next/router'
// pagination component, see https://material-ui.com/components/pagination/
const Els = ({t, els, page, numberOfEls}) => {   
    const {value, setValue} = useContext(DataContext)   
    const [pageNum, setPageNum] = React.useState(1);
    const handleChange = (event, value) => {
        console.log(value)
        setPageNum(value);
        router.push(`/els?page=${value}`)
    };
    
    const classes = useStyles()
    const SEO = {
        title: 'Els',                            
        description: 'All available els',

        openGraph: {
            title: 'Els',
            description: 'All available els',
        }
    }
    const router = useRouter()
    const lastPage = Math.ceil(numberOfEls / elsPerPage)

    return (
        <div>
            <NextSeo {...SEO} />   
            <Grid container style={{padding: '5em'}} spacing={8}>
                {els.map((el, i) => (
                    <Grid item key={i}>
                        <ElItem el={el} /> 
                    </Grid>                                    
                ))}               
            </Grid>              
             
             {/* 
                //Custom pagination

                <Grid container>
                    <Button onClick={() => router.push(`/els?page=${page - 1}`)}
                            disabled={page <= 1}>
                                Back
                            </Button>
                    <Button onClick={() => router.push(`/els?page=${page + 1}`)}
                            disabled={page >= lastPage}>
                                Next
                            </Button>
                </Grid>
             */}
             
            <Grid container justify='center' className={classes.pagination}>               
                <Pagination count={lastPage} color="primary" onChange={handleChange} />                
            </Grid>
        </div>
    )
}


export async function getServerSideProps({ query: {page= 1} }) {   
    //const jwt = parseCookies(ctx).jwt
    const {API_URL} = process.env
    //const {publicRuntimeConfig} = getConfig()    

    const start = +page === 1 ? 0 : (+page - 1) * elsPerPage

    const numberOfElsResponse = await fetch(`${API_URL}/courses/count`)   // in Strapi public access to Course's count
    const numberOfEls = await numberOfElsResponse.json()

    const res = await fetch(`${API_URL}/courses?_limit=${elsPerPage}&_start=${start}`)
    const data = await res.json()
    
    return {
        props: {
            els: data,
            page: +page,
            numberOfEls
        }        
    }
}


export default withTranslation('about')(Els)

