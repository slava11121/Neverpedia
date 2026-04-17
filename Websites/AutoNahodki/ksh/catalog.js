// === ЧАСТЬ 1 / 3 ===
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
  // ksh city-list
  'Кора',
  'Мiрi',
  'Городника Д',
  'Автово',
  'Мальта',
  'Варар',
  'Ламия',
  'Форта',
  'Лючи',
  'Домья Маги',
  'Домья Нагари',
  'Олена',
  'Орегор',
  'Домья Эти',
  'Шентахор',
  'Малино',
  'Полюс-Сев',
  'Андрой',
  'Село Перяно',
  'Водке',
  'Газоно',
  'Деревня М',
  'Цень',
];

const IMAGE_BASE_PATH = '../';

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
  // ===== KIVISH / F-KAP =====
  {
    brand: 'F-KAP',
    model: 'Chihuahua',
    generation: '',
    folder: 'F-KAP Chihuahua',
    photos: 3,
    years: [1979, 1980, 1981, 1982, 1983],
    engines: ['W12 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'купе',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 2
  },
  {
    brand: 'F-KAP',
    model: 'Fokat',
    generation: 'B202',
    folder: 'F-KAP Fokat B202',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['3.0 дизель', '3.2 дизель', '3.5 бензин'],
    gearboxes: ['автомат'],
    drives: ['полный'],
    body: 'внедорожник',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 55
  },
  {
    brand: 'F-KAP',
    model: 'Gerri',
    generation: 'Gen1',
    folder: 'F-KAP Gerri 1975',
    photos: 3,
    years: [1975, 1976, 1977, 1978, 1979],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'F-KAP',
    model: 'Gerri',
    generation: 'Gen2',
    folder: 'F-KAP Gerri 1990',
    photos: 3,
    years: [1990, 1991, 1992, 1993, 1994],
    engines: ['1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 95
  },
  {
    brand: 'F-KAP',
    model: 'Gerri',
    generation: 'Gen4',
    folder: 'F-KAP Gerri 2010',
    photos: 3,
    years: [2009, 2010, 2011, 2012],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 90
  },
  {
    brand: 'F-KAP',
    model: 'Go',
    generation: '',
    folder: 'F-KAP Go',
    photos: 3,
    years: [1948, 1950, 1952, 1955, 1958],
    engines: ['4-цилиндровый бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'F-KAP',
    model: 'Luna',
    generation: 'Gen1',
    folder: 'F-KAP Luna 2025',
    photos: 4,
    years: [2025, 2026],
    engines: ['1.8 гибрид', '2.0 гибрид'],
    gearboxes: ['автомат'],
    drives: ['передний', 'полный'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'F-KAP',
    model: 'Malina',
    generation: 'Gen3',
    folder: 'F-KAP Malina 1990',
    photos: 3,
    years: [1989, 1990, 1991, 1992, 1993],
    engines: ['2.5 бензин', '3.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['задний'],
    body: 'купе',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 22
  },
  {
    brand: 'F-KAP',
    model: 'Malina',
    generation: 'Gen5',
    folder: 'F-KAP Malina 2010',
    photos: 3,
    years: [2009, 2010, 2011, 2012],
    engines: ['3.0 бензин', '3.5 бензин'],
    gearboxes: ['автомат'],
    drives: ['задний', 'полный'],
    body: 'купе',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 36
  },
  {
    brand: 'F-KAP',
    model: 'Shik',
    generation: '20',
    folder: 'F-KAP Shik 20',
    photos: 2,
    years: [1960, 1961, 1962, 1963, 1964],
    engines: ['1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 40
  },
  {
    brand: 'F-KAP',
    model: 'Tref',
    generation: 'Gen1',
    folder: 'F-KAP Tref 2000',
    photos: 3,
    years: [2000, 2001, 2002, 2003],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний', 'полный'],
    body: 'универсал',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 75
  },
  {
    brand: 'F-KAP',
    model: 'Tref',
    generation: 'Gen5',
    folder: 'F-KAP Tref 2010',
    photos: 3,
    years: [2010, 2011, 2012],
    engines: ['2.0 бензин', '2.2 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний', 'полный'],
    body: 'универсал',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 65
  },
  {
    brand: 'F-KAP',
    model: 'Tref',
    generation: 'Gen11',
    folder: 'F-KAP Tref 2020',
    photos: 3,
    years: [2020, 2021, 2022],
    engines: ['2.0 турбо', '2.2 дизель'],
    gearboxes: ['автомат'],
    drives: ['полный'],
    body: 'универсал',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 25
  },
  {
    brand: 'F-KAP',
    model: 'Vacation',
    generation: 'Gen1',
    folder: 'F-KAP Vacation 1990',
    photos: 3,
    years: [1990, 1991, 1992, 1993],
    engines: ['V6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'F-KAP',
    model: 'Vacation',
    generation: 'Gen3',
    folder: 'F-KAP Vacation 2000',
    photos: 3,
    years: [2000, 2001, 2002, 2003],
    engines: ['1.8 бензин', '2.0 бензин', 'V6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'универсал',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'F-KAP',
    model: 'Vacation',
    generation: 'Gen5',
    folder: 'F-KAP Vacation 2010',
    photos: 3,
    years: [2009, 2010, 2011, 2012],
    engines: ['1.8 бензин', '2.0 бензин', '2.0 гибрид'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'универсал',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 90
  },

  // ===== TARIFA / TARIFA AUTO =====
  {
    brand: 'Tarifa',
    model: 'Dart',
    generation: 'Gen1',
    folder: 'Tarifa Dart 2005',
    photos: 3,
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
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
    model: 'FGR2',
    generation: '',
    folder: 'Tarifa FGR2',
    photos: 3,
    years: [1984, 1985, 1986, 1987],
    engines: ['2.0 дизель', '2.2 дизель'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'фургон',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 35
  },
 {
  brand: 'Tarifa',
  model: 'Misi-N',
  generation: 'Gen1',
  folder: 'Tarifa Misi-N 2011',
  photos: 3,
  years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  engines: ['1.0 бензин', '1.2 бензин'],
  gearboxes: ['механика'],
  drives: ['передний'],
  body: 'хэтчбек',
  typeOptions: ['private', 'found'],
  cities: allCities,
  spawnWeight: 80,
  priceMin: 50000,
  priceMax: 190000,
  descriptionText: 'Бюджетный городской автомобиль Tarifa Auto. Нужен обычный осмотр перед покупкой, машина относится к дешёвому массовому сегменту.'
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
    spawnWeight: 30
  },

  {
    brand: 'Tsundere',
    model: 'A230',
    generation: '',
    folder: 'Tsundere A230',
    photos: 3,
    years: [1981, 1982, 1983, 1984, 1985],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 11
  },

  // ===== FOREIGN / USSR / RUSSIA / CHINA / JAPAN / KOREA / EUROPE / USA =====
    {
    brand: 'Chevrolet',
    model: 'Cruze',
    generation: 'J300',
    folder: 'Chevrolet Cruze 2013',
    photos: 3,
    years: [2013, 2014, 2015],
    engines: ['1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 55
  },
  {
    brand: 'Ford',
    model: 'Focus',
    generation: 'II',
    folder: 'Ford Focus 2008',
    photos: 3,
    years: [2007, 2008, 2009],
    engines: ['1.6 бензин', '1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 60
  },
  {
    brand: 'Ford',
    model: 'Focus',
    generation: 'III',
    folder: 'Ford Focus 2012',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['1.6 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'Ford',
    model: 'Focus',
    generation: 'IV',
    folder: 'Ford Focus 2018',
    photos: 3,
    years: [2017, 2018, 2019],
    engines: ['1.5 турбо', '2.0 бензин'],
    gearboxes: ['автомат', 'механика'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'GAZ',
    model: 'Volga',
    generation: '24',
    folder: 'Gaz 24',
    photos: 3,
    years: [1970, 1971, 1972, 1973, 1974],
    engines: ['2.4 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 25
  },
  {
    brand: 'GAZ',
    model: 'M20',
    generation: '',
    folder: 'Gaz M20',
    photos: 3,
    years: [1949, 1950, 1951, 1952, 1953],
    engines: ['2.1 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 8
  },
  {
    brand: 'GAZ',
    model: 'Volga',
    generation: '31105',
    folder: 'GAZ Volga 31105',
    photos: 3,
    years: [2004, 2005, 2006, 2007],
    engines: ['2.3 бензин', '2.4 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 30
  },
  {
    brand: 'Haval',
    model: 'H6',
    generation: '',
    folder: 'Haval H6',
    photos: 3,
    years: [2018, 2019, 2020, 2021],
    engines: ['1.5 турбо', '2.0 турбо'],
    gearboxes: ['автомат'],
    drives: ['передний', 'полный'],
    body: 'кроссовер',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 40
  },
  {
    brand: 'Honda',
    model: 'Civic',
    generation: 'VI',
    folder: 'Honda Civic 2000',
    photos: 3,
    years: [1999, 2000, 2001],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 35
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
    spawnWeight: 45
  },
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
    spawnWeight: 85
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
    spawnWeight: 60
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
    spawnWeight: 65
  },
  {
    brand: 'Lada',
    model: 'Priora',
    generation: '',
    folder: 'Lada Priora',
    photos: 3,
    years: [2008, 2009, 2010, 2011, 2012],
    engines: ['1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 75
  },
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
    spawnWeight: 45
  },
  {
    brand: 'Lada',
    model: 'Vesta',
    generation: '',
    folder: 'Lada Vesta',
    photos: 3,
    years: [2016, 2017, 2018, 2019],
    engines: ['1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 70
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
    spawnWeight: 35
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
    spawnWeight: 20
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
    spawnWeight: 45
  },
  {
    brand: 'Renault',
    model: 'Logan',
    generation: 'I',
    folder: 'Renault Logan 2008',
    photos: 3,
    years: [2007, 2008, 2009],
    engines: ['1.4 бензин', '1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 80
  },
  {
    brand: 'Renault',
    model: 'Logan',
    generation: 'II',
    folder: 'Renault Logan 2013',
    photos: 3,
    years: [2012, 2013, 2014],
    engines: ['1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 75
  },
  {
    brand: 'Skoda',
    model: 'Octavia',
    generation: '',
    folder: 'Skoda Octavia',
    photos: 3,
    years: [2010, 2012, 2014, 2016],
    engines: ['1.6 бензин', '1.8 турбо', '2.0 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'лифтбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 50
  },
  {
    brand: 'Toyota',
    model: 'Camry',
    generation: 'V30',
    folder: 'Toyota Camry 1990',
    photos: 3,
    years: [1989, 1990, 1991],
    engines: ['2.0 бензин', '2.5 бензин'],
    gearboxes: ['автомат', 'механика'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 18
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
    spawnWeight: 30
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
    spawnWeight: 40
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: 'AE90',
    folder: 'Toyota Corolla 1990',
    photos: 3,
    years: [1989, 1990, 1991],
    engines: ['1.3 бензин', '1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 30
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: ['E110'],
    folder: 'Toyota Corolla 2000',
    photos: 3,
    years: [1999, 2000, 2001],
    engines: ['1.4 бензин', '1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 65
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
    spawnWeight: 70
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    generation: 'VI',
    folder: 'Volkswagen Golf 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.4 турбо', '1.6 бензин', '2.0 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    typeOptions: ['private', 'found'],
    cities: allCities,
    spawnWeight: 45
  }
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getImagePath(car, photoNumber) {
  return `${IMAGE_BASE_PATH}${car.folder}/${photoNumber}.jpg`;
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
    case 'Tarifa Misi-N 2011': return 0.35;
    // === ЧАСТЬ 3 / 3 ===
    case 'Lada Riva': return 0.55;
    case 'Lada Priora': return 0.70;
    case 'Renault Logan 2008': return 0.72;
    case 'Renault Logan 2013': return 0.82;
    case 'Lada Vesta': return 0.90;

    case 'Ford Focus 2008': return 0.95;
    case 'Ford Focus 2012': return 1.00;
    case 'Ford Focus 2018': return 1.10;
    case 'Hyundai Solaris 2012': return 0.95;
    case 'Kia Rio 2008': return 0.90;
    case 'Toyota Corolla 1990': return 0.90;
    case 'Toyota Corolla 2000': return 1.00;
    case 'Toyota Corolla 2010': return 1.08;
    case 'Skoda Octavia': return 1.05;
    case 'Volkswagen Golf 2010': return 1.05;
    case 'Nissan Sunny 2010': return 0.95;

    case 'Honda Civic 2000': return 1.05;
    case 'Honda Civic 2010': return 1.12;
    case 'Chevrolet Cruze 2013': return 1.00;
    case 'Chevrolet Cruze 2016': return 1.00;
    case 'Mitsubishi Outlander 2012': return 1.25;
    case 'Haval H6': return 1.20;
    case 'Lada Niva': return 1.05;

    case 'Toyota Camry 1990': return 1.10;
    case 'Toyota Camry 2000': return 1.22;
    case 'Toyota Camry 2010': return 1.35;
    case 'GAZ Volga 31105': return 0.95;

    case 'Gaz 24': return 0.75;
    case 'Gaz M20': return 1.15;
    case 'Moskvich 2141': return 0.60;

    case 'F-KAP Go': return 0.95;
    case 'F-KAP Gerri 1975': return 0.85;
    case 'F-KAP Gerri 1990': return 0.95;
    case 'F-KAP Gerri 2010': return 1.00;
    case 'F-KAP Vacation 1990': return 0.90;
    case 'F-KAP Vacation 2000': return 1.00;
    case 'F-KAP Vacation 2010': return 1.05;
    case 'F-KAP Tref 2000': return 1.00;
    case 'F-KAP Tref 2010': return 1.10;
    case 'F-KAP Tref 2020': return 1.28;
    case 'F-KAP Fokat B202': return 1.35;
    case 'F-KAP Luna 2025': return 1.30;
    case 'F-KAP Malina 1990': return 1.55;
    case 'F-KAP Malina 2010': return 1.75;
    case 'F-KAP Chihuahua': return 4.50;

    case 'Tarifa FGR2': return 0.85;
    case 'Tarifa Dart 2005': return 1.00;
    case 'Tarifa Style': return 1.15;

    default: return 1.0;
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
    baseMin = 1200000;
    baseMax = 2600000;
  } else if (year >= 2020) {
    baseMin = 850000;
    baseMax = 1900000;
  } else if (year >= 2015) {
    baseMin = 550000;
    baseMax = 1350000;
  } else if (year >= 2010) {
    baseMin = 350000;
    baseMax = 950000;
  } else if (year >= 2005) {
    baseMin = 250000;
    baseMax = 700000;
  } else if (year >= 2000) {
    baseMin = 200000;
    baseMax = 550000;
  } else if (year >= 1990) {
    baseMin = 160000;
    baseMax = 420000;
  } else if (year >= 1970) {
    baseMin = 130000;
    baseMax = 320000;
  } else {
    baseMin = 120000;
    baseMax = 280000;
  }

  let price = randomInt(baseMin, baseMax);

  if (body === 'внедорожник' || body === 'кроссовер') {
    price += randomInt(90000, 260000);
  }

  if (body === 'фургон') {
    price += randomInt(50000, 180000);
  }

  if (body === 'купе') {
    price += randomInt(100000, 320000);
  }

  if (body === 'универсал') {
    price += randomInt(20000, 90000);
  }

  price = Math.round(price * getModelPriceModifier(car));

  if (type === 'found') {
    price -= randomInt(30000, 120000);
  }

  return Math.max(9000, price);
}

function generateMileage(year) {
  if (year >= 2025) return randomInt(8000, 45000);
  if (year >= 2020) return randomInt(18000, 105000);
  if (year >= 2015) return randomInt(45000, 165000);
  if (year >= 2010) return randomInt(75000, 230000);
  if (year >= 2000) return randomInt(110000, 310000);
  if (year >= 1990) return randomInt(130000, 360000);
  if (year >= 1970) return randomInt(120000, 580000);
  return randomInt(260000, 700000);
}

function generateDescription(car, engine, gearbox) {
  if (car && car.descriptionText) {
    return car.descriptionText;
  }

  const privateTexts = [
    'Ходен, без сроч-ремтур; осмотр en локата.',
    'Маш-ходен; продаж как есть.',
    'Норм-жив для свой год; лич-осмотр луч.',
    'Док-лист чист; тех-узлы без крит-лом.',
    'Кузов i салон норм; есть обыч след-экспл.',
    'Ходила спок; без гон-узла; обмен neо.',
    'Для свой вiк looks норм; торг en осмотр.',
    'Нео нова, но адек-ход; всё на локата.',
    'Есть мел вiк-моменты; нич unusual for this модел.',
    'День-ход вариант; без лиш-сказ; смотри live.'
  ];

  const foundTexts = [
    'Автомаш лежит en нахад-катег путiн-сред.',
    'Авиз выложен сервисом en нахад-автомаш раздел.',
    'Карточ-узел собран площадкой для нахад-автомаш.',
    'Автомаш добав en нахад-баз.',
    'Пози laid сервисом en нахад-раздел.',
    'Авиз belongs to нахад-путiн-катег.',
    'Инфо laid площадкой en нахад-автомаш лист.',
    'Карточка set сервисом as нахад-автомаш.',
    'Объект shown en нахад-катег путiн-сред.',
    'Автомаш added en нахад-катал.'
  ];

  const privateExtraTexts = [
    'По кузов there may be мел-вiк след.',
    'Салон plain-ход, обыч сост.',
    'Ход-узел i тех better check live.',
    'Для свой год looks норм.',
    'Торг only post осмотр.',
    'Нео музей; жив-маш.',
    'Good for day-ход use.',
    'Док-уточн en локата.',
    'Есть nat-след экспл.',
    'Live-view better than one photo.'
  ];

  const foundExtraTexts = [
    'Опис has справ-line nature.',
    'Свед shown as сервис-card.',
    'Внеш-ход i тех-ход check en осмотр.',
    'Инфо given by площадка, no owner-voice.',
    'Дан shown in сервис-post format.',
    'Характер shown from card-base.',
    'Параметр laid in площадка-catalog form.',
    'Pre-buy лич-check needed.',
    'Сервис posts basic инфо on автомаш.',
    'Осмотр advised before buy-decision.'
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
  const price = generatePrice(year, car.type, car.body, car);
  const description = generateDescription(car, engine, gearbox);
  const badgeText = car.type === 'found' ? 'Нахад' : 'Приват';
  const badgeClass = car.type === 'found' ? 'red' : '';
  const priceLabel = car.type === 'found' ? 'кoшт-площад' : 'кoшт-продав';
  const metaText = car.type === 'found'
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
          <div class="spec"><b>Двиг</b><span>${engine}</span></div>
          <div class="spec"><b>Короб</b><span>${gearbox}</span></div>
          <div class="spec"><b>Прив</b><span>${drive}</span></div>
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

  // как часто вообще разрешаем повторы
  if (roll < 0.65) {
    duplicateCount = 0; // чаще всего вообще без дублей
  } else if (roll < 0.92) {
    duplicateCount = 1; // иногда один дубль
  } else {
    duplicateCount = 2; // редко два дубля
  }

  const uniqueCount = limit - duplicateCount;

  // сначала набираем уникальные модели
  const uniqueCars = pickWeightedCars(carsBase, uniqueCount);
  currentCars = [...uniqueCars];

  // кандидаты на дубль — только те, у кого больше одной фотки
  const duplicateCandidates = uniqueCars.filter(car => car.photos > 1);

  for (let i = 0; i < duplicateCount; i++) {
    if (duplicateCandidates.length === 0) break;

    const index = randomInt(0, duplicateCandidates.length - 1);
    const duplicateCar = duplicateCandidates.splice(index, 1)[0];

    // вставляем дубль в случайное место списка
    const insertAt = randomInt(0, currentCars.length);
    currentCars.splice(insertAt, 0, duplicateCar);
  }

  // если вдруг чего-то не хватило — добиваем уникальными
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
  const badgeText = car.selectedType === 'found' ? 'Нахад' : 'Приват';
  const badgeClass = car.selectedType === 'found' ? 'red' : '';
  const priceLabel = car.selectedType === 'found' ? 'кoшт-площад' : 'кoшт-продав';
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
          <div class="spec"><b>Двиг</b><span>${car.selectedEngine}</span></div>
          <div class="spec"><b>Короб</b><span>${car.selectedGearbox}</span></div>
          <div class="spec"><b>Прив</b><span>${car.selectedDrive}</span></div>
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
  resultsText.textContent = `Показ ${filteredCars.length} авиз`;
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