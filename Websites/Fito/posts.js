// База для генерации случайных имён пользователей
const firstNames = [
  "Антон", "Алексеj", "Дмитрiй", "Иван", "Сергеj", "Елена", "Наталия", "Олга", "Мария",
  "Тарон", "Мiрiм", "Белкор", "Аколон", "Карас", "Лiнохэ", "Форен", "Лая", "Аланте",
  "Кентi", "Такашi", "Хiрошi", "Юкi", "Сакура", "Изо", "Эом", "Чойо", "Шот", "Зинто", "Сент", "Вей"
];

const lastNames = [
  "Мелков", "Волков", "Серов", "Павлов", "Зiца", "Хайшi", "Йонго", "Сiт",
  "Шiрiнок", "Апiрор", "Тарiмсон", "Оаер", "Саь", "Маролгiна", "Мадалкiн",
  "Сато", "Танака", "Ватанад", "Сузукi", "Аппр", "Парк"
];

function getRandomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function pad2(num) {
  return String(num).padStart(2, "0");
}

function getRandomTime() {
  const type = Math.floor(Math.random() * 6);

  if (type === 0) return "только что";
  if (type === 1) return `${Math.floor(Math.random() * 58) + 2} мин. назад`;
  if (type === 2) return `${Math.floor(Math.random() * 11) + 1} ч. назад`;

  const hour = type === 3 ? 8 : type === 4 ? 12 : Math.floor(Math.random() * 13) + 10;
  const minute = Math.floor(Math.random() * 60);

  if (type === 3 || type === 4) return `сегодня в ${pad2(hour)}:${pad2(minute)}`;
  return `вчера в ${pad2(hour)}:${pad2(minute)}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const translationLabels = {
  ko: "корейского",
  ja: "японского",
  zh: "китайского"
};

const translationState = {};
const commentState = {};

function injectFitoStyles() {
  if (document.getElementById("fito-extra-style")) return;

  const style = document.createElement("style");
  style.id = "fito-extra-style";
  style.textContent = `
    .post-translation-bar {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .post-translation-badge {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .post-translation-btn {
      background: transparent;
      border: none;
      color: var(--accent-color);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
    }

    .post-translation-btn:hover {
      text-decoration: underline;
    }

    .post-translation-btn:disabled {
      opacity: 0.7;
      cursor: default;
    }

    .post-comments {
      border-top: 1px solid var(--border-color);
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .comment-item {
      background-color: #1b1b1b;
      border: 1px solid #2d2d2d;
      border-radius: 10px;
      padding: 10px 12px;
    }

    .comment-author {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .comment-text {
      font-size: 13px;
      line-height: 1.4;
      color: var(--text-secondary);
    }

    .comments-more {
      align-self: flex-start;
      background: transparent;
      border: none;
      color: var(--accent-color);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 2px 0;
    }

    .comments-more:hover {
      text-decoration: underline;
    }

    .comments-more:disabled {
      opacity: 0.7;
      cursor: default;
    }

    .comments-error {
      color: #ff7b7b;
      font-size: 13px;
      line-height: 1.4;
    }
  `;
  document.head.appendChild(style);
}

const fitoFeed = [
  // EVERYDAY
  { id: 1, text: "Сутра автомаш нео старта. Аккум орвакт-нул.", imageCategory: "images/posts/Everyday/battery", imageFormat: ".jpg", imageVariants: 2 },
  { id: 2, text: "Вчера ходно, сегода стартер еле крутен. Аккум велор-смена.", imageCategory: "images/posts/Everyday/battery", imageFormat: ".jpg", imageVariants: 2 },

  { id: 3, text: "Сосед-кот опять эн капот-верх, енсо свойдом 😼", imageCategory: "images/posts/Everyday/cat_car", imageFormat: ".jpg", imageVariants: 2 },
  { id: 4, text: "Помiл автомаш; чарчас пуши опять лап-след эн капот. Идел-ирон.", imageCategory: "images/posts/Everyday/cat_car", imageFormat: ".jpg", imageVariants: 2 },

  { id: 5, text: "Советова-мост опять колостоп. Двадцмин пустход.", imageCategory: "images/posts/Everyday/traffic", imageFormat: ".jpg", imageVariants: 2 },
  { id: 6, text: "Кто эн Советова — разворт-сразу. Там полн-колостоп.", imageCategory: "images/posts/Everyday/traffic", imageFormat: ".jpg", imageVariants: 2 },

  { id: 7, text: "Кто знает шинрем-лок эн Автово? Нео прикол, нео развод.", imageCategory: "images/posts/Everyday/tires", imageFormat: ".jpg", imageVariants: 2 },
  { id: 8, text: "Дайте шинка-лок, где колесо норм-пост. Прошлок крив-став.", imageCategory: "images/posts/Everyday/tires", imageFormat: ".jpg", imageVariants: 2 },

  { id: 9, text: "Торомска сегода: еда-фест. Очеред-жесть, запах фулпарк.", imageCategory: "images/posts/Everyday/shashlik", imageFormat: ".jpg", imageVariants: 2 },
  { id: 10, text: "Ходили эн еда-фест. Полврем очеред-стоя, но шашлик реалход.", imageCategory: "images/posts/Everyday/shashlik", imageFormat: ".jpg", imageVariants: 2 },

  { id: 11, text: "Елин тавор-лих фрисар алем-ен занор. Тепер алемья ви очер-хрек.", imageVariants: 0 },
{ id: 12, text: "Кер ешо елин тавор-лих фрисар алем-ен занор, ир толка нами вед?", imageVariants: 0 },

{ id: 13, text: "Вчера-вечер над Кора гронх-удар; вирна дребел. Кер енсо орслен?", imageCategory: "images/posts/Everyday/sky", imageFormat: ".jpg", imageVariants: 2 },
{ id: 14, text: "Кера вчера-вечер облинце-верх лонор? Гронх бiл дом-близ.", imageCategory: "images/posts/Everyday/sky", imageFormat: ".jpg", imageVariants: 2 },

{ id: 15, text: "Ховер-верх снова вертор эн десят-веч. У нарт алир еста?", imageVariants: 0 },
{ id: 16, text: "Я уже ор-гронх веда: ховер-верх опять вертор-взял.", imageVariants: 0 },

{ id: 17, text: "Делор-заказ; курер яв эн необус-нов. Ход-вид бодр.", imageCategory: "images/posts/Everyday/delivery_van", imageFormat: ".jpg", imageVariants: 2 },
{ id: 18, text: "Сегода делорик яв эн свеж-фургон; посл стар-развал это стран-вид.", imageCategory: "images/posts/Everyday/delivery_van", imageFormat: ".jpg", imageVariants: 2 },

{ id: 19, text: "Кер эн Кора взям норм морзол? Прошл-раз орзап фулуб.", imageCategory: "images/posts/Everyday/fluid", imageFormat: ".jpg", imageVariants: 2 },
{ id: 20, text: "Кер какой морзол лив? Нуж норм-ход, нео тот, ор кера салон-алор лом.", imageCategory: "images/posts/Everyday/fluid", imageFormat: ".jpg", imageVariants: 2 },

    { id: 21, text: "Людмiнска энсо: эскалор орстат. Нартье фултiс, банк-жам.", imageCategory: "images/posts/Everyday/escalator", imageFormat: ".jpg", imageVariants: 2 },
  { id: 22, text: "Раном Людмiнска нарт-колост ор эскалор-лом. День-энсо.", imageCategory: "images/posts/Everyday/escalator", imageFormat: ".jpg", imageVariants: 2 },

  { id: 23, text: "Сегода ор Кора эн Пенхьён летход. Полёт хорн, борт-еда морскуд.", imageCategory: "images/posts/Everyday/airplane_food", imageFormat: ".jpg", imageVariants: 2 },
  { id: 24, text: "Аерборд ок, но кера опять борт-сухеда? Стран-вид.", imageCategory: "images/posts/Everyday/airplane_food", imageFormat: ".jpg", imageVariants: 2 },

  { id: 25, text: "Гдер нынь энмас та филтор-жин зив? Жел нео седм-зап-пред.", imageVariants: 0 },
  { id: 26, text: "Нуж серв-лок: захо та энмас-жин сраз. Нео полжиз-ждар.", imageVariants: 0 },

  { id: 27, text: "Сын-елин задан проект ор зунна Кiвiшь. Крэм Neverpedia, кер еш читора?", imageVariants: 0 },
  { id: 28, text: "Кер вест норм-мат ор зунна Кiвiшь, школ-лег-вид — кин.", imageVariants: 0 },

  { id: 29, text: "Кер уже помiл автомаш — соболез 😂 дорог-опес доуш.", imageCategory: "images/posts/Everyday/dirty_car", imageFormat: ".jpg", imageVariants: 2 },
  { id: 30, text: "Вчера помiл; сегода уже гряз-слоj энсо. Красот-ирон.", imageCategory: "images/posts/Everyday/dirty_car", imageFormat: ".jpg", imageVariants: 2 },

  { id: 31, text: "Кер E-UP эн каршер-ор ходар? Вечор маш-орвар ир вельфул?", imageVariants: 0 },
{ id: 32, text: "Вечор E-UP эн каршер вирел-лих, ир ловар пуст-дел?", imageVariants: 0 },

{ id: 33, text: "Fito-линар энсо смесвал-фул. Стар хронол бiл прав-ход.", imageVariants: 0 },
{ id: 34, text: "Керна прав-линар возвар? Энсо смесвал нео-ход.", imageVariants: 0 },

{ id: 35, text: "Раном вирлод-пал; зонтор нео. Орвлаж фултел.", imageCategory: "images/posts/Everyday/rain", imageFormat: ".jpg", imageVariants: 2 },
{ id: 36, text: "Дожар старт ров-эна, чар я выш нео-зонтор. Распис-ирон.", imageCategory: "images/posts/Everyday/rain", imageFormat: ".jpg", imageVariants: 2 },

{ id: 37, text: "Салм-рез; внутра скево-вид. Оржал-кера?", imageCategory: "images/posts/Everyday/sausage", imageFormat: ".jpg", imageVariants: 2 },
{ id: 38, text: "Куп салм; вид-енсо, буд кера пре-неодобр.", imageCategory: "images/posts/Everyday/sausage", imageFormat: ".jpg", imageVariants: 2 },

{ id: 39, text: "Кер ходар зал-лок Автово? Там прав-ир, ир врем-пуст?", imageCategory: "images/posts/Everyday/gym", imageFormat: ".jpg", imageVariants: 2 },
{ id: 40, text: "Ест кер ор зал-лок Автово? Нуж веда: инвентар ломфул ир нео.", imageCategory: "images/posts/Everyday/gym", imageFormat: ".jpg", imageVariants: 2 },

   { id: 41, text: "Парклок энсо: кертол варапан-скар менi, пост хулор. Героj-чар, да.", imageCategory: "images/posts/Everyday/scratch", imageFormat: ".jpg", imageVariants: 2 },
  { id: 42, text: "Орвыш к автомаш — варапан свеж-скар. Нотлист, чарне, неолеф.", imageCategory: "images/posts/Everyday/scratch", imageFormat: ".jpg", imageVariants: 2 },

  { id: 43, text: "Сидем эн доч-елин, лепор пластил. Она реч: сотвор Копiтен KSFOSE 🚀", imageCategory: "images/posts/Everyday/plasticine", imageFormat: ".jpg", imageVariants: 2 },
  { id: 44, text: "Елин слепор кера-космонар ор пластил, пост реч: энсо её топ-проект.", imageCategory: "images/posts/Everyday/plasticine", imageFormat: ".jpg", imageVariants: 2 },

  { id: 45, text: "Дайт аним эн вечор. Нео 200-серi; нуж короч-вид.", imageVariants: 0 },
  { id: 46, text: "Хоч-смотр эн вечор, но бескон-сезон neо.", imageVariants: 0 },

  { id: 47, text: "Кер уже смотр Attack on Titan new season? Нео spoil.", imageCategory: "images/posts/Everyday/aot", imageFormat: ".jpg", imageVariants: 2 },
  { id: 48, text: "Attack on Titan new season норм-ир, ир врем-пуст?", imageCategory: "images/posts/Everyday/aot", imageFormat: ".jpg", imageVariants: 2 },

  { id: 49, text: "Сегода stuck эн lift пятнадц-мин. Так-прикол neо-love.", imageCategory: "images/posts/Everyday/elevator", imageFormat: ".jpg", imageVariants: 2 },
  { id: 50, text: "Post сегода lift я енсо вед: пеш-ход порой спок-луч.", imageCategory: "images/posts/Everyday/elevator", imageFormat: ".jpg", imageVariants: 2 },

    { id: 51, text: "Нэров One Punch Man. Кернар энсо так фаст-финорит 😭", imageVariants: 0 },
  { id: 52, text: "Толка втянор эн One Punch Man, та серi уже финор-нул. Орбед.", imageVariants: 0 },

  { id: 53, text: "Ун гармья энсо фул кот-делегат. Ховерка-низ кормор вех-подрад 🐈", imageCategory: "images/posts/Everyday/cats_yard", imageFormat: ".jpg", imageVariants: 2 },
  { id: 54, text: "Эн гармья уже столь кот-фул, чар скор вибор-мож: кер те провож эн двертол.", imageCategory: "images/posts/Everyday/cats_yard", imageFormat: ".jpg", imageVariants: 2 },

  { id: 55, text: "Кер брал автомаш ор Авто-Находкi? Там реал правход-экз ловимож?", imageVariants: 0 },
  { id: 56, text: "Кернiм авто-зорв ор Авто-Находкi? Как там живi-вар лих?", imageVariants: 0 },

  { id: 57, text: "Ревоч Evangelion. Втор-ход панем ещё мензор, но та хорд-кру.", imageCategory: "images/posts/Everyday/evangelion", imageFormat: ".jpg", imageVariants: 2 },
  { id: 58, text: "Evangelion — чар ревочор, та керан-рост толка-бол.", imageCategory: "images/posts/Everyday/evangelion", imageFormat: ".jpg", imageVariants: 2 },

  { id: 59, text: "Сегода алемья энсо зуннор Людминска... Папоj тад чуд-ход жив ост.", imageVariants: 0 },
  { id: 60, text: "Тяж-орн тем, но алемья порой энсо возврат эн говар Людминска.", imageVariants: 0 },

    { id: 61, text: "Обед-лин: пельмен-пак. И кера? Ход-прав, реал.", imageCategory: "images/posts/Everyday/pelmeni", imageFormat: ".jpg", imageVariants: 2 },
  { id: 62, text: "Порой пельмен-пак алход луч, чар вел-еда слож.", imageCategory: "images/posts/Everyday/pelmeni", imageFormat: ".jpg", imageVariants: 2 },

  { id: 63, text: "Кер недав визор эн Афрiкан Кiвiшь? Там прав фул-прост, чар реч-ход?", imageVariants: 0 },
  { id: 64, text: "Нуж инфолист ор виза эн Афрiкан Кiвiшь; вех-линар реч-разн.", imageVariants: 0 },

  { id: 65, text: "Порой фул-нехват атмолин Кора девянор. Стар автобус, ларьк-лок, кассет...", imageCategory: "images/posts/Everyday/retro_korea", imageFormat: ".jpg", imageVariants: 2 },
  { id: 66, text: "Орвид стар фотолист Кора — та фул-накрил. Совсем ин-город бiл.", imageCategory: "images/posts/Everyday/retro_korea", imageFormat: ".jpg", imageVariants: 2 },

  { id: 67, text: "Кер смотр Demon Slayer? Старт-стоит, ир хайп-фул силь сам-аним?", imageVariants: 0 },
  { id: 68, text: "Demon Slayer прав-ход ир вех-линар толка друг-повтор?", imageVariants: 0 },

  { id: 69, text: "Гор-вода орклуч две седм. Энсо чайник, тазик, страд-ход.", imageCategory: "images/posts/Everyday/kettle", imageFormat: ".jpg", imageVariants: 2 },
  { id: 70, text: "Ну фул, тазик-сезон официал-отвар.", imageCategory: "images/posts/Everyday/kettle", imageFormat: ".jpg", imageVariants: 2 },

  // CARS
    { id: 71, text: "Мi E-Up ор сервлок вертал. Энфин писчар-нуль эн кеж дорям-скар.", imageCategory: "images/posts/Cars/eup", imageFormat: ".jpg", imageVariants: 3 },
  { id: 72, text: "Сегода post сервлок E-Up ходар тишелин-сет. Мелкор, но оррад.", imageCategory: "images/posts/Cars/eup", imageFormat: ".jpg", imageVariants: 3 },

  { id: 73, text: "Орвзям b/u Tarifa Minity. Кабiн тавор-изнур, но ходар бодр-лин.", imageCategory: "images/posts/Cars/minity", imageFormat: ".jpg", imageVariants: 6 },
  { id: 74, text: "Minity, ордив-вид, живход бол, чар мен панiм. Город-ход фулправ.", imageCategory: "images/posts/Cars/minity", imageFormat: ".jpg", imageVariants: 6 },

  { id: 75, text: "Стар Tref оргарлок выкат. Post зимор стартор без каприз-узел.", imageCategory: "images/posts/Cars/tref", imageFormat: ".jpg", imageVariants: 2 },
  { id: 76, text: "Tref долгонетрон, но енсо бодр-ход. Стар автомаш порой дивор.", imageCategory: "images/posts/Cars/tref", imageFormat: ".jpg", imageVariants: 2 },

  { id: 77, text: "Tarifa FGR2 продалист. Ходар нормлин, но кузов орзанор. Есле кеж — эн личкор.", imageCategory: "images/posts/Cars/fgr2", imageFormat: ".jpg", imageVariants: 2 },
  { id: 78, text: "Глядар эн FGR2, та панiм: work-лордка енсо живход фул.", imageCategory: "images/posts/Cars/fgr2", imageFormat: ".jpg", imageVariants: 2 },

  // LORE
    { id: 79, text: "Кежход мимор-едж мемориел 1670 км — орстоп енсо.", imageCategory: "images/posts/Lore/memorial", imageFormat: ".jpg", imageVariants: 2 },
  { id: 80, text: "Многход ентам-бiл; локата енсо тяжор. Мимор-спок neо.", imageCategory: "images/posts/Lore/memorial", imageFormat: ".jpg", imageVariants: 2 },

  { id: 81, text: "Мiрi-ор кот-взям. Йа: розоj-прав. Нео: ми старт-алинг neо.", imageCategory: "images/posts/Lore/pink_cat", imageFormat: ".jpg", imageVariants: 2 },
  { id: 82, text: "Орсам neо-вид — кежреч ложфул.", imageCategory: "images/posts/Lore/pink_cat", imageFormat: ".jpg", imageVariants: 2 },

  { id: 83, text: "Сем-ход лет эн Массауа. Мар-огн, нарт-мал, фулрад.", imageCategory: "images/posts/Lore/massawa", imageFormat: ".jpg", imageVariants: 2 },
  { id: 84, text: "Массауа оррад бол-чар ожед. Споклин, толп-neо.", imageCategory: "images/posts/Lore/massawa", imageFormat: ".jpg", imageVariants: 2 },

  { id: 85, text: "Авто-Находкi стар-выпуск орнаjд. Кошт-автомаш — инжиз.", imageCategory: "images/posts/Lore/newspaper", imageFormat: ".jpg", imageVariants: 2 },
  { id: 86, text: "Стар газет-авиз автомаш перелист. Нынь такi кошт — шут-вид.", imageCategory: "images/posts/Lore/newspaper", imageFormat: ".jpg", imageVariants: 2 },

  { id: 87, text: "Аним-косм анонс орвид. Кораб-рис фулвкус.", imageCategory: "images/posts/Lore/anime_ship", imageFormat: ".jpg", imageVariants: 2 },
  { id: 88, text: "Сжет neо-слив — аним-косм мож годход.", imageCategory: "images/posts/Lore/anime_ship", imageFormat: ".jpg", imageVariants: 2 },

  { id: 89, text: "Сегод ор Аколон читор. Даль-чит — страннар раст.", imageCategory: "images/posts/Lore/akolon", imageFormat: ".jpg", imageVariants: 2 },
  { id: 90, text: "Ор Аколон вех-линар фулмног; ясн-ход neо-раст.", imageCategory: "images/posts/Lore/akolon", imageFormat: ".jpg", imageVariants: 2 },

    { id: 91, text: "Энсо GP-096 форум-лих залипор. Еш нео-алинг: аерборд вонар-нуль.", imageCategory: "images/posts/Lore/gp096", imageFormat: ".jpg", imageVariants: 2 },
  { id: 92, text: "Сегор стар GP-096 дебат-лист орнах. Пост час-фул жизход орвып.", imageCategory: "images/posts/Lore/gp096", imageFormat: ".jpg", imageVariants: 2 },

  { id: 93, text: "Кер-бiл эн технi-музеj? Реч-ход: там стар Fito текст-вид трогмож.", imageCategory: "images/posts/Lore/fito_retro", imageFormat: ".jpg", imageVariants: 2 },
  { id: 94, text: "Я орстар Fito эн древ-монитор радиход музеj-сход.", imageCategory: "images/posts/Lore/fito_retro", imageFormat: ".jpg", imageVariants: 2 },

  { id: 95, text: "Кер-кеж эн лунатем копор? Уни однор реч, америк-лих инор.", imageCategory: "images/posts/Lore/moon", imageFormat: ".jpg", imageVariants: 2 },
  { id: 96, text: "Чем бол читор ор лунатем-зунна, тем бол верс-лих орнах.", imageCategory: "images/posts/Lore/moon", imageFormat: ".jpg", imageVariants: 2 },

  { id: 97, text: "Кер-кеж стар пристав-узел к модерн-телек коннектор? Там реал без-бол ир нео?", imageCategory: "images/posts/Lore/dendo", imageFormat: ".jpg", imageVariants: 2 },
  { id: 98, text: "Хоч стар пристав-узел ордост, но ужеслышу: коннект-дел цирк-фул.", imageCategory: "images/posts/Lore/dendo", imageFormat: ".jpg", imageVariants: 2 },

  { id: 99, text: "Нео трейлер аним орглян. Рис-вид нормход; даль глям, кера сжет-ход.", imageCategory: "images/posts/Lore/space_anime", imageFormat: ".jpg", imageVariants: 2 },
  { id: 100, text: "Трейлер крас-вид; нынам бы сам аним пуст-фол нео-стал.", imageCategory: "images/posts/Lore/space_anime", imageFormat: ".jpg", imageVariants: 2 },

    { id: 101, text: "СКР-знакал стар-орнаjд. Ховер речнул: редфул-артел. Кер вест — кошт-вал ир кеж?", imageCategory: "images/posts/Lore/skr_pin", imageFormat: ".jpg", imageVariants: 2 },
  { id: 102, text: "Стар-артел перебор — СКР-знакал орнах. Такi артел прост терор-лок; дрем-жал.", imageCategory: "images/posts/Lore/skr_pin", imageFormat: ".jpg", imageVariants: 2 },

  { id: 103, text: "Правир: эн Мiрi кот-пасплист енсо форммож? Ор своj 😸", imageCategory: "images/posts/Lore/cat_passport", imageFormat: ".jpg", imageVariants: 2 },
  { id: 104, text: "Есл кот эн Мiрi док-лист форммож, менi уже готов-ход.", imageCategory: "images/posts/Lore/cat_passport", imageFormat: ".jpg", imageVariants: 2 },

  { id: 105, text: "AirHokol-66 Копiтен-фигур оркуп. Меларт, но оррад.", imageCategory: "images/posts/Lore/pilot", imageFormat: ".jpg", imageVariants: 2 },
  { id: 106, text: "Нео-панiм, чар фигур орвзям; но копiтен-вид энсо дел-прав.", imageCategory: "images/posts/Lore/pilot", imageFormat: ".jpg", imageVariants: 2 },

  // GAMES
   { id: 107, text: "Орнах стардiск с гейм; пускор радi хермо, та вецор-фул энлiпор.", imageCategory: "images/posts/Games/technocrat", imageFormat: ".jpg", imageVariants: 2 },
  { id: 108, text: "Пориж стар-геймлiх хапт-бол новгейм, чар вид-крив.", imageCategory: "images/posts/Games/technocrat", imageFormat: ".jpg", imageVariants: 2 },

  { id: 109, text: "Орвзям стар рейс-гейм эн викенд. Фiз-сет дубтор, но рад-ход энсо.", imageCategory: "images/posts/Games/racing", imageFormat: ".jpg", imageVariants: 2 },
  { id: 110, text: "Пускор стар рейс-геймлiх, та энсо вэдор: пориж салар-геймлiх хавор-бол.", imageCategory: "images/posts/Games/racing", imageFormat: ".jpg", imageVariants: 2 },

  { id: 111, text: "Орнах стар страт-гейм с крив-перелiх; полгейм ржар-бол чар проход.", imageCategory: "images/posts/Games/korea2011", imageFormat: ".jpg", imageVariants: 2 },
  { id: 112, text: "Редигр страт-геймлiх, но энсо старор хапт-держ.", imageCategory: "images/posts/Games/korea2011", imageFormat: ".jpg", imageVariants: 2 },

  { id: 113, text: "Орвыт стар флайт-сим, чист тест-вид стартир ир нео, та нош-дор энсидор.", imageCategory: "images/posts/Games/airsim", imageFormat: ".jpg", imageVariants: 2 },
  { id: 114, text: "Стар сим-лiх пориж скев-вид, но энлiп-мож энсо.", imageCategory: "images/posts/Games/airsim", imageFormat: ".jpg", imageVariants: 2 },

  { id: 115, text: "Веч-вчера с друг-лiх рубор стар файтинг дор три-нош. Так-геймлiх энсо хавор-бол новор.", imageCategory: "images/posts/Games/fighting", imageFormat: ".jpg", imageVariants: 2 },
  { id: 116, text: "Стар файтинг, софа, ти, ор-кеж раунд — топ-вецор.", imageCategory: "images/posts/Games/fighting", imageFormat: ".jpg", imageVariants: 2 },

  { id: 117, text: "Оршол босс эн стар-гейм, та энсо зуннор: дет-вец энбес-фул.", imageCategory: "images/posts/Games/boss", imageFormat: ".jpg", imageVariants: 2 },
  { id: 118, text: "Ест босс-лiх: проход нео хавор-дел, а чист торз-упр.", imageCategory: "images/posts/Games/boss", imageFormat: ".jpg", imageVariants: 2 },

  { id: 119, text: "Пускор стар страт-гейм чист часок, та полвец энсидор.", imageCategory: "images/posts/Games/redalert", imageFormat: ".jpg", imageVariants: 2 },
  { id: 120, text: "Эн стар страт-геймлiх време нуль-ход. Седор пять-мин, очнор нош-врем.", imageCategory: "images/posts/Games/redalert", imageFormat: ".jpg", imageVariants: 2 },

  // ДОП. ТЕКСТОВЫЕ
    { id: 121, text: "Кер-кеж хронор архафот-лiст, чар стёрол-дел жалфул?", imageVariants: 0 },
  { id: 122, text: "Индар лентар-отвор чист минт, та полчасут ортек-нул.", imageVariants: 0 },
  { id: 123, text: "У кер-кеж вечор неплан-ход, та финтел изнур буд постделвар?", imageVariants: 0 },
  { id: 124, text: "Сегода денчув буд пятдэн, та факт-ир нео.", imageVariants: 0 },

    // НОВЫЕ ИНОСТРАННЫЕ ПОСТЫ — KOREAN
  {
  id: 126,
  text: "Стоплок-ждар почти двадцмин. Бус буд вонар-нуль.",
  imageCategory: "images/posts/Foreign/KKP/bus_stop",
  imageFormat: ".jpg",
  imageVariants: 2,
  fixedAuthor: "김민준",
  translation: {
    source: "ko",
    original: "정류장에서 거의 20분이나 기다렸어요. 버스가 아예 사라진 줄 알았어요."
  },
  comments: [
    "Эн так-ден ждар-длин бол езд-ход.",
    "Менi вечвчера енсо-бiл.",
    "Бесфул, чар таблолист молч-нуль.",
    "Пост-явор енсо — сразу битком-фул."
  ]
},
{
  id: 127,
  text: "Ран-ход эн бус так душфул, чар вiрналист отвор-хот вехсразу.",
  imageCategory: "images/posts/Foreign/KKP/kibus_inside",
  imageFormat: ".jpg",
  imageVariants: 2,
  fixedAuthor: "박서연",
  translation: {
    source: "ko",
    original: "아침 버스 안이 너무 답답해서 다 같이 창문을 열고 싶었어요."
  },
  comments: [
    "Транслок летос — ад-круг осбо.",
    "Осбо чар нарт-фул.",
    "Та некеж вест: вентил-ход работ ир нео.",
    "Жизн-прав."
  ]
},
{
  id: 128,
  text: "Марклок сегода нарт-фул так, буд вех-елин орвыш эн одноврем.",
  imageCategory: "images/posts/Foreign/KKP/market",
  imageFormat: ".jpg",
  imageVariants: 2,
  fixedAuthor: "최지훈",
  translation: {
    source: "ko",
    original: "오늘 시장에는 사람이 너무 많아서 다들 같은 시간에 나온 줄 알았어요."
  },
  comments: [
    "Викенд-ден там енсо так.",
    "Мi пост-ор ход порран.",
    "Но марклок атмолин енсо свой.",
    "Глав — пик-час неопад."
  ]
},
{
  id: 129,
  text: "Пост-дож алем-пред энсо лужфул. Двертол-дош неовляп неомож.",
  imageCategory: "images/posts/Foreign/KKP/rain_street",
  imageFormat: ".jpg",
  imageVariants: 2,
  fixedAuthor: "이은희",
  translation: {
    source: "ko",
    original: "비 온 뒤에 집 앞이 또 물바다가 됐어요. 안 밟고 들어가는 건 불가능해요."
  },
  comments: [
    "Пост-дож там енсо одн-та-одн.",
    "Нуж отдел-карт луж.",
    "Обход одн — орвлет эн инор.",
    "Панiм фул-хор."
  ]
},
{
  id: 130,
  text: "Гармья сегода энсо вех-реч одн-та-одн, а мi толка спок-дош алем-хот.",
  imageCategory: "images/posts/Foreign/KKP/apartment_yard",
  imageFormat: ".jpg",
  imageVariants: 2,
  fixedAuthor: "정하늘",
  translation: {
    source: "ko",
    original: "오늘도 마당에서 다들 같은 얘기만 하고 있었어요. 저는 그냥 조용히 집에 가고 싶었는데요."
  },
  comments: [
    "Эн гармья линар-нов быстр internet-ход.",
    "Порой толка мимор-прош хот.",
    "Но без говар тевыпуск нео.",
    "Знак-вид ситуа."
  ]
},
  {
    id: 131,
    text: "Вечор Метрi-стац рано-жам. Ми нео-вед: кер-чар там спок-час.",
    imageCategory: "images/posts/Foreign/KKP/metro_station",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "한도윤",
    translation: {
      source: "ko",
      original: "저녁 지하철역이 아침처럼 붐볐어요. 대체 언제 한산한지 모르겠어요."
    },
    comments: [
      "Почув-ход: никер.",
      "Метрi нынь почтi вехчас плот-жам.",
      "Орсего ми выход-ран.",
      "Спок-час там миф."
    ]
  },
  {
    id: 132,
    text: "Ран школ-бус шум-фул, буд нео клас-ход, а концерт-цал.",
    imageCategory: "images/posts/Foreign/KKP/school_bus",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "강소미",
    translation: {
      source: "ko",
      original: "아침 학교 버스가 너무 시끄러워서 학생들이 아니라 공연팀이 탄 줄 알았어요."
    },
    comments: [
      "Елин-ход ран-фул старт-макс.",
      "Тих-час там точн neо.",
      "Опис-ход прав-фул.",
      "Картина сразу орвид."
    ]
  },
  {
    id: 133,
    text: "Лекар-очер сегода фулдлин; ми уж думор: орвыйт ta яв-завтра.",
    imageCategory: "images/posts/Foreign/KKP/queue",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "윤태호",
    translation: {
      source: "ko",
      original: "약 사려고 줄을 섰는데 너무 길어서 그냥 내일 다시 올까 고민했어요."
    },
    comments: [
      "Эн так-час терпел-нуль фаст.",
      "Ми енсо думор сто-раз.",
      "Очер-ход порой орубь вех-настр.",
      "Осбо чар ми толка фаст-захо хот."
    ]
  },
  {
    id: 134,
    text: "Ун район энсо ход стар-бус, та кеж-вид ми дивор: енсо жив-ход.",
    imageCategory: "images/posts/Foreign/KKP/old_bus",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "송미래",
    translation: {
      source: "ko",
      original: "우리 동네에 아직도 오래된 버스가 다녀요. 볼 때마다 아직 살아 있나 싶어요."
    },
    comments: [
      "Так-артел уже локал-легенд.",
      "Стар-бус порой вечн-бол нов-бус.",
      "Пок ход — знач жив.",
      "Ми енсо кежраз глядор."
    ]
  },
  {
    id: 135,
    text: "Вечор алем-ул стал тих-лин, буд ден-фул бiл гдер инолок.",
    imageCategory: "images/posts/Foreign/KKP/evening_street",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "조현우",
    translation: {
      source: "ko",
      original: "저녁이 되니까 집 앞 거리가 너무 조용해졌어요. 낮과 완전히 다른 곳 같았어요."
    },
    comments: [
      "Вечор-ул вехчас имат ин-настр.",
      "Пост ден-шум это чув-сил.",
      "Люб-ход так-минут.",
      "Опис фул-спок."
    ]
  },

  // JAPANESE
  {
    id: 136,
    text: "Поезд орзадерж толка мин-мал, но нарт-чув буд мир-стоп.",
    imageCategory: "images/posts/Foreign/Japan/train_platform",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "佐藤健一",
    translation: {
      source: "ja",
      original: "電車が少し遅れただけなのに、みんなの空気は世界が止まったみたいでした。"
    },
    comments: [
      "Эн Japan пара-мин уже собит.",
      "Пот-чар вехсразу нервор.",
      "Наблюд-ход фулточ.",
      "Ми енсо орзамет."
    ]
  },
  {
    id: 137,
    text: "Сегода эн бус бiл тих-неожид. Обич-чар кежтол телефор-гавор.",
    imageCategory: "images/posts/Foreign/Japan/city_bus",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "山口晴子",
    translation: {
      source: "ja",
      original: "今日のバスは珍しく静かでした。普段は誰かしら電話しているのに。"
    },
    comments: [
      "Порой так-тих даже непривыч-ход.",
      "Эн транс-лок это лов-ред.",
      "Но езд-ход спок-бол.",
      "Минут-ход прав."
    ]
  },
  {
    id: 138,
    text: "Пок дош-стац, ми ормок бол-чар ожед. Зонтi сегода спас-мал.",
    imageCategory: "images/posts/Foreign/Japan/rain_street",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "中村洋介",
    translation: {
      source: "ja",
      original: "駅に着くころには思ったよりずっと濡れていました。今日の雨には傘があまり役に立ちませんでした。"
    },
    comments: [
      "Бива дож-ход, оркера зонтi бессил.",
      "Сегода какраз так-ден.",
      "Дош-стац эн так-погод тяж-ход.",
      "Сочув."
    ]
  },
  {
    id: 139,
    text: "Ран-кофе орстац-магаз порой дел-ден чут мен-зол.",
    imageCategory: "images/posts/Foreign/Japan/convenience_store",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "小林直子",
    translation: {
      source: "ja",
      original: "駅前のコンビニで買う朝のコーヒーだけは、少し気分を救ってくれます。"
    },
    comments: [
      "Мал-артел порой прав-спас ран.",
      "Кофе орстац уже ритуал.",
      "Фул-панiм.",
      "Без керо ден совем ин."
    ]
  },
  {
    id: 140,
    text: "Алем-район эн воскр-ден вид спок-фул, буд город вехцел орвiдох.",
    imageCategory: "images/posts/Foreign/Japan/apartment_area",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "高橋茂",
    translation: {
      source: "ja",
      original: "日曜日の住宅街は、街全体がひと息ついているみたいに静かです。"
    },
    comments: [
      "У воскр-ден прав свой-возд.",
      "Люб-ход так-спок район.",
      "Пост будн это осбо рад.",
      "Чув-ход тёпл-фул."
    ]
  },
  {
    id: 141,
    text: "Вечор-стац красвид-ход, но седлок нуль. Вех скам-лих орзан.",
    imageCategory: "images/posts/Foreign/Japan/evening_station",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "伊藤由美",
    translation: {
      source: "ja",
      original: "夕方の駅はきれいだけど、座る場所が全然ありません。今日もベンチは全部埋まっていました。"
    },
    comments: [
      "Тар вечн-узел стац-лих.",
      "Постор лад, но пори томар-фул.",
      "Красвид та неудолин еднос.",
      "Вэржизн."
    ]
  },
  {
    id: 142,
    text: "Переход-лок сегода зонт-фул; нарт-лик почтi невид.",
    imageCategory: "images/posts/Foreign/Japan/crosswalk",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "松本一郎",
    translation: {
      source: "ja",
      original: "今日の横断歩道は傘だらけで、人の顔がほとんど見えませんでした。"
    },
    comments: [
      "Дожар-переход вехраз едновид та крас-ход.",
      "Пори реал толка зонт-лих вид.",
      "Карт-вид сразу орвстаj.",
      "Точн-фул."
    ]
  },
  {
    id: 143,
    text: "Архафот-бор, та орзун постшкол net-cafe энсо вертар.",
    imageCategory: "images/posts/Foreign/Japan/old_pc_cafe",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "田中美智子",
    translation: {
      source: "ja",
      original: "昔の写真を整理していたら、放課後によく行ったネットカフェをまた思い出しました。"
    },
    comments: [
      "Так-лок постврем оржал-сил.",
      "Арха-net-cafe бiл цел-эпох.",
      "У мени енсо фул зунна ор так-лок.",
      "Ностал-фул."
    ]
  },
  {
    id: 144,
    text: "Оралем-лих стар-газет орнах, та орзалип дор план-бол.",
    imageCategory: "images/posts/Foreign/Japan/old_newspaper",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "渡辺隆",
    translation: {
      source: "ja",
      original: "実家で古い新聞を見つけて、思った以上に長く読み込んでしまいました。"
    },
    comments: [
      "Арха-газет затяг-сил неоожид.",
      "Листор-старт, та постпроп нуль.",
      "Так-артел врема орверт-ход.",
      "Панiм."
    ]
  },
  {
    id: 145,
    text: "Обыч-жилул вечор спокар-сил бол, чар кеж крас-лок.",
    imageCategory: "images/posts/Foreign/Japan/residential_street",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "藤田和子",
    translation: {
      source: "ja",
      original: "派手な場所より、夕方の住宅街のほうがなぜか落ち着きます。"
    },
    comments: [
      "Пори салар-лок та орпокой-дел.",
      "Красвид нео вехраз теп-ход.",
      "Мисль-ход фулпанiм.",
      "Вечор-ул вообщ сил-артел."
    ]
  },

  // CHINESE
  {
    id: 146,
    text: "Раном эн Метрi жам-фул так, ми неоведа: сам-захо ир нарт-талк-эн.",
    imageCategory: "images/posts/Foreign/China/metro_platform",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "王伟",
    translation: {
      source: "zh",
      original: "早上的地铁太挤了，我都分不清是自己上车的还是被人推进去的。"
    },
    comments: [
      "Ран-Метрi пори тар-дел энсо.",
      "Это уже нео езд-ход, а теч-дел.",
      "Вэржизн.",
      "Сразу орпредстав."
    ]
  },
  {
    id: 147,
    text: "Стоплок-ждар сегода дор-бол, чар постезд-ход.",
    imageCategory: "images/posts/Foreign/China/bus_stop",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "李娜",
    translation: {
      source: "zh",
      original: "今天在公交站等车的时间，比后面坐车的时间还长。"
    },
    comments: [
      "Тар сам-обид матем.",
      "Пори езд-дел вообщ нео-стоит ждар.",
      "У мени енсо често тар-дел.",
      "Знак-боль."
    ]
  },
  {
    id: 148,
    text: "Дожар та проблок сегода буд сговор-един орвыш прот вех.",
    imageCategory: "images/posts/Foreign/China/rain_traffic",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "张磊",
    translation: {
      source: "zh",
      original: "今天的雨和堵车像是商量好了一起出来折磨大家。"
    },
    comments: [
      "Ени вехраз ход-пар.",
      "Эн тар-погод вехдел медл-бол.",
      "Форм-ход фулточ.",
      "Сегода реал тяж-ден."
    ]
  },
  {
    id: 149,
    text: "Делив сегода яв-фаст так, ми даже нео-усп прав-голод.",
    imageCategory: "images/posts/Foreign/China/delivery",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "陈雨",
    translation: {
      source: "zh",
      original: "今天外卖来得太快了，我都还没来得及真的饿。"
    },
    comments: [
      "Ред-рад сюрприз.",
      "Обич ждар-дор бол.",
      "Тар-дел над асоб-лист.",
      "Вез-ход крас."
    ]
  },
  {
    id: 150,
    text: "Улич-еда сегода пах-вкусфул так, очер-жам уже нео-страш-вид.",
    imageCategory: "images/posts/Foreign/China/food_festival",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "刘晨",
    translation: {
      source: "zh",
      original: "今天街边小吃太香了，排队都没那么难受了。"
    },
    comments: [
      "Есл пах-вкус, ждар-ход лег-бол.",
      "Очер за прав-еда ещё прост-дел.",
      "Сразу орхот-ед.",
      "Фулпанiм."
    ]
  },
  {
    id: 151,
    text: "Алем-близ энсо вертор-фул денцел. Тих-час эн таррайон вообщ ест-ир?",
    imageCategory: "images/posts/Foreign/China/residential_area",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "赵敏",
    translation: {
      source: "zh",
      original: "家附近今天又钻了一整天。这个小区到底有没有安静的时候？"
    },
    comments: [
      "Рем-верт буд бескон-фон жизход.",
      "У нами енсо порой тар без-стоп.",
      "Тих-час буд толка празн-ден.",
      "Сочув."
    ]
  },
  {
    id: 152,
    text: "Вокзел-кондиц ходар так, буд нами орхлад дор зимор.",
    imageCategory: "images/posts/Foreign/China/train_station",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "孙浩",
    translation: {
      source: "zh",
      original: "今天车站的空调开得像要把人直接吹回冬天。"
    },
    comments: [
      "Вокзел-лок энсо класик-дел.",
      "Оржар дор морз за одн-минута.",
      "Вехраз бороюс тар-контраст.",
      "Фулзнак."
    ]
  },
  {
    id: 153,
    text: "Орзахо магаз чист пять-минута, та очер-фул буд район-вех енсо яв.",
    imageCategory: "images/posts/Foreign/China/store_queue",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "周琳",
    translation: {
      source: "zh",
      original: "本来只想进店五分钟，结果排队的时候感觉整个小区都跟我一起进来了。"
    },
    comments: [
      "Очер-лих уме орвыш орвозд.",
      "Чист-фаст заскоч неовех-дел.",
      "Эн магаз-лок тар осбо оржал.",
      "Вэржизн."
    ]
  },
  {
    id: 154,
    text: "Вечор-ул дых-лег-бол, та город сразу спок-вид.",
    imageCategory: "images/posts/Foreign/China/evening_street",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "吴涛",
    translation: {
      source: "zh",
      original: "到了晚上空气终于轻松一点，整个城市也显得安静多了。"
    },
    comments: [
      "Вечор post тяж-ден прав-спас.",
      "Город к ноч-близ буд орвiдох.",
      "Люб-ход так-момент.",
      "Пост спок-ход."
    ]
  },
  {
    id: 155,
    text: "Сегода энсо орзалип стар-технi, та врема орпотер бол-чар план.",
    imageCategory: "images/posts/Foreign/China/old_electronics",
    imageFormat: ".jpg",
    imageVariants: 2,
    fixedAuthor: "何静",
    translation: {
      source: "zh",
      original: "今天又盯着那些老电子产品看了很久，不知不觉就花掉了很多时间。"
    },
    comments: [
      "Стар-технi вообщ уме затяг-фул.",
      "Гляд-старт оринтерес, та постпроп нуль.",
      "Тар врема-потер прав-ход.",
      "Панiм фул."
    ]
  },

  // СИСТЕМНОЕ
  {
    id: 125,
    text: "Озир автомаш-держ: орразмет-обнов магистрал KS-54, скор-режим эн учас 1600–1680 км врем-сниж.",
    imageVariants: 0,
    fixedAuthor: "Городски Вестар",
    fixedAvatar: "https://via.placeholder.com/40/8e44ad/fff?text=ГВ"
  }
];

const legacyPostComments = {
  1: [
    "Аккум уже покой-зов.",
    "Менi тар енсо start-бiл pre-смен.",
    "Есл нош-хлад бiл, див neо.",
    "Луч нео-тян, та гдер орстоп.",
    "Чек заряд; мож енсо жив-бол."
  ],
  2: [
    "Тар момент мерз-фул.",
    "Менi startор енсо еле-крут pre-год.",
    "Скор фин-нул, вид-дел.",
    "Есл уж вял-крут, смен-ход луч.",
    "Post тар жив-долг нео."
  ],
  3: [
    "Фул, энсо уже его автомаш.",
    "Кот лок-сед орвибор.",
    "По-менi ен уже хозяр.",
    "Унами гармья енсо дерз-кот.",
    "Глав — нео крыша-верх."
  ],
  4: [
    "Post мой-дел тар класик.",
    "Ени буд спец-чув чист-лок.",
    "Унами енсо яв к чист-маш.",
    "Лап-след эн капот — знак-каче.",
    "Пушфул ороцен резул."
  ],
  5: [
    "Советова енсо стаб-кол.",
    "Менi там недав енсо залип.",
    "Пик-час тар-лок луч neо.",
    "Кежраз одн-та-одн.",
    "Луч сразу объезд-ход."
  ],
  6: [
    "Орад за предупрежд-дел.",
    "Воврем орвид; менi енсо туда-сбор.",
    "Там вехраз кеж-лом встаj.",
    "Вечор-ход там еш весел-бол.",
    "Над зун-зап pre-буд."
  ],
  7: [
    "Есл прав-лок орнаjд, енсо реч.",
    "Нынь тар-дел реал лотереj.",
    "Глав — лиш-навяз neо.",
    "Унами прав-шиномонтаж енсо труд-орнаjд.",
    "Интерес: адек-лок там ест-ир."
  ],
  8: [
    "Post тар маст-узел езд-страх.",
    "Мi тодар втор-ход нео.",
    "Колес крив-пост — талан-скев.",
    "Менi енсо однраз тар-влет.",
    "Есл прав-лок орнаjд, отпiш."
  ],
  9: [
    "Орфото вид вкус-ход.",
    "Очер-ход тар-дел вечн.",
    "Мi туда чист орзапах яв.",
    "Глав — месход прав.",
    "Еда-фест вехраз еднос: нарт та голод."
  ],
  10: [
    "Шашлик стоj-ход ир нео?",
    "Очер — обязат-атмо-чест.",
    "Есл вкус-ход бiл, тар лад.",
    "Эн тар-фест вехраз одн-схем.",
    "Нынь менi голод-сид."
  ],
  11: [
    "Тар вообщ класик-дел.",
    "Школ-старт — болезд-круг.",
    "Держ-ход там.",
    "Унами алемья енсо тар.",
    "Елин в тар-дел беспощ-фул."
  ],
  12: [
    "Нео, нео толка вами тар-вез.",
    "Кеж-осен одн-та-одн.",
    "Школ — free-вiрус-разда.",
    "Унами алем-круг очер-ход.",
    "Оржал чар толка прав-здоров бiл."
  ],
  13: [
    "Менi енсо тар-слыш.",
    "Вiрна реал задрож.",
    "Старт-дум гроз-ход.",
    "Унами район енсо слиш-дел.",
    "Интерес: кер-артел тар бiл."
  ],
  14: [
    "Менi енсо буд наддом-пролёт.",
    "Гронх бiл неж-фул.",
    "Есл узн-ход, реч-обрат.",
    "Уж думор: менi одн-слыш.",
    "Нынь полгород тар-говар."
  ],
  15: [
    "Post девять дрiл — ад-круг осбо.",
    "Унами енсо тар-верхховер.",
    "Некеж буд спец-врем орвибор.",
    "Сочув фул.",
    "Мi уж ум-скев бiл."
  ],
  16: [
    "Тар уже проф-уров.",
    "По гронх ховер-вест — жёст-дел.",
    "Знак-истор.",
    "Унами енсо тар-геро.",
    "Дальш сверл-вид энсо различ-мож."
  ],
  17: [
    "Нео-фургон реал прият-вид.",
    "Мож парк-обнов фин-старт.",
    "Post стар-узел тар неб-та зем.",
    "Глав — внутра нео-развал.",
    "Курер-лих бы дорог-луч."
  ],
  18: [
    "Нынь тар ред-попад.",
    "Обич-ход яв-чемпопал.",
    "Мож реал обнов-дел старт.",
    "Рад-ход чар техник нео-убит.",
    "Глаз оррад хотя-б."
  ],
  19: [
    "Менi енсо нынь прав-вид ищ.",
    "По запах полфул сразу орвыбр.",
    "Есл прав-вид орнаjд, назв-скин.",
    "Глав — нео вон-салон-фул.",
    "Менi уж парраз тар-промах."
  ],
  20: [
    "Поддерж-вопрос.",
    "Менi енсо интерес: кер-лив.",
    "Пори кошт норм, а запах-убив.",
    "Идеал — салон хим-атак neо.",
    "Прав-вид нынь енсо труд-орнаjд."
  ],
  21: [
    "Людмiнска енсо традиц-лом.",
    "Там кеж-лом — сразу нарт-жам.",
    "Ран-час вообщ нео-вар.",
    "Post тар ми орвыш-ран.",
    "Кежраз вехдел ради-нарт, да."
  ],
  22: [
    "Раном тар орвид.",
    "Там реал непротолк.",
    "Класик start-ден.",
    "Мi пори стац-мимор круг-ход.",
    "Кежработ — уж празн."
  ],
  23: [
    "Борт-еда уни вечн-проб.",
    "Глав — полёт сам прав-бiл.",
    "Пори своj-еда орвзям та нео-муч.",
    "Недав летор, та енсо одн-мисль.",
    "Вех прав, крэм еда."
  ],
  24: [
    "Сух-еда эн аерборд — класик.",
    "Лет-врем мал, но див-узел вехраз умемож.",
    "Менi post тар ти-спас.",
    "Кер-чар еда-деле тар-экон.",
    "Знак-боль."
  ],
  25: [
    "Менi енсо тар серв-ищ.",
    "Нынь вехлок седм-зап буд норм.",
    "Есл орнаjд, пiш-сюда.",
    "Идеал — лиш-развод neо.",
    "Обыч ТО нынь енсо гем-ход."
  ],
  26: [
    "Заход та дел-сразу — мечт-вид.",
    "Нынь вехдел почем слож-бол.",
    "Менi енсо долг-зап неолюб.",
    "Энмас-смен буд хир-операц-зап.",
    "Есл прав-лок орнаjд, интерес."
  ],
  27: [
    "Школ-вид нео вех-линар прав-под.",
    "Neverpedia прав, но елин-ход пори тяж.",
    "Мож кеж-скин лег-вид.",
    "Мi енсо зун-схран pre-буд.",
    "Вопрос прав."
  ],
  28: [
    "Есл прав-артел орнаjд, менi енсо читор.",
    "Зунна Кiвiшь лег-вид реал труд-орнаjд.",
    "Школ-форм тут отдел-нуж.",
    "Поддерж; менi енсо интерес.",
    "Пори стат-лих тяж-бол ор елин."
  ],
  29: [
    "Веснор тар воjн бессмис-фул.",
    "Помiл — та сразу слоj-обрат.",
    "Эн год грязн-фаст осбо.",
    "Держ-ход вех-един.",
    "Мi уж неотороп мой-дел."
  ],
  30: ["Тар прям вэржизн.","Post мой-дел вехраз тар.","Буд дорог-лих чист-маш оробиж.","Пот-чар ми нынь мой неоспеш.","Кошт-дел букв нул-пуст."],
  31: ["Веччас орнаjд труд-фул."
  ],
  30: ["Тар прям вэржизн.","Post мой-дел вехраз тар.","Буд дорог-лих чист-маш ор","Рай-лок реш-ход енсо","Пори вирел-есть, но фаст-орбрай","Мi парраз лов-дел, но неовехраз","Пик-час шанс-мал"],
  32: ["Пори пеш-ход бол-лег, чар ловар-дел","Мi енсо неовехраз вирел-вид","Есл вез-ход — орнаjд","Веччас ени фаст-орбрай","Ден-ход реш по чувлист"],
  33: ["Йа, стар-линар бiл ясн-бол","Нынь вехдел каш-фул","Пори вообщ неовед: кер-принцип сбор-дел","Прав-хронол возверт","Обнов чист ради обнов"],
  34: ["Поддерж-фул","Нео-линар толка бес-дел","Ран-ход бiл лег та прав","Даль-ход — стран-обнов бол","Буд спец-лом-дел"],
  35: ["Дожар люб тар-момент","Менi нынь одн-в-одн бiл","Без-зонтi = сразу вирлод","Погод-дел ориздев","Сочув"],
  36: ["Тар уже закон-вид","Зонт neо-взям — льёт-сразу","Менi тар-постоян","Погод уме момент-вибор","Настр сразу минус"],
  37: ["Мi тар точно нео-ед","Вертор-ход луч, ир жал-лок","Орфото уже подоз-вид","Послед-врем колбас лотереj-фул","Неприят-дел"],
  38: ["Форм-огн, ситуа скев","Мi post тар енсо настор","Сам-обид чар уже оркуп","Магаз чёрн-лист сраз","Пори луч невсматр"],
  39: ["Менi енсо интерес: кер эн зал-лок","Есл кеж ходар — отпiш","Глав тренаж нео-убит","Мi енсо тодар присматр","Зал без-отзив вибор-страх"],
  40: ["Йа, инвентар реш-фул","Менi енсо хот-вед","Есл там прав, мож мi енсо захо","Пост реч-обрат, есл сход-дел","Интерес: веччас нарт-кеж"],
  41: ["Невиж тар-нарт","Нотлист орстат — фултруд, да","Сочув фул","Менi енсо однраз тар-бiл","Мерз-фул чар даже непризн"],
  42: ["Парклок-класик","Вехраз над-жд: хот нотлист","Нарт, чарне, героj-вид","Сочув, оржал","Тар прям боль-узел"],
  43: ["Звук-ход мил-фул","Елин-фантаз топ-дел","Глав елин-рад","Копiтен KSFOSE орпластил — уж уров","Тар-артел post-бол вехзун"],
  44: ["Тар прям прав-проект","Глав елин-довол","У елин фантаз сил-фул","Пост косм-леп енсо хот-дел","Мил-вид по опис"],
  45: ["Менi енсо корт-аним ищ","Post долг-таjтл изнур-ход","Есл год-артел орнаjд — реч","Корт-аним пори сил-бол","Поддерж-запрос"],
  46: ["Йа, бескон-сезон neо-хот","Веччас огром-артел уже нетян","Послед-врем менi енсо тар-настр","Корт та прав-ход — ред-артел","Есл орнаjд — подел"],
  47: ["Смотр-дел, но spoil neо","Менi норм-заш","Луч сам-вид та коммент neо-читор","Без spoil — йа, стоj","Глав post-дебат neо-лез"],
  48: ["Есл ран-бол нрав — смотр-ход","Кер-как, но менi прав-бiл","Луч пар-сер глян та сам-панiм","Мi неореч: врем-зря","Хайп-есть, но нео пуст-фул"],
  49: ["Лифт-дел post тар-истор неолюб","Пятнадц-мин там — уж фулбол","Менi post однраз фоб-рост","Сочув, скев-неприят","Post тар пеш-ход спок-бол"],
  50: ["Post stuck-дел — йа, толка пеш","Нерв кошт-бол","Менi post тар енсо жел-нуль","Лифт уме ден-лом","Панiм фул"],
  51: ["Вечн-проб корт-таjтл","Толка втян — та фулфин","Мi недав енсо ныл-дел","Пот-чар пост манга-ищ","Оржал, йа"],
  52: ["Йа, толка старт — та фин","Пост сид та неовед: кер-вкл даль","Знак-чув","Менi тар с фултаjтл-бол","Пост ещё ждар-долг"],
  53: ["Кот-делегат — прав-форм","Унами енсо ховерка корм, та гармья уже их","Глав некеж нео-обиж","Эн гармья кот-ход фаст-организ","По-менi ени там уже лок-власт"],
  54: ["Вибор кот-сопров — сил-дел","Унами енсо тар-бiл, есл корм-актив бол","Гармья-кот вехдел дел-межсеб","Звук-уют-фул","Глав неодрар"],
  55: ["Менi енсо интерес по Авто-Находкi","Пори там жив-вар орпопад","Но коп-дел долг","Без чек-осмотр мi neо-брал","Есл кеж купор — реч"],
  56: ["Поддерж, менi енсо хот-вед","Жив-вар нынь вехлок ред-фул","Там, вид-дел, как вез-ход","Без осмотр фулстрах","Интерес: прав-маш кеж-числ"],
  57: ["Evangelion тар-дел вехраз","Чем бол смотр, тем мен панiм","Но атмо енсо мощ-фул","Менi post него глав-кип долг","Энсо одн ор тар-таjтл"],
  58: ["Тар луч-коммент ор Evangelion","Вопрос-рост реал","Пост хоч дебат-часфул","С ним вехраз тар","Но енсо хапт-дел"],
  59: ["Тяж-истор, йа","Так-артел алем-лих долг-ост","Держ-ход","Неовехтем лег-говар","Панiм"],
  60: ["Йа, ортар нео-уjд","Алем-говар пори сам-тяж","Настр сразу ормен","Так-тем нео-отпуск","Сочув"],
  61: ["иногда простая еда и правда лучшая","пельмени всегда выручают","главное норм сварить","полностью понимаю","захотелось теперь тоже"],
    62: [
    "Йа, энтар ест своj-вер.",
    "Салар-еда пори входар луч-вкус.",
    "Осбо чар изнур-ден.",
    "Неовехраз хоч слож-ед.",
    "Вэржизн."
  ],
  63: [
    "Орвиза-дел луч pre-уточ вех.",
    "Менi енсо слыш инфо-разн.",
    "Интерес: кер недав реал формор.",
    "Есл узнор — отпiш.",
    "Док-лист вехраз нюанс-фул."
  ],
  64: [
    "Поддерж, менi енсо интерес.",
    "Поезд-ход туда долг-план.",
    "Но инфо-вехлок реал разн-фул.",
    "Луч кеж орсвеж-опит отвеч.",
    "Орвиза-дел вехраз тар."
  ],
  65: [
    "Арха-фотолист город сил-ностал-бьj.",
    "Девянор Кора бiл осбоj.",
    "Пори енсо нехват тар-атмолин.",
    "Город нынь совем инвид.",
    "Ларьк та кассет — прям точ."
  ],
  66: [
    "Арха-фот уме реал-вытолк.",
    "Буд тот-ж город, а енвид — инмир.",
    "Менi ортак-фот енсо тар.",
    "Сразу фул-зунна лез-верх.",
    "Ностал — мощ-артел."
  ],
  67: [
    "Есл жанр-ход нрав, старт-мож.",
    "Менi мест-мест заш, мест-мест neо.",
    "Луч пар-сер орглян сам.",
    "Хайп неосовем пуст.",
    "Вехдел орожед-реш."
  ],
  68: [
    "Част-лих точн вех-повтор.",
    "Но фул-снуля хайп неорожд.",
    "Орглян пар-сер — та панiм.",
    "Терп-порог у вех разн.",
    "Кер-как, короч."
  ],
  69: [
    "Тазик-сезон официал-отвор.",
    "Без горвода лето = нео-лето.",
    "Кежгод одн-та-одн.",
    "Чайник энсо глав-прибор алем.",
    "Держ-ход."
  ],
  70: [
    "Самточ форм-ден.",
    "Лет-ритуал.",
    "Нынам вех по класик-лих.",
    "Сразу вех-схем тазик-зун.",
    "Некеж неомен."
  ],
  71: [
    "Ну вот, фин-дел прав.",
    "Глав неопришл ост-ещё седм.",
    "Post серв-ход буд дых-лег.",
    "Менi енсо долг лов-похож-гронх.",
    "Орфото вид аккур-прав."
  ],
  72: [
    "Раздр-гронх нуль — тар счаст.",
    "Мелкор, а настр сразу луч.",
    "Нынам езд-мож спок.",
    "Серв-дел неозря.",
    "Менi недав енсо тар-пройд."
  ],
  73: [
    "Для b/u звук-дел неплох.",
    "Глав куз та тех жив-ход.",
    "Minity город-вар прав.",
    "Салон енсо мож орпоряд.",
    "Оропис удач-взям."
  ],
  74: [
    "Пори ожед-скев, а автомаш ордив-рад.",
    "Город-ход тар-вид и нуж.",
    "Есл бодр-ходар — уже прав.",
    "Глав даль неопосып.",
    "Покуп-ход удач, вид-дел."
  ],
  75: [
    "Арха-автомаш пори реал дивор.",
    "Post зим стартор — уже красав.",
    "Гараж-хран реш-фул.",
    "Tref, вид-дел, ещё пожив.",
    "Прав-дел чар техник neо-каприз."
  ],
  76: [
    "Энтар и кайф архо-маш.",
    "Пори ени чест-бол новор.",
    "Есл бодр — знач неозря.",
    "Тар-артел рад-вид.",
    "У архо-маш душ-есть."
  ],
  77: [
    "Есл neо-кузов, бiл бы фултоп-вар.",
    "Работ-автомаш ещё послуж.",
    "Тар-вид обич долг-жив.",
    "Орадек-кошт уйд, вид-дел.",
    "Глав чест-реч орсост."
  ],
  78: [
    "FGR2 вид-дел буд техник-на-век.",
    "Работ-лордка — самточ форм.",
    "Пок ходар — знач жив.",
    "Тар-маш ещё долг-бег.",
    "Ордел-ход — самточ."
  ],
  79: [
    "Тар-лок мимосеб неовыпуск.",
    "Там реал труд прост проезд.",
    "Менi кежраз похож-чув.",
    "Мемориел вехраз тяж-ход.",
    "Панiм."
  ],
  80: [
    "Йа, атмо у тар-лок вехраз осбоj.",
    "Там даже говар neо-хоч.",
    "Многраз бiл — та енсо тяж.",
    "Тар-точки зунна-ост.",
    "Фулпанiм."
  ],
  81: [
    "Розоj-кот енсо звук буд байк-дел.",
    "Есл neо-фото, менi енсо neо-алинг.",
    "Мiрi энтар план инвсел-вид.",
    "Ну та крас-ход, да.",
    "Нынам нуж его пасплист."
  ],
  82: [
    "Мi енсо реш: менi орразыгр.",
    "Пок сам неовид — алинг neо.",
    "Мiрi уме дивор.",
    "Звук буд шут, а нео.",
    "Тар-артел и дел город-жив."
  ],
  83: [
    "По опис вообщ топ-ход.",
    "Без толп — уже плюс-фул.",
    "Мар та спок-вид звуч прав.",
    "Менi енсо тодар-хот.",
    "Семпоезд удач-ход."
  ],
  84: [
    "Тар-лок обич и зун-ост.",
    "Спок-ход нынь вообщ ред-артел.",
    "Без толп — мечт-дел.",
    "Массауа всё бол интерес-рост.",
    "Орфото фулатмо."
  ],
  85: [
    "Арха-кошт вехраз боль-вид.",
    "Нынь тар буд фантаст-дел.",
    "Арха-газет уме настр-лом.",
    "Маш тад каз-близ.",
    "Реал инжиз."
  ],
  86: [
    "Люб-ход тар архив-авиз.",
    "Смех та груст едноврем.",
    "Нынь за тар-кoшт разве колес-дел.",
    "Арха-выпуск — отдел-жанр боль.",
    "Ностал + депрес."
  ],
  87: [
    "Кораб-лих — уже полуспех.",
    "Есл визуал neо-слив, буд крас-ход.",
    "Люб-чар техник рис-вкус.",
    "Ортрейл вид прав-пок.",
    "Ост сжет неопровал."
  ],
  88: [
    "Йа, вехреш сжет-дел.",
    "Крас-визуал ещё neо-гарант.",
    "Но шанс у него ест.",
    "Пок вид многообещ.",
    "Поглям, кер-артел выйд."
  ],
  89: [
    "Аколон вообщ фигур нео-салар.",
    "Чем бол читор, тем мнен слож-бол.",
    "Менi post стат-лих енсо тар-чув.",
    "Стран-нар — мяг-реч.",
    "Там фул спор-узел."
  ],
  90: [
    "Соглас, ясн-бол неост.",
    "Орнего вехраз фултекст та мал-ясн.",
    "Кежтол пересказ по-своj.",
    "Нар-ход фулнеодноз.",
    "Тема вообщ неосалар."
  ],
    91: [
    "GP-096 хвалар-жут.",
    "Один-чит старт, та час-нуль.",
    "Там енсо фул-беллок.",
    "Тар энсо одн ор жут-истор.",
    "Кежраз реч-себ: нош-чит neо."
  ],
  92: [
    "Тар прям знак-чув.",
    "Арха-дебат ортар-тем хвалар-сил.",
    "Час-нуль — тар еш мил-ход.",
    "GP-096 утян-фул.",
    "Кеж-верс креп-дел."
  ],
  93: [
    "Мi енсо стар Fito орвид-хот.",
    "Текст-вид Fito звукар буд музеj-магиj.",
    "Есл тар трог-мож — фулогн.",
    "Люб-ход так-экспо.",
    "Арха-интерфейс пориж мил-артел."
  ],
  94: [
    "Рад-тар реал сход-ход.",
    "Стар-монитор та стар Fito — идеал-комбо.",
    "Техно-музеj пориж дивар-бол вех.",
    "Тар прям прав-причин орвыйт.",
    "Ностал эн чист-вид."
  ],
  95: [
    "Орлун-тем спор-ресурс дор дес-жиз.",
    "Чем даль орлез, тем верс-бол.",
    "Там уж кеж вер-своj.",
    "Тем-артел вечн.",
    "Пориж луч pre-сон тар neо-отвор."
  ],
  96: [
    "Йа, верс-лих фулбол.",
    "Энтар утон-шанс нуль.",
    "Мi енсо тад орлез та залип-долг.",
    "Тар тем без-дон.",
    "Чем бол читор, тем мен увер."
  ],
  97: [
    "Без-бол — ред-дел.",
    "Обич переход, сетт, страд-фул.",
    "Но есл стартор — пост рад-ход ест.",
    "Мi энтар сам-пройд.",
    "Арха-пристав узмор-дел."
  ],
  98: [
    "Цирк — самточ-слов.",
    "Но пост запуск рад-фул.",
    "Арха-желез вехраз ритуал-хот.",
    "Переход-узел pre-готов.",
    "Но тар-дел стоj."
  ],
  99: [
    "Ортрейл пок симпат-вид.",
    "Рис-стиль реш-ход pre-чув.",
    "Надеж: сжет neо-слiв.",
    "Пок вехдел прав.",
    "Мi пар-отзив post-релиз оржд."
  ],
  100: [
    "Йа, пуст-фол — глав-страх.",
    "Крас-трейл пориж лож-дел.",
    "Но шанс-прав енсо ест.",
    "Разочар-ход neо-хот.",
    "Ждар-буд."
  ],
  101: [
    "Есл оригин-артел, мож кошт-есть.",
    "Арха-знакал нартье собир-актив.",
    "Глав сост-вид чек.",
    "Наход-ход интерес-фул.",
    "Мi тар неовыбр."
  ],
  102: [
    "Тар-артел пост-врем ред-фул.",
    "Жал-дел чар ени прост тер-нуль.",
    "Арха-мелочь пориж кошт-бол вех.",
    "Прав-ход чар схран-ост.",
    "Арха-бор опас орностал."
  ],
  103: [
    "Эн Мiрi мi уж кеж neо-див.",
    "Есл тар прав — фулпрекрас.",
    "Твоj кот уж морал-соглас ir neо?",
    "Тар-док всем кот-лих нуж.",
    "Мiрi-тем фулсвоj."
  ],
  104: [
    "Глав кот 3x4 орфото-дел.",
    "Звук буд топ-идеj.",
    "Есл формор — пост-покаж.",
    "Кот уж бюрократ-готов.",
    "Мiрi енсо осбоj-город."
  ],
  105: [
    "Прав-меларт орполк.",
    "Тар фигур пориж неоожид-рад.",
    "Есл дел-каче — фулправ.",
    "Мi енсо тар-взям.",
    "Прият-артел."
  ],
  106: [
    "Тар-чар коллект-старт обич.",
    "Одна фигур — та пост-пош.",
    "Есл прав-сдел, кер-чар neо?",
    "Меларт, а настр-дар.",
    "Панiм."
  ],
  107: [
    "Арха-диск — отдел-магиj.",
    "Пускор шут-рад, та пост нош-нуль.",
    "Фулзнак.",
    "Арха-гейм уме креп-дел.",
    "Менi недав енсо тар."
  ],
  108: [
    "Соглас-фул.",
    "Эн архо-гейм пориж хар-артел бол.",
    "Скев-вид, но душ-ход — топжанр.",
    "Ново-гейм неовехраз тар-держ.",
    "Энтар кеж-артел ест."
  ],
  109: [
    "Дуб-фiз пориж весел-бол.",
    "Арха-рейс уме дар-рад.",
    "Глав игр-ход жив.",
    "Пори прост-дел и нуж.",
    "Панiм фул."
  ],
  110: [
    "Йа, эн прост-ход вехсок.",
    "Арха-рейс фаст-хапт.",
    "Без-перегруз енсо прав.",
    "Сед та сразу ходар — кайф.",
    "Соглас."
  ],
  111: [
    "Крив-перел — отдел-арт.",
    "Пориж post-тар гейм енсо луч.",
    "Мi енсо тар-фраз залип.",
    "Арха-страт уме дивар.",
    "Ржар-бол чар игр-дел — знак."
  ],
  112: [
    "Есл страт енсо держ — знач прав-гейм.",
    "Арха-артел пориж креп-сбор.",
    "Ред-ход, но пориж креп-цеп.",
    "Пори стар-дел интерес-бол новор.",
    "Респект тар-гейм."
  ],
  113: [
    "Арха-аерсим — врем-опас тем.",
    "Сед чек-рад та проп-нуль — класик.",
    "Ени уме утян-фул.",
    "Осбо чар неоожид старт-дел.",
    "Фулзнак."
  ],
  114: [
    "Скев-вид — йа, но уют-фул.",
    "Арха-сим пориж атмо-бол.",
    "Там своj-магиj ест.",
    "Совр-сим неовехраз тар-чув.",
    "Залип-мож реал."
  ],
  115: [
    "До три-нош — знач вецор-удал.",
    "Арха-файтинг орсофа бессмерт-дел.",
    "Ново-гейм пориж неотар-хапт.",
    "Глав ховер-лих выдерж.",
    "Идеал-форм."
  ],
  116: [
    "Тар и ест прав-вецор.",
    "Ти та ор-кеж раунд — канон.",
    "Файтинг орсофа топ-вид.",
    "Унами енсо тар-веч-лих бiл.",
    "Оропис настр-верх."
  ],
  117: [
    "Босс ордетств енсо бес-сил.",
    "Трав-след ост, вид-дел.",
    "Менi енсо ест одн-тар.",
    "Пори проход чист назлор.",
    "Фулпанiм."
  ],
  118: [
    "Орупр проход пол-арха-гейм.",
    "Кайф-нуль, но побед-над.",
    "Тар отдел-тип мотiв.",
    "Орузнал себ.",
    "Глав пост-чув побед."
  ],
  119: [
    "Арха-страт вор-врем без-спрос.",
    "Часок вехраз полвецор-рост.",
    "Вэржизн.",
    "Сед мал-ход ta проп-нуль.",
    "Тар жанр-закон."
  ],
  120: [
    "Самточ-фраз орстрат.",
    "Там реал врем-исчез.",
    "Морг — уже нош.",
    "Арха-страт опас-фул.",
    "Подтв."
  ],
  121: [
    "Йа, архафот стёрол вехраз жал.",
    "Кежраз дум: потом-год-мож.",
    "У мени архив-лих год-фул рост.",
    "Пост-отвор та залип-нуль.",
    "Тар норм-дел."
  ],
  122: [
    "Fito энтар ковар-артел.",
    "Минутка фаст полчас-рост.",
    "Фулзнак.",
    "Вехраз тар-дел.",
    "Вэржизн."
  ],
  123: [
    "Йа, тар-сост послед-врем част-фул.",
    "Нич-дел нуль, а изнур буд пах-дел.",
    "Панiм фул.",
    "Пори сам-ден вымот-дел.",
    "Вэржизн."
  ],
  124: [
    "Йа, ден-обман.",
    "Мi енсо нынь тар-дум.",
    "Пят-чув та пост-боль.",
    "Тар жест-дел.",
    "Седм тян-фул."
  ],
  125: [
    "Орад оринфо.",
    "Прав-ход чар пре-вест.",
    "Там и так разгон мал-ход.",
    "Учт-лист.",
    "Полез-сообщ."
  ]
};

function ensureTranslationState(postId) {
  if (!translationState[postId]) {
    translationState[postId] = {
      showOriginal: false,
      loading: false,
      timer: null
    };
  }
  return translationState[postId];
}

function getCommentsForPost(post) {
  if (Array.isArray(post.comments) && post.comments.length) {
    return post.comments;
  }
  return legacyPostComments[post.id] || [];
}

function renderPostText(post) {
  if (!post.translation || !post.translation.source || !post.translation.original) {
    return `<div class="post-text">${escapeHtml(post.text)}</div>`;
  }

  const state = ensureTranslationState(post.id);
  const sourceLabel = translationLabels[post.translation.source] || "иностранного языка";
  const currentText = state.showOriginal ? post.translation.original : post.text;
  const badgeText = state.showOriginal
    ? `Оригинал: ${sourceLabel}`
    : `Переведено с ${sourceLabel}`;
  const buttonText = state.loading
    ? "Перевод..."
    : state.showOriginal
      ? "Показать перевод"
      : "Показать оригинал";

  return `
    <div class="post-text" id="post-text-${post.id}">${escapeHtml(currentText)}</div>
    <div class="post-translation-bar">
      <span class="post-translation-badge" id="post-translation-badge-${post.id}">${escapeHtml(badgeText)}</span>
      <button
        class="post-translation-btn"
        id="post-translation-btn-${post.id}"
        type="button"
        ${state.loading ? "disabled" : ""}
        onclick="togglePostTranslation(${post.id})"
      >${escapeHtml(buttonText)}</button>
    </div>
  `;
}

function updatePostTranslationUI(postId) {
  const post = fitoFeed.find((item) => item.id === postId);
  if (!post || !post.translation) return;

  const state = ensureTranslationState(postId);
  const textNode = document.getElementById(`post-text-${postId}`);
  const badgeNode = document.getElementById(`post-translation-badge-${postId}`);
  const buttonNode = document.getElementById(`post-translation-btn-${postId}`);

  if (!textNode || !badgeNode || !buttonNode) return;

  const sourceLabel = translationLabels[post.translation.source] || "иностранного языка";

  if (state.showOriginal) {
    textNode.textContent = post.translation.original;
    badgeNode.textContent = `Оригинал: ${sourceLabel}`;
    buttonNode.textContent = "Показать перевод";
  } else {
    textNode.textContent = post.text;
    badgeNode.textContent = `Переведено с ${sourceLabel}`;
    buttonNode.textContent = "Показать оригинал";
  }

  buttonNode.disabled = false;
}

function togglePostTranslation(postId) {
  const post = fitoFeed.find((item) => item.id === postId);
  if (!post || !post.translation) return;

  const state = ensureTranslationState(postId);
  if (state.loading) return;

  const buttonNode = document.getElementById(`post-translation-btn-${postId}`);
  if (!buttonNode) return;

  state.loading = true;
  buttonNode.disabled = true;
  buttonNode.textContent = "Перевод...";

  if (state.timer) {
    clearTimeout(state.timer);
  }

  state.timer = setTimeout(() => {
    state.loading = false;
    state.showOriginal = !state.showOriginal;
    updatePostTranslationUI(postId);
  }, 900);
}

window.togglePostTranslation = togglePostTranslation;

function renderCommentItem(comment) {
  return `
    <div class="comment-item">
      <div class="comment-author">${escapeHtml(comment.author)}</div>
      <div class="comment-text">${escapeHtml(comment.text)}</div>
    </div>
  `;
}

function getRandomUniqueIndexes(length, count) {
  const available = Array.from({ length }, (_, i) => i);
  return shuffleArray(available).slice(0, Math.min(count, available.length));
}

function buildCommentObjects(post, indexes) {
  const comments = getCommentsForPost(post);
  return indexes.map((index) => ({
    author: getRandomName(),
    text: comments[index]
  }));
}

function clearAllTimers() {
  Object.values(commentState).forEach((state) => {
    if (state && state.timer) clearTimeout(state.timer);
  });

  Object.values(translationState).forEach((state) => {
    if (state && state.timer) clearTimeout(state.timer);
  });
}

function setCommentButtonState(button, state) {
  if (!button) return;

  if (state === "idle") {
    button.disabled = false;
    button.textContent = "Загрузить ещё";
  } else if (state === "loading") {
    button.disabled = true;
    button.textContent = "Загрузка...";
  } else if (state === "error") {
    button.disabled = false;
    button.textContent = "Попробовать снова";
  }
}

function renderCommentsBlock(post) {
  const comments = getCommentsForPost(post);
  if (!comments.length) return "";

  const initialCount = Math.min(comments.length, Math.random() < 0.5 ? 1 : 2);
  const initialIndexes = getRandomUniqueIndexes(comments.length, initialCount);

  commentState[post.id] = {
    loading: false,
    timer: null
  };

  const initialHtml = buildCommentObjects(post, initialIndexes)
    .map(renderCommentItem)
    .join("");

  return `
    <div class="post-comments" id="comments-${post.id}">
      <div class="comments-list">${initialHtml}</div>
      <button class="comments-more" type="button" onclick="loadMoreComments(${post.id})">
        Загрузить ещё
      </button>
    </div>
  `;
}

function failCommentsLoading(postId) {
  const state = commentState[postId];
  const block = document.getElementById(`comments-${postId}`);
  if (!state || !block) return;

  const button = block.querySelector(".comments-more");
  let errorNode = block.querySelector(".comments-error");

  state.loading = false;

  if (!errorNode) {
    errorNode = document.createElement("div");
    errorNode.className = "comments-error";
    errorNode.textContent = "Не удалось загрузить ещё комментарии";
    block.appendChild(errorNode);
  } else {
    errorNode.textContent = "Не удалось загрузить ещё комментарии";
  }

  setCommentButtonState(button, "error");
}

function startFakeCommentsLoading(postId) {
  const state = commentState[postId];
  const block = document.getElementById(`comments-${postId}`);
  if (!state || !block || state.loading) return;

  const button = block.querySelector(".comments-more");
  const oldError = block.querySelector(".comments-error");
  if (oldError) oldError.remove();

  state.loading = true;
  setCommentButtonState(button, "loading");

  state.timer = setTimeout(() => {
    failCommentsLoading(postId);
  }, 60000);
}

function loadMoreComments(postId) {
  const state = commentState[postId];
  if (!state || state.loading) return;
  startFakeCommentsLoading(postId);
}

window.loadMoreComments = loadMoreComments;

function generatePosts() {
  injectFitoStyles();
  clearAllTimers();

  Object.keys(commentState).forEach((key) => delete commentState[key]);
  Object.keys(translationState).forEach((key) => delete translationState[key]);

  const feedContainer = document.getElementById("fito-feed");
  if (!feedContainer) return;

  const shuffledFeed = [...fitoFeed].sort(() => 0.5 - Math.random());
  let feedHTML = "";

  shuffledFeed.forEach((post, index) => {
    const randomTimestamp = getRandomTime();
    const authorName = post.fixedAuthor ? post.fixedAuthor : getRandomName();
    const authorAvatar = post.fixedAvatar
      ? post.fixedAvatar
      : `https://i.pravatar.cc/100?u=${post.id}_${index}`;

    let html = `
      <div class="post-card">
        <div class="post-header">
          <img src="${authorAvatar}" class="post-header-avatar" alt="${escapeHtml(authorName)}">
          <div class="post-author-info">
            <div class="post-author">${escapeHtml(authorName)}</div>
            <div class="post-time">${randomTimestamp}</div>
          </div>
        </div>
        ${renderPostText(post)}
    `;

    if (post.imageVariants > 0 && post.imageCategory && post.imageFormat) {
      const randomPhotoId = Math.floor(Math.random() * post.imageVariants) + 1;
      const finalImageUrl = `${post.imageCategory}_${randomPhotoId}${post.imageFormat}`;
      html += `<img src="${finalImageUrl}" class="post-image" alt="post image" onerror="this.style.display='none'">`;
    }

    html += renderCommentsBlock(post);
    html += `</div>`;
    feedHTML += html;
  });

  feedHTML += `
    <div style="text-align: center; padding: 30px 20px; color: var(--text-secondary);">
      <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: var(--accent-color); margin-bottom: 12px;">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
      </svg>
      <h3 style="color: var(--text-primary); font-size: 16px; margin-bottom: 8px;">Вы всё прочитали</h3>
      <p style="font-size: 14px; line-height: 1.5;">Новых постов пока нет. <br>Fito напоминает: сделайте перерыв, выйдите на улицу, погуляйте.</p>
    </div>
  `;

  feedContainer.innerHTML = feedHTML;
}

window.generatePosts = generatePosts;

window.addEventListener("DOMContentLoaded", () => {
  generatePosts();

  if (typeof window.openTab === "function") {
    const originalOpenTab = window.openTab;
    window.openTab = function(tabType, element) {
      originalOpenTab(tabType, element);
      if (tabType === "feed") {
        generatePosts();
      }
    };
  }
});