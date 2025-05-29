import styles from "../btn_login/BtnLogin.module.css"
export function ButtonLogin({name, type}){
    return(
        <button type={type} className={styles.btn}>{name}</button>
    )
}