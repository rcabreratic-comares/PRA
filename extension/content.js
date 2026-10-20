(() => {
  const FIELD_SELECTOR = 'textarea, input[type="text"], [contenteditable="true"]';
  let picking = false;

  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();

  function labelTextOf(el) {
    if (el.id) {
      const l = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (l) return norm(l.textContent);
    }
    const wrap = el.closest('label');
    if (wrap) return norm(wrap.textContent);
    return norm(el.getAttribute('aria-label') || el.getAttribute('placeholder') || '');
  }

  function cssPath(el) {
    const parts = [];
    while (el && el.nodeType === 1 && el !== document.body) {
      const siblings = [...el.parentNode.children].filter((c) => c.tagName === el.tagName);
      parts.unshift(`${el.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(el) + 1})`);
      el = el.parentElement;
    }
    return 'body > ' + parts.join(' > ');
  }

  function describe(el) {
    const all = [...document.querySelectorAll(FIELD_SELECTOR)];
    return {
      id: el.id || '',
      name: el.getAttribute('name') || '',
      label: labelTextOf(el),
      path: cssPath(el),
      index: all.indexOf(el),
      tag: el.tagName.toLowerCase()
    };
  }

  // Los ids de Séneca pueden ser dinámicos: se prueba id, name, etiqueta y, por último, ruta CSS.
  function locate(d) {
    const all = [...document.querySelectorAll(FIELD_SELECTOR)];
    let el = null;
    if (d.id) el = document.getElementById(d.id);
    if (!el && d.name) el = document.querySelector(`[name="${CSS.escape(d.name)}"]`);
    if (!el && d.label) el = all.find((f) => labelTextOf(f) === d.label) || null;
    if (!el && d.path) { try { el = document.querySelector(d.path); } catch (_) {} }
    return el;
  }

  // En modo añadir, omite las líneas que ya están en el campo.
  const clean = (l) => l.replace(/^[\s•¿?*-]+/, '').trim();
  function mergeText(current, text) {
    const existing = new Set(current.split('\n').map(clean));
    const fresh = text.split('\n').filter((l) => !existing.has(clean(l)));
    if (!fresh.length) return current;
    return current.trim() ? current.replace(/\s+$/, '') + '\n' + fresh.join('\n') : fresh.join('\n');
  }

  function setValue(el, text, append) {
    el.focus();
    if (el.isContentEditable) {
      const next = append ? mergeText(el.innerText, text) : text;
      document.execCommand('selectAll', false, null);
      document.execCommand('insertText', false, next);
    } else {
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(el, append ? mergeText(el.value, text) : text);
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  function onPick(e) {
    const el = e.target.closest && e.target.closest(FIELD_SELECTOR);
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    stopPick();
    chrome.runtime.sendMessage({ type: 'picked', descriptor: describe(el) });
  }

  function startPick() {
    picking = true;
    document.addEventListener('click', onPick, true);
    document.documentElement.style.cursor = 'crosshair';
  }

  function stopPick() {
    picking = false;
    document.removeEventListener('click', onPick, true);
    document.documentElement.style.cursor = '';
  }

  // Llamado desde el panel con chrome.scripting.executeScript (mismo mundo aislado).
  window.__pra = {
    handle(msg) {
      if (msg.type === 'startPick') { startPick(); return { ok: true }; }
      if (msg.type === 'stopPick') { stopPick(); return { ok: true }; }
      if (msg.type === 'fill') {
        const el = locate(msg.descriptor);
        if (!el) return { ok: false };
        setValue(el, msg.text, msg.append);
        return { ok: true };
      }
      return { ok: false };
    }
  };
})();
