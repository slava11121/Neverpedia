function getParam(name) {
  const url = new URL(location.href);
  return url.searchParams.get(name);
}
function esc(s = '') {
  return s.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function nl2br(s = '') { return esc(s).replace(/\n/g, '<br>'); }

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  const list = NP.npLoad();
  const art = NP.findByIdOrSlug(id, list);
  const box = document.getElementById('articleBox');

  if (!art) {
    box.innerHTML = `<h1 class="title" style="margin-top:0">404 — article not found</h1>
                     <p><a href="index.html">Back to main page</a></p>`;
    return;
  }

  // Infobox from fields
  const ib = art.infobox || {};
  const infoboxHTML = (!ib && !art.photo) ? '' : `
    <aside class="infobox">
      ${ib.title ? `<div class="h">${esc(ib.title)}</div>` : ''}
      ${art.photo ? `<div class="cell"><img src="${art.photo}" alt=""></div>` : ''}
      ${ib.type ? `<div class="cell"><b>Type</b><br>${esc(ib.type)}</div>` : ''}
      ${ib.ind  ? `<div class="cell"><b>Industry</b><br>${esc(ib.ind)}</div>` : ''}
      ${ib.loc  ? `<div class="cell"><b>Location</b><br>${esc(ib.loc)}</div>` : ''}
      ${ib.ppl  ? `<div class="cell"><b>Key people</b><br>${esc(ib.ppl)}</div>` : ''}
      ${ib.site ? `<div class="cell"><b>Website</b><br><a href="${esc(ib.site)}">${esc(ib.site)}</a></div>` : ''}
    </aside>`;

  box.innerHTML = `
    ${infoboxHTML}
    <h1 class="title" style="margin-top:0">${esc(art.title || 'Untitled')}</h1>
    ${art.summary ? `<p class="lead">${esc(art.summary)}</p>` : ''}
    <div>${nl2br(art.content || '')}</div>
  `;
});