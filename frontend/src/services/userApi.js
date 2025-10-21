const API_URL = "http://localhost:5000/api";

// export async function getUsers() {
//   const res = await fetch(`${API_URL}/users`);
//   return res.json();
// }

const getUsers = async() => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export { getUsers };
