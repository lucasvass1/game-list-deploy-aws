import Style from "../form/form.module.css";
import logo from "../form/img/logoft.png";
import { Input } from "../input/input";
import { ButtonLogin } from "../btn_login/BtnLogin";

export function Form({ title, instruction, login, linkLogin = "#", textLink }) {
  return (
    <div className={Style.container}>
      <div className={Style.containerText}>
        <img src={logo} alt="logo" className={Style.img} />
        <h1 className={Style.textTitle}>{title}</h1>
        <p className={Style.textP}>{instruction}</p>
      </div>

      <form className={Style.containerForm} >
        <Input
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
        />

        <ButtonLogin type= "submit" name="LOGIN" />
      </form>
      <div className={Style.containerLogin}>
        <h2 className={Style.textLogin}>{login} <a className={Style.textLink} href={linkLogin}>{textLink}</a></h2>
      </div>
    </div>
  );
}
