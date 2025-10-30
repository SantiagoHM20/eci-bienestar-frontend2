// ...existing code...
export async function login(email: string, password: string, role: string) {
  return fetch('https://forkgymnasiumservice-e5g7f5fscqbgb0ff.canadacentral-01.azurewebsites.net/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
  });
}
// ...existing code...
export async function register(name: string, email: string, password: string, role: string) {
  return fetch('https://forkgymnasiumservice-e5g7f5fscqbgb0ff.canadacentral-01.azurewebsites.net/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });
}
// ...existing code...

