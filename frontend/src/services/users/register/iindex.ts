import { api } from "../../api.ts";

type UserProps = {
  email: string;
  password: string;
  name: string;
};

export type RegisterUserResponse = {
  name: string;
  email: string;
  id: string;
  createdAt: Date;
};

export async function register({
  email,
  name,
  password,
}: UserProps): Promise<RegisterUserResponse> {
  const response = await api.post("/users/register", {
    email,
    password,
    name,
  });

  return {
    name: response.data.name,
    email: response.data.email,
    id: response.data.id,
    createdAt: response.data.createdAt,
  };
}
