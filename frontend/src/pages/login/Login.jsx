import { Form } from "../../components/form/Form"
import Style from "../login/login.module.css"
export function Login(){
    return(
        <div className={Style.container}>
            <Form
            title= "Login"
            instruction= "Enter your credentials to access your account"
            login="Don’t have an account?"
            linkLogin= "/register"
            textLink="Login now"
            />
        </div>
    )
}