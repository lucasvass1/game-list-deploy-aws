import React from "react";
import { StyleButton } from "./styles.ts";
export function ButtonLogin({ name, type }) {
  return <StyleButton type={type}>{name}</StyleButton>;
}
