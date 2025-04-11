const BASE_URL = "http://localhost:5001/api";

export function getAllProducts() {
  return fetch(`${BASE_URL}/products`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  }).then((res) => res.json());
}

export async function checkProductNameExists(name) {
  const res = await fetch(`${BASE_URL}/products/check-name?name=${encodeURIComponent(name)}`);
  return res.json();
}

export async function uploadProduct(product, token) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.Description || "");
  formData.append("category", product.category);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("image", product.image[0].originFileObj);

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "x-auth-token": token,
    },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function getProductById(productId, token) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.json();
}

export async function updateProduct(productId, productData, token) {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.Description || "");
  formData.append("category", productData.category);
  formData.append("price", productData.price);
  formData.append("quantity", productData.quantity);

  const imageFile = productData.image?.[0]?.originFileObj;
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "x-auth-token": token,
    },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function deleteProduct(productId, token) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}