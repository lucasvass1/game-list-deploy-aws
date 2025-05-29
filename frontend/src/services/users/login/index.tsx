import { api } from "../../api.ts";

type UserProps = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    id: string;
    createdAt: Date;
  };
};

export async function login({
  email,
  password,
}: UserProps): Promise<LoginUserResponse> {
  const authString = btoa(`${email}:${password}`);

  const response = await api.post(
    "/users/login",
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    }
  );

  return response.data;
}
