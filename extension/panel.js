const DEFAULT_STATE = { typologies: [], selected: {}, custom: {}, mapping: {}, append: false };
let state = structuredClone(DEFAULT_STATE);
let pickingSection = null;
let editing = null;

const $ = (id) => document.getElementById(id);

function setStatus(msg, err = false) {
  const el = $('status');
  el.textContent = msg;
  el.classList.toggle('err', err);
}

async function load() {
  const saved = await chrome.storage.local.get('pra');
  state = { ...structuredClone(DEFAULT_STATE), ...(saved.pra || {}) };
  $('append').checked = state.append;
  render();
}

function save() {
  return chrome.storage.local.set({ pra: state });
}

function sectionText(id) {
  const list = state.selected[id] || [];
  return list.length ? list.map((m) => `- ${m}`).join('\n') : '- No se especifica actuación diferenciada.';
}

function renderTypologies() {
  const box = $('typologies');
  box.innerHTML = '';
  TYPOLOGIES.forEach((t) => {
    const b = document.createElement('button');
    b.className = 'chip' + (state.typologies.includes(t.id) ? ' on' : '');
    b.textContent = t.label;
    b.onclick = () => {
      const i = state.typologies.indexOf(t.id);
      i >= 0 ? state.typologies.splice(i, 1) : state.typologies.push(t.id);
      // Preselecciona las medidas recomendadas de las tipologías activas
      SENECA_SECTIONS.forEach((s) => {
        const rec = MEASURES_DATABASE.filter((m) => m.sectionId === s.id && state.typologies.includes(m.typology)).map((m) => m.text);
        state.selected[s.id] = [...new Set([...rec, ...(state.custom[s.id] || [])])];
      });
      save(); render();
    };
    box.appendChild(b);
  });
}

function renderSections() {
  const box = $('sections');
  box.innerHTML = '';
  SENECA_SECTIONS.forEach((s) => {
    const available = MEASURES_DATABASE.filter((m) => m.sectionId === s.id && state.typologies.includes(m.typology));
    const options = [...new Set([...available.map((m) => m.text), ...(state.custom[s.id] || [])])];
    const sel = state.selected[s.id] || [];
    const div = document.createElement('div');
    div.className = 'sec';
    div.innerHTML = `<h3></h3><div class="list"></div>
      <textarea rows="2" placeholder="Añadir medida propia…"></textarea>
      <div class="actions"><button class="add">Añadir</button><button class="primary fill">Rellenar en Séneca</button><button class="map">Calibrar campo</button></div>
      <div class="${state.mapping[s.id] ? 'mapped' : 'unmapped'}">${state.mapping[s.id] ? 'Campo calibrado' : 'Campo sin calibrar'}</div>`;
    div.querySelector('h3').textContent = s.title;
    const list = div.querySelector('.list');
    if (!options.length) list.textContent = 'Selecciona una tipología para ver medidas.';
    options.forEach((text) => {
      const l = document.createElement('label');
      l.className = 'm';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = sel.includes(text);
      cb.onchange = () => {
        const cur = state.selected[s.id] || [];
        state.selected[s.id] = cb.checked ? [...cur, text] : cur.filter((x) => x !== text);
        save();
      };
      const span = document.createElement('span');
      span.className = 'txt';
      span.textContent = text;
      l.append(cb, span);
      if ((state.custom[s.id] || []).includes(text)) {
        const edit = document.createElement('button');
        edit.className = 'mini';
        edit.textContent = 'Editar';
        edit.onclick = (e) => {
          e.preventDefault();
          editing = { sectionId: s.id, text };
          render();
        };
        const del = document.createElement('button');
        del.className = 'mini danger';
        del.textContent = 'Borrar';
        del.onclick = (e) => {
          e.preventDefault();
          state.custom[s.id] = state.custom[s.id].filter((x) => x !== text);
          state.selected[s.id] = (state.selected[s.id] || []).filter((x) => x !== text);
          if (editing && editing.text === text) editing = null;
          save(); render();
        };
        l.append(edit, del);
      }
      list.appendChild(l);
    });
    const ta = div.querySelector('textarea');
    const addBtn = div.querySelector('.add');
    const isEditing = editing && editing.sectionId === s.id;
    if (isEditing) {
      ta.value = editing.text;
      addBtn.textContent = 'Guardar cambio';
    }
    addBtn.onclick = () => {
      const v = ta.value.trim();
      if (!v) return;
      if (isEditing) {
        const swap = (arr) => (arr || []).map((x) => (x === editing.text ? v : x));
        state.custom[s.id] = swap(state.custom[s.id]);
        state.selected[s.id] = swap(state.selected[s.id]);
        editing = null;
      } else {
        (state.custom[s.id] ||= []).push(v);
        (state.selected[s.id] ||= []).push(v);
      }
      save(); render();
    };
    div.querySelector('.fill').onclick = () => fillSection(s.id).then((ok) => setStatus(ok ? `Apartado ${s.id} rellenado.` : `No se encontró el campo del apartado ${s.id}. Recalíbralo.`, !ok));
    div.querySelector('.map').onclick = () => startPick(s.id);
    box.appendChild(div);
  });
}

function render() {
  renderTypologies();
  renderSections();
}

async function activeTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab && tab.id;
}

function broadcast(msg) {
  return activeTabId().then((tabId) => {
    if (!tabId) return [];
    return chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      func: (m) => (window.__pra ? window.__pra.handle(m) : null),
      args: [msg]
    });
  });
}

async function startPick(sectionId) {
  pickingSection = sectionId;
  try {
    await broadcast({ type: 'startPick' });
    setStatus(`Haz clic en el cuadro de texto del apartado ${sectionId} en Séneca.`);
  } catch (e) {
    setStatus('Abre una página de Séneca en la pestaña activa.', true);
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'picked' || pickingSection == null) return;
  state.mapping[pickingSection] = msg.descriptor;
  setStatus(`Apartado ${pickingSection} calibrado.`);
  pickingSection = null;
  save(); render();
});

async function fillSection(id) {
  const descriptor = state.mapping[id];
  if (!descriptor) return false;
  try {
    const results = await broadcast({ type: 'fill', descriptor, text: sectionText(id), append: state.append });
    return results.some((r) => r.result && r.result.ok);
  } catch (e) {
    return false;
  }
}

$('append').onchange = (e) => { state.append = e.target.checked; save(); };

// Exporta medidas propias, tipologías y selección (no incluye la calibración, que depende de cada equipo).
$('export').onclick = () => {
  const data = { app: 'pra-seneca', version: 1, custom: state.custom, typologies: state.typologies, selected: state.selected };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pra-medidas.json';
  a.click();
  URL.revokeObjectURL(url);
  setStatus('Medidas exportadas a pra-medidas.json.');
};

$('import').onclick = () => $('importFile').click();
$('importFile').onchange = async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (data.app !== 'pra-seneca') throw new Error('formato');
    const known = new Set(SENECA_SECTIONS.map((s) => String(s.id)));
    const merge = (a = [], b = []) => [...new Set([...a, ...b.filter((x) => typeof x === 'string')])];
    let added = 0;
    for (const id of Object.keys(data.custom || {})) {
      if (!known.has(id) || !Array.isArray(data.custom[id])) continue;
      const before = (state.custom[id] || []).length;
      state.custom[id] = merge(state.custom[id], data.custom[id]);
      added += state.custom[id].length - before;
    }
    for (const id of Object.keys(data.selected || {})) {
      if (known.has(id) && Array.isArray(data.selected[id])) state.selected[id] = merge(state.selected[id], data.selected[id]);
    }
    const valid = new Set(TYPOLOGIES.map((t) => t.id));
    state.typologies = merge(state.typologies, (data.typologies || []).filter((t) => valid.has(t)));
    await save(); render();
    setStatus(`Importación correcta: ${added} medidas propias nuevas.`);
  } catch (err) {
    setStatus('El archivo no es una exportación válida de esta extensión.', true);
  }
};
$('reset').onclick = () => { state.selected = {}; state.typologies = []; save(); render(); };
$('fillAll').onclick = async () => {
  const missing = [];
  for (const s of SENECA_SECTIONS) {
    if (!(await fillSection(s.id))) missing.push(s.id);
  }
  setStatus(missing.length ? `No se rellenaron los apartados: ${missing.join(', ')} (calibra o abre su pestaña).` : 'Todos los apartados rellenados.', missing.length > 0);
  if (!missing.length) maybeShowThanks();
};

// Máximo una vez cada 7 días tras un rellenado completo; "Ahora no" lo oculta hasta entonces.
const WEEK = 7 * 24 * 3600 * 1000;
async function maybeShowThanks() {
  const { cafeShown = 0 } = await chrome.storage.local.get('cafeShown');
  if (Date.now() - cafeShown < WEEK) return;
  $('thanks').hidden = false;
  await chrome.storage.local.set({ cafeShown: Date.now() });
}
$('thanksClose').onclick = () => { $('thanks').hidden = true; };
$('thanks').querySelector('a').onclick = () => { $('thanks').hidden = true; };

load();
