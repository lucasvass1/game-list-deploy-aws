import React from "react";
import { DescriptionTextarea } from "./ModalDescriptionTextarea.ts";

const ModalDescriptionTextarea = ({ placeholder }: { placeholder: string }) => {
  return <DescriptionTextarea placeholder={placeholder} />;
};

export default ModalDescriptionTextarea;