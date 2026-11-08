if (/COLE_AQUI/.test(JSON.stringify(window.CFG))) { document.body.innerHTML = "<p style=\"padding:24px;font-family:sans-serif;color:#eee\">Falta preencher o config.js (veja o README).</p>"; throw new Error("config.js nao preenchido"); }
const C = window.CFG, sb = supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY);
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const h = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const R = n => 'R$ ' + (+n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pad = n => String(n).padStart(2, '0');
const hoje = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const shift = (m, n) => { const [y, k] = m.split('-').map(Number), d = new Date(y, k - 1 + n, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
const mlabel = (m, s) => { const [y, k] = m.split('-').map(Number); return new Date(y, k - 1, 1).toLocaleDateString('pt-BR', s ? { month: 'short' } : { month: 'long', year: 'numeric' }); };
const num = v => { const n = parseFloat(String(v).replace(/\./g, '').replace(',', '.')); return isNaN(n) ? 0 : n; };
const CAT = { 'Mercado': ['🛒', '#3ddc97'], 'Alimentação': ['🍔', '#ffb454'], 'Transporte': ['🚌', '#5aa9ff'], 'Faculdade': ['🎓', '#b48cff'], 'Lazer': ['🎮', '#ff6fae'],
  'Saúde': ['💊', '#ff6b6b'], 'Fatura do cartão': ['💳', '#4dd0e1'], 'Empréstimo a amigos': ['🤝', '#c0ca33'], 'Outros': ['📦', '#9aa0a6'], 'Entrada': ['💰', '#3ddc97'] };
const GC = Object.keys(CAT).filter(k => k !== 'Entrada');
const ci = k => CAT[k] || CAT['Outros'];
let tx = [], P = { nome: '', renda: 0, reserva: 0, faturas: {}, limites: {} }, ses = null, vm = hoje().slice(0, 7), tab = 'home', tipo = 'gasto', sel = null, FR = [], busca = '';

const toast = t => { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('on'), 2200); };
const cnt = (el, v) => { const a = +el.dataset.v || 0, t0 = performance.now(); el.dataset.v = v; const f = t => { const k = Math.min(1, (t - t0) / 450); el.textContent = R(a + (v - a) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
const inM = (x, m) => x.dia.slice(0, 7) === m;
const sum = (m, t) => tx.filter(x => inM(x, m) && x.tipo === t).reduce((a, x) => a + +x.valor, 0);

const K = [['Mercado', /mercado|supermercado|feira|açougue/], ['Alimentação', /lanche|almo[cç]o|jantar|ifood|restaurante|pizza|café|padaria|comida/], ['Transporte', /uber|[oô]nibus|gasolina|passagem|combust/],
  ['Faculdade', /faculdade|livro|xerox|apostila|curso|mensalidade/], ['Lazer', /cinema|jogo|netflix|spotify|festa|rol[eê]/], ['Saúde', /farm[aá]cia|rem[eé]dio|m[eé]dico|dentista/],
  ['Fatura do cartão', /fatura|cart[aã]o|nubank/], ['Empréstimo a amigos', /emprestei|emprestou/]];
function parse(t) {
  const s = t.toLowerCase(), m = s.match(/\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?/);
  if (!m || /\?|quanto|posso|qual |como /.test(s)) return null;
  const n = num(m[0]), ent = /receb|ganhei|sal[aá]rio|entrou|me pagou|devolveu/.test(s), gas = /gast|paguei|comprei|compra|almocei|jantei|saiu/.test(s);
  if (!n || (!ent && !gas)) return null;
  return { tipo: ent ? 'entrada' : 'gasto', valor: n, categoria: ent ? 'Entrada' : (K.find(k => k[1].test(s)) || ['Outros'])[0], descricao: t.slice(0, 80) };
}

async function loadP() { const { data } = await sb.from('profiles').select('*').maybeSingle(); if (data) P = { nome: data.nome || '', renda: +data.renda || 0, reserva: +data.reserva || 0, faturas: data.faturas || {}, limites: data.limites || {} }; }
async function load() { const { data } = await sb.from('transactions').select('*').order('dia', { ascending: false }).limit(1000); tx = data || []; render(); }
async function add(items, dia) { if (!items.length) return; const { error } = await sb.from('transactions').insert(items.map(i => ({ ...i, dia: dia || hoje() }))); if (error) toast('Erro: ' + error.message); await load(); }

function render() {
  $('#hi').textContent = 'Olá, ' + (P.nome || (ses ? ses.user.email.split('@')[0] : '')) + '!';
  $('#ml').textContent = mlabel(vm); home(); list();
}
function home() {
  const g = sum(vm, 'gasto'), e = sum(vm, 'entrada'), f = P.faturas[vm];
  cnt($('#v-saldo'), e - g); $('#v-saldo').className = 'v ' + (e - g >= 0 ? 'pos' : 'neg'); cnt($('#v-g'), g); cnt($('#v-e'), e);
  $('#v-f').textContent = f ? R(f) : '–';
  const all = tx.filter(x => x.tipo === 'gasto'), ms = new Set(all.map(x => x.dia.slice(0, 7))).size, tot = all.reduce((a, x) => a + +x.valor, 0);
  $('#v-r').textContent = P.reserva && tot ? (P.reserva / (tot / ms)).toFixed(1).replace('.', ',') + ' meses' : '–';
  const by = {}; tx.filter(x => inM(x, vm) && x.tipo === 'gasto').forEach(x => by[x.categoria] = (by[x.categoria] || 0) + +x.valor);
  const arr = Object.entries(by).sort((a, b) => b[1] - a[1]), sv = $('#donut'), lg = $('#leg'); sv.innerHTML = ''; lg.innerHTML = '';
  const mk = (a) => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); Object.entries(a).forEach(([k, v]) => c.setAttribute(k, v)); return c; };
  sv.appendChild(mk({ cx: 21, cy: 21, r: 15.915, fill: 'none', stroke: '#1c1f27', 'stroke-width': 5 }));
  let off = 25;
  arr.forEach(([k, v]) => { const p = v / g * 100, c = mk({ cx: 21, cy: 21, r: 15.915, fill: 'none', stroke: ci(k)[1], 'stroke-width': sel === k ? 6.5 : 5, 'stroke-dasharray': p + ' ' + (100 - p), 'stroke-dashoffset': off });
    c.style.cursor = 'pointer'; c.onclick = () => { sel = sel === k ? null : k; home(); }; sv.appendChild(c); off -= p;
    const r = h('div', 'lg' + (sel === k ? ' on' : '')), d = h('i'); d.style.background = ci(k)[1]; r.append(d, h('span', '', ci(k)[0] + ' ' + k), h('span', '', R(v))); r.onclick = () => { sel = sel === k ? null : k; home(); }; lg.appendChild(r); });
  if (!arr.length) { $('#dc-l').textContent = 'Sem gastos'; $('#dc-v').textContent = ''; lg.textContent = 'Nenhum gasto neste mês.'; }
  else if (sel && by[sel]) { $('#dc-l').textContent = sel; $('#dc-v').textContent = R(by[sel]) + ' · ' + Math.round(by[sel] / g * 100) + '%'; }
  else { $('#dc-l').textContent = 'Total'; $('#dc-v').textContent = R(g); }
  const ms6 = [-5, -4, -3, -2, -1, 0].map(i => shift(vm, i)), mx = Math.max(1, ...ms6.map(m => Math.max(sum(m, 'gasto'), sum(m, 'entrada')))), bs = $('#bars'); bs.innerHTML = '';
  ms6.forEach(m => { const c = h('div', 'col' + (m === vm ? ' on' : '')), p = h('div', 'pr'), a = h('i'), b = h('i'); a.style.background = '#ff6b6b'; b.style.background = '#3ddc97';
    a.style.height = sum(m, 'gasto') / mx * 100 + '%'; b.style.height = sum(m, 'entrada') / mx * 100 + '%'; p.append(a, b); c.append(p, h('small', '', mlabel(m, 1))); c.onclick = () => { vm = m; render(); }; bs.appendChild(c); });
  const bd = $('#bud'); bd.innerHTML = ''; const ks = Object.keys(P.limites).filter(k => +P.limites[k] > 0);
  if (!ks.length) bd.innerHTML = '<span class="hint">Defina limites na aba Plano para acompanhar aqui.</span>';
  ks.forEach(k => { const u = by[k] || 0, l = +P.limites[k], p = u / l * 100, row = h('div', 'bd'), t = h('div', 't'), tr = h('div', 'tr'), i = h('i');
    t.append(h('span', '', ci(k)[0] + ' ' + k), h('span', '', R(u) + ' / ' + R(l))); i.style.width = Math.min(100, p) + '%'; i.style.background = p > 100 ? 'var(--bad)' : p > 80 ? 'var(--warn)' : 'var(--ac)'; tr.appendChild(i); row.append(t, tr); bd.appendChild(row); });
}
function list() {
  const el = $('#list'); el.innerHTML = '';
  const rows = tx.filter(x => inM(x, vm) && (x.descricao + ' ' + x.categoria).toLowerCase().includes(busca));
  if (!rows.length) el.innerHTML = '<span class="hint">Nenhum lançamento neste mês.</span>';
  rows.forEach(x => { const r = h('div', 't'), ic = h('div', 'ic', ci(x.categoria)[0]), t = h('div', 'tx'), v = h('b', x.tipo === 'entrada' ? 'pos' : '', (x.tipo === 'entrada' ? '+' : '−') + R(x.valor)), d = h('button', 's', '×');
    t.append(h('div', '', x.descricao || x.categoria), h('small', '', x.dia.slice(8) + '/' + x.dia.slice(5, 7) + ' · ' + x.categoria));
    d.onclick = async () => { await sb.from('transactions').delete().eq('id', x.id); toast('Removido'); load(); }; r.append(ic, t, v, d); el.appendChild(r); });
}
function say(t, me) { const d = h('div', 'm' + (me ? ' me' : ''), t); $('#chat').appendChild(d); $('#chat').scrollTop = 1e9; return d; }
function prompt_(t) {
  const cur = tx.filter(x => inM(x, vm)).map(x => x.dia + ' ' + x.tipo + ' ' + x.valor + ' ' + x.categoria + ' ' + x.descricao).join('\n') || '(nenhum)';
  return 'Você é o assistente financeiro pessoal e privado de ' + (P.nome || 'o usuário') + '. Responda em português do Brasil, curto, calmo, prático e realista, sem alarmismo.\nRenda mensal: R$ ' + P.renda + '. Reserva: R$ ' + P.reserva + '. Faturas do cartão por mês: ' + JSON.stringify(P.faturas) + '. Limites por categoria: ' + JSON.stringify(P.limites) +
    '.\nHoje: ' + hoje() + '. Mês em análise: ' + vm + '.\nLançamentos do mês:\n' + cur + '\nCategorias: ' + GC.join(', ') + ', Entrada.\nMensagem: ' + t +
    '\nResponda SÓ JSON: {"itens":[{"tipo":"gasto"|"entrada","valor":número,"categoria":"...","descricao":"..."}],"resposta":"texto"}. Se a mensagem registra gasto/entrada, preencha itens. Se for pergunta ou conversa, itens vazio e responda com base nos dados.';
}
async function send() {
  const t = $('#inp').value.trim(); if (!t) return; $('#inp').value = ''; say(t, 1);
  const p = parse(t); if (p) { await add([p]); say('Anotado: ' + R(p.valor) + ' em ' + p.categoria + ' ✓'); return; }
  const w = say('…');
  try {
    const r = await fetch(C.WORKER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ses.access_token }, body: JSON.stringify({ prompt: prompt_(t) }) });
    const raw = await r.text(); if (!r.ok) throw new Error(r.status + ' ' + raw.slice(0, 200)); const j = JSON.parse(JSON.parse(raw).text);
    await add((j.itens || []).map(i => ({ tipo: i.tipo === 'entrada' ? 'entrada' : 'gasto', valor: +i.valor, categoria: CAT[i.categoria] ? i.categoria : 'Outros', descricao: (i.descricao || '').slice(0, 80) })).filter(i => i.valor > 0));
    w.textContent = j.resposta || 'Ok.';
  } catch (e) { w.textContent = 'A IA não respondeu. Detalhe: ' + (e.message || e) + '\n(Frases como “gastei 50 no mercado” funcionam sem IA.)'; }
}
function plan() {
  $('#p-n').value = P.nome; $('#p-r').value = P.renda || ''; $('#p-s').value = P.reserva || '';
  FR = Object.entries(P.faturas).sort(); drawFat();
  const lm = $('#lim'); lm.innerHTML = '';
  GC.forEach(k => { const r = h('div', 'r2'), i = h('input'); i.inputMode = 'decimal'; i.placeholder = 'sem limite'; i.dataset.k = k; i.value = P.limites[k] || ''; r.append(h('div', '', ci(k)[0] + ' ' + k), i); r.style.alignItems = 'center'; lm.appendChild(r); });
}
function drawFat() {
  const f = $('#fat'); f.innerHTML = '';
  FR.forEach((x, n) => { const r = h('div', 'r2'), m = h('input'), v = h('input'), d = h('button', 's', '×'); m.type = 'month'; m.value = x[0]; v.inputMode = 'decimal'; v.placeholder = 'Valor'; v.value = x[1] || '';
    m.onchange = () => x[0] = m.value; v.oninput = () => x[1] = v.value; d.style.flex = '0 0 40px'; d.onclick = () => { FR.splice(n, 1); drawFat(); }; r.append(m, v, d); f.appendChild(r); });
}
async function savePlan() {
  P.nome = $('#p-n').value.trim(); P.renda = num($('#p-r').value); P.reserva = num($('#p-s').value);
  P.faturas = {}; FR.forEach(x => { if (x[0] && num(x[1]) > 0) P.faturas[x[0]] = num(x[1]); });
  P.limites = {}; $$('#lim input').forEach(i => { if (num(i.value) > 0) P.limites[i.dataset.k] = num(i.value); });
  const { error } = await sb.from('profiles').upsert({ user_id: ses.user.id, nome: P.nome, renda: P.renda, reserva: P.reserva, faturas: P.faturas, limites: P.limites }, { onConflict: 'user_id' });
  toast(error ? 'Erro: ' + error.message : 'Plano salvo ✓'); render();
}
function go(t) {
  tab = t; $$('section').forEach(s => s.hidden = s.id !== 't-' + t); $$('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  $('#mbar').hidden = !(t === 'home' || t === 'tx'); if (t === 'plan') plan(); window.scrollTo(0, 0);
}
async function show(s) {
  ses = s; $('#login').hidden = !!s; $('#app').hidden = !s;
  if (!s) { tx = []; P = { nome: '', renda: 0, reserva: 0, faturas: {}, limites: {} }; $('#chat').innerHTML = ''; return; }
  await loadP(); await load(); go('home');
  if (!$('#chat').children.length) say('Oi, ' + (P.nome || 'tudo bem') + '! Me conta seus gastos do jeito que vier, tipo “gastei 150 no mercado”. Antes de tudo, preencha seu perfil na aba Plano.');
}
$('#go').onclick = async () => { const { error } = await sb.auth.signInWithPassword({ email: $('#em').value, password: $('#pw').value }); $('#err').textContent = error ? 'Erro: ' + error.message : ''; };
$('#out').onclick = () => sb.auth.signOut(); $('#send').onclick = send; $('#inp').onkeydown = e => { if (e.key === 'Enter') send(); };
$('#mp').onclick = () => { vm = shift(vm, -1); render(); }; $('#mn').onclick = () => { vm = shift(vm, 1); render(); };
$$('.tabs button').forEach(b => b.onclick = () => go(b.dataset.t));
$$('.seg button').forEach(b => b.onclick = () => { tipo = b.dataset.tp; $$('.seg button').forEach(x => x.classList.toggle('on', x === b)); $('#f-c').hidden = tipo === 'entrada'; });
$('#f-c').innerHTML = GC.map(k => '<option>' + k + '</option>').join(''); $('#f-d').value = hoje();
$('#f-add').onclick = async () => { const v = num($('#f-v').value); if (v <= 0) return toast('Informe um valor');
  await add([{ tipo, valor: v, categoria: tipo === 'entrada' ? 'Entrada' : $('#f-c').value, descricao: $('#f-t').value.trim().slice(0, 80) }], $('#f-d').value || hoje()); $('#f-v').value = ''; $('#f-t').value = ''; toast('Lançado ✓'); };
$('#q').oninput = e => { busca = e.target.value.toLowerCase(); list(); };
$('#csv').onclick = () => { const rows = [['data', 'tipo', 'valor', 'categoria', 'descricao'], ...tx.map(x => [x.dia, x.tipo, x.valor, x.categoria, '"' + (x.descricao || '').replace(/"/g, '""') + '"'])];
  const a = h('a'); a.href = URL.createObjectURL(new Blob([rows.map(r => r.join(';')).join('\n')], { type: 'text/csv' })); a.download = 'mk-finance-ia.csv'; a.click(); };
$('#fat-add').onclick = () => { FR.push([vm, '']); drawFat(); }; $('#p-save').onclick = savePlan;
['Quanto gastei hoje?', 'Resumo do mês', 'Posso gastar 80 hoje?', 'Onde posso economizar?'].forEach(t => { const b = h('button', '', t); b.onclick = () => { $('#inp').value = t; send(); go('ai'); }; $('#chips').appendChild(b); });
sb.auth.getSession().then(({ data }) => show(data.session)); sb.auth.onAuthStateChange((ev, s) => { if (ev === 'SIGNED_IN' && ses && s && ses.user.id === s.user.id) return; if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') show(s); });
