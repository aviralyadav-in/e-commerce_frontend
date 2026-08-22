import { cartApi } from "./axiosClient";

export async function getCart() {
  const response = await cartApi.get("/");
  return response.data;
}

export async function addCartItem(productId, quantity = 1) {
  const response = await cartApi.post("/add", {
    product: productId,
    quantity,
  });
  return response.data;
}

export async function removeCartItem(productId) {
  const response = await cartApi.delete(`/remove/${productId}`);
  return response.data;
}

export async function clearCart() {
  const response = await cartApi.delete("/clear");
  return response.data;
}
