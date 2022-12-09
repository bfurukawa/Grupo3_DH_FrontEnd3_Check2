import { useEffect } from "react";
import { useState } from "react"
import { createContext, useContext } from "react"

const ThemeContext = createContext()

export function ThemeProvider(propss) {
    const [theme, setTheme] = useState('dark');
    useEffect(()=>{
        if(localStorage.getItem("theme")!=null){
            setTheme(localStorage.getItem("theme"))
        }
        else{
            setTheme("dark")
        }
        },[])
        function togleTheme(){
            console.log(`togleTheme = ${theme}`)
            var newTheme = theme=='dark' ? 'light' : 'dark'
            setTheme(newTheme)
            localStorage.setItem("theme",newTheme)
        }
    return(
        <ThemeContext.Provider value = {{theme, togleTheme}}>
            { propss.children }
        </ThemeContext.Provider>
    )
}

export function useThemeContext(){
    const context = useContext(ThemeContext)

    return context
}