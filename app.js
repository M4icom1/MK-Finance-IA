if (/COLE_AQUI/.test(JSON.stringify(window.CFG))) { document.body.innerHTML = "<p style=\"padding:24px;font-family:sans-serif;color:#eee\">Falta preencher o config.js (veja o README).</p>"; throw new Error("config.js nao preenchido"); }
const C = window.CFG, sb = supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY);
const $ = s => document.querySelector(s);
const R = n => 'R$ ' + (+n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const hoje = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const mes = () => hoje().slice(0, 7);
let tx = [], ses = null;

const K = [['Mercado', /mercado|supermercado|feira|açougue/], ['Alimentação', /lanche|almo[cç]o|jantar|ifood|restaurante|pizza|café|padaria|comida/],
  ['Transporte', /uber|[oô]nibus|gasolina|passagem|combust/], ['Faculdade', /faculdade|livro|xerox|apostila|curso|mensalidade/],
  ['Lazer', /cinema|jogo|netflix|spotify|festa|rol[eê]/], ['Saúde', /farm[aá]cia|rem[eé]dio|m[eé]dico|dentista/],
  ['Fatura do cartão', /fatura|cart[aã]o|nubank/], ['Empréstimo a amigos', /emprestei|emprestou/]];

function parse(t) { // camada de regras: sem IA, sem custo
  const s = t.toLowerCase(), m = s.match(/\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?/);
  if (!m || /\?|quanto|posso|qual |como /.test(s)) return null;
  let n = m[0]; if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(n)) n = n.replace(/\./g, ''); n = parseFloat(n.replace(',', '.'));
  const ent = /receb|ganhei|sal[aá]rio|entrou|me pagou|devolveu/.test(s), gas = /gast|paguei|comprei|compra|almocei|jantei|saiu/.test(s);
  if (!n || (!ent && !gas)) return null;
  return { tipo: ent ? 'entrada' : 'gasto', valor: n, categoria: ent ? 'Entrada' : (K.find(k => k[1].test(s)) || ['Outros'])[0], descricao: t.slice(0, 80) };
}

async function load() {
  const { data } = await sb.from('transactions').select('*').order('dia', { ascending: false }).limit(500);
  tx = data || []; render();
}
async function add(items) { if (items.length) { await sb.from('transactions').insert(items.map(i => ({ ...i, dia: hoje() }))); await load(); } }

function render() {
  const cur = tx.filter(t => t.dia.slice(0, 7) === mes());
  const g = cur.filter(t => t.tipo === 'gasto').reduce((a, t) => a + +t.valor, 0), e = cur.filter(t => t.tipo === 'entrada').reduce((a, t) => a + +t.valor, 0);
  $('#mes').textContent = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  $('#g').textContent = R(g); $('#e').textContent = R(e);
  const f = C.FATURAS[mes()]; $('#f').textContent = f ? R(f) : '–';
  $('#rs').textContent = g > 0 ? (C.RESERVA / g).toFixed(1).replace('.', ',') + ' meses' : '–';
  const by = {}; cur.filter(t => t.tipo === 'gasto').forEach(t => by[t.categoria] = (by[t.categoria] || 0) + +t.valor);
  const max = Math.max(1, ...Object.values(by)); $('#cats').innerHTML = '';
  Object.entries(by).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    const d = document.createElement('div'); d.className = 'b';
    const a = document.createElement('span'); a.textContent = k; const i = document.createElement('i'); i.style.width = (v / max * 100) + '%';
    const z = document.createElement('span'); z.textContent = R(v); d.append(a, i, z); $('#cats').appendChild(d);
  });
  $('#list').innerHTML = '';
  tx.slice(0, 30).forEach(t => {
    const d = document.createElement('div'); d.className = 't';
    const a = document.createElement('span'); a.textContent = t.dia.slice(8) + '/' + t.dia.slice(5, 7) + ' · ' + t.descricao + ' (' + t.categoria + ')';
    const b = document.createElement('span'); b.className = t.tipo === 'entrada' ? 'pos' : ''; b.textContent = (t.tipo === 'entrada' ? '+' : '−') + R(t.valor);
    const x = document.createElement('button'); x.className = 's'; x.textContent = '×'; x.onclick = async () => { await sb.from('transactions').delete().eq('id', t.id); load(); };
    const r = document.createElement('span'); r.append(b, ' ', x); d.append(a, r); $('#list').appendChild(d);
  });
}
function say(t, me) { const d = document.createElement('div'); d.className = 'm' + (me ? ' me' : ''); d.textContent = t; $('#chat').appendChild(d); $('#chat').scrollTop = 1e9; return d; }

function prompt_(t) {
  const cur = tx.filter(x => x.dia.slice(0, 7) === mes()).map(x => x.dia + ' ' + x.tipo + ' ' + x.valor + ' ' + x.categoria + ' ' + x.descricao).join('\n') || '(nenhum)';
  return 'Você é o assistente financeiro pessoal e privado de um estudante de Sistemas de Informação que trabalha 4h/dia. Responda em português do Brasil, curto, calmo e realista, sem alarmismo.\nRenda fixa: R$ ' + C.RENDA + '/mês. Reserva: R$ ' + C.RESERVA + '. Faturas do cartão por mês: ' + JSON.stringify(C.FATURAS) +
    '. Parte das parcelas é de amigos que devem repassar o valor.\nHoje: ' + hoje() + '\nLançamentos do mês:\n' + cur + '\nCategorias: Mercado, Alimentação, Transporte, Faculdade, Lazer, Saúde, Fatura do cartão, Empréstimo a amigos, Entrada, Outros.\nMensagem: ' + t +
    '\nResponda SÓ JSON: {"itens":[{"tipo":"gasto"|"entrada","valor":número,"categoria":"...","descricao":"..."}],"resposta":"texto"}. Se a mensagem registra gasto/entrada, preencha itens. Se for pergunta ou conversa, itens vazio e responda com base nos dados.';
}
async function send() {
  const t = $('#inp').value.trim(); if (!t) return; $('#inp').value = ''; say(t, 1);
  const p = parse(t); if (p) { await add([p]); say('Anotado: ' + R(p.valor) + ' em ' + p.categoria + '.'); return; }
  const w = say('…');
  try {
    const r = await fetch(C.WORKER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ses.access_token }, body: JSON.stringify({ prompt: prompt_(t) }) });
    if (!r.ok) throw 0; const j = JSON.parse((await r.json()).text);
    await add((j.itens || []).map(i => ({ tipo: i.tipo === 'entrada' ? 'entrada' : 'gasto', valor: +i.valor, categoria: i.categoria || 'Outros', descricao: (i.descricao || '').slice(0, 80) })).filter(i => i.valor > 0));
    w.textContent = j.resposta || 'Ok.';
  } catch (e) { w.textContent = 'A IA não respondeu agora (limite gratuito ou conexão). Frases como “gastei 50 no mercado” funcionam sem IA.'; }
}
function show(s) { ses = s; $('#login').hidden = !!s; $('#app').hidden = !s; if (s) { load(); if (!$('#chat').children.length) say('Oi! Me conta seus gastos do jeito que vier, tipo “gastei 150 no mercado”. Também pode perguntar “posso gastar 80 hoje?”.'); } }
$('#go').onclick = async () => { const { error } = await sb.auth.signInWithPassword({ email: $('#em').value, password: $('#pw').value }); $('#err').textContent = error ? 'E-mail ou senha incorretos.' : ''; };
$('#out').onclick = () => sb.auth.signOut(); $('#send').onclick = send; $('#inp').onkeydown = e => { if (e.key === 'Enter') send(); };
sb.auth.getSession().then(({ data }) => show(data.session)); sb.auth.onAuthStateChange((_, s) => show(s));
