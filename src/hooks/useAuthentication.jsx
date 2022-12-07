import { useEffect } from "react";
import { useState } from "react"
import { createContext, useContext } from "react"


const AuthenticationContext = createContext()

export function AuthenticationProvider(props) {

    const [token, setToken] = useState('');

    useEffect(()=>console.log(`Valor do token e ${token}`),[token])

     return(

    //     // Construção dos Elementos para utilizarmos o Contexto em nossa Aplicação, tudo o que for contido no "value" será exportado e poderá ser utilizado em Componentes que utilizarem o Hook Customizado "useTheme"
         <AuthenticationContext.Provider value={{token, storeToken}}>
             { props.children }
         </AuthenticationContext.Provider>

     )

     function storeToken(newToken){
        setToken(newToken)
        sessionStorage.setItem("token",newToken)
     }
}

export function useAuthentication(){
    const context = useContext(AuthenticationContext)

    return context
}