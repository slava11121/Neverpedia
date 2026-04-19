const filtersToggle = document.getElementById('filtersToggle');
const filtersPanel = document.getElementById('filtersPanel');
const langToggle = document.getElementById('langToggle');
const langPanel = document.getElementById('langPanel');

const carsGrid = document.getElementById('carsGrid');
const resultsText = document.getElementById('resultsText');

const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const cityFilter = document.getElementById('cityFilter');
const priceFilter = document.getElementById('priceFilter');
const gearboxFilter = document.getElementById('gearboxFilter');
const sortSelect = document.getElementById('sortSelect');

const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const rerollCarsBtn = document.getElementById('rerollCars');

filtersToggle.addEventListener('click', () => {
  filtersPanel.classList.toggle('open');
  langPanel.classList.remove('open');
});

langToggle.addEventListener('click', () => {
  langPanel.classList.toggle('open');
  filtersPanel.classList.remove('open');
});

document.addEventListener('click', (e) => {
  const insideLang = e.target.closest('.lang-wrap');
  const insideFilters = e.target.closest('#filtersPanel') || e.target.closest('#filtersToggle');

  if (!insideLang) langPanel.classList.remove('open');
  if (!insideFilters) filtersPanel.classList.remove('open');
});

const allCities = [
  'Пхеньян',
  'Хамхын',
  'Чхонджин',
  'Синыйджу',
  'Вонсан',
  'Кэсон',
  'Саривон',
  'Хесан',
  'Нампхо',
  'Канге'
];

function pickWeightedCars(cars, limit) {
  const pool = [...cars];
  const result = [];

  while (pool.length > 0 && result.length < limit) {
    const totalWeight = pool.reduce((sum, car) => sum + (car.spawnWeight || 50), 0);
    let roll = Math.random() * totalWeight;

    let pickedIndex = 0;

    for (let i = 0; i < pool.length; i++) {
      roll -= (pool[i].spawnWeight || 50);
      if (roll <= 0) {
        pickedIndex = i;
        break;
      }
    }

    result.push(pool[pickedIndex]);
    pool.splice(pickedIndex, 1);
  }

  return result;
}

const carsBase = [
  // ===== OLD ELITE / PRE-2011 =====
  {
    brand: 'Mercedes-Benz',
    model: '190',
    generation: 'W201',
    folder: 'Mercedes-Benz 190 W201',
    photos: 3,
    years: [1984, 1986, 1988, 1990, 1992],
    engines: ['2.0 бензин', '2.3 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 12
  },
  {
    brand: 'Kaengsaeng',
    model: '88',
    generation: '',
    folder: 'Kaengsaeng 88',
    photos: 3,
    years: [1988, 1989, 1990, 1991, 1992],
    engines: ['2.0 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 10
  },
  {
    brand: 'Pyeonghwa',
    model: 'Junma',
    generation: '',
    folder: 'Pyeonghwa Junma',
    photos: 3,
    years: [2005, 2006, 2007, 2008, 2009, 2010],
    engines: ['2.8 бензин', '3.2 бензин'],
    gearboxes: ['автомат'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 9
  },
  {
    brand: 'Mercedes-Benz',
    model: 'Limousine',
    generation: '',
    folder: 'Mercedes-Benz Limousine',
    photos: 3,
    years: [1995, 1998, 2001, 2004, 2008],
    engines: ['4.2 бензин', '5.0 бензин'],
    gearboxes: ['автомат'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 2
  },

  // ===== OLD MASS / PRE-2011 =====
  {
    brand: 'Lada',
    model: 'Riva',
    generation: '',
    folder: 'Lada Riva',
    photos: 3,
    years: [1983, 1988, 1992, 2001, 2004, 2007],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'Lada',
    model: 'Niva',
    generation: 'Legend',
    folder: 'Lada Niva',
    photos: 3,
    years: [1998, 2002, 2005, 2008, 2010],
    engines: ['1.7 бензин'],
    gearboxes: ['механика'],
    drives: ['полный'],
    body: 'внедорожник',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'GAZ',
    model: 'Volga',
    generation: '24',
    folder: 'Gaz 24',
    photos: 3,
    years: [1970, 1974, 1978, 1982, 1986],
    engines: ['2.4 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 45
  },
  {
    brand: 'Moskvich',
    model: '2141',
    generation: '',
    folder: 'Moskvich 2141',
    photos: 3,
    years: [1991, 1994, 1998, 2001],
    engines: ['1.6 бензин', '1.7 бензин'],
    gearboxes: ['механика'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 40
  },

  // ===== POST-2011 BASE =====
  {
    brand: 'Tarifa',
    model: 'Misi-N',
    generation: 'Gen1',
    folder: 'Tarifa Misi-N 2011',
    photos: 8,
    years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    engines: ['1.0 бензин', '1.2 бензин'],
    gearboxes: ['механика'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 120,
    priceMin: 50000,
    priceMax: 170000,
    descriptionText: 'Бюджетный городской автомобиль Tarifa Auto. Один из самых массовых вариантов для ККП, перед покупкой рекомендуется обычный осмотр.'
  },
  {
    brand: 'Tarifa',
    model: 'Dart',
    generation: 'Gen1',
    folder: 'Tarifa Dart 2005',
    photos: 3,
    years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    engines: ['2.0 дизель', '2.2 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['задний'],
    body: 'фургон',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 75
  },
  {
    brand: 'Tarifa',
    model: 'Style',
    generation: '',
    folder: 'Tarifa Style',
    photos: 3,
    years: [2013, 2014, 2015, 2016, 2017],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 32
  },
  {
    brand: 'Tarifa',
    model: 'Minic',
    generation: '',
    folder: 'Tarifa Minic',
    photos: 3,
    years: [2026],
    engines: ['1.2 бензин', '1.4 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 28
  },
  {
    brand: 'Pyeonghwa',
    model: 'Hwiparam',
    generation: '',
    folder: 'Pyeonghwa Hwiparam',
    photos: 3,
    years: [2002, 2004, 2006, 2008, 2010],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 55
  },
  {
    brand: 'Pyeonghwa',
    model: 'Samchunri',
    generation: '',
    folder: 'Pyeonghwa Samchunri',
    photos: 3,
    years: [2005, 2007, 2009, 2011, 2013],
    engines: ['2.0 бензин', '2.4 бензин', '2.5 дизель'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'фургон',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 45
  },

  // ===== JAPANESE IMPORTS =====
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: 'E110',
    folder: 'Toyota Corolla 2000',
    photos: 3,
    years: [1999, 2000, 2001, 2002],
    engines: ['1.4 бензин', '1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 95
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: 'E140',
    folder: 'Toyota Corolla 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.4 бензин', '1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'Toyota',
    model: 'Camry',
    generation: 'XV20',
    folder: 'Toyota Camry 2000',
    photos: 3,
    years: [1999, 2000, 2001],
    engines: ['2.2 бензин', '2.4 бензин', '3.0 бензин'],
    gearboxes: ['автомат', 'механика'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'Toyota',
    model: 'Camry',
    generation: 'XV40',
    folder: 'Toyota Camry 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['2.4 бензин', '2.5 бензин', '3.5 бензин'],
    gearboxes: ['автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 28
  },
  {
    brand: 'Nissan',
    model: 'Sunny',
    generation: 'N17',
    folder: 'Nissan Sunny 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 75
  },
  {
    brand: 'Honda',
    model: 'Civic',
    generation: 'VIII',
    folder: 'Honda Civic 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 55
  },
  {
    brand: 'Mitsubishi',
    model: 'Outlander',
    generation: 'III',
    folder: 'Mitsubishi Outlander 2012',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['2.0 бензин', '2.4 бензин', '3.0 бензин'],
    gearboxes: ['автомат'],
    drives: ['передний', 'полный'],
    body: 'кроссовер',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 24
  },

  // ===== SOME KOREAN CARS =====
  {
    brand: 'Hyundai',
    model: 'Solaris',
    generation: 'I',
    folder: 'Hyundai Solaris 2012',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['1.4 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 48
  },
  {
    brand: 'Kia',
    model: 'Rio',
    generation: 'II',
    folder: 'Kia Rio 2008',
    photos: 3,
    years: [2007, 2008, 2009],
    engines: ['1.4 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 42
  }
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getImagePath(car, photoNumber) {
  return `${car.folder}/${photoNumber}.jpg`;
}

function getUniquePhotoNumber(car, usedPhotosByFolder) {
  const key = car.folder;

  if (!usedPhotosByFolder[key]) {
    usedPhotosByFolder[key] = [];
  }

  const availablePhotos = [];

  for (let i = 1; i <= car.photos; i++) {
    if (!usedPhotosByFolder[key].includes(i)) {
      availablePhotos.push(i);
    }
  }

  let photoNumber;

  if (availablePhotos.length > 0) {
    photoNumber = randomItem(availablePhotos);
  } else {
    photoNumber = randomInt(1, car.photos);
  }

  usedPhotosByFolder[key].push(photoNumber);
  return photoNumber;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getModelPriceModifier(car) {
  const key = `${car.brand} ${car.model}${car.generation ? ' ' + car.generation : ''}`;

  switch (key) {
    case 'Tarifa Misi-N Gen1': return 0.28;
    case 'Tarifa Dart Gen1': return 0.68;
    case 'Tarifa Style': return 0.88;
    case 'Tarifa Minic': return 0.92;

    case 'Lada Riva': return 0.50;
    case 'Lada Niva Legend': return 0.72;
    case 'GAZ Volga 24': return 0.62;
    case 'Moskvich 2141': return 0.52;

    case 'Toyota Corolla E110': return 0.85;
    case 'Toyota Corolla E140': return 0.90;
    case 'Toyota Camry XV20': return 1.00;
    case 'Toyota Camry XV40': return 1.08;
    case 'Nissan Sunny N17': return 0.82;
    case 'Honda Civic VIII': return 0.88;
    case 'Mitsubishi Outlander III': return 1.05;

    case 'Hyundai Solaris I': return 0.82;
    case 'Kia Rio II': return 0.80;

    case 'Pyeonghwa Hwiparam': return 0.78;
    case 'Pyeonghwa Samchunri': return 0.76;
    case 'Pyeonghwa Junma': return 1.40;

    case 'Mercedes-Benz 190 W201': return 1.18;
    case 'Kaengsaeng 88': return 1.22;
    case 'Mercedes-Benz Limousine': return 2.30;

    default: return 0.90;
  }
}

function generatePrice(year, type, body, car) {
  if (car && car.priceMin !== undefined && car.priceMax !== undefined) {
    let fixedPrice = randomInt(car.priceMin, car.priceMax);

    if (type === 'found') {
      fixedPrice -= randomInt(5000, 25000);
    }

    return Math.max(car.priceMin, fixedPrice);
  }

  let baseMin = 0;
  let baseMax = 0;

  if (year >= 2025) {
    baseMin = 950000;
    baseMax = 2100000;
  } else if (year >= 2020) {
    baseMin = 700000;
    baseMax = 1550000;
  } else if (year >= 2015) {
    baseMin = 420000;
    baseMax = 1050000;
  } else if (year >= 2010) {
    baseMin = 260000;
    baseMax = 760000;
  } else if (year >= 2005) {
    baseMin = 190000;
    baseMax = 560000;
  } else if (year >= 2000) {
    baseMin = 150000;
    baseMax = 420000;
  } else if (year >= 1990) {
    baseMin = 120000;
    baseMax = 320000;
  } else if (year >= 1970) {
    baseMin = 90000;
    baseMax = 260000;
  } else {
    baseMin = 90000;
    baseMax = 230000;
  }

  let price = randomInt(baseMin, baseMax);

  if (body === 'внедорожник' || body === 'кроссовер') {
    price += randomInt(70000, 180000);
  }

  if (body === 'фургон') {
    price += randomInt(35000, 120000);
  }

  if (body === 'купе') {
    price += randomInt(90000, 260000);
  }

  if (body === 'универсал') {
    price += randomInt(15000, 70000);
  }

  price = Math.round(price * getModelPriceModifier(car));

  if (type === 'found') {
    price -= randomInt(25000, 90000);
  }

  return Math.max(50000, price);
}

function generateMileage(year) {
  if (year >= 2025) return randomInt(5000, 35000);
  if (year >= 2020) return randomInt(15000, 90000);
  if (year >= 2015) return randomInt(35000, 155000);
  if (year >= 2010) return randomInt(70000, 220000);
  if (year >= 2000) return randomInt(100000, 320000);
  if (year >= 1990) return randomInt(140000, 420000);
  if (year >= 1970) return randomInt(180000, 620000);
  return randomInt(250000, 780000);
}

function generateDescription(car, engine, gearbox) {
  if (car && car.descriptionText) {
    return car.descriptionText;
  }

  const privateTexts = [
    'На ходу, продаётся в текущем состоянии.',
    'Обычное живое состояние, лучше смотреть лично.',
    'Для своего возраста выглядит нормально, без лишней сказки.',
    'Есть обычные следы эксплуатации, ничего необычного.',
    'Подойдёт как повседневный вариант, осмотр по месту.',
    'Не новая, но в рабочем состоянии, смотреть вживую.',
    'Продаётся как есть, без приукрашивания.',
    'Обычное частное объявление, состояние оценивать лично.'
  ];

  const foundTexts = [
    'Автомобиль размещён в категории найденных транспортных средств.',
    'Карточка сформирована сервисом для найденного автомобиля.',
    'Объявление опубликовано площадкой в разделе найденных автомобилей.',
    'Данный автомобиль внесён в каталог найденных транспортных средств.',
    'Информация размещена сервисом в формате карточки найденного автомобиля.'
  ];

  const privateExtraTexts = [
    'По кузову возможны возрастные моменты.',
    'Торг возможен после осмотра.',
    'Для своего года выглядит нормально.',
    'Лучше смотреть вживую, а не по фото.',
    'Есть естественные следы эксплуатации.'
  ];

  const foundExtraTexts = [
    'Описание носит справочный характер.',
    'Состояние уточняется при осмотре.',
    'Информация представлена площадкой без частной оценки владельца.',
    'Перед покупкой рекомендуется личная проверка состояния.',
    'Сервис публикует базовую информацию по автомобилю.'
  ];

  const mainText = car.type === 'found'
    ? randomItem(foundTexts)
    : randomItem(privateTexts);

  const extraText = car.type === 'found'
    ? randomItem(foundExtraTexts)
    : randomItem(privateExtraTexts);

  return `${mainText} ${extraText} ${engine}, ${gearbox}, кузов ${car.body}.`;
}

function createCarCard(car) {
  const year = randomItem(car.years);
  const engine = randomItem(car.engines);
  const gearbox = randomItem(car.gearboxes);
  const drive = randomItem(car.drives);
  const city = randomItem(car.cities);
  const photoNumber = randomInt(1, car.photos);
  const mileage = generateMileage(year);
  const type = randomItem(car.typeOptions || ['private']);
  const price = generatePrice(year, type, car.body, car);
  const description = generateDescription({ ...car, type }, engine, gearbox);
  const badgeText = type === 'found' ? 'Найденный' : 'Частное';
  const badgeClass = type === 'found' ? 'red' : '';
  const priceLabel = type === 'found' ? 'цена площадки' : 'цена продавца';
  const metaText = type === 'found'
    ? `Лот № ${randomInt(1000, 9999)}`
    : `Объявление № ${randomInt(10000, 99999)}`;

  const imagePath = getImagePath(car, photoNumber);
  const title = `${car.brand} ${car.model}${car.generation ? ` ${car.generation}` : ''}`;

  return `
    <article class="car-card">
      <div class="car-image-wrap">
        <img class="car-image" src="${imagePath}" alt="${title}">
        <div class="badge-row">
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>

      <div class="car-body">
        <div class="car-top">
          <div>
            <h2 class="car-title">${title}</h2>
            <div class="car-sub">${city} • ${year} • ${mileage.toLocaleString("ru-RU")} км</div>
          </div>

          <div class="price">
            <strong>${price.toLocaleString("ru-RU")} Ksh</strong>
            <span>${priceLabel}</span>
          </div>
        </div>

        <div class="specs">
          <div class="spec"><b>Двигатель</b><span>${engine}</span></div>
          <div class="spec"><b>Коробка</b><span>${gearbox}</span></div>
          <div class="spec"><b>Привод</b><span>${drive}</span></div>
          <div class="spec"><b>Кузов</b><span>${car.body}</span></div>
        </div>

        <div class="car-desc">${description}</div>

        <div class="car-actions">
          <div class="car-meta">${metaText}</div>
          <div class="mini-btns">
            <button class="mini-btn">В избранное</button>
            <button class="mini-btn red">Открыть</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

let currentCars = [];

function buildRandomCars(limit = 12) {
  let duplicateCount = 0;
  const roll = Math.random();

  if (roll < 0.65) {
    duplicateCount = 0;
  } else if (roll < 0.92) {
    duplicateCount = 1;
  } else {
    duplicateCount = 2;
  }

  const uniqueCount = limit - duplicateCount;

  const uniqueCars = pickWeightedCars(carsBase, uniqueCount);
  currentCars = [...uniqueCars];

  const duplicateCandidates = uniqueCars.filter(car => car.photos > 1);

  for (let i = 0; i < duplicateCount; i++) {
    if (duplicateCandidates.length === 0) break;

    let duplicateCar;

    const misiNIndex = duplicateCandidates.findIndex(
      car => car.brand === 'Tarifa' && car.model === 'Misi-N'
    );

    if (misiNIndex !== -1 && Math.random() < 0.75) {
      duplicateCar = duplicateCandidates.splice(misiNIndex, 1)[0];
    } else {
      const index = randomInt(0, duplicateCandidates.length - 1);
      duplicateCar = duplicateCandidates.splice(index, 1)[0];
    }

    const insertAt = randomInt(0, currentCars.length);
    currentCars.splice(insertAt, 0, duplicateCar);

    // если это Misi-N — добавляем ещё одну копию, чтобы было 3 штуки
    if (
      duplicateCar.brand === 'Tarifa' &&
      duplicateCar.model === 'Misi-N' &&
      currentCars.length < limit
    ) {
      const insertAtSecond = randomInt(0, currentCars.length);
      currentCars.splice(insertAtSecond, 0, duplicateCar);
    }
  }

  while (currentCars.length < limit) {
    const extraCar = pickWeightedCars(carsBase, 1)[0];
    if (!currentCars.includes(extraCar)) {
      currentCars.push(extraCar);
    }
  }

  currentCars = currentCars.slice(0, limit);
}

function getFilteredCars() {
  const search = searchInput.value.trim().toLowerCase();
  const type = typeFilter.value;
  const city = cityFilter.value;
  const maxPrice = Number(priceFilter.value || 0);
  const gearbox = gearboxFilter.value;

  const usedPhotosByFolder = {};

  let result = currentCars.map(car => {
    const year = randomItem(car.years);
    const engine = randomItem(car.engines);
    const selectedGearbox = randomItem(car.gearboxes);
    const drive = randomItem(car.drives);
    const selectedCity = randomItem(car.cities);
    const selectedType = randomItem(car.typeOptions || ['private']);
    const photoNumber = getUniquePhotoNumber(car, usedPhotosByFolder);
    const mileage = generateMileage(year);
    const price = generatePrice(year, selectedType, car.body, car);

    return {
      ...car,
      selectedYear: year,
      selectedEngine: engine,
      selectedGearbox,
      selectedDrive: drive,
      selectedCity,
      selectedType,
      selectedPhoto: photoNumber,
      selectedPrice: price,
      selectedMileage: mileage
    };
  });

  if (search) {
    result = result.filter(car => {
      const title = `${car.brand} ${car.model} ${car.generation}`.toLowerCase();
      return title.includes(search);
    });
  }

  if (type !== 'all') {
    result = result.filter(car => car.selectedType === type);
  }

  if (city !== 'all') {
    result = result.filter(car => car.selectedCity === city);
  }

  if (maxPrice > 0) {
    result = result.filter(car => car.selectedPrice <= maxPrice);
  }

  if (gearbox !== 'all') {
    result = result.filter(car => car.selectedGearbox === gearbox);
  }

  if (sortSelect.value === 'cheap') {
    result.sort((a, b) => a.selectedPrice - b.selectedPrice);
  }

  if (sortSelect.value === 'expensive') {
    result.sort((a, b) => b.selectedPrice - a.selectedPrice);
  }

  if (sortSelect.value === 'new') {
    result.sort((a, b) => b.selectedYear - a.selectedYear);
  }

  return result;
}

function createRenderedCard(car) {
  const badgeText = car.selectedType === 'found' ? 'Найденный' : 'Частное';
  const badgeClass = car.selectedType === 'found' ? 'red' : '';
  const priceLabel = car.selectedType === 'found' ? 'цена площадки' : 'цена продавца';
  const metaText = car.selectedType === 'found'
    ? `Лот № ${randomInt(1000, 9999)}`
    : `Объявление № ${randomInt(10000, 99999)}`;

  const imagePath = getImagePath(car, car.selectedPhoto);
  const title = `${car.brand} ${car.model}${car.generation ? ` ${car.generation}` : ''}`;
  const description = generateDescription(
    { ...car, type: car.selectedType },
    car.selectedEngine,
    car.selectedGearbox
  );

  return `
    <article class="car-card">
      <div class="car-image-wrap">
        <img class="car-image" src="${imagePath}" alt="${title}">
        <div class="badge-row">
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>

      <div class="car-body">
        <div class="car-top">
          <div>
            <h2 class="car-title">${title}</h2>
            <div class="car-sub">${car.selectedCity} • ${car.selectedYear} • ${car.selectedMileage.toLocaleString("ru-RU")} км</div>
          </div>

          <div class="price">
            <strong>${car.selectedPrice.toLocaleString("ru-RU")} Ksh</strong>
            <span>${priceLabel}</span>
          </div>
        </div>

        <div class="specs">
          <div class="spec"><b>Двигатель</b><span>${car.selectedEngine}</span></div>
          <div class="spec"><b>Коробка</b><span>${car.selectedGearbox}</span></div>
          <div class="spec"><b>Привод</b><span>${car.selectedDrive}</span></div>
          <div class="spec"><b>Кузов</b><span>${car.body}</span></div>
        </div>

        <div class="car-desc">${description}</div>

        <div class="car-actions">
          <div class="car-meta">${metaText}</div>
          <div class="mini-btns">
            <button class="mini-btn">В избранное</button>
            <button class="mini-btn red">Открыть</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCars() {
  const filteredCars = getFilteredCars();
  carsGrid.innerHTML = filteredCars.map(createRenderedCard).join('');
  resultsText.textContent = `Показано ${filteredCars.length} объявлений`;
}

applyFiltersBtn.addEventListener('click', renderCars);
sortSelect.addEventListener('change', renderCars);

resetFiltersBtn.addEventListener('click', () => {
  searchInput.value = '';
  typeFilter.value = 'all';
  cityFilter.value = 'all';
  priceFilter.value = '';
  gearboxFilter.value = 'all';
  sortSelect.value = 'new';
  renderCars();
});

rerollCarsBtn.addEventListener('click', () => {
  buildRandomCars(12);
  renderCars();
});

buildRandomCars(12);
renderCars();