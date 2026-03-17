/* Neverpedia – единый скрипт для index.html, create.html, article.html  */

/* ========= Утилиты ========= */
const $ = (s) => document.querySelector(s);
const $all = (s) => document.querySelectorAll(s);
const esc = (s) =>
  (s || "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const qs = (key) => new URL(location.href).searchParams.get(key);

/* ========= Хранилище ========= */
const LS_KEY = "np_articles";

function getArticles() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
}
function saveArticles(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
function upsertArticle(a) {
  const list = getArticles();
  const key = (a.title || "").trim().toLowerCase();
  const i = list.findIndex(x => (x.title || "").trim().toLowerCase() === key);
  if (i >= 0) list[i] = a; else list.unshift(a);
  saveArticles(list);
}
function findByTitle(title) {
  const t = (title || "").trim().toLowerCase();
  return getArticles().find(a => (a.title || "").trim().toLowerCase() === t);
}

/* ========= Авто-рост textarea ========= */
function enableAutosize() {
  $all("textarea.autosize").forEach(t => {
    const grow = () => { t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; };
    grow();
    t.addEventListener("input", grow);
  });
}

/* ========= Превращаем [[Слово]] и ссылки в кликабельные ========= */
function linkify(text) {
  if (!text) return "";
  let html = esc(text);
  // [[Название статьи]] -> ссылка на статью
  html = html.replace(/\[\[([^\]]+)\]\]/g, (_, name) => {
    name = (name || "").trim();
    const href = "article.html?title=" + encodeURIComponent(name);
    return `<a href="${href}">${esc(name)}</a>`;
  });
  // обычные http/https
  html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  // переносы строк
  html = html.replace(/\n/g, "<br>");
  return html;
}

/* ========= Поиск (шапка) ========= */
function bindSearch() {
  const form = $("#searchForm") || $(".search");         // подхватываем твою форму
  const input = $("#searchInput") || (form && form.querySelector("input[type='search']"));
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = (input.value || "").trim();
    if (!q) { input.focus(); return; }
    const a = findByTitle(q);
    if (a) location.href = "article.html?title=" + encodeURIComponent(a.title);
    else   alert("Не найдено: " + q);
  });
}

/* ========= Главная: «Недавние статьи» ========= */
function fillRecent() {
  const ul = $("#recentList") || document.querySelector(".list"); // если забудешь id — возьму первый .list
  if (!ul) return;
  const list = getArticles();
  if (!list.length) {
    ul.innerHTML = `<li>Пока нет статей. <a href="create.html">Создайте первую!</a></li>`;
    return;
  }
  ul.innerHTML = list.slice(0, 20).map(a => {
    const href = "article.html?title=" + encodeURIComponent(a.title);
    return `<li><a href="${href}">${esc(a.title)}</a>${a.summary ? ": " + esc(a.summary) : ""}</li>`;
  }).join("");
}

/* ========= Страница создания: create.html ========= */
function bindCreatePage() {
  const form = $("#articleForm");
  const title = $("#title");
  const sum   = $("#summary");
  const body  = $("#content");
  const photo = $("#photo");
  const prevBtn = $("#btnPreview") || $("#previewBtn");
  const preview = $("#preview") || $("#previewBox");

  if (!form || !title) return; // не эта страница

  enableAutosize();

  // превью (по кнопке, если есть)
  function doPreview(imgDataURL) {
    if (!preview) return;
    const t = (title.value || "").trim() || "Без названия";
    const s = (sum.value || "").trim();
    const c = (body.value || "").trim();
    preview.innerHTML =
      `<div class="box">
         ${imgDataURL ? `<p><img src="${imgDataURL}" alt=""></p>` : ""}
         <h1 class="title" style="margin-top:0">${esc(t)}</h1>
         ${s ? `<p class="lead"><em>${esc(s)}</em></p>` : ""}
         <div>${linkify(c)}</div>
       </div>`;
  }
  prevBtn && prevBtn.addEventListener("click", () => doPreview(photo && photo.dataset._dataURL));

  // читаем файл изображения в DataURL (если выбрали)
  if (photo) {
    photo.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) { photo.dataset._dataURL = ""; return; }
      const r = new FileReader();
      r.onload = () => { photo.dataset._dataURL = r.result; };
      r.readAsDataURL(f);
    });
  }

  // сохранение (перехватываем submit формы — не нужны никакие id у кнопок)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const t = (title.value || "").trim();
    if (!t) { alert("Введи заголовок"); title.focus(); return; }

    const a = {
      title: t,
      image: photo ? (photo.dataset._dataURL || "").trim() : "",
      summary: (sum.value || "").trim(),
      content: (body.value || "").trim(),
      updatedAt: Date.now()
    };
    upsertArticle(a);
    location.href = "article.html?title=" + encodeURIComponent(t);
  });
}

/* ========= Страница статьи: article.html ========= */
function renderArticle() {
  const box = $("#articleBox");
  if (!box) return; // не эта страница

  const t = qs("title") || "";
  const a = findByTitle(t);
  if (!a) {
    box.innerHTML = `
      <h1 class="title">Статья не найдена</h1>
      <p>Запрошенная статья «${esc(t)}» отсутствует.</p>
      <p><a href="create.html">Создать такую статью</a> или <a href="index.html">вернуться на главную</a>.</p>
    `;
    document.title = "Нет статьи — Neverpedia";
    return;
  }

  document.title = `${a.title} — Neverpedia`;
  box.innerHTML = `
    <div class="top">
      <h1 class="title">${esc(a.title)}</h1>
      <form class="search" id="searchForm">
        <input id="searchInput" type="search" placeholder="Искать в Neverpedia…">
        <button type="submit">Найти</button>
      </form>
    </div>
    ${a.image ? `<p><img src="${esc(a.image)}" alt=""></p>` : ""}
    ${a.summary ? `<p class="lead"><em>${esc(a.summary)}</em></p>` : ""}
    <div>${linkify(a.content)}</div>
  `;
  bindSearch();
}

document.addEventListener("DOMContentLoaded", () => {
  bindSearch();
  fillRecent();
  bindCreatePage();
  renderArticle();
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('articleForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const summary = document.getElementById('summary').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !content) {
      alert('Заполните название и содержимое.');
      return;
    }

    const articles = JSON.parse(localStorage.getItem('neverpedia_articles') || '[]');

    // делаем уникальный id
    const id = title.toLowerCase().replace(/\s+/g, '-').slice(0,120);

    // сохраняем новую
    articles.push({id, title, summary, content, created: Date.now()});
    localStorage.setItem('neverpedia_articles', JSON.stringify(articles));

    // переходим на страницу статьи
    window.location.href = `article.html?id=${encodeURIComponent(id)}`;
  });
});
