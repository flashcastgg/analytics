// ─── APP.JS ──────────────────────────────────────────────────

// ── Nav ──────────────────────────────────────────────────────
function showPage(id, btnEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab, .mobile-nav-item').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (btnEl) {
    btnEl.classList.add('active');
    const mirrorId = btnEl.id ? btnEl.id.replace('tab-','mob-') : null;
    if (mirrorId) document.getElementById(mirrorId)?.classList.add('active');
  }
  closeMobileMenu();
  // Always scroll to top when switching pages
  window.scrollTo({ top: 0, behavior: 'instant' });
  // Show/hide secondary subnav
  const subnav = document.getElementById('subnav');
  const mainEl = document.querySelector('.main');
  if (id === 'tasks') {
    subnav?.classList.add('visible');
    mainEl?.classList.add('has-subnav');
    renderAll('');
    buildSubnav('');
  } else {
    subnav?.classList.remove('visible');
    mainEl?.classList.remove('has-subnav');
  }
  if (id === 'contracts') initContracts();
}

function showHero() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab, .mobile-nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('page-hero').classList.add('active');
  document.getElementById('subnav')?.classList.remove('visible');
  document.querySelector('.main')?.classList.remove('has-subnav');
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeMobileMenu();
}

function toggleMobileMenu() {
  document.getElementById('mobileDrawer').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileDrawer')?.classList.remove('open');
}

// ── Search ────────────────────────────────────────────────────
function filterTasks(val) {
  renderAll(val);
  buildSubnav(val);
}

// ── Secondary subnav (top bar) ───────────────────────────────
function buildSubnav(filter) {
  const sn = document.getElementById('subnav');
  if (!sn) return;
  const f = (filter || '').toLowerCase().trim();
  let html = '';
  for (const g of window.IMPL_GROUPS) {
    const visible = !f || g.title.toLowerCase().includes(f) ||
      g.implementations.some(i => i.steps.some(s =>
        s.name.toLowerCase().includes(f) || s.desc.toLowerCase().includes(f)
      ));
    if (visible) {
      html += `<button class="subnav-item" id="sni-${g.id}" onclick="scrollToGroup('${g.id}')">${g.navLabel}</button>`;
    }
  }
  sn.innerHTML = html;
}

// Keep old name as alias for filterTasks
function buildSidenav(filter) { buildSubnav(filter); }

function scrollToGroup(id) {
  const el = document.getElementById('ig-' + id);
  if (!el) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  const subH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--subnav-h')) || 48;
  const offset = navH + subH + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  document.querySelectorAll('.subnav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('sni-' + id)?.classList.add('active');
}

// Highlight subnav on scroll
function updateSubnavOnScroll() {
  if (!document.getElementById('page-tasks')?.classList.contains('active')) return;
  const groups = document.querySelectorAll('.impl-group');
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  const subH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--subnav-h')) || 48;
  const threshold = navH + subH + 32;
  let current = '';
  groups.forEach(g => {
    const rect = g.getBoundingClientRect();
    if (rect.top <= threshold) current = g.id.replace('ig-', '');
  });
  document.querySelectorAll('.subnav-item').forEach(b => {
    const id = b.id?.replace('sni-', '');
    b.classList.toggle('active', !!id && id === current);
  });
}
window.addEventListener('scroll', updateSubnavOnScroll, { passive: true });

// ── Back to top ───────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Render tasks ──────────────────────────────────────────────
function renderAll(filter) {
  const container = document.getElementById('taskContent');
  if (!container) return;
  const f = (filter || '').toLowerCase().trim();
  let html = '';

  for (const group of window.IMPL_GROUPS) {
    const titleMatch = !f || group.title.toLowerCase().includes(f);
    const anyImpl = group.implementations.some(i =>
      i.steps.some(s => s.name.toLowerCase().includes(f) || s.desc.toLowerCase().includes(f))
    );
    if (f && !titleMatch && !anyImpl) continue;

    const tabsHtml = group.implementations.map((impl, i) => `
      <button class="impl-tab-btn ${i===0?'active':''}"
        onclick="switchTab('${group.id}','${impl.tms}',this)">
        <span class="impl-tab-dot ${impl.dot}"></span>
        ${impl.label}
      </button>`).join('');

    const panelsHtml = group.implementations.map((impl, i) => `
      <div class="impl-tab-panel ${i===0?'active':''}" id="panel-${group.id}-${impl.tms}">
        ${renderPanel(group.id, impl, f)}
      </div>`).join('');

    html += `
    <div class="impl-group" id="ig-${group.id}">
      <div class="impl-group-hdr">
        <span class="badge ${group.badge}">${group.badgeLabel}</span>
        <span class="impl-group-title">${group.title}</span>
      </div>
      <div class="impl-tabs-nav" id="tabs-${group.id}">${tabsHtml}</div>
      ${panelsHtml}
    </div>`;
  }

  container.innerHTML = html || '<div class="no-results">No matching tasks found.</div>';
}

function switchTab(groupId, tms, btn) {
  document.querySelectorAll(`#tabs-${groupId} .impl-tab-btn`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const group = document.getElementById('ig-' + groupId);
  group.querySelectorAll('.impl-tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${groupId}-${tms}`)?.classList.add('active');
}

function renderPanel(groupId, impl, filter) {
  const f = filter ? filter.toLowerCase() : '';
  const steps = f
    ? impl.steps.filter(s => s.name.toLowerCase().includes(f) || s.desc.toLowerCase().includes(f))
    : impl.steps;

  // Compute totals
  const totals = {usd:[0,0], php:[0,0], aud:[0,0], hkd:[0,0], cad:[0,0]};
  steps.forEach(s => {
    const c = s.cost;
    const parse = str => str.replace(/[^0-9–\-]/g,'').split(/[–-]/).map(Number);
    ['usd','php','aud','hkd','cad'].forEach(k => {
      const [lo,hi] = parse(c[k]);
      totals[k][0] += lo||0; totals[k][1] += hi||0;
    });
  });
  const fmtTotal = (k) => {
    const [lo,hi] = totals[k];
    const symbols = {usd:'$',php:'₱',aud:'A$',hkd:'HK$',cad:'CA$'};
    const s = symbols[k];
    return `${s}${lo.toLocaleString()}–${hi.toLocaleString()}`;
  };

  const rows = steps.map(s => {
    const c = s.cost;
    return `<tr>
      <td>${s.n}</td>
      <td><strong>${s.name}</strong></td>
      <td>${s.desc}</td>
      <td><span class="chip chip-time">${s.time}</span></td>
      <td>
        <div class="cost-stack">
          <span class="chip chip-usd">${c.usd}</span>
          <span class="chip chip-php">${c.php}</span>
          <span class="chip chip-aud">${c.aud}</span>
          <span class="chip chip-hkd">${c.hkd}</span>
          <span class="chip chip-cad">${c.cad}</span>
        </div>
      </td>
    </tr>`;
  }).join('');

  // Total fee header chips
  const totalChips = `
    <span class="meta-chip" style="border-color:rgba(26,107,60,.25);background:#f0faf4">
      Total: 
      <strong style="color:var(--green)">${fmtTotal('usd')}</strong>
      <span style="color:var(--text-3);font-weight:400;margin:0 2px">·</span>
      <strong style="color:#7c3300">${fmtTotal('php')}</strong>
      <span style="color:var(--text-3);font-weight:400;margin:0 2px">·</span>
      <strong style="color:#003d80">${fmtTotal('aud')}</strong>
      <span style="color:var(--text-3);font-weight:400;margin:0 2px">·</span>
      <strong style="color:#3b0d6b">${fmtTotal('hkd')}</strong>
      <span style="color:var(--text-3);font-weight:400;margin:0 2px">·</span>
      <strong style="color:#7c4700">${fmtTotal('cad')}</strong>
    </span>`;

  return `
  <div class="task-card">
    <div class="task-card-hdr">
      <div class="task-meta">
        <span class="meta-chip">Time: <strong>${impl.totalTime}</strong></span>
        <span class="meta-chip">Fee: <strong>${impl.totalCost}</strong></span>
        ${totalChips}
      </div>
      <div class="task-actions">
        <button class="btn-sm green" onclick="exportXLSX('${groupId}','${impl.tms}')">⬇ Excel</button>
        <button class="btn-sm blue" onclick="exportPDF('${groupId}','${impl.tms}')">⬇ PDF</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table class="steps-tbl">
        <thead><tr>
          <th>#</th>
          <th>Step</th>
          <th>Description</th>
          <th>Time</th>
          <th>Cost per step</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// ── Export Excel (CSV) ────────────────────────────────────────
function exportXLSX(groupId, tms) {
  const group = window.IMPL_GROUPS.find(g => g.id === groupId);
  const impl = group?.implementations.find(i => i.tms === tms);
  if (!impl) return;

  const q = s => `"${(s||'').replace(/"/g,'""')}"`;
  const title = `${group.title} — ${impl.label}`;
  const meta = [
    `"Service",${q(title)}`,
    `"Total Time",${q(impl.totalTime)}`,
    `"Fee",${q(impl.totalCost)}`,
    '',
  ];
  const headers = ['#','Step','Description','Time','USD','PHP','AUD','HKD','CAD'];
  const rows = impl.steps.map(s => [
    s.n, q(s.name), q(s.desc), q(s.time),
    q(s.cost.usd), q(s.cost.php), q(s.cost.aud), q(s.cost.hkd), q(s.cost.cad)
  ].join(','));

  dlCSV([...meta, headers.join(','), ...rows].join('\n'), `${groupId}_${tms}.csv`);
}

function dlCSV(csv, filename) {
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded — open with Excel or Google Sheets!');
}

// ── Export PDF ────────────────────────────────────────────────
function exportPDF(groupId, tms) {
  const group = window.IMPL_GROUPS.find(g => g.id === groupId);
  const impl = group?.implementations.find(i => i.tms === tms);
  if (!impl) return;

  const title = `${group.title} — ${impl.label}`;
  const stepRows = impl.steps.map(s => `<tr>
    <td style="width:22px;color:#888;font-size:9pt">${s.n}</td>
    <td style="font-weight:600;width:150px;font-size:9pt">${s.name}</td>
    <td style="font-size:9pt;color:#333">${s.desc}</td>
    <td style="width:70px;font-size:9pt;white-space:nowrap">${s.time}</td>
    <td style="width:160px;font-size:8.5pt">
      <span style="color:#145a32;font-weight:600">${s.cost.usd}</span><br>
      <span style="color:#7c3300">${s.cost.php}</span> ·
      <span style="color:#003d80">${s.cost.aud}</span><br>
      <span style="color:#3b0d6b">${s.cost.hkd}</span> ·
      <span style="color:#7c4700">${s.cost.cad}</span>
    </td>
  </tr>`).join('');

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body{font-family:-apple-system,'Helvetica Neue',sans-serif;font-size:10pt;color:#111;padding:32px 40px}
    h1{font-size:13pt;font-weight:700;margin-bottom:5px}
    .meta{display:flex;gap:20px;font-size:9pt;color:#555;margin-bottom:16px;padding-bottom:12px;border-bottom:1.5px solid #111}
    table{width:100%;border-collapse:collapse}
    th{text-align:left;padding:7px 9px;background:#f4f4f4;font-size:7.5pt;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:#666;border-bottom:1px solid #ddd}
    td{padding:8px 9px;border-bottom:.5px solid #eee;vertical-align:top;line-height:1.5}
    tr:last-child td{border-bottom:none}
    @media print{body{padding:8px}@page{margin:1.2cm}}
  </style>
  </head><body>
  <h1>${title}</h1>
  <div class="meta">
    <span>Total time: <strong>${impl.totalTime}</strong></span>
    <span>Fee: <strong>${impl.totalCost}</strong></span>
    <span>Steps: <strong>${impl.steps.length}</strong></span>
  </div>
  <table>
    <thead><tr><th>#</th><th>Step</th><th>Description</th><th>Time</th><th>Cost (multi-currency)</th></tr></thead>
    <tbody>${stepRows}</tbody>
  </table>
  <script>setTimeout(()=>window.print(),400);<\/script>
  </body></html>`);
  win.document.close();
}

// ── Contracts ─────────────────────────────────────────────────
function initContracts() {
  const s = document.getElementById('contractSection');
  if (!s || s.dataset.init) return;
  s.dataset.init = '1';

  const opts = (window.CONTRACT_OPTIONS || []).map(o =>
    `<option value="${o.value}">${o.label}</option>`
  ).join('');

  s.innerHTML = `
    <select class="select-styled" id="contractSelect" onchange="loadContract(this.value)">
      ${opts}
    </select>
    <div id="contractFieldsArea"></div>
    <div id="contractEditorArea">
      <div class="placeholder-hint">
        <p style="font-size:2rem;margin-bottom:.5rem">📄</p>
        <p>Select a service above to load its contract template.</p>
        <p style="margin-top:6px;font-size:.8125rem;color:var(--text-3)">
          Edit the contract freely in the text box, then export to PDF.
        </p>
      </div>
    </div>`;
}

function loadContract(val) {
  const fa = document.getElementById('contractFieldsArea');
  const ea = document.getElementById('contractEditorArea');
  if (!fa || !ea) return;

  if (!val) {
    fa.innerHTML = '';
    ea.innerHTML = `<div class="placeholder-hint"><p style="font-size:2rem;margin-bottom:.5rem">📄</p><p>Select a service above.</p></div>`;
    return;
  }

  const contract = window.CONTRACTS?.[val];
  if (!contract) {
    ea.innerHTML = `<div class="placeholder-hint"><p>Contract not found for key: ${val}</p></div>`;
    return;
  }

  const fields = [
    ['providerName','Your Full Name'],['providerBiz','Your Business Name'],
    ['providerEmail','Your Email'],['providerAddress','Your Address'],
    ['clientName','Client Company Name'],['clientContact','Client Contact Name'],
    ['clientEmail','Client Email'],['clientAddress','Client Address'],
    ['hourlyRate','Your Hourly Rate (USD, e.g. 55)'],
  ];

  fa.innerHTML = `
    <div style="padding:12px 14px;background:#f0faf4;border:1px solid rgba(26,107,60,0.2);border-radius:var(--r-sm);margin-bottom:12px">
      <p class="sect-label" style="margin-bottom:10px">Fill in your details (optional)</p>
      <div class="contract-fields">
        ${fields.map(([id,lbl]) => `
          <div class="cf-group">
            <label for="cf_${id}">${lbl}</label>
            <input type="text" id="cf_${id}" placeholder="${lbl}">
          </div>`).join('')}
      </div>
      <button class="btn-sm blue" style="margin-top:10px" onclick="populateContract('${val}')">Apply to contract ↓</button>
    </div>`;

  ea.innerHTML = `
    <div class="contract-toolbar">
      <span class="lbl">Contract editor — edit directly before exporting</span>
      <button class="btn-sm" onclick="selAll()">Select all</button>
      <button class="btn-sm" onclick="copyContract()">Copy text</button>
      <button class="btn-sm blue" onclick="exportContractPDF('${val}')">⬇ Export PDF</button>
    </div>
    <textarea id="contractEditor" spellcheck="false">${contract.generate({})}</textarea>`;
}

function populateContract(val) {
  const contract = window.CONTRACTS?.[val];
  if (!contract) return;
  const ids = ['providerName','providerBiz','providerEmail','providerAddress','clientName','clientContact','clientEmail','clientAddress','hourlyRate'];
  const fields = {};
  ids.forEach(id => { fields[id] = document.getElementById('cf_'+id)?.value || ''; });
  const el = document.getElementById('contractEditor');
  if (el) el.value = contract.generate(fields);
}

function selAll() {
  const el = document.getElementById('contractEditor');
  if (el) { el.focus(); el.select(); }
}

function copyContract() {
  const el = document.getElementById('contractEditor');
  if (!el) return;
  navigator.clipboard.writeText(el.value).then(() => showToast('Contract text copied!'));
}

function exportContractPDF(val) {
  const el = document.getElementById('contractEditor');
  if (!el) return;
  const contract = window.CONTRACTS?.[val];
  const title = contract?.title || 'Service Agreement';
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title>
  <style>
    body{font-family:-apple-system,'Helvetica Neue',sans-serif;font-size:11pt;color:#111;padding:44px 56px;max-width:800px;margin:0 auto}
    .hdr{border-bottom:2px solid #111;padding-bottom:14px;margin-bottom:20px}
    .doc-title{font-size:14pt;font-weight:700;line-height:1.3}
    .doc-sub{font-size:9.5pt;color:#555;margin-top:3px}
    pre{white-space:pre-wrap;font-family:-apple-system,'Helvetica Neue',sans-serif;font-size:10.5pt;line-height:1.75}
    @media print{body{padding:16px}@page{margin:1.5cm}}
  </style>
  </head><body>
  <div class="hdr">
    <div class="doc-title">${title}</div>
    <div class="doc-sub">Analytics &amp; MarTech Consulting Services Agreement</div>
  </div>
  <pre>${el.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
  <script>setTimeout(()=>window.print(),400);<\/script>
  </body></html>`);
  win.document.close();
}


// ── Contact Modal ─────────────────────────────────────────────
function openContact() {
  document.getElementById('contactModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeContact() {
  document.getElementById('contactModal').classList.remove('open');
  document.body.style.overflow = '';
}

async function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  const data = new FormData(form);
  try {
    const res = await fetch('https://formspree.io/f/mzzvplly', {
      method:'POST', body: data,
      headers:{ Accept: 'application/json' }
    });
    if (res.ok) {
      form.innerHTML = `<div class="form-success">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="#1a6b3c" stroke-width="2"/>
          <path d="M12 20l6 6 10-12" stroke="#1a6b3c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="font-size:1rem;font-weight:600;margin-bottom:4px">Message sent!</p>
        <p style="font-size:.875rem;color:var(--text-2)">I'll get back to you within 1–2 business days.</p>
      </div>`;
    } else {
      btn.disabled = false;
      btn.textContent = 'Send message';
      showToast('Something went wrong — please try again.');
    }
  } catch {
    btn.disabled = false;
    btn.textContent = 'Send message';
    showToast('Network error — please try again.');
  }
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3000);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('page-hero')?.classList.add('active');

  document.getElementById('tab-tasks')?.addEventListener('click', function() {
    setTimeout(() => {
      if (!document.getElementById('taskContent').innerHTML.trim()) {
        renderAll('');
        buildSubnav('');
      }
    }, 10);
  });
});
