import React, { createContext, useState } from 'react'

export let userContext = createContext()
export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null)
  
    return (

        <userContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </userContext.Provider>
    )
}
