import { authApi } from "./axiosClient";

export async function loginUser(email, password) {
  const response = await authApi.post("/login", {
    email,
    password,
  });
  return response.data;
}

export async function signupUser(userData) {
  const response = await authApi.post("/signup", userData);
  return response.data;
}

export async function getProfile() {
  const response = await authApi.get("/profile");
  return response.data;
}

export async function logoutUser() {
  const response = await authApi.post("/logout");
  return response.data;
}

export async function getUsers() {
  const response = await authApi.get("/users");
  return response.data.users;
}
