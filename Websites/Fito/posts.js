// База для генерации случайных имён пользователей
const firstNames = [
  "Антон", "Алексей", "Дмитрий", "Иван", "Сергей", "Елена", "Наталья", "Ольга", "Мария",
  "Тарон", "Мирим", "Белкор", "Аколон", "Карас", "Линохэ", "Форен", "Лая", "Аланте",
  "Кенти", "Такаши", "Хироши", "Юки", "Сакура", "Хи-Джойи", "Мин-Су", "Чжэн", "Ли-Хуа", "Зинто", "Сент", "Вей"
];

const lastNames = [
  "Мелков", "Волков", "Серов", "Павлов", "Кузнецов", "Николаева", "Попова", "Смирнова",
  "Ширинок", "Апирор", "Таримсон", "Оаер", "Саь", "Маролгина", "Мадалкин",
  "Сато", "Танака", "Ватанад", "Сузуки", "Ким", "Парк"
];

function getRandomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function getRandomTime() {
  const timeTemplates = [
    "только что",
    Math.floor(Math.random() * 59 + 1) + " мин. назад",
    Math.floor(Math.random() * 23 + 1) + " ч. назад",
    "сегодня в 08:" + (Math.floor(Math.random() * 59) + 10),
    "сегодня в 12:" + (Math.floor(Math.random() * 59) + 10),
    "вчера в " + (Math.floor(Math.random() * 14 + 10)) + ":" + (Math.floor(Math.random() * 59) + 10)
  ];
  return timeTemplates[Math.floor(Math.random() * timeTemplates.length)];
}

// БАЗА ДАННЫХ ПОСТОВ (50 с фото, 15 текст)
const fitoFeed = [
  // ПОВСЕДНЕВНЫЕ (Фотки берешь из интернета -> папка Everyday)
  { id: 1, text: "Всё утро не могу завестись. Аккумулятор, что ли, сел… Кто сталкивался?", imageCategory: "images/posts/Everyday/battery", imageFormat: ".jpg", imageVariants: 2 },
  { id: 2, text: "Соседский кот опять спит на моём капоте. Царапин вроде нет, но наглость поражает 😼", imageCategory: "images/posts/Everyday/cat_car", imageFormat: ".jpg", imageVariants: 2 },
  { id: 3, text: "Мост Советова стоит. Двадцать минут — ноль движения. Городские власти, ау!", imageCategory: "images/posts/Everyday/traffic", imageFormat: ".jpg", imageVariants: 2 },
  { id: 4, text: "Ребята, посоветуйте недорогой шиномонтаж в районе Автово. А то в прошлый раз колёса перепутали.", imageCategory: "images/posts/Everyday/tires", imageFormat: ".jpg", imageVariants: 2 },
  { id: 6, text: "В парке на Торомской фестиваль еды. Очереди дикие, но шашлык того стоит.", imageCategory: "images/posts/Everyday/shashlik", imageFormat: ".jpg", imageVariants: 2 },
  { id: 8, text: "Дети принесли из школы вирус. Теперь вся семья чихает. А у кого так же?", imageVariants: 0 },
  { id: 9, text: "Вчера вечером над городом что-то громко пролетело. Окна дребезжали. Военные учения, что ли?", imageCategory: "images/posts/Everyday/sky", imageFormat: ".jpg", imageVariants: 2 },
  { id: 10, text: "Сосед сверху опять сверлит в 10 вечера. У нас закон о тишине вообще работает?", imageVariants: 0 },
  { id: 12, text: "Заказал доставку, курьер приехал на новом микроавтобусе. Говорит, расход всего 8 литров. Завидую.", imageCategory: "images/posts/Everyday/delivery_van", imageFormat: ".jpg", imageVariants: 2 },
  { id: 13, text: "Кто знает, где в Коре можно купить нормальную незамерзайку? А то в прошлый раз воняла как спирт.", imageCategory: "images/posts/Everyday/fluid", imageFormat: ".jpg", imageVariants: 2 },
  { id: 15, text: "В метро на «Людминской» эскалатор сломался. Полчаса стояли в пробке из людей. Когда починят?", imageCategory: "images/posts/Everyday/escalator", imageFormat: ".jpg", imageVariants: 2 },
  { id: 17, text: "Летал из Коры в Пхеньян. Самолёт старый, но летит нормально. А вот еду ужали — одни сухарики.", imageCategory: "images/posts/Everyday/airplane_food", imageFormat: ".jpg", imageVariants: 2 },
  { id: 18, text: "Где сейчас можно поменять масло и фильтры без записи? Желательно недалеко от дома.", imageVariants: 0 },
  { id: 21, text: "В школе у сына проект про историю Кивиша. Посоветуйте ссылки, кроме Neverpedia.", imageVariants: 0 },
  { id: 22, text: "Сегодня всю ночь из-под колёс песок летел — дороги обрабатывают. Кто уже успел помыть машину — тот лох? 😂", imageCategory: "images/posts/Everyday/dirty_car", imageFormat: ".jpg", imageVariants: 2 },
  { id: 23, text: "Кто пользуется каршерингом E-UP? Как с наличием машин вечером в спальниках?", imageVariants: 0 },
  { id: 25, text: "Надоело, что в ленте Fito одни новости. Верните старую хронологию! А у вас тоже так?", imageVariants: 0 },
  { id: 26, text: "С утра ливень, а я без зонта. Промок до нитки. Хорошо, что на работе сушилка есть.", imageCategory: "images/posts/Everyday/rain", imageFormat: ".jpg", imageVariants: 2 },
  { id: 27, text: "Купил в магазине колбасу, а она зелёная внутри. Это норма? Куда жаловаться?", imageCategory: "images/posts/Everyday/sausage", imageFormat: ".jpg", imageVariants: 2 },
  { id: 28, text: "Кто ходит в зал на Автово? Как тренеры? Думаю записаться.", imageCategory: "images/posts/Everyday/gym", imageFormat: ".jpg", imageVariants: 2 },
  { id: 29, text: "Вчера на парковке у ТЦ кто-то притер мою дверь. Уехал, даже записки не оставил. Сволочи.", imageCategory: "images/posts/Everyday/scratch", imageFormat: ".jpg", imageVariants: 2 },
  { id: 30, text: "Сидим дома с дочкой, лепим из пластилина. Она сделала космонавта. Говорит, будет работать в KSFOSE. Милота 🚀", imageCategory: "images/posts/Everyday/plasticine", imageFormat: ".jpg", imageVariants: 2 },
  { id: 31, text: "Посоветуйте годное аниме на вечер. Не длинное, серий 12-16. Недавно пересмотрел «Ковбой Бибоп» — зашло.", imageVariants: 0 },
  { id: 40, text: "Вышел новый сезон «Атаки титанов». Кто смотрел? Без спойлеров, нормально? А то первый сезон был огонь.", imageCategory: "images/posts/Everyday/aot", imageFormat: ".jpg", imageVariants: 2 },
  { id: 46, text: "Застрял в лифте на 15 минут. Хорошо, что телефон был в руках. А вы боитесь лифтов?", imageCategory: "images/posts/Everyday/elevator", imageFormat: ".jpg", imageVariants: 2 },
  { id: 47, text: "Начал смотреть «Ванпанчмена» — почему так мало серий? 😭 Что ещё посмешное посоветуете?", imageVariants: 0 },
  { id: 49, text: "Соседка на первом этаже опять кормит бездомных кошек. Их уже штук десять собралось. Двор как проходной двор 🐈", imageCategory: "images/posts/Everyday/cats_yard", imageFormat: ".jpg", imageVariants: 2 },
  { id: 51, text: "У кого был опыт покупки авто на «Авто-Находках»? Не кидают там? Хочу взять подержанный Tarifa, но боюсь.", imageVariants: 0 },
  { id: 52, text: "Пересматривал «Евангелион». Второй раз понял ещё меньше, чем в первый. Но атмосфера — вау.", imageCategory: "images/posts/Everyday/evangelion", imageFormat: ".jpg", imageVariants: 2 },
  { id: 53, text: "Помните теракт в метро Коры в 2004 году? На станции «Людминская». Мой отец тогда ехал в том поезде, чудом выжил. Страшно вспоминать.", imageVariants: 2 },
  { id: 55, text: "Сегодня на обед готовил пельмени. Замороженные, но вкусные. У кого есть рецепт домашних?", imageCategory: "images/posts/Everyday/pelmeni", imageFormat: ".jpg", imageVariants: 2 },
  { id: 57, text: "Кто знает, как оформить визу в Африканский Кивиш? Говорят, самый простой режим, но хочу точную инструкцию.", imageVariants: 0 },
  { id: 59, text: "Вчера всю ночь снилась Корея 90-х. Ещё с теми старыми автобусами и газетными ларьками. Ностальгия…", imageCategory: "images/posts/Everyday/retro_korea", imageFormat: ".jpg", imageVariants: 2 },
  { id: 60, text: "Кто смотрел «Клинок, рассекающий демонов»? Стоит начинать? Говорят, затягивает.", imageVariants: 0 },
  { id: 63, text: "У нас в районе отключили горячую воду на две недели. Как вы спасаетесь? Я грею чайник и тазик.", imageCategory: "images/posts/Everyday/kettle", imageFormat: ".jpg", imageVariants: 2 },

  // ЛОРНЫЕ ПОСТЫ 
  { id: 5, text: "Забрал сегодня свой E-Up из сервиса. Наконец-то перестал пищать на каждой кочке. Счастью нет предела 😁", imageCategory: "images/posts/Cars/eup", imageFormat: ".jpg", imageVariants: 2 },
  { id: 7, text: "Купил б/у Tarifa Minity. Салон грязный, но мотор работает как часы. Дёшево и сердито.", imageCategory: "images/posts/Cars/minity", imageFormat: ".jpg", imageVariants: 2 },
  { id: 11, text: "Проезжал мимо мемориала на 1670 км. Всегда кладу цветы. Надо бы не забыть 25 мая.", imageCategory: "images/posts/Lore/memorial", imageFormat: ".jpg", imageVariants: 2 },
  { id: 14, text: "Вытащил из гаража старый F-KAP Tref. После зимы заводится с пол-оборота. Машина — огонь.", imageCategory: "images/posts/Cars/tref", imageFormat: ".jpg", imageVariants: 2 },
  { id: 16, text: "Купил в Мири кота. Говорят, из университетского питомника. Весь розовый, но очень ласковый.", imageCategory: "images/posts/Lore/pink_cat", imageFormat: ".jpg", imageVariants: 2 },
  { id: 19, text: "Ездили семьёй в Африканский Кивиш, в Массауа. Море чистое, туристов мало. Виза реально за день делается.", imageCategory: "images/posts/Lore/massawa", imageFormat: ".jpg", imageVariants: 2 },
  { id: 20, text: "Нашёл на чердаке старую газету «Авто-Находки». Там цены на машины — просто сказка. Кто помнит такие?", imageCategory: "images/posts/Lore/newspaper", imageFormat: ".jpg", imageVariants: 2 },
  { id: 24, text: "Продаю старый фургон Tarifa FGR2. На ходу, но кузов требует внимания. Отдам дёшево. Пишите в личку.", imageCategory: "images/posts/Cars/fgr2", imageFormat: ".jpg", imageVariants: 2 },
  { id: 32, text: "Начал проходить старую игру про Кивиш — «Kivish: Technocrat Rising». Графика убогая, но атмосфера времён СКР передана шикарно. Кто играл?", imageCategory: "images/posts/Games/technocrat", imageFormat: ".jpg", imageVariants: 2 },
  { id: 33, text: "Слушайте, а кто помнит тот феномен в Мири в 70-х? Говорят, кошки там разумными стали и даже паспорта получили. Это правда или байки?", imageCategory: "images/posts/Lore/miri_cats", imageFormat: ".jpg", imageVariants: 2 },
  { id: 34, text: "Вспомнил сегодня про аварию в Снаси в 2000 году. Мой дядя тогда работал на АЭС, эвакуировали всех. До сих пор не любит об этом говорить.", imageVariants: 2 },
  { id: 35, text: "Купил на распродаже в Steam сборник старых игр от F-KAP. Там гонки на Tref ещё. Графика — как в 2002, но ностальгия бьёт ключом.", imageCategory: "images/posts/Games/racing", imageFormat: ".jpg", imageVariants: 2 },
  { id: 36, text: "Кто смотрел новое аниме про космос? Там главный герой — пилот AirHokol-66. Говорят, консультировали наши инженеры.", imageCategory: "images/posts/Lore/anime_ship", imageFormat: ".jpg", imageVariants: 2 },
  { id: 37, text: "Читал про Аколона Первого Технократа. Говорят, он в 1923 отказался вступать в СССР и создал свою социалистическую модель. Реально жёсткий дядька был.", imageCategory: "images/posts/Lore/akolon", imageFormat: ".jpg", imageVariants: 2 },
  { id: 38, text: "Нашёл в интернете архив фотографий исчезнувшего рейса GP-096. Такая мистика до сих пор… Кто верит, что самолёт могли угнать?", imageCategory: "images/posts/Lore/gp096", imageFormat: ".jpg", imageVariants: 2 },
  { id: 39, text: "Завис в старой стратегии «Korea: 2011». Там можно кампанию за Кивиш пройти. Ностальгия по временам, когда только ККП присоединили.", imageCategory: "images/posts/Games/korea2011", imageFormat: ".jpg", imageVariants: 2 },
  { id: 41, text: "В Музее технологий в Коре открыли зал, посвящённый первым компьютерам и сети Fito. Там даже эмулятор старого текстового чата можно погонять. Был кто?", imageCategory: "images/posts/Lore/fito_retro", imageFormat: ".jpg", imageVariants: 2 },
  { id: 42, text: "У нас в школе задали доклад про СКР. Я про Караса Шентакоса взял. Реально спорная фигура, но страну укрепил. Как думаете?", imageVariants: 2 },
  { id: 43, text: "Кто знает, где можно скачать старые моды на игру «Kivish Air Simulator»? Хочу полетать на D124 с той самой системой безопасности.", imageCategory: "images/posts/Games/airsim", imageFormat: ".jpg", imageVariants: 2 },
  { id: 44, text: "Вчера целый вечер с другом рубились в файтинг по вселенной Кивиша. Там даже кот из Мири есть, который бьёт лапой! Офигенно.", imageCategory: "images/posts/Games/fighting", imageFormat: ".jpg", imageVariants: 2 },
  { id: 45, text: "Помните тот исчезнувший рейс GP-096? Я до сих пор иногда лазаю по форумам, читаю новые версии. Самолет же не мог просто раствориться.", imageVariants: 2 },
  { id: 48, text: "Кто знает, правда ли, что в 1969 году Кивиш первый высадился на Луну? В школе учили, что это наши. А американцы говорят, что они.", imageCategory: "images/posts/Lore/moon", imageFormat: ".jpg", imageVariants: 2 },
  { id: 50, text: "Прошёл всю игру «Kivish: Legacy of Technocrat» на максимальной сложности. Финальный босс — бешеный робот на заводе F-KAP. Кто проходил?", imageCategory: "images/posts/Games/boss", imageFormat: ".jpg", imageVariants: 2 },
  { id: 54, text: "Кто шарит, где сейчас можно купить старую игровую приставку Dendo? Ностальгия по Mario.", imageCategory: "images/posts/Lore/dendo", imageFormat: ".jpg", imageVariants: 2 },
  { id: 56, text: "Вышел новый трейлер аниме про космические силы Кивиша. Графика — огонь. Жду с нетерпением.", imageCategory: "images/posts/Lore/space_anime", imageFormat: ".jpg", imageVariants: 2 },
  { id: 58, text: "Нашёл в гараже старый значок «СКР». Сосед сказал, что раритет. Сколько может стоить?", imageCategory: "images/posts/Lore/skr_pin", imageFormat: ".jpg", imageVariants: 2 },
  { id: 61, text: "Слышал, что в Мири до сих пор кошкам выдают паспорта. Это правда или прикол? Мой кот хочет гражданство 😸", imageCategory: "images/posts/Lore/cat_passport", imageFormat: ".jpg", imageVariants: 2 },
  { id: 62, text: "Завис на выходных в стратегии «Red Alert». Там есть мод на армию Кивиша. Спецтехника Tarifa просто имба.", imageCategory: "images/posts/Games/redalert", imageFormat: ".jpg", imageVariants: 2 },
  { id: 64, text: "Перечитывал в Neverpedia статью про Аколона. Он реально запретил иероглифы и ввёл кириллицу? Вот это был разворот!", imageVariants: 2 },
  { id: 65, text: "Купил на распродаже коллекционную фигурку пилота AirHokol-66. Очень детализированная. У кого есть такие?", imageCategory: "images/posts/Lore/pilot", imageFormat: ".jpg", imageVariants: 2 },

  // Системное сообщение
  { id: 99, text: "Внимание автовладельцев: в связи с обновлением разметки на магистрали KS-54, скоростной режим на 1600-1680 км временно снижен.", imageVariants: 0, fixedAuthor: "Городской Вестник", fixedAvatar: "https://via.placeholder.com/40/8e44ad/fff?text=ГВ" }
];

function generatePosts() {
  const feedContainer = document.getElementById('fito-feed');
  if (!feedContainer) return;

  const shuffledFeed = [...fitoFeed].sort(() => 0.5 - Math.random());
  let feedHTML = '';

  shuffledFeed.forEach((post, index) => {
    const randomTimestamp = getRandomTime();
    const authorName = post.fixedAuthor ? post.fixedAuthor : getRandomName();
    const authorAvatar = post.fixedAvatar ? post.fixedAvatar : `https://i.pravatar.cc/100?u=${post.id}_${index}`;

    let html = `
      <div class="post-card">
        <div class="post-header">
          <img src="${authorAvatar}" class="post-header-avatar">
          <div class="post-author-info">
            <div class="post-author">${authorName}</div>
            <div class="post-time">${randomTimestamp}</div>
          </div>
        </div>
        <div class="post-text">${post.text}</div>
    `;

    // ИСПРАВЛЕННЫЙ БЛОК: Загружаем картинку, если ошибка - просто прячем
    if (post.imageVariants > 0) {
      let randomPhotoId = Math.floor(Math.random() * post.imageVariants) + 1;
      let finalImageUrl = `${post.imageCategory}_${randomPhotoId}${post.imageFormat}`;
      html += `<img src="${finalImageUrl}" class="post-image" onerror="this.style.display='none'">`;
    }

    html += `</div>`;
    feedHTML += html;
  });

  feedHTML += `
    <div style="text-align: center; padding: 30px 20px; color: var(--text-secondary);">
      <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: #27ae60; margin-bottom: 12px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
      <h3 style="color: var(--text-primary); font-size: 16px; margin-bottom: 8px;">Вы всё прочитали</h3>
      <p style="font-size: 14px; line-height: 1.5;">Новых постов пока нет. <br>Fito напоминает: сделайте перерыв, выйдите на улицу, погуляйте.</p>
    </div>
  `;

  feedContainer.innerHTML = feedHTML;
}

window.addEventListener('DOMContentLoaded', generatePosts);