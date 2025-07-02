export const realizaLogin = async (email: string, senha: string) => {
  const url = "http://localhost:3000/usuario/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senhaHash: senha,
    }),
  });

  if (response.status === 200) {
    const token = await response.json();

    localStorage.setItem("token", token);
    return true;
  }
  return false;
};
