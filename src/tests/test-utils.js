import { render } from "@testing-library/react"
import { BrowserRouter, MemoryRouter, Routes, Route} from "react-router-dom"
import Home from "../Routes/Home"
import Detail from "../Routes/Detail"
import Login from "../Routes/Login"
import App from "../App"
import { AuthenticationProvider } from "../hooks/useAuthentication"
import { ThemeProvider } from "../hooks/useTheme"

const renderWithContext = (ui, providerValue)=>{
    return render(
        <BrowserRouter>
            <AuthenticationProvider>
                <ThemeProvider>  
                {console.log(location.pathname)}
                    {ui}
                </ThemeProvider>
            </AuthenticationProvider>
        </BrowserRouter>
    )
}

//Only for testing individual routes as /dentist/:id
export const renderWithRouter = (ui, {route, path}) => {
    window.history.pushState({}, 'Test page', route)

    return render(
        <MemoryRouter initialEntries={[route]}>
            <AuthenticationProvider>
                <ThemeProvider>  
            <Routes>
                <Route index path={path} element={ui}/>
                {console.log(location.pathname)}
            </Routes>
            </ThemeProvider>
            </AuthenticationProvider>
        </MemoryRouter>
    )
}

export * from "@testing-library/react"
export {renderWithContext as render}