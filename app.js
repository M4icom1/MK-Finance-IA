const C = window.CFG;
if (/COLE_AQUI/.test((C.SUPABASE_URL || '') + (C.SUPABASE_KEY || ''))) { document.body.innerHTML = '<p style="padding:24px;font-family:sans-serif;color:#eee">Falta preencher o config.js (veja o README).</p>'; throw new Error('config.js nao preenchido'); }
const sb = supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY);
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const h = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const NS = 'http://www.w3.org/2000/svg';
const sv = (t, a, p) => { const e = document.createElementNS(NS, t); Object.entries(a || {}).forEach(([k, v]) => e.setAttribute(k, v)); if (p) p.appendChild(e); return e; };
const ICONS = { chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>', chart: '<path d="M5 20V11M12 20V4M19 20v-6"/>', receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  sliders: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>', gem: '<path d="M6 4h12l4 5-10 12L2 9z"/><path d="M2 9h20M9 4l3 5 3-5M12 21 9 9m3 12 3-12"/>',
  logout: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>', mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', send: '<path d="M3 11 21 3l-8 18-2-8z"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>', plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>', alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v5M12 18v.5"/>', octagon: '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/><path d="M12 8v5M12 16v.5"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>', key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a7 7 0 0 1 4 5.5"/>', cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6"/>',
  utensils: '<path d="M6 3v8a2 2 0 0 0 2 2v8M10 3v8M6 7h4M17 3c-2 2-3 5-3 8h3v10"/>', bus: '<rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16M7 21v-4M17 21v-4"/><circle cx="8" cy="14" r=".6"/><circle cx="16" cy="14" r=".6"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>', gamepad: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5M15 11h.01M18 14h.01"/>',
  heart: '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z"/>', card: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/>',
  swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>', box: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>', wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="13" rx="2.5"/><circle cx="16.5" cy="13.5" r="1"/>',
  bank: '<path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>', calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trendup: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>', trenddown: '<path d="M3 7l6 6 4-4 8 8M15 17h6v-6"/>', leaf: '<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/>',
  scale: '<path d="M12 4v16M6 20h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>', doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>', pie: '<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',
  download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>', left: '<path d="M15 5l-7 7 7 7"/>', right: '<path d="M9 5l7 7-7 7"/>', flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>', coin: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.8 0 2.6 5 1.3 5 3.9 0 1.1-1.1 1.8-2.5 1.8-1.1 0-2-.4-2.5-1.2M12 6.5V8m0 8v1.5"/>' };
const IC = n => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || ICONS.box) + '</svg>';
const lab = (n, t) => { const s = h('span', 'lab'); s.innerHTML = IC(n); s.appendChild(document.createTextNode(t)); return s; };
const setBtn = (b, n, t) => { b.innerHTML = IC(n) + t; };
const xbtn = () => { const b = h('button', 's'); b.innerHTML = IC('x'); b.title = 'Remover'; b.setAttribute('aria-label', 'Remover'); return b; };
const hydrate = () => $$('[data-ic]').forEach(e => e.innerHTML = IC(e.dataset.ic));
const R = n => 'R$ ' + (+n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pad = n => String(n).padStart(2, '0');
const hoje = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const shift = (m, n) => { const [y, k] = m.split('-').map(Number), d = new Date(y, k - 1 + n, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
const mlabel = (m, s) => { const [y, k] = m.split('-').map(Number); return new Date(y, k - 1, 1).toLocaleDateString('pt-BR', s ? { month: 'short' } : { month: 'long', year: 'numeric' }); };
const mname = m => mlabel(m).split(' de ')[0];
const num = v => { const n = parseFloat(String(v).replace(/\./g, '').replace(',', '.')); return isNaN(n) ? 0 : n; };
const dim = m => new Date(+m.slice(0, 4), +m.slice(5), 0).getDate();
const CAT = { 'Mercado': ['cart', '#4d8dff'], 'Alimentação': ['utensils', '#ffb454'], 'Transporte': ['bus', '#38bdf8'], 'Faculdade': ['cap', '#a78bfa'], 'Lazer': ['gamepad', '#f472b6'],
  'Saúde': ['heart', '#ff6b81'], 'Fatura do cartão': ['card', '#22d3ee'], 'Empréstimo a amigos': ['swap', '#fbbf24'], 'Outros': ['box', '#94a3b8'], 'Entrada': ['wallet', '#4dd4ff'], 'Reserva': ['bank', '#4dd4ff'] };
const GC = Object.keys(CAT).filter(k => k !== 'Entrada' && k !== 'Reserva');
const ci = k => CAT[k] || CAT['Outros'];
const blank = () => ({ nome: '', renda: 0, reserva: 0, faturas: {}, limites: {}, gk: '', modelo: '', ex: {} });
let tx = [], P = blank(), ses = null, vm = hoje().slice(0, 7), tab = 'ai', tipo = 'gasto', sel = null, FR = [], busca = '', INS = null;

const toast = t => { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('on'), 2600); };
const cnt = (el, v) => { const a = +el.dataset.v || 0, t0 = performance.now(); el.dataset.v = v; const f = t => { const k = Math.min(1, (t - t0) / 600); el.textContent = R(a + (v - a) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
const celebrate = k => { for (let i = 0; i < 10; i++) { const s = h('span', 'fx'); s.innerHTML = IC(k); s.style.left = (30 + Math.random() * 55) + '%'; s.style.animationDelay = Math.random() * .4 + 's'; document.body.appendChild(s); setTimeout(() => s.remove(), 2100); } };
const inM = (x, m) => x.dia.slice(0, 7) === m;
const sum = (m, t) => tx.filter(x => inM(x, m) && x.tipo === t).reduce((a, x) => a + +x.valor, 0);
const catsOf = m => { const o = {}; tx.filter(x => inM(x, m) && x.tipo === 'gasto').forEach(x => o[x.categoria] = Math.round((o[x.categoria] || 0) + +x.valor)); return o; };
const reservaTotal = () => P.reserva + tx.filter(x => x.tipo === 'guardado').reduce((t, x) => t + +x.valor, 0) - tx.filter(x => x.tipo === 'resgate').reduce((t, x) => t + +x.valor, 0);
const avgG = () => { const all = tx.filter(x => x.tipo === 'gasto'), n = new Set(all.map(x => x.dia.slice(0, 7))).size; return n ? all.reduce((a, x) => a + +x.valor, 0) / n : 0; };
const vHora = () => { const e = P.ex || {}, hh = +e.hTrab, d = +e.dSem || 5; return P.renda > 0 && hh > 0 ? P.renda / (hh * d * 4.345) : 0; };
const norm = i => { const t = ['entrada', 'guardado', 'resgate'].includes(i.tipo) ? i.tipo : 'gasto'; return { tipo: t, valor: +i.valor, categoria: t === 'entrada' ? 'Entrada' : t === 'gasto' ? (GC.includes(i.categoria) ? i.categoria : 'Outros') : 'Reserva', descricao: String(i.descricao || '').slice(0, 80), ...(/^\d{4}-\d{2}-\d{2}$/.test(i.data) ? { dia: i.data } : /^\d{4}-\d{2}$/.test(i.data) ? { dia: i.data + '-01' } : {}), ...(+i.parcelas > 1 ? { parcelas: Math.round(+i.parcelas) } : {}), ...(+i.repetir > 1 ? { repetir: Math.round(+i.repetir) } : {}) }; };
const nz = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const mkid = () => Math.random().toString(36).slice(2, 9);
const metas = () => (P.ex.metas = P.ex.metas || []), devs = () => (P.ex.dev = P.ex.dev || []);
const devTotal = () => devs().reduce((t, d) => t + Math.max(0, d.total - d.pago), 0);
const findBy = (arr, nome) => { const q = nz(nome).trim(); return q ? arr.find(x => nz(x.nome) === q) || arr.find(x => nz(x.nome).includes(q) || q.includes(nz(x.nome))) : null; };
const expand = list => list.flatMap(i => { const { parcelas, repetir, ...r } = i, n = Math.min(36, parcelas || repetir || 1); if (n < 2) return [r]; const d0 = r.dia || hoje(); return Array.from({ length: n }, (_, k) => { const m = shift(d0.slice(0, 7), k); return { ...r, dia: m + '-' + pad(Math.min(+d0.slice(8), dim(m))), descricao: parcelas ? ((r.descricao || r.categoria) + ' (' + (k + 1) + '/' + n + ')').slice(0, 80) : r.descricao }; }); });
const K = [['Mercado', /mercado|supermercado|feira|açougue/], ['Alimentação', /lanche|almo[cç]o|jantar|ifood|restaurante|pizza|café|padaria|comida/], ['Transporte', /uber|[oô]nibus|gasolina|passagem|combust/],
  ['Faculdade', /faculdade|livro|xerox|apostila|curso|mensalidade/], ['Lazer', /cinema|jogo|netflix|spotify|festa|rol[eê]/], ['Saúde', /farm[aá]cia|rem[eé]dio|m[eé]dico|dentista/],
  ['Fatura do cartão', /fatura|cart[aã]o|nubank/], ['Empréstimo a amigos', /emprestei|emprestou/]];
function parse(t) {
  const s = t.toLowerCase(), m = s.match(/\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?/);
  if (!m || /\?|quanto|posso|qual |como /.test(s)) return null;
  if ((s.match(/\d+(?:[.,]\d+)?/g) || []).length > 1) return null;
  const n = num(m[0]), gd = /guardei|poupei|investi|separei|coloquei na reserva|depositei na reserva/.test(s), rs = /retirei|resgatei|tirei da reserva|saquei da reserva/.test(s),
    ent = /receb|ganhei|sal[aá]rio|entrou|me pagou|devolveu/.test(s), gas = /gast|paguei|comprei|compra|almocei|jantei|saiu/.test(s);
  if (!n || (!gd && !rs && !ent && !gas)) return null;
  const tp = gd ? 'guardado' : rs ? 'resgate' : ent ? 'entrada' : 'gasto';
  return { tipo: tp, valor: n, categoria: tp === 'entrada' ? 'Entrada' : tp === 'gasto' ? (K.find(k => k[1].test(s)) || ['Outros'])[0] : 'Reserva', descricao: t.slice(0, 80) };
}

/* ---------- narrativa e dicas (sem IA) ---------- */
function story() {
  const g = sum(vm, 'gasto'), e = sum(vm, 'entrada'), pm = shift(vm, -1), pg = sum(pm, 'gasto'), by = catsOf(vm), cur = vm === hoje().slice(0, 7), f = P.faturas[vm], o = [];
  const top = Object.entries(by).sort((a, b) => b[1] - a[1])[0];
  if (!g && !e) return [{ i: 'sparkle', k: 'info', t: 'Ainda não há lançamentos em ' + mlabel(vm) + '. Conte seus gastos no Assistente e eu monto o retrato do mês.' }];
  if (g) { const pc = pg ? Math.round((g - pg) / pg * 100) : null; o.push({ i: pc != null && pc > 0 ? 'trendup' : 'trenddown', k: pc != null && pc > 10 ? 'warn' : 'good', t: 'Em ' + mname(vm) + ' você gastou ' + R(g) + (pc != null ? ', ' + Math.abs(pc) + '% ' + (pc >= 0 ? 'a mais' : 'a menos') + ' que em ' + mname(pm) + '.' : '.') }); }
  if (top) o.push({ i: ci(top[0])[0], k: 'info', t: 'Sua maior categoria é ' + top[0] + ': ' + R(top[1]) + ' (' + Math.round(top[1] / g * 100) + '% dos gastos).' });
  if (cur && g) { const d = +hoje().slice(8), pd = g / d; o.push({ i: 'calendar', k: 'info', t: 'Você gasta em média ' + R(pd) + ' por dia. Nesse ritmo, o mês fecha em cerca de ' + R(pd * dim(vm)) + '.' }); }
  if (e > 0) { const p = Math.round((e - g) / e * 100); o.push({ i: p >= 20 ? 'leaf' : p >= 0 ? 'scale' : 'octagon', k: p >= 20 ? 'good' : p >= 0 ? 'warn' : 'bad', t: p >= 0 ? 'Sobrou ' + p + '% das suas entradas do mês.' : 'Você gastou ' + Math.abs(p) + '% a mais do que entrou neste mês.' }); }
  if (f && P.renda > 0) o.push({ i: 'card', k: f / P.renda > .5 ? 'warn' : 'info', t: 'A fatura do cartão deste mês é ' + R(f) + ', cerca de ' + Math.round(f / P.renda * 100) + '% da sua renda.' });
  const rt = reservaTotal(), av = avgG(); if (rt > 0 && av > 0) { const mm = rt / av; o.push({ i: 'bank', k: mm >= 6 ? 'good' : mm >= 3 ? 'info' : 'warn', t: 'Sua reserva de ' + R(rt) + ' cobre cerca de ' + mm.toFixed(1).replace('.', ',') + ' meses no seu ritmo de gastos.' }); }
  Object.keys(P.limites).forEach(k => { const u = by[k] || 0, l = +P.limites[k]; if (l > 0 && u > l) o.push({ i: 'octagon', k: 'bad', t: 'Você passou do limite em ' + k + ': ' + R(u) + ' de ' + R(l) + '.' }); else if (l > 0 && u > l * .8) o.push({ i: 'alert', k: 'warn', t: k + ' já usou ' + Math.round(u / l * 100) + '% do limite do mês.' }); });
  const vh = vHora(); if (vh && g) o.push({ i: 'clock', k: 'info', t: 'Seus gastos de ' + mname(vm) + ' equivalem a cerca de ' + (g / vh).toFixed(1).replace('.', ',') + ' horas de trabalho. Seu tempo vale ~' + R(vh) + ' por hora.' });
  if (devTotal() > 0) o.push({ i: 'users', k: 'info', t: 'Seus amigos ainda te devem ' + R(devTotal()) + ' no total. Veja os detalhes na aba Metas.' });
  metas().filter(m => m.alvo > 0).forEach(m => o.push({ i: 'gem', k: m.atual >= m.alvo ? 'good' : 'info', t: 'Meta ' + m.nome + ': ' + Math.round(Math.min(100, m.atual / m.alvo * 100)) + '% concluída (' + R(m.atual) + ' de ' + R(m.alvo) + ').' }));
  return o;
}
const GEN = ['Pague a fatura do cartão sempre integral para fugir dos juros do rotativo.', 'Espere 24 horas antes de qualquer compra que não estava planejada.', 'Revise assinaturas e débitos automáticos uma vez por mês.', 'Registre o gasto no mesmo dia: leva 5 segundos e evita esquecimentos.',
  'Quem usa o seu cartão deve repassar o valor antes do vencimento. Combine uma data fixa.', 'Guardar pouco todo mês vale mais do que guardar muito de vez em quando. O hábito é o que conta.', 'Compare preços dos itens que você compra todo mês, como mercado e transporte.', 'Regra 50/30/20: metade para necessidades, 30% para desejos e 20% para guardar. Adapte à sua realidade.'];
function tips() {
  const g = sum(vm, 'gasto'), e = sum(vm, 'entrada'), by = catsOf(vm), L = [], rt = reservaTotal(), av = avgG(), nx = P.faturas[shift(hoje().slice(0, 7), 1)];
  if (e > 0 && (e - g) / e < .1) L.push('Separe 10% de toda entrada assim que ela cair, antes de gastar. Guardar primeiro e gastar o resto funciona melhor do que tentar guardar a sobra.');
  if (g && (by['Alimentação'] || 0) / g > .25) L.push('Alimentação está pesando nos seus gastos. Planejar as refeições da semana e levar marmita alguns dias costuma cortar bastante.');
  if (g && (by['Lazer'] || 0) / g > .2) L.push('O lazer passou de 20% dos seus gastos. Definir um dia fixo para sair ajuda a manter o controle sem abrir mão da diversão.');
  if (!Object.keys(P.limites).length) L.push('Defina limites por categoria na aba Plano. Um teto para cada tipo de gasto facilita muito o acompanhamento.');
  if (av && rt / av < 3) L.push('Uma boa meta inicial é ter uma reserva que cubra 3 meses de gastos. Um valor pequeno e constante já te aproxima disso.');
  if (nx && P.renda && nx > P.renda * .5) L.push('A fatura do próximo mês é alta perto da sua renda. Evite novas parcelas e combine antes o repasse de quem usa o seu cartão.');
  if (vHora()) L.push('Antes de uma compra grande, converta o preço em horas de trabalho. Seu tempo vale cerca de ' + R(vHora()) + ' por hora.');
  if (devTotal() > 0) L.push('Seus amigos ainda te devem ' + R(devTotal()) + '. Cobre antes do vencimento da fatura para que o valor não saia do seu bolso.');
  const d = Math.floor(Date.now() / 864e5); return L.concat(GEN.map((_, i) => GEN[(i + d) % GEN.length])).slice(0, 4);
}

/* ---------- dados ---------- */
async function loadP() { const { data } = await sb.from('profiles').select('*').maybeSingle(); if (data) P = { nome: data.nome || '', renda: +data.renda || 0, reserva: +data.reserva || 0, faturas: data.faturas || {}, limites: data.limites || {}, gk: data.gemini_key || '', modelo: data.modelo || '', ex: data.extra || {} };
  try { const l = JSON.parse(localStorage.getItem('mk_ai_' + ses.user.id) || '{}'); if (!P.gk && l.gk) { P.gk = l.gk; P.modelo = l.modelo || P.modelo; } const x = JSON.parse(localStorage.getItem('mk_ex_' + ses.user.id) || 'null'); if (x && !(P.ex.metas || P.ex.dev || P.ex.hTrab || P.ex.ocup)) P.ex = x; } catch (e) { }
}
async function saveProfile() {
  saveAI(); try { localStorage.setItem('mk_ex_' + ses.user.id, JSON.stringify(P.ex)); } catch (e) { }
  const base = { user_id: ses.user.id, nome: P.nome, renda: P.renda, reserva: P.reserva, faturas: P.faturas, limites: P.limites };
  const tries = [{ ...base, gemini_key: P.gk, modelo: P.modelo, extra: P.ex }, { ...base, gemini_key: P.gk, modelo: P.modelo }, base]; let error, k = 0;
  for (; k < tries.length; k++) { ({ error } = await sb.from('profiles').upsert(tries[k], { onConflict: 'user_id' })); if (!error) break; }
  return { error, k };
}
const saveAI = () => { try { localStorage.setItem('mk_ai_' + ses.user.id, JSON.stringify({ gk: P.gk, modelo: P.modelo })); } catch (e) { } };
async function load() { const { data } = await sb.from('transactions').select('*').order('dia', { ascending: false }).limit(1000); tx = data || []; render(); }
let lastIds = [];
async function add(items, dia) { if (!items.length) return; const { data, error } = await sb.from('transactions').insert(items.map(i => ({ ...i, dia: i.dia || dia || hoje() }))).select('id'); lastIds = (data || []).map(x => x.id); if (error) toast('Erro: ' + error.message); await load(); }

/* ---------- renderização ---------- */
function render() {
  const nome = P.nome || (ses ? ses.user.email.split('@')[0] : ''), hr = new Date().getHours();
  $('#hi').textContent = nome; $('#ml').textContent = mlabel(vm);
  $('#hl').textContent = (hr < 12 ? 'Bom dia' : hr < 18 ? 'Boa tarde' : 'Boa noite') + ', ' + nome + '!';
  $('#hs').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const T = tips(); $('#tip-d').innerHTML = ''; $('#tip-d').append(lab('bulb', 'Dica do dia'), document.createTextNode(T[0]));
  const S = story(), box = (el, arr) => { el.innerHTML = ''; arr.forEach((x, i) => { const r = h('div', 'st ' + x.k), ic = h('i'); ic.innerHTML = IC(x.i); r.style.animationDelay = i * .08 + 's'; r.append(ic, h('div', '', x.t)); el.appendChild(r); }); };
  box($('#story-s'), S.slice(0, 3)); box($('#story'), S);
  const tp = $('#tips'); tp.innerHTML = ''; T.forEach((t, i) => { const d = h('div', 'tp', t); d.style.animationDelay = i * .1 + 's'; tp.appendChild(d); });
  stats(); lineChart(); donut(); daily(); budgets(); list(); goalsView();
}
function stats() {
  const g = sum(vm, 'gasto'), e = sum(vm, 'entrada'), f = P.faturas[vm], all = tx.filter(x => x.tipo === 'gasto'), tot = all.reduce((a, x) => a + +x.valor, 0), ms = new Set(all.map(x => x.dia.slice(0, 7))).size;
  cnt($('#v-saldo'), e - g); $('#v-saldo').className = 'v ' + (e - g >= 0 ? 'pos' : 'neg'); cnt($('#v-g'), g); cnt($('#v-e'), e);
  $('#v-f').textContent = f ? R(f) : '–'; $('#v-r').textContent = reservaTotal() > 0 && tot ? (reservaTotal() / (tot / ms)).toFixed(1).replace('.', ',') + ' meses' : '–';
  $('#v-p').textContent = e > 0 ? Math.round((e - g) / e * 100) + '%' : '–'; $('#v-h').textContent = vHora() && g ? (g / vHora()).toFixed(1).replace('.', ',') + ' h' : '–';
  $('#a-s').textContent = R(e - g); $('#a-s').className = 'v ' + (e - g >= 0 ? 'pos' : 'neg'); $('#a-g').textContent = R(g); $('#a-r').textContent = R(reservaTotal());
}
function lineChart() {
  const el = $('#ln'); el.innerHTML = ''; const ms = [-5, -4, -3, -2, -1, 0].map(i => shift(vm, i)), G = ms.map(m => sum(m, 'gasto')), E = ms.map(m => sum(m, 'entrada')), mx = Math.max(1, ...G, ...E),
    W = 600, H = 210, pl = 12, pr = 12, pt = 14, pb = 28, x = i => pl + i * (W - pl - pr) / 5, y = v => pt + (H - pt - pb) * (1 - v / mx), rd = $('#ln-r');
  const s = sv('svg', { viewBox: '0 0 ' + W + ' ' + H }, el);
  s.innerHTML = '<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b81" stop-opacity=".35"/><stop offset="1" stop-color="#ff6b81" stop-opacity="0"/></linearGradient><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4dd4ff" stop-opacity=".35"/><stop offset="1" stop-color="#4dd4ff" stop-opacity="0"/></linearGradient></defs>';
  for (let i = 0; i < 4; i++) sv('line', { x1: pl, x2: W - pr, y1: pt + (H - pt - pb) * i / 3, y2: pt + (H - pt - pb) * i / 3, stroke: '#1d2a47', 'stroke-dasharray': '3 5' }, s);
  [[G, '#ff6b81', 'ga'], [E, '#4dd4ff', 'gb']].forEach(([A, col, id]) => {
    const d = ms.map((_, i) => (i ? 'L' : 'M') + x(i) + ' ' + y(A[i])).join(' ');
    sv('path', { d: d + ' L' + x(5) + ' ' + (H - pb) + ' L' + x(0) + ' ' + (H - pb) + 'Z', fill: 'url(#' + id + ')', class: 'ar' }, s);
    sv('path', { d, fill: 'none', stroke: col, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', pathLength: 1, class: 'draw' }, s);
    A.forEach((v, i) => sv('circle', { cx: x(i), cy: y(v), r: 4, fill: col, class: 'ar' }, s));
  });
  const show = i => rd.textContent = mlabel(ms[i]) + ': gastos ' + R(G[i]) + ' · entradas ' + R(E[i]) + ' · saldo ' + R(E[i] - G[i]); show(5);
  ms.forEach((m, i) => { sv('text', { x: x(i), y: H - 8, 'text-anchor': 'middle', fill: m === vm ? '#4d8dff' : '#8394b8', 'font-size': 13, 'font-weight': m === vm ? 700 : 400 }, s).textContent = mlabel(m, 1);
    const r = sv('rect', { x: x(i) - 40, y: 0, width: 80, height: H, fill: 'transparent', style: 'cursor:pointer' }, s); r.onmouseenter = () => show(i); r.onclick = () => { vm = m; render(); }; });
}
function donut() {
  const g = sum(vm, 'gasto'), by = catsOf(vm), arr = Object.entries(by).sort((a, b) => b[1] - a[1]), s = $('#donut'), lg = $('#leg'); s.innerHTML = ''; lg.innerHTML = '';
  sv('circle', { cx: 21, cy: 21, r: 15.915, fill: 'none', stroke: '#121b30', 'stroke-width': 5 }, s); let off = 25;
  arr.forEach(([k, v]) => { const p = v / g * 100, c = sv('circle', { cx: 21, cy: 21, r: 15.915, fill: 'none', stroke: ci(k)[1], 'stroke-width': sel === k ? 6.5 : 5, 'stroke-dashoffset': off, style: 'cursor:pointer;stroke-dasharray:0 100' }, s);
    setTimeout(() => c.style.strokeDasharray = p + ' ' + (100 - p), 40); c.onclick = () => { sel = sel === k ? null : k; donut(); }; off -= p;
    const r = h('div', 'lg' + (sel === k ? ' on' : '')), d = h('i'); d.style.background = ci(k)[1]; r.append(d, lab(ci(k)[0], k), h('span', '', R(v))); r.onclick = () => { sel = sel === k ? null : k; donut(); }; lg.appendChild(r); });
  if (!arr.length) { $('#dc-l').textContent = 'Sem gastos'; $('#dc-v').textContent = ''; lg.textContent = 'Nenhum gasto neste mês.'; }
  else if (sel && by[sel]) { $('#dc-l').textContent = sel; $('#dc-v').textContent = R(by[sel]) + ' · ' + Math.round(by[sel] / g * 100) + '%'; } else { $('#dc-l').textContent = 'Total'; $('#dc-v').textContent = R(g); }
}
function daily() {
  const n = dim(vm), D = Array(n).fill(0); tx.filter(x => inM(x, vm) && x.tipo === 'gasto').forEach(x => D[+x.dia.slice(8) - 1] += +x.valor);
  const mx = Math.max(1, ...D), el = $('#dy'), rd = $('#dy-r'), td = vm === hoje().slice(0, 7) ? +hoje().slice(8) : 0; el.innerHTML = '';
  const top = D.indexOf(Math.max(...D)); rd.textContent = Math.max(...D) > 0 ? 'Dia mais caro: ' + (top + 1) + ' (' + R(D[top]) + '). Passe o mouse ou toque numa barra.' : 'Sem gastos neste mês.';
  D.forEach((v, i) => { const b = h('i', i + 1 === td ? 'td' : ''); b.title = 'Dia ' + (i + 1) + ': ' + R(v); setTimeout(() => b.style.height = Math.max(2, v / mx * 100) + '%', 30 + i * 12); b.onmouseenter = b.onclick = () => rd.textContent = 'Dia ' + (i + 1) + ': ' + R(v); el.appendChild(b); });
}
function budgets() {
  const by = catsOf(vm), bd = $('#bud'); bd.innerHTML = ''; const ks = Object.keys(P.limites).filter(k => +P.limites[k] > 0);
  if (!ks.length) bd.innerHTML = '<span class="hint">Defina limites na aba Plano para acompanhar aqui.</span>';
  ks.forEach(k => { const u = by[k] || 0, l = +P.limites[k], p = u / l * 100, row = h('div', 'bd'), t = h('div', 't'), tr = h('div', 'tr'), i = h('i');
    t.append(lab(ci(k)[0], k), h('span', '', R(u) + ' / ' + R(l) + ' (' + Math.round(p) + '%)')); i.style.background = p > 100 ? 'var(--bad)' : p > 80 ? 'var(--warn)' : 'var(--ac)';
    setTimeout(() => i.style.width = Math.min(100, p) + '%', 40); tr.appendChild(i); row.append(t, tr); bd.appendChild(row); });
}
function glRow(icon, title, right, pct, sub, btns) { const r = h('div', 'gl'), top = h('div', 'top'), bar = h('div', 'tr'), f = h('i'), tb = h('b'); tb.appendChild(lab(icon, title)); top.append(tb, h('span', 'l', right)); bar.appendChild(f); setTimeout(() => f.style.width = pct + '%', 40); r.append(top, bar); if (sub) r.appendChild(h('div', 'l', sub));
  const bx = h('div', 'r'); btns.forEach(([t, fn]) => { const b = h('button', 's'); if (t === '×') { b.innerHTML = IC('x'); b.title = 'Remover'; } else b.textContent = t; b.onclick = fn; bx.appendChild(b); }); r.appendChild(bx); return r; }
function goalsView() {
  const gm = $('#gm'), dv = $('#dv'); gm.innerHTML = ''; dv.innerHTML = '';
  if (!metas().length) gm.innerHTML = '<span class="hint">Nenhuma meta ainda. Diga no Assistente: “quero juntar 3.000 para um notebook até junho”, ou crie abaixo.</span>';
  metas().forEach((m, i) => { const p = m.alvo > 0 ? Math.min(100, m.atual / m.alvo * 100) : 0; let sub = '';
    if (m.alvo > 0 && m.atual >= m.alvo) sub = 'Meta atingida'; else if (m.alvo > 0) { sub = 'Faltam ' + R(m.alvo - m.atual); if (m.prazo) { const n = (+m.prazo.slice(0, 4) - +hoje().slice(0, 4)) * 12 + (+m.prazo.slice(5) - +hoje().slice(5, 7)); sub += n > 0 ? ' · até ' + mlabel(m.prazo, 1) + '/' + m.prazo.slice(0, 4) + ': guarde ' + R((m.alvo - m.atual) / n) + ' por mês' : ' · prazo vencido'; } }
    gm.appendChild(glRow('gem', m.nome, R(m.atual) + ' / ' + R(m.alvo), p, sub, [['+ aporte', async () => { const v = num(prompt('Quanto você guardou para esta meta? (R$)') || ''); if (v > 0) { m.atual += v; await saveProfile(); render(); toast('Aporte registrado'); } }],
      ['×', async () => { if (confirm('Apagar a meta ' + m.nome + '?')) { metas().splice(i, 1); await saveProfile(); render(); } }]])); });
  $('#dv-t').textContent = devs().length ? 'Total a receber: ' + R(devTotal()) : 'Ninguém te deve nada registrado. Diga no Assistente: “o Adson ficou me devendo 300”.';
  devs().forEach((d, i) => { const rest = d.total - d.pago;
    dv.appendChild(glRow('users', d.nome, rest > 0 ? 'resta ' + R(rest) + ' de ' + R(d.total) : 'quitado', d.total > 0 ? d.pago / d.total * 100 : 0, '', [['Recebi', async () => { const v = num(prompt('Quanto ' + d.nome + ' pagou? (R$)') || ''); if (v > 0) { d.pago = Math.min(d.total, d.pago + v); await saveProfile(); render(); toast('Pagamento registrado'); } }],
      ['×', async () => { if (confirm('Remover ' + d.nome + ' da lista?')) { devs().splice(i, 1); await saveProfile(); render(); } }]])); });
}
function list() {
  const el = $('#list'); el.innerHTML = ''; const vh = vHora(), rows = tx.filter(x => inM(x, vm) && (x.descricao + ' ' + x.categoria).toLowerCase().includes(busca));
  if (!rows.length) el.innerHTML = '<span class="hint">Nenhum lançamento neste mês.</span>';
  rows.forEach(x => { const r = h('div', 't'), ic = h('div', 'ic2'), t = h('div', 'tx'), v = h('b', x.tipo === 'gasto' ? '' : 'pos', ({ gasto: '−', entrada: '+' }[x.tipo] || '') + R(x.valor)), d = xbtn(); ic.innerHTML = IC(ci(x.categoria)[0]);
    t.append(h('div', '', x.descricao || x.categoria), h('small', '', x.dia.slice(8) + '/' + x.dia.slice(5, 7) + ' · ' + ({ guardado: 'Guardado na reserva', resgate: 'Resgate da reserva' }[x.tipo] || x.categoria) + (vh && x.tipo === 'gasto' ? ' · ≈ ' + (x.valor / vh).toFixed(1).replace('.', ',') + ' h de trabalho' : '')));
    d.onclick = async () => { await sb.from('transactions').delete().eq('id', x.id); toast('Removido'); load(); }; r.append(ic, t, v, d); el.appendChild(r); });
}

/* ---------- IA ---------- */
const GFALL = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
const PROV = { gemini: { n: 'Gemini (Google)', m: GFALL[0] }, groq: { n: 'Groq', m: 'openai/gpt-oss-120b', u: 'https://api.groq.com/openai/v1/chat/completions' },
  openrouter: { n: 'OpenRouter', m: '', u: 'https://openrouter.ai/api/v1/chat/completions' }, openai: { n: 'OpenAI', m: 'gpt-4o-mini', u: 'https://api.openai.com/v1/chat/completions' }, anthropic: { n: 'Claude (Anthropic)', m: 'claude-haiku-5-5' } };
const PH = { gemini: 'Chave em aistudio.google.com/apikey (tem cota gratuita). Modelos gratuitos atuais: gemini-3.5-flash-lite (padrão), gemini-3.1-flash-lite e gemini-3.8-flash. Se o modelo padrão falhar, o app tenta os outros sozinho.', groq: 'Chave em console.groq.com (plano gratuito com limites). Modelo padrão: openai/gpt-oss-120b. Confira os modelos disponíveis no console.',
  openrouter: 'Chave em openrouter.ai. Informe o modelo (há modelos gratuitos, com nome terminado em :free; veja a lista no site).', openai: 'Chave em platform.openai.com. A API é paga por uso e é separada do ChatGPT.', anthropic: 'Chave em console.anthropic.com. A API é paga por uso e é separada do app Claude.' };
const pm = () => { const s = P.modelo || '', i = s.indexOf(':'), ok = i > 0 && PROV[s.slice(0, i)], k = ok ? s.slice(0, i) : 'gemini'; const mm = ((ok ? s.slice(i + 1) : s) || '').trim(), ex = !!mm && !(k === 'gemini' && mm === 'gemini-2.5-flash-lite'); return { prov: k, model: ex ? mm : PROV[k].m, explicit: ex }; };
const pvHint = () => { $('#pv-h').textContent = PH[$('#p-pv').value] + ' Trocou de provedor? Cole a chave dele.'; };
async function ai(p) {
  if (P.gk) {
    const { prov, model, explicit } = pm(), H = { 'Content-Type': 'application/json' }; let url, body, pick;
    if (prov === 'gemini') { url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent'; H['x-goog-api-key'] = P.gk; body = { contents: [{ parts: [{ text: p }] }], generationConfig: { responseMimeType: 'application/json' } }; pick = j => j.candidates[0].content.parts[0].text; }
    else if (prov === 'anthropic') { url = 'https://api.anthropic.com/v1/messages'; H['x-api-key'] = P.gk; H['anthropic-version'] = '2023-06-01'; H['anthropic-dangerous-direct-browser-access'] = 'true'; body = { model, max_tokens: 1500, messages: [{ role: 'user', content: p }] }; pick = j => j.content.map(c => c.text || '').join(''); }
    else { if (!model) throw new Error('Informe o modelo nas configurações da IA (aba Plano).'); url = PROV[prov].u; H.Authorization = 'Bearer ' + P.gk; body = { model, messages: [{ role: 'user', content: p }], temperature: 0.3 }; pick = j => j.choices[0].message.content; }
    let r = await fetch(url, { method: 'POST', headers: H, body: JSON.stringify(body) }), raw = await r.text();
    if (prov === 'gemini' && !explicit && r.status === 404) for (const m of GFALL) { if (m === model) continue; r = await fetch(url.replace(encodeURIComponent(model), encodeURIComponent(m)), { method: 'POST', headers: H, body: JSON.stringify(body) }); raw = await r.text(); if (r.status !== 404) break; }
    if (!r.ok) throw new Error(PROV[prov].n + ' ' + r.status + ' ' + raw.slice(0, 160));
    const t = pick(JSON.parse(raw)), i = t.indexOf('{'), e = t.lastIndexOf('}'); if (i < 0 || e < i) throw new Error('Resposta sem JSON: ' + t.slice(0, 100));
    return JSON.parse(t.slice(i, e + 1));
  }
  if (!C.WORKER_URL || /COLE_AQUI/.test(C.WORKER_URL)) throw new Error('Cole sua chave de IA na aba Plano.');
  const r = await fetch(C.WORKER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ses.access_token }, body: JSON.stringify({ prompt: p }) });
  const raw = await r.text(); if (!r.ok) throw new Error(r.status + ' ' + raw.slice(0, 200)); return JSON.parse(JSON.parse(raw).text);
}
const rotina = () => { const e = P.ex || {}; return 'Rotina: ' + (e.ocup || 'não informada') + '; trabalha ' + (e.hTrab || '?') + 'h/dia, ' + (e.dSem || 5) + ' dias/semana, turno ' + (e.turno || '?') + '; estuda ' + (e.hEst || '?') + 'h/dia, turno ' + (e.eTurno || '?') + (vHora() ? '; valor da hora ≈ R$ ' + vHora().toFixed(2) : '') + '.'; };
const HIST = [];
function ctx() {
  const hm = hoje().slice(0, 7), M = [-5, -4, -3, -2, -1, 0].map(i => { const m = shift(hm, i); return { mes: m, gastos: Math.round(sum(m, 'gasto')), entradas: Math.round(sum(m, 'entrada')), guardado: Math.round(sum(m, 'guardado')), categorias: catsOf(m) }; });
  const F = [1, 2, 3, 4, 5, 6].map(i => { const m = shift(hm, i); return { mes: m, gastosAgendados: Math.round(sum(m, 'gasto')), fatura: P.faturas[m] || 0 }; }).filter(x => x.gastosAgendados || x.fatura);
  const cur = tx.filter(x => inM(x, vm)).slice(0, 40).map(x => x.dia + ' ' + x.tipo + ' ' + x.valor + ' ' + x.categoria + ' ' + (x.descricao || '').slice(0, 40)).join('\n') || '(nenhum)';
  return 'Hoje: ' + hoje() + '. Mês em análise: ' + vm + '.\nPERFIL: ' + JSON.stringify({ nome: P.nome, renda: P.renda, reserva_total: Math.round(reservaTotal()), faturas_cartao: P.faturas, limites: P.limites, valor_hora: Math.round(vHora() * 100) / 100 }) + ' ' + rotina() +
    '\nMETAS: ' + JSON.stringify(metas().map(m => ({ nome: m.nome, alvo: m.alvo, atual: m.atual, prazo: m.prazo }))) + '\nQUEM DEVE AO USUÁRIO: ' + JSON.stringify(devs().map(d => ({ nome: d.nome, total: d.total, pago: d.pago }))) +
    '\nÚLTIMOS 6 MESES: ' + JSON.stringify(M) + '\nPRÓXIMOS MESES (agendado): ' + JSON.stringify(F) + '\nLANÇAMENTOS DE ' + vm + ':\n' + cur;
}
const SCHEMA = 'Responda SÓ JSON (omita o que não se aplica): {"resposta":"texto","itens":[{"tipo":"gasto"|"entrada"|"guardado"|"resgate","valor":número,"categoria":"...","descricao":"curta","data":"AAAA-MM-DD","parcelas":número,"repetir":número}],"faturas":{"AAAA-MM":número},"limites":{"Categoria":número},"perfil":{"nome":"","renda":número,"reserva_total":número,"ocupacao":"","hTrab":número,"dSem":número,"turno":"","hEst":número,"eTurno":""},"metas":[{"nome":"","alvo":número,"prazo":"AAAA-MM","aporte":número}],"devedores":[{"nome":"","valor":número}],"recebimentos":[{"nome":"","valor":número}],"apagar":[{"busca":"","mes":"AAAA-MM"}],"editar":[{"busca":"","mes":"AAAA-MM","novo_valor":número,"nova_categoria":"","nova_data":"AAAA-MM-DD","nova_descricao":""}]}\n' +
  'Regras: 1) "resposta" é obrigatória: confirme o que foi feito ou responda à pergunta usando só os dados fornecidos (faça as contas com cuidado; se faltar dado, diga). 2) "data" só se não for hoje; qualquer item em outro mês precisa de "data". 3) Compra parcelada: um item com "parcelas" e "valor" de CADA parcela, "data" da primeira. Conta fixa ou assinatura mensal: "repetir" com o número de meses. 4) O total da fatura do cartão de um mês vai em "faturas", nunca em itens; pagar a fatura é um gasto na categoria Fatura do cartão. 5) Quando alguém passa a dever ao usuário (ex.: usou o cartão dele), use "devedores"; quando essa pessoa paga, use "recebimentos". 6) Aporte em meta: use "metas" com "aporte" e inclua também um item "guardado". 7) "apagar" e "editar" só quando o usuário pedir explicitamente; o app pede confirmação. 8) Não invente valores nem itens e não recomende investimentos específicos.';
function prompt_(t) {
  return 'Você é o assistente financeiro pessoal e privado de ' + (P.nome || 'o usuário') + '. Responda em português do Brasil: curto, calmo, prático, realista e sem alarmismo.\n' + ctx() + '\nCategorias de gasto: ' + GC.join(', ') + '.\nCONVERSA RECENTE: ' +
    (HIST.slice(-4).map(x => 'Usuário: ' + x[0] + ' | Você: ' + x[1]).join('\n') || '(início)') + '\nMENSAGEM: ' + t + '\n\n' + SCHEMA;
}
function alerts(its) {
  const seen = new Set(), o = []; its.filter(i => i.tipo === 'gasto').forEach(i => { const m = (i.dia || hoje()).slice(0, 7), k = i.categoria, key = m + k, l = +P.limites[k]; if (!l || seen.has(key)) return; seen.add(key);
    const u = catsOf(m)[k] || 0; if (u > l) o.push('Atenção: limite de ' + k + ' estourado em ' + mlabel(m, 1) + ': ' + R(u) + ' de ' + R(l) + '.'); else if (u > l * .8) o.push('Atenção: ' + k + ' já usou ' + Math.round(u / l * 100) + '% do limite de ' + mlabel(m, 1) + '.'); });
  return o.length ? '\n' + o.join('\n') : '';
}
async function exec(j) {
  const S = []; let dirty = false, guard = false;
  Object.entries(j.faturas || {}).forEach(([m, v]) => { if (/^\d{4}-\d{2}$/.test(m) && +v > 0) { P.faturas[m] = +v; dirty = true; S.push('Fatura de ' + mlabel(m, 1) + '/' + m.slice(0, 4) + ': ' + R(v)); } });
  Object.entries(j.limites || {}).forEach(([k, v]) => { if (GC.includes(k) && v != null && +v >= 0) { if (+v > 0) { P.limites[k] = +v; S.push('Limite de ' + k + ': ' + R(v)); } else { delete P.limites[k]; S.push('Limite de ' + k + ' removido'); } dirty = true; } });
  const pf = j.perfil || {};
  if (pf.nome) { P.nome = String(pf.nome).slice(0, 40); dirty = true; S.push('Nome: ' + P.nome); }
  if (+pf.renda > 0) { P.renda = +pf.renda; dirty = true; S.push('Renda: ' + R(P.renda)); }
  if (pf.reserva_total != null && pf.reserva_total !== '' && !isNaN(+pf.reserva_total)) { P.reserva = +pf.reserva_total - (reservaTotal() - P.reserva); dirty = true; S.push('Reserva: ' + R(pf.reserva_total)); }
  [['ocupacao', 'ocup'], ['hTrab', 'hTrab'], ['dSem', 'dSem'], ['turno', 'turno'], ['hEst', 'hEst'], ['eTurno', 'eTurno']].forEach(([a_, b_]) => { if (pf[a_] != null && pf[a_] !== '') { P.ex[b_] = pf[a_]; dirty = true; S.push('Rotina atualizada'); } });
  (j.metas || []).forEach(m => { if (!m.nome) return; let g = findBy(metas(), m.nome); if (!g) { g = { id: mkid(), nome: String(m.nome).slice(0, 40), alvo: 0, prazo: '', atual: 0 }; metas().push(g); S.push('Meta criada: ' + g.nome); }
    if (+m.alvo > 0) g.alvo = +m.alvo; if (/^\d{4}-\d{2}$/.test(m.prazo)) g.prazo = m.prazo; if (+m.aporte > 0) { g.atual += +m.aporte; S.push(R(m.aporte) + ' na meta ' + g.nome); } dirty = true; });
  (j.devedores || []).forEach(d => { if (!d.nome || !(+d.valor > 0)) return; let x = findBy(devs(), d.nome); if (!x) { x = { id: mkid(), nome: String(d.nome).slice(0, 40), total: 0, pago: 0 }; devs().push(x); } x.total += +d.valor; dirty = true; S.push(x.nome + ' agora te deve +' + R(d.valor)); });
  (j.recebimentos || []).forEach(d => { const x = d.nome && findBy(devs(), d.nome); if (!x || !(+d.valor > 0)) return; x.pago = Math.min(x.total, x.pago + +d.valor); dirty = true; S.push(x.nome + ' pagou ' + R(d.valor) + (x.total - x.pago > 0 ? ' (resta ' + R(x.total - x.pago) + ')' : ' (quitado)')); });
  const its = expand((j.itens || []).map(norm).filter(i => i.valor > 0)); if (dirty) await saveProfile();
  if (its.length) { await add(its); S.unshift(its.length + ' lançamento(s) registrado(s)'); guard = its.some(i => i.tipo === 'guardado'); } else if (dirty) render();
  return { sum: S, ids: its.length ? lastIds.slice() : [], al: alerts(its), guard };
}
function undoBtn(w, ids) { const u = h('button', 's'); u.innerHTML = IC('undo') + 'Desfazer lançamentos'; u.style.marginTop = '6px'; u.onclick = async () => { await sb.from('transactions').delete().in('id', ids); toast('Desfeito'); u.remove(); load(); }; w.appendChild(h('br')); w.appendChild(u); }
function ask(text, yes) { const d = say(text), b = h('div', 'r'), y = h('button', '', 'Confirmar'), n = h('button', 's', 'Cancelar'); y.onclick = async () => { b.remove(); await yes(); }; n.onclick = () => { b.remove(); d.append(' (cancelado)'); }; b.append(y, n); d.appendChild(b); }
function propose(del, ed) {
  const find = (b, m) => { const q = nz(b); return q ? tx.filter(x => (!m || inM(x, m)) && nz(x.descricao + ' ' + x.categoria).includes(q)) : []; };
  const dl = [...new Map((del || []).flatMap(d => find(d.busca, d.mes)).map(x => [x.id, x])).values()];
  if (dl.length) ask('Apagar ' + dl.length + ' lançamento(s)?\n' + dl.slice(0, 8).map(x => '• ' + x.dia.slice(5).split('-').reverse().join('/') + ' ' + (x.descricao || x.categoria) + ' ' + R(x.valor)).join('\n') + (dl.length > 8 ? '\n…' : ''), async () => { await sb.from('transactions').delete().in('id', dl.map(x => x.id)); await load(); toast('Apagado'); });
  (ed || []).forEach(e => { const ms = find(e.busca, e.mes); if (!ms.length) return; const ch = {}; if (+e.novo_valor > 0) ch.valor = +e.novo_valor; if (GC.includes(e.nova_categoria)) ch.categoria = e.nova_categoria; if (/^\d{4}-\d{2}-\d{2}$/.test(e.nova_data)) ch.dia = e.nova_data; if (e.nova_descricao) ch.descricao = String(e.nova_descricao).slice(0, 80); if (!Object.keys(ch).length) return;
    ask('Alterar ' + ms.length + ' lançamento(s)?\n' + ms.slice(0, 5).map(x => '• ' + (x.descricao || x.categoria) + ' ' + R(x.valor)).join('\n') + '\nNovo: ' + Object.entries(ch).map(([k, v]) => k + ' = ' + v).join(', '), async () => { await sb.from('transactions').update(ch).in('id', ms.map(x => x.id)); await load(); toast('Alterado'); }); });
}
function say(t, me) { const d = h('div', 'm' + (me ? ' me' : ''), t); $('#chat').appendChild(d); $('#chat').scrollTop = 1e9; return d; }
async function send() {
  const t = $('#inp').value.trim(); if (!t) return; $('#inp').value = ''; say(t, 1);
  const p = parse(t);
  if (p) { await add([p]); say('' + { gasto: 'Gasto', entrada: 'Entrada', guardado: 'Guardado na reserva', resgate: 'Resgate da reserva' }[p.tipo] + ' de ' + R(p.valor) + (p.tipo === 'gasto' ? ' em ' + p.categoria : '') + ' anotado.' + alerts([p])); HIST.push([t, 'anotado']); if (p.tipo === 'guardado') celebrate('heart'); if (p.tipo === 'entrada') celebrate('coin'); return; }
  const w = say(''); w.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';
  try {
    const j = await ai(prompt_(t)), r = await exec(j);
    w.textContent = (j.resposta || 'Ok.') + (r.sum.length ? '\n' + r.sum.map(x => '• ' + x).join('\n') : '') + r.al; HIST.push([t, String(j.resposta || '').slice(0, 200)]);
    if (r.ids.length) undoBtn(w, r.ids); if (r.guard) celebrate('heart'); propose(j.apagar, j.editar);
  } catch (e) { w.textContent = 'A IA não respondeu. Detalhe: ' + (e.message || e) + '\n(Frases como “gastei 50 no mercado” ou “guardei 200” funcionam sem IA.)'; }
  $('#chat').scrollTop = 1e9;
}
const ring = (n, c) => { const s = $('#score'); s.innerHTML = ''; sv('circle', { cx: 21, cy: 21, r: 15.915, fill: 'none', stroke: '#121b30', 'stroke-width': 4 }, s); const e = sv('circle', { cx: 21, cy: 21, r: 15.915, fill: 'none', stroke: c || '#4d8dff', 'stroke-width': 4, 'stroke-linecap': 'round', style: 'stroke-dasharray:0 100' }, s); setTimeout(() => e.style.strokeDasharray = n + ' ' + (100 - n), 40); };
function drawIns() {
  const j = INS, box = $('#ins'); box.innerHTML = ''; if (!j) return; const n = Math.max(0, Math.min(100, Math.round(+j.nota || 0))), col = n >= 70 ? '#4dd4ff' : n >= 45 ? '#ffb454' : '#ff6b81';
  ring(n, col); $('#sc-v').textContent = n; $('#in-r').textContent = j.resumo || '';
  const c = h('div', 'c in'), sec = (t, a) => { if (!a || !a.length) return; c.appendChild(h('h4', '', t)); const u = h('ul'); a.forEach(x => u.appendChild(h('li', '', String(x)))); c.appendChild(u); };
  sec('Pontos fortes', j.pontos_fortes); sec('Atenção', j.alertas);
  if ((j.dicas || []).length) { c.appendChild(h('h4', '', 'Como melhorar')); j.dicas.slice(0, 5).forEach(d => { const t = h('div', 'tp'); t.appendChild(h('b', '', String(d.titulo || ''))); t.appendChild(h('div', '', String(d.texto || ''))); if (+d.economia_mensal_estimada > 0) t.appendChild(h('small', '', 'Economia estimada: ' + R(d.economia_mensal_estimada) + '/mês')); c.appendChild(t); }); }
  if (j.meta) { c.appendChild(h('h4', '', 'Meta para o próximo mês')); c.appendChild(h('div', '', String(j.meta))); }
  c.appendChild(h('div', 'hint', 'Orientação educativa gerada por IA, não é consultoria financeira.')); box.appendChild(c);
}
async function analisar() {
  const b = $('#an'); b.disabled = true; setBtn(b, 'sparkle', 'Analisando…'); const hm = hoje().slice(0, 7), dados = [-5, -4, -3, -2, -1, 0].map(i => { const m = shift(hm, i); return { mes: m, gastos: Math.round(sum(m, 'gasto')), entradas: Math.round(sum(m, 'entrada')), categorias: catsOf(m) }; });
  const p = 'Você é um consultor financeiro pessoal didático e honesto de ' + (P.nome || 'o usuário') + '. Analise estes dados (português do Brasil, tom calmo e realista).\nRenda mensal: R$ ' + P.renda + '. Reserva: R$ ' + reservaTotal() + '. Faturas do cartão: ' + JSON.stringify(P.faturas) + '. Limites: ' + JSON.stringify(P.limites) + '. ' + rotina() +
    '\nÚltimos 6 meses: ' + JSON.stringify(dados) + '\nMês atual: ' + hm + '.\nResponda SÓ JSON: {"nota":0 a 100,"resumo":"2 frases","pontos_fortes":["..."],"alertas":["..."],"dicas":[{"titulo":"...","texto":"...","economia_mensal_estimada":número}],"meta":"uma meta realista"}. Use só os dados fornecidos e não invente valores. Com poucos dados, diga isso e dê nota cautelosa. Considere a rotina de trabalho e estudo nas dicas. Sem recomendar investimentos específicos. Máximo 3 itens por lista.';
  try { INS = await ai(p); drawIns(); } catch (e) { $('#in-r').textContent = 'A IA não respondeu. Detalhe: ' + (e.message || e); } b.disabled = false; setBtn(b, 'sparkle', 'Analisar novamente');
}
async function lancarIA() { const t = $('#ai-l').value.trim(); if (!t) return toast('Cole seus gastos primeiro'); $('#ai-l').value = ''; go('ai'); $('#inp').value = t; send(); }
async function fillAI() {
  const t = $('#ai-p').value.trim(); if (!t) return toast('Escreva algo primeiro'); const b = $('#ai-fill'); b.disabled = true; setBtn(b, 'sparkle', 'Lendo…');
  const p = 'Extraia dados financeiros pessoais do texto. Hoje é ' + hoje() + '. Responda SÓ JSON: {"nome":"","renda":número ou null,"reserva":número ou null,"faturas":{"AAAA-MM":número},"limites":{"Categoria":número},"rotina":{"ocupacao":"","hTrab":número,"dSem":número,"turno":"manhã|tarde|noite|integral|variável","hEst":número,"eTurno":"manhã|tarde|noite|EAD|não estudo"}}. Categorias válidas para limites: ' + GC.join(', ') + '. Omita ou use null o que não foi dito; não invente. Meses sem ano são o mais próximo no futuro.\nTexto: ' + t.slice(0, 1500);
  try { const j = await ai(p), r = j.rotina || {}; if (j.nome) $('#p-n').value = j.nome; if (j.renda > 0) $('#p-r').value = j.renda; if (j.reserva > 0) $('#p-s').value = j.reserva;
    if (r.ocupacao) $('#x-o').value = r.ocupacao; if (r.hTrab > 0) $('#x-h').value = r.hTrab; if (r.dSem > 0) $('#x-d').value = r.dSem; if (r.hEst > 0) $('#x-e').value = r.hEst;
    [['#x-t', r.turno], ['#x-et', r.eTurno]].forEach(([id, v]) => { if (v && [...$(id).options].some(o => o.value === v)) $(id).value = v; }); vh_();
    Object.entries(j.faturas || {}).forEach(([m, v]) => { if (/^\d{4}-\d{2}$/.test(m) && +v > 0) { const f = FR.find(x => x[0] === m); if (f) f[1] = v; else FR.push([m, v]); } }); drawFat();
    Object.entries(j.limites || {}).forEach(([k, v]) => { const i = $$('#lim input').find(x => x.dataset.k === k); if (i && +v > 0) i.value = v; }); toast('Preenchido! Confira e toque em Salvar plano'); }
  catch (e) { toast('IA indisponível: ' + String(e.message || e).slice(0, 80)); } b.disabled = false; setBtn(b, 'sparkle', 'Preencher meu plano');
}

/* ---------- plano ---------- */
const vh_ = () => { const r = num($('#p-r').value), hh = num($('#x-h').value), d = num($('#x-d').value) || 5; $('#vh').textContent = r > 0 && hh > 0 ? 'Seu tempo vale cerca de ' + R(r / (hh * d * 4.345)) + ' por hora de trabalho.' : ''; };
function plan() {
  const e = P.ex || {}; $('#p-n').value = P.nome; $('#p-k').value = P.gk; { const s = P.modelo || '', i = s.indexOf(':'), ok = i > 0 && PROV[s.slice(0, i)]; $('#p-pv').value = ok ? s.slice(0, i) : 'gemini'; $('#p-m').value = ok ? s.slice(i + 1) : s; pvHint(); } $('#p-r').value = P.renda || ''; $('#p-s').value = P.reserva || '';
  $('#x-o').value = e.ocup || ''; $('#x-h').value = e.hTrab || ''; $('#x-d').value = e.dSem || ''; $('#x-t').value = e.turno || ''; $('#x-e').value = e.hEst || ''; $('#x-et').value = e.eTurno || ''; vh_();
  FR = Object.entries(P.faturas).sort(); drawFat(); const lm = $('#lim'); lm.innerHTML = '';
  GC.forEach(k => { const r = h('div', 'r2 keep'), i = h('input'); i.inputMode = 'decimal'; i.placeholder = 'sem limite'; i.dataset.k = k; i.value = P.limites[k] || ''; r.append(lab(ci(k)[0], k), i); r.style.alignItems = 'center'; lm.appendChild(r); });
}
function drawFat() {
  const f = $('#fat'); f.innerHTML = '';
  FR.forEach((x, n) => { const r = h('div', 'r2 keep'), m = h('input'), v = h('input'), d = xbtn(); m.type = 'month'; m.value = x[0]; v.inputMode = 'decimal'; v.placeholder = 'Valor'; v.value = x[1] || '';
    m.onchange = () => x[0] = m.value; v.oninput = () => x[1] = v.value; d.style.flex = '0 0 40px'; d.onclick = () => { FR.splice(n, 1); drawFat(); }; r.append(m, v, d); f.appendChild(r); });
}
async function savePlan() {
  P.nome = $('#p-n').value.trim(); P.gk = $('#p-k').value.trim(); P.modelo = $('#p-pv').value + ':' + $('#p-m').value.trim(); P.renda = num($('#p-r').value); P.reserva = num($('#p-s').value);
  P.ex = { ...P.ex, ocup: $('#x-o').value.trim(), hTrab: num($('#x-h').value), dSem: num($('#x-d').value), turno: $('#x-t').value, hEst: num($('#x-e').value), eTurno: $('#x-et').value };
  P.faturas = {}; FR.forEach(x => { if (x[0] && num(x[1]) > 0) P.faturas[x[0]] = num(x[1]); }); P.limites = {}; $$('#lim input').forEach(i => { if (num(i.value) > 0) P.limites[i.dataset.k] = num(i.value); });
  const { error, k } = await saveProfile();
  toast(error ? 'Erro: ' + error.message : k === 0 ? 'Plano salvo' : 'Salvo, mas faltam colunas no banco: rode os SQL das atualizações 2 e 3. Dados guardados neste aparelho.'); render();
}

/* ---------- navegação e eventos ---------- */
const TT = { ai: ['Assistente', 'Converse comigo para registrar e entender o seu dinheiro'], home: ['Painel', 'Seu retrato financeiro em números e gráficos'], tx: ['Lançamentos', 'Tudo o que você registrou'], plan: ['Plano', 'Perfil, rotina, faturas e limites'], goals: ['Metas e dívidas', 'Seus objetivos e quanto os amigos te devem'] };
function go(t) {
  tab = t; $$('main > section').forEach(s => s.hidden = s.id !== 't-' + t); $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  $('#pt').textContent = TT[t][0]; $('#ps').textContent = TT[t][1]; $('#mbar').hidden = !(t === 'home' || t === 'tx');
  if (t === 'ai') vm = hoje().slice(0, 7); if (t === 'plan') plan(); render();
  $$('#t-' + t + ' .c').forEach((c, i) => { c.style.animation = 'none'; c.offsetHeight; c.style.animation = ''; c.style.animationDelay = i * .06 + 's'; }); window.scrollTo(0, 0);
}
async function show(s) {
  ses = s; $('#login').hidden = !!s; $('#app').hidden = !s;
  if (!s) { tx = []; P = blank(); INS = null; $('#chat').innerHTML = ''; return; }
  await loadP(); await load(); go('ai');
  if (!$('#chat').children.length) say('Oi, ' + (P.nome || 'tudo bem') + '! Eu cuido do seu dinheiro com você. Posso anotar gastos, entradas e o que você guarda; registrar faturas do cartão, parcelas e contas fixas; criar metas; controlar quem te deve; definir limites por categoria; corrigir ou apagar lançamentos (sempre com a sua confirmação) e responder perguntas sobre os seus números.\n\nExemplos: “gastei 50 no mercado”, “parcelei um tênis em 3x de 100”, “fatura de dezembro é 1.194”, “o Adson ficou me devendo 300”, “quero juntar 3.000 para um notebook até junho”, “limite de lazer 200”.');
}
$('#go').onclick = async () => { const { error } = await sb.auth.signInWithPassword({ email: $('#em').value, password: $('#pw').value }); $('#err').textContent = error ? 'Erro: ' + error.message : ''; };
$('#pw').onkeydown = e => { if (e.key === 'Enter') $('#go').click(); };
$('#out').onclick = () => sb.auth.signOut(); $('#send').onclick = send; $('#inp').onkeydown = e => { if (e.key === 'Enter') send(); };
$('#mp').onclick = () => { vm = shift(vm, -1); render(); }; $('#mn').onclick = () => { vm = shift(vm, 1); render(); };
$$('#nav button').forEach(b => b.onclick = () => go(b.dataset.t));
$$('.seg button').forEach(b => b.onclick = () => { tipo = b.dataset.tp; $$('.seg button').forEach(x => x.classList.toggle('on', x === b)); $('#f-c').hidden = tipo !== 'gasto'; });
$('#f-c').innerHTML = GC.map(k => '<option>' + k + '</option>').join(''); $('#f-d').value = hoje();
$('#f-add').onclick = async () => { const v = num($('#f-v').value); if (v <= 0) return toast('Informe um valor');
  await add([{ tipo, valor: v, categoria: tipo === 'entrada' ? 'Entrada' : tipo === 'gasto' ? $('#f-c').value : 'Reserva', descricao: $('#f-t').value.trim().slice(0, 80) }], $('#f-d').value || hoje()); $('#f-v').value = ''; $('#f-t').value = ''; toast('Lançado'); };
$('#q').oninput = e => { busca = e.target.value.toLowerCase(); list(); };
$('#csv').onclick = () => { const rows = [['data', 'tipo', 'valor', 'categoria', 'descricao'], ...tx.map(x => [x.dia, x.tipo, x.valor, x.categoria, '"' + (x.descricao || '').replace(/"/g, '""') + '"'])];
  const a = h('a'); a.href = URL.createObjectURL(new Blob([rows.map(r => r.join(';')).join('\n')], { type: 'text/csv' })); a.download = 'mk-finance-ia.csv'; a.click(); };
$('#fat-add').onclick = () => { FR.push([vm, '']); drawFat(); }; $('#p-save').onclick = savePlan; ['#p-r', '#x-h', '#x-d'].forEach(i => $(i).oninput = vh_);
$('#g-add').onclick = async () => { const n = $('#g-n').value.trim(); if (!n) return toast('Dê um nome para a meta'); metas().push({ id: mkid(), nome: n.slice(0, 40), alvo: num($('#g-a').value), prazo: $('#g-p').value || '', atual: 0 }); $('#g-n').value = ''; $('#g-a').value = ''; await saveProfile(); render(); toast('Meta criada'); };
$('#d-add').onclick = async () => { const n = $('#d-n').value.trim(), v = num($('#d-v').value); if (!n || v <= 0) return toast('Informe o nome e o valor'); const x = findBy(devs(), n); if (x) x.total += v; else devs().push({ id: mkid(), nome: n.slice(0, 40), total: v, pago: 0 }); $('#d-n').value = ''; $('#d-v').value = ''; await saveProfile(); render(); toast('Adicionado'); };
{ const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (SR) { const b = h('button', 's'); b.innerHTML = IC('mic'); b.title = 'Falar'; b.setAttribute('aria-label', 'Falar'); b.onclick = () => { const r = new SR(); r.lang = 'pt-BR'; r.onresult = e => { $('#inp').value = e.results[0][0].transcript; send(); }; r.onerror = () => toast('Não consegui ouvir, tente de novo'); r.start(); toast('Pode falar…'); }; $('#send').before(b); } }
$('#an').onclick = analisar; $('#ai-fill').onclick = fillAI; $('#ai-add').onclick = lancarIA; ring(0); $('#p-pv').onchange = pvHint;
$('#ai-test').onclick = async () => { P.gk = $('#p-k').value.trim(); P.modelo = $('#p-pv').value + ':' + $('#p-m').value.trim(); saveAI(); $('#ai-res').textContent = 'Testando…'; try { const j = await ai('Responda SÓ JSON: {"ok":true}'); $('#ai-res').textContent = j.ok ? 'IA funcionando com ' + PROV[pm().prov].n + ' (toque em Salvar plano para guardar)' : 'Resposta inesperada da IA.'; } catch (e) { $('#ai-res').textContent = 'Erro: ' + (e.message || e); } };
[['Gastei…', 'gastei ', 'minus'], ['Guardei…', 'guardei ', 'bank'], ['Recebi…', 'recebi ', 'wallet'], ['Nova meta…', 'quero juntar ', 'flag'], ['Alguém me deve…', 'ficou me devendo ', 'users']].forEach(([l, v, ico]) => { const b = h('button'); b.innerHTML = IC(ico) + l; b.onclick = () => { $('#inp').value = v; $('#inp').focus(); }; $('#chips').appendChild(b); });
['Quanto gastei hoje?', 'Resumo do mês', 'Quais são meus compromissos dos próximos meses?', 'Quem me deve?', 'Onde posso economizar?', 'Posso gastar 80 hoje?'].forEach(t => { const b = h('button', '', t); b.onclick = () => { $('#inp').value = t; send(); }; $('#chips').appendChild(b); });
{ const b = h('button'); b.innerHTML = IC('trendup') + 'Analisar minhas finanças'; b.onclick = () => { go('home'); analisar(); }; $('#chips').appendChild(b); }
hydrate();
sb.auth.getSession().then(({ data }) => show(data.session)); sb.auth.onAuthStateChange((ev, s) => { if (ev === 'SIGNED_IN' && ses && s && ses.user.id === s.user.id) return; if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') show(s); });
