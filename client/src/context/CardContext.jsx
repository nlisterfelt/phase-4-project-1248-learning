import { createContext, useState } from "react";

const CardContext = createContext({})

const CardProvider = ({children}) => {

    const valueObject = {}
    return <CardContext.Provider value = {valueObject}>{children}</CardContext.Provider>
}

export {CardContext, CardProvider}