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

import ElItem from '../../src/components/ElItem';

//API request with with auth
import nookies, {parseCookies} from 'nookies'

//import getConfig from 'next/config'
//const { publicRuntimeConfig } = getConfig();


import Pagination from '@material-ui/lab/Pagination';

const elsPerPage = 2

const useStyles = makeStyles((theme) => ({
    pagination: {       
        marginTop: theme.spacing(4)        
    },
}));

// to remove pagination, remove page, numberOfEls, import 'next/router'
// pagination component, see https://material-ui.com/components/pagination/
const Els = ({t, data, ...rest}) => {  
         
    const {value, setValue} = useContext(DataContext)  
    console.log(data) 
    //const [pageNum, setPageNum] = React.useState(1);
    /*
    const handleChange = (event, value) => {
        console.log(value)
        setPageNum(value);
        router.push(`/els?page=${value}`)
    };
    */
    const classes = useStyles()
    const SEO = {
        title: 'Courses',                            
        description: 'All available courses',

        openGraph: {
            title: 'Courses',
            description: 'All available courses',
        }
    }
    const router = useRouter()

    const lastPage = Math.ceil(data.total / elsPerPage)
    const handleChange = (event, value) => {
        console.log(value)
        //setPageNum(value);
        console.log(data.pagination.next)
        router.push(`/courses?page=${value}`)        
    };
    
    return (
        <div>
            <NextSeo {...SEO} />   
            <Grid container style={{padding: '5em'}} spacing={8}>
                {data.data.map((el, i) => (
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


export async function getServerSideProps({query: {page = 1}, ...ctx}) {   
    const jwt = parseCookies(ctx).token
    const {API_URL} = process.env
    //const {publicRuntimeConfig} = getConfig()  
    
    //const cookies = nookies.get(ctx)
    //const cookies = ctx.req.headers.cookie;
    console.log(jwt)

    const res = await fetch(`${API_URL}/api/courses?page=${page}&limit=${elsPerPage}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        
    })
    const data = await res.json()
    
    return {
        props: {
            data
        }        
    }
}


export default withTranslation('about')(Els)

