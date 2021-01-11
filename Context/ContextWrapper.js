import DataContext from './DataContext'
import { useState } from 'react'

function ContextWrapper({children, navigation}) {
    const [value, setValue] = useState(0)     // any state    
    

    return (
        <DataContext.Provider value={{value, setValue}}>
            {children}
        </DataContext.Provider>
    )
}

export default ContextWrapper
