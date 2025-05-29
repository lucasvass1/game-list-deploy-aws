import {FormRegister} from "../../components/formRegister/FormRegister"
import Style from "../register/register.module.css"
export function Register(){
    return(
        <div className={Style.container}>
            <FormRegister
            title= "Sign Up"
            instruction= "Register yourself to access the system"
            login="Already have an account?"
            linkLogin= "/"
            textLink="Register now"
            />
        </div>
    )
}