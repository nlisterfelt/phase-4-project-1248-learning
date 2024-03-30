import {createContext, useState} from 'react'

const UserContext = createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(null)
    const [error, setError]=useState(null)

    const valueObject = {user, setUser, showLogin, setShowLogin, error, setError}
    return <UserContext.Provider value={valueObject}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}