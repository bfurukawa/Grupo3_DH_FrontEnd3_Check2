import LoginForm from "../Components/LoginForm";
import {useThemeContext} from "../hooks/useTheme"

const Contact = () => {
  const { theme } = useThemeContext()
  return (
    <>
      <h1 className={`${theme}`}>Login</h1>
      <LoginForm />
    </>
  );
};

export default Contact;
