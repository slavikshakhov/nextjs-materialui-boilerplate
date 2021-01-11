import { i18n } from '../../i18n'

import { useContext, useState, useEffect } from 'react'
import { I18nContext } from 'next-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'

const useStyles = makeStyles(theme => ({    
    
}))



const LanguageSwitchTab = () => {
    const classes = useStyles()
    const theme = useTheme()
    const { i18n: { language } } = useContext(I18nContext)
    const [defaultLg, setDefaultLg] = useState(false)
    const [languageName, setLanguageName] = useState('')
   
    const handleLanguage = () => {
        setDefaultLg(!defaultLg);
        console.log(defaultLg)        
    }

    useEffect(() => {
        i18n.changeLanguage(`${defaultLg ? 'es' : 'en'}`)
    }, [defaultLg])
    
    return(
       <Button 
        color='secondary'
        onClick={handleLanguage}
        >
            {defaultLg ? 'English' : 'Español'}
        </Button>
    )
}


export default LanguageSwitchTab

