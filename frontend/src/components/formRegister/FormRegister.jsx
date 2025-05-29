import { useState } from "react";
import Style from "../formRegister/formRegister.module.css";
import logo from "../form/img/logoft.png";
import { Input } from "../input/input";
import { ButtonLogin } from "../btn_login/BtnLogin";

export function FormRegister({ title, instruction, login, linkLogin = "#", textLink }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatchError, setIsPasswordMatchError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsPasswordMatchError(true);
      return;
    }

    setIsPasswordMatchError(false);
    ///
    console.log({ name, email, password });
  }

  return (
    <div className={Style.container}>
      <div className={Style.containerText}>
        <img src={logo} alt="logo" className={Style.img} />
        <h1 className={Style.textTitle}>{title}</h1>
        <p className={Style.textP}>{instruction}</p>
      </div>

      <form className={Style.containerForm} onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="Your name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Email"
          placeholder="Your email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm Password"
          placeholder="Repeat your password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={isPasswordMatchError}
        />

        {isPasswordMatchError && (
          <p className={Style.errorMessage}>Passwords do not match</p>
        )}

        <ButtonLogin type="submit" name="SIGN UP" />
      </form>

      <div className={Style.containerLogin}>
        <h2 className={Style.textLogin}>
          {login} <a className={Style.textLink} href={linkLogin}>{textLink}</a>
        </h2>
      </div>
    </div>
  );
}
