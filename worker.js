// Cloudflare Worker: guarda a chave do Gemini e só atende você (login do Supabase).
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST' || req.headers.get('Origin') !== env.ALLOWED_ORIGIN)
      return new Response('forbidden', { status: 403, headers: cors });
    const u = await fetch(env.SUPABASE_URL + '/auth/v1/user', {
      headers: { apikey: env.SUPABASE_KEY, Authorization: req.headers.get('Authorization') || '' }
    });
    if (!u.ok) return new Response('unauthorized', { status: 401, headers: cors });
    const { prompt } = await req.json();
    const model = env.MODEL || 'gemini-2.5-flash-lite';
    const g = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_KEY },
      body: JSON.stringify({
        contents: [{ parts: [{ text: String(prompt).slice(0, 6000) }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });
    if (!g.ok) { const t = await g.text(); return new Response('ia indisponivel ' + g.status + ': ' + t.slice(0, 200), { status: 502, headers: cors }); }
    const d = await g.json();
    const text = d.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    return new Response(JSON.stringify({ text }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  }
};
