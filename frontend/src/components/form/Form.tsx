import React from "react";
import logo from "../form/img/logoft.png";
import { ButtonLogin } from "../btn_login/BtnLogin.tsx";
import {
  Container,
  ContainerForm,
  ContainerText,
  TextLink,
  TextLogin,
} from "./styles.ts";
import { Input } from "../input/index.tsx";

export function Form({ title, instruction, login, linkLogin = "#", textLink }) {
  return (
    <Container>
      <ContainerText>
        <img src={logo} alt="logo" />
        <h1 className={"textTitle"}>{title}</h1>
        <p className={"textP"}>{instruction}</p>
      </ContainerText>

      <ContainerForm>
        <Input
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
          onChange={() => {}}
          value=""
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={() => {}}
          value=""
        />

        <ButtonLogin type="submit" name="LOGIN" />
      </ContainerForm>
      <div>
        <TextLogin>
          {login} <TextLink href={linkLogin}>{textLink}</TextLink>
        </TextLogin>
      </div>
    </Container>
  );
}
