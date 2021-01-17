import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Link from '../src/Link'
//import { parseCookies, setCookie  } from 'nookies'
//import Cookies from 'js-cookie'
import nookies, {setCookie} from 'nookies'

//Multilanguage support
import { withTranslation } from '../i18n'

//Search Engine Optimization
import {NextSeo} from 'next-seo'


/*
import fetch from 'isomorphic-unfetch'
import {setCookie} from 'nookies'
import getConfig from 'next/config'
*/


import {Avatar, Button, Card, CardContent, Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,  Box, Typography, Container, Snackbar} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';
import { EmailOutlined, RotateLeftTwoTone } from '@material-ui/icons';

//const { publicRuntimeConfig } = getConfig();

const useStyles = makeStyles((theme) => ({
  cardContainer: {        
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        padding: "4em", 
        width: '35em',    
        [theme.breakpoints.down("xs")]: {
            paddingTop: "4em",
            paddingBottom: "4em",
            paddingLeft: '2em',
            paddingRight: '2em',
            borderRadius: 0,
            width: '100%'                   
        },
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
   message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: "5em",
    borderRadius: 5
  },
  radioBtns: {
      display: 'flex',
      flexDirection: 'row !important',
      alignItems: 'center !important'
  },
  radioTitle: {
      marginRight: 'auto'
  }
}));

const signup = ({t}) => {
    //console.log(publicRuntimeConfig.API_URL)  
    const classes = useStyles()
    const SEO = {
        title: 'SighUp Page',                            // page.title  <-- backend
        description: 'SighUp Page ...',

        openGraph: {
            title: 'SighUp Page',
            description: 'SighUp Page ...',
        }
    }
    const {API_URL} = process.env
    const router = useRouter()

    const [name, setName] = useState('')
    const [nameHelper, setNameHelper] = useState('')

    const [email, setEmail] = useState('')
    const [emailHelper, setEmailHelper] = useState('')     

    const [password, setPassword] = useState('')
    const [passwordHelper, setPasswordHelper] = useState('')
    
    const [role, setRole] = useState('user')
    const [roleHelper, setRoleHelper] = useState('')

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        backgroundColor: ""
    });    
   
    
    const onChange = event => {
        const {value, id, name } = event.target
        let valid;               
        switch (id) {
            case "name":
                setName(value);
                if(value === ''){
                    setNameHelper("Name is required!")
                }
            case "email":
                setEmail(value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                value
                );
                if(value === ''){
                    setEmailHelper('Email is required!')
                }
                else if (!valid) {
                    setEmailHelper("Invalid email");
                } else {
                    setEmailHelper("");
                }
                break;
            case "password":
                setPassword(value);
                //valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
                valid = true
                if (value === '') {
                    setPasswordHelper("Password is required!");
                }
                else if (!valid) {
                    setPasswordHelper('Invalid password');
                } else {
                    setPasswordHelper("");
                }
                break;
            
            default:
                break;
            }
            if(name === 'role') {
                setRole(value)
            }
    };


    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(name, email, password, role)
        //API requirements: password at least 6 characters, email --- correct format, all fields required
        const userData = {name, email, password, role}
        const signup= await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify(userData)
        })
        
        const signupResp = await signup.json()
        if(!signupResp.success){
            setAlert({
                open: true,
                message: signupResp.error,
                backgroundColor: "#FF3232"
            })
            return
        }
        //set cookie, received as token ... res.token
        nookies.set(null, 'token', signupResp.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        router.push('/')

    }
    return (
    <Grid container alignItems='center' justify='center'>
        <NextSeo {...SEO} />   
        <Grid item>
        <Card className={classes.cardContainer}>
            
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    //autoComplete="email"
                    autoFocus
                    value={name}
                    onChange={onChange}          
                    error={nameHelper.length !== 0 }
                    helperText={nameHelper}
                    
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        //autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={onChange}          
                        error={emailHelper.length !== 0 }
                        helperText={emailHelper}
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        //autoComplete="password"
                        value={password}
                        onChange={onChange}           
                        error={passwordHelper.length !== 0}
                        helperText={passwordHelper}
                    />
                   <FormControl className={classes.radioBtns} style={{marginTop: '1em'}}>
                        <FormLabel component="legend" className={classes.radioTitle}>Role</FormLabel>
                        <RadioGroup aria-label="role" name="role" id="role" value={role} onChange={onChange} className={classes.radioBtns}>
                            <FormControlLabel value="user" control={<Radio />} label="User"  labelPlacement="start" />
                            <FormControlLabel value="publisher" control={<Radio />} label="Publisher"  labelPlacement="start" />                            
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        size='large'
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                        disabled={
                            name === '' ||
                            nameHelper.length > 0 ||
                            email === '' ||
                            emailHelper.length > 0 ||
                            password === '' ||
                            passwordHelper.length > 0                            
                        }
                    >
                        Register
                    </Button>                    
                </form>
            
        </Card>
        
      </Grid>
      
    <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
    />

    </Grid>
  
    )
}

export default withTranslation()(signup)
