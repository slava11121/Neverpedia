// ===== БАЗА =====
const LS_KEY = 'neverpedia_articles';

function loadAll() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}
function saveAll(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
function slugify(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120) || 'untitled';
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]
  ));
}

// ===== ГЛАВНАЯ =====
function renderIndex() {
  const ul = document.getElementById('recentList');
  if (!ul) return;
  const items = [...loadAll()].sort((a,b) => b.created - a.created);
  if (!items.length) {
    ul.innerHTML = `<li>Пока нет статей. <a href="create.html">Создайте первую!</a></li>`;
    return;
  }
  ul.innerHTML = items.slice(0, 20).map(a =>
    `<li><a href="article.html?slug=${encodeURIComponent(a.slug)}">${esc(a.title)}</a></li>`
  ).join('');
}

// ===== СОЗДАНИЕ =====
function autoGrowSetup() {
  document.querySelectorAll('textarea.autosize').forEach(t => {
    const grow = () => { t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; };
    grow();
    t.addEventListener('input', grow);
  });
}

function handleCreatePage() {
  const form = document.getElementById('createForm');
  if (!form) return;

  autoGrowSetup();

  const fTitle   = document.getElementById('fTitle');
  const fSummary = document.getElementById('fSummary');
  const fContent = document.getElementById('fContent');
  const fImage   = document.getElementById('fImage');
  const preview  = document.getElementById('preview');

  document.getElementById('previewBtn').addEventListener('click', async () => {
    const imgData = await readImageAsDataURL(fImage.files?.[0]);
    preview.innerHTML =
      `<h2>${esc(fTitle.value || 'Без названия')}</h2>` +
      (imgData ? `<div class="infobox"><div class="h">${esc(fTitle.value || '')}</div><div class="cell"><img src="${imgData}" alt=""></div></div>` : '') +
      (fSummary.value ? `<p><em>${esc(fSummary.value)}</em></p>` : '') +
      `<div>${esc(fContent.value).replace(/\n/g,'<br>')}</div>`;
  });

  document.getElementById('saveBtn').addEventListener('click', async () => {
    if (!fTitle.value.trim() || !fContent.value.trim()) {
      alert('Нужны заголовок и содержимое.');
      return;
    }
    const imgData = await readImageAsDataURL(fImage.files?.[0]);
    const list = loadAll();
    const baseSlug = slugify(fTitle.value);
    let slug = baseSlug;
    let k = 2;
    while (list.some(a => a.slug === slug)) slug = `${baseSlug}-${k++}`;

    list.push({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      slug,
      title: fTitle.value.trim(),
      summary: fSummary.value.trim(),
      content: fContent.value,
      image: imgData || '',
      created: Date.now()
    });
    saveAll(list);
    window.location.href = `article.html?slug=${encodeURIComponent(slug)}`;
  });
}

function readImageAsDataURL(file) {
  return new Promise(resolve => {
    if (!file) return resolve('');
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result || ''));
    fr.onerror = () => resolve('');
    fr.readAsDataURL(file);
  });
}

// ===== СТАТЬЯ =====
function getParam(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name) || '';
}
function renderArticle() {
  const box = document.getElementById('articleBox');
  if (!box) return;

  const slug = getParam('slug');
  const a = loadAll().find(x => x.slug === slug);
  if (!a) {
    box.innerHTML = `<p>Статья не найдена. <a href="index.html">На главную</a></p>`;
    return;
  }

  box.innerHTML =
    `<h1 class="title">${esc(a.title)}</h1>` +
    (a.image
      ? `<div class="infobox">
           <div class="h">${esc(a.title)}</div>
           <div class="cell"><img src="${a.image}" alt=""></div>
         </div>`
      : ''
    ) +
    (a.summary ? `<p class="lead"><em>${esc(a.summary)}</em></p>` : '') +
    `<div>${esc(a.content).replace(/\n/g,'<br>')}</div>`;
}

// ===== ПОИСК =====
function handleSearch() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  if (!form || !input) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    const list = loadAll();
    const hit = list.find(a => a.title.toLowerCase().includes(q) || a.slug.includes(slugify(q)));
    if (hit) {
      window.location.href = `article.html?slug=${encodeURIComponent(hit.slug)}`;
    } else {
      alert('Ничего не найдено.');
    }
  });
}

// ===== СТАРТ =====
document.addEventListener('DOMContentLoaded', () => {
  renderIndex();
  handleSearch();
  handleCreatePage();
  renderArticle();
});
