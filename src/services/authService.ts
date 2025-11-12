// ...existing code...
import axios from "axios";

export async function login(email: string, password: string, role: string) {
  const endpoint = 'https://forkgymnasiumservice-e5g7f5fscqbgb0ff.canadacentral-01.azurewebsites.net/api/auth/token';
  const payload = { email, password, role };

  console.log('[authService] POST (axios direct)', { endpoint, payloadSummary: { email, passwordLength: password?.length ?? 0, role } });

  try {
    const res = await axios.post(endpoint, payload, { headers: { 'Content-Type': 'application/json' } });
    console.log('[authService] axios response', { status: res.status, data: res.data });
    return { ok: true, status: res.status, data: res.data };
  } catch (err: any) {
    console.error('[authService] axios error on login', err?.response ?? err.message ?? err);
    const resp = err?.response;
    return {
      ok: false,
      status: resp?.status ?? 0,
      data: resp?.data ?? null,
      headers: resp?.headers ?? null,
      error: err,
    };
  }
}
// ...existing code...
export async function register(name: string, email: string, password: string, role: string) {
  const endpoint = 'https://forkgymnasiumservice-e5g7f5fscqbgb0ff.canadacentral-01.azurewebsites.net/api/users';
  const payload = { name, email, password, role };

  console.log('[authService] POST register (axios)', { endpoint, payloadSummary: { name, email, passwordLength: password?.length ?? 0, role } });

  try {
  const res = await axios.post(endpoint, payload, { headers: { 'Content-Type': 'application/json' } });
    console.log('[authService] register response', { status: res.status, data: res.data });
    return { ok: true, status: res.status, data: res.data };
  } catch (err: any) {
    console.error('[authService] register axios error', err?.response ?? err.message ?? err);
    const resp = err?.response;
    return { ok: false, status: resp?.status ?? 0, data: resp?.data ?? null, error: err };
  }
}
// ...existing code...

