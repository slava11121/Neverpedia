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
  'Кора',
  'Мири',
  'Город Д',
  'Автово',
  'Мальта',
  'Варар',
  'Ламья',
  'Форта',
  'Лючи',
  'Деревня Маги',
  'Деревня Нагари',
  'Олена',
  'Орегор',
  'Деревня Эти',
  'Шентахор',
  'Малино',
  'Полюс-Севера',
  'Андрой',
  'Село Перяное',
  'Водке',
  'Газоно',
  'Деревня М',
  'Цень',
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
    type: 'private',
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
    type: 'found',
    cities: allCities,
    spawnWeight: 55
  },
  {
    brand: 'F-KAP',
    model: 'Gerri',
    generation: '1975',
    folder: 'F-KAP Gerri 1975',
    photos: 3,
    years: [1975, 1976, 1977, 1978, 1979],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    type: 'found',
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'F-KAP',
    model: 'Gerri',
    generation: '1990',
    folder: 'F-KAP Gerri 1990',
    photos: 3,
    years: [1990, 1991, 1992, 1993, 1994],
    engines: ['1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 95
  },
  {
    brand: 'F-KAP',
    model: 'Gerri',
    generation: '2010',
    folder: 'F-KAP Gerri 2010',
    photos: 3,
    years: [2009, 2010, 2011, 2012],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
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
    type: 'found',
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'F-KAP',
    model: 'Luna',
    generation: '2025',
    folder: 'F-KAP Luna 2025',
    photos: 4,
    years: [2025, 2026],
    engines: ['1.8 гибрид', '2.0 гибрид'],
    gearboxes: ['автомат'],
    drives: ['передний', 'полный'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'F-KAP',
    model: 'Malina',
    generation: '1990',
    folder: 'F-KAP Malina 1990',
    photos: 3,
    years: [1989, 1990, 1991, 1992, 1993],
    engines: ['2.5 бензин', '3.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['задний'],
    body: 'купе',
    type: 'private',
    cities: allCities,
    spawnWeight: 22
  },
  {
    brand: 'F-KAP',
    model: 'Malina',
    generation: '2010',
    folder: 'F-KAP Malina 2010',
    photos: 3,
    years: [2009, 2010, 2011, 2012],
    engines: ['3.0 бензин', '3.5 бензин'],
    gearboxes: ['автомат'],
    drives: ['задний', 'полный'],
    body: 'купе',
    type: 'private',
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
    type: 'found',
    cities: allCities,
    spawnWeight: 40
  },
  {
    brand: 'F-KAP',
    model: 'Tref',
    generation: '2000',
    folder: 'F-KAP Tref 2000',
    photos: 3,
    years: [2000, 2001, 2002, 2003],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний', 'полный'],
    body: 'универсал',
    type: 'private',
    cities: allCities,
    spawnWeight: 75
  },
  {
    brand: 'F-KAP',
    model: 'Tref',
    generation: '2010',
    folder: 'F-KAP Tref 2010',
    photos: 3,
    years: [2010, 2011, 2012],
    engines: ['2.0 бензин', '2.2 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний', 'полный'],
    body: 'универсал',
    type: 'private',
    cities: allCities,
    spawnWeight: 65
  },
  {
    brand: 'F-KAP',
    model: 'Tref',
    generation: '2020',
    folder: 'F-KAP Tref 2020',
    photos: 3,
    years: [2020, 2021, 2022],
    engines: ['2.0 турбо', '2.2 дизель'],
    gearboxes: ['автомат'],
    drives: ['полный'],
    body: 'универсал',
    type: 'private',
    cities: allCities,
    spawnWeight: 25
  },
  {
    brand: 'F-KAP',
    model: 'Vacation',
    generation: '1990',
    folder: 'F-KAP Vacation 1990',
    photos: 3,
    years: [1990, 1991, 1992, 1993],
    engines: ['V6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    type: 'private',
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'F-KAP',
    model: 'Vacation',
    generation: '2000',
    folder: 'F-KAP Vacation 2000',
    photos: 3,
    years: [2000, 2001, 2002, 2003],
    engines: ['1.8 бензин', '2.0 бензин', 'V6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'универсал',
    type: 'private',
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'F-KAP',
    model: 'Vacation',
    generation: '2010',
    folder: 'F-KAP Vacation 2010',
    photos: 3,
    years: [2009, 2010, 2011, 2012],
    engines: ['1.8 бензин', '2.0 бензин', '2.0 гибрид'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'универсал',
    type: 'private',
    cities: allCities,
    spawnWeight: 90
  },

  // ===== TARIFA / TARIFA AUTO =====
  {
    brand: 'Tarifa',
    model: 'Dart',
    generation: '2005',
    folder: 'Tarifa Dart 2005',
    photos: 3,
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    engines: ['2.0 дизель', '2.2 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['задний'],
    body: 'фургон',
    type: 'private',
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
    type: 'private',
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'Tarifa',
    model: 'Misi-N',
    generation: '2011',
    folder: 'Tarifa Misi-N 2011',
    photos: 3,
    years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    engines: ['1.0 бензин', '1.2 бензин'],
    gearboxes: ['механика'],
    drives: ['передний'],
    body: 'хэтчбек',
    type: 'private',
    cities: allCities,
    spawnWeight: 80
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
    type: 'private',
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
    type: 'private',
    cities: allCities,
    spawnWeight: 11
  },

  // ===== FOREIGN / USSR / RUSSIA / CHINA / JAPAN / KOREA / EUROPE / USA =====
    {
    brand: 'Chevrolet',
    model: 'Cruze',
    generation: '2013',
    folder: 'Chevrolet Cruze 2013',
    photos: 3,
    years: [2013, 2014, 2015],
    engines: ['1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 55
  },
  {
    brand: 'Ford',
    model: 'Focus',
    generation: '2008',
    folder: 'Ford Focus 2008',
    photos: 3,
    years: [2007, 2008, 2009],
    engines: ['1.6 бензин', '1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    type: 'private',
    cities: allCities,
    spawnWeight: 60
  },
  {
    brand: 'Ford',
    model: 'Focus',
    generation: '2012',
    folder: 'Ford Focus 2012',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['1.6 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'Ford',
    model: 'Focus',
    generation: '2018',
    folder: 'Ford Focus 2018',
    photos: 3,
    years: [2017, 2018, 2019],
    engines: ['1.5 турбо', '2.0 бензин'],
    gearboxes: ['автомат', 'механика'],
    drives: ['передний'],
    body: 'хэтчбек',
    type: 'private',
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'GAZ',
    model: '24',
    generation: '',
    folder: 'Gaz 24',
    photos: 3,
    years: [1970, 1971, 1972, 1973, 1974],
    engines: ['2.4 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    type: 'found',
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
    type: 'found',
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
    type: 'private',
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
    type: 'private',
    cities: allCities,
    spawnWeight: 40
  },
  {
    brand: 'Honda',
    model: 'Civic',
    generation: '2000',
    folder: 'Honda Civic 2000',
    photos: 3,
    years: [1999, 2000, 2001],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 35
  },
  {
    brand: 'Honda',
    model: 'Civic',
    generation: '2010',
    folder: 'Honda Civic 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.8 бензин', '2.0 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 45
  },
  {
    brand: 'Hyundai',
    model: 'Solaris',
    generation: '2012',
    folder: 'Hyundai Solaris 2012',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['1.4 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 85
  },
  {
    brand: 'Kia',
    model: 'Rio',
    generation: '2008',
    folder: 'Kia Rio 2008',
    photos: 3,
    years: [2007, 2008, 2009],
    engines: ['1.4 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 60
  },
  {
    brand: 'Lada',
    model: 'Niva',
    generation: '',
    folder: 'Lada Niva',
    photos: 3,
    years: [1998, 2002, 2005, 2008, 2010],
    engines: ['1.7 бензин'],
    gearboxes: ['механика'],
    drives: ['полный'],
    body: 'внедорожник',
    type: 'private',
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
    type: 'private',
    cities: allCities,
    spawnWeight: 75
  },
  {
    brand: 'Lada',
    model: 'Riva',
    generation: '',
    folder: 'Lada Riva',
    photos: 3,
    years: [1998, 2001, 2004, 2007],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['задний'],
    body: 'седан',
    type: 'found',
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
    type: 'private',
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'Mitsubishi',
    model: 'Outlander',
    generation: '2012',
    folder: 'Mitsubishi Outlander 2012',
    photos: 3,
    years: [2011, 2012, 2013],
    engines: ['2.0 бензин', '2.4 бензин', '3.0 бензин'],
    gearboxes: ['автомат'],
    drives: ['передний', 'полный'],
    body: 'кроссовер',
    type: 'private',
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
    type: 'found',
    cities: allCities,
    spawnWeight: 20
  },
  {
    brand: 'Nissan',
    model: 'Sunny',
    generation: '2010',
    folder: 'Nissan Sunny 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 45
  },
  {
    brand: 'Renault',
    model: 'Logan',
    generation: '2008',
    folder: 'Renault Logan 2008',
    photos: 3,
    years: [2007, 2008, 2009],
    engines: ['1.4 бензин', '1.6 бензин'],
    gearboxes: ['механика'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 80
  },
  {
    brand: 'Renault',
    model: 'Logan',
    generation: '2013',
    folder: 'Renault Logan 2013',
    photos: 3,
    years: [2012, 2013, 2014],
    engines: ['1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
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
    type: 'private',
    cities: allCities,
    spawnWeight: 50
  },
  {
    brand: 'Toyota',
    model: 'Camry',
    generation: '1990',
    folder: 'Toyota Camry 1990',
    photos: 3,
    years: [1989, 1990, 1991],
    engines: ['2.0 бензин', '2.5 бензин'],
    gearboxes: ['автомат', 'механика'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 18
  },
  {
    brand: 'Toyota',
    model: 'Camry',
    generation: '2000',
    folder: 'Toyota Camry 2000',
    photos: 3,
    years: [1999, 2000, 2001],
    engines: ['2.2 бензин', '2.4 бензин', '3.0 бензин'],
    gearboxes: ['автомат', 'механика'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 30
  },
  {
    brand: 'Toyota',
    model: 'Camry',
    generation: '2010',
    folder: 'Toyota Camry 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['2.4 бензин', '2.5 бензин', '3.5 бензин'],
    gearboxes: ['автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 40
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: '1990',
    folder: 'Toyota Corolla 1990',
    photos: 3,
    years: [1989, 1990, 1991],
    engines: ['1.3 бензин', '1.5 бензин', '1.6 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 30
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: '2000',
    folder: 'Toyota Corolla 2000',
    photos: 3,
    years: [1999, 2000, 2001],
    engines: ['1.4 бензин', '1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 65
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    generation: '2010',
    folder: 'Toyota Corolla 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.4 бензин', '1.6 бензин', '1.8 бензин'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'седан',
    type: 'private',
    cities: allCities,
    spawnWeight: 70
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    generation: '2010',
    folder: 'Volkswagen Golf 2010',
    photos: 3,
    years: [2009, 2010, 2011],
    engines: ['1.4 турбо', '1.6 бензин', '2.0 дизель'],
    gearboxes: ['механика', 'автомат'],
    drives: ['передний'],
    body: 'хэтчбек',
    type: 'private',
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

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generatePrice(year, type, body) {
  let usdMin = 0;
  let usdMax = 0;

  if (year >= 2025) {
    usdMin = 18000;
    usdMax = 32000;
  } else if (year >= 2020) {
    usdMin = 12000;
    usdMax = 24000;
  } else if (year >= 2015) {
    usdMin = 9000;
    usdMax = 18000;
  } else if (year >= 2010) {
    usdMin = 6000;
    usdMax = 13000;
  } else if (year >= 2000) {
    usdMin = 3500;
    usdMax = 8500;
  } else if (year >= 1990) {
    usdMin = 2500;
    usdMax = 6500;
  } else if (year >= 1970) {
    usdMin = 2200;
    usdMax = 7000;
  } else {
    usdMin = 2000;
    usdMax = 8000;
  }

  let usd = randomInt(usdMin, usdMax);

  if (body === 'внедорожник' || body === 'кроссовер') {
    usd += randomInt(1500, 4500);
  }

  if (body === 'фургон') {
    usd += randomInt(800, 3000);
  }

  if (body === 'купе') {
    usd += randomInt(1200, 5000);
  }

  if (body === 'универсал') {
    usd += randomInt(300, 1500);
  }

  if (type === 'found') {
    usd -= randomInt(1200, 4500);
  }

  usd = Math.max(1800, usd);

  return usd * 50;
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
  const foundTexts = [
    'Осмотр через площадку, есть базовая информация по состоянию.',
    'Статус реализации подтверждён, нужен внимательный осмотр перед покупкой.',
    'Есть следы эксплуатации, автомобиль выставлен после завершения процедуры оформления.'
  ];

  const privateTexts = [
    'Обычное частное объявление, состояние зависит от конкретного экземпляра.',
    'Продавец указал базовые данные, перед покупкой нужен личный осмотр.',
    'Машина выставлена как частное объявление, характеристики сформированы автоматически.'
  ];

  const tail = `${engine}, ${gearbox}, кузов ${car.body}.`;
  return car.type === 'found'
    ? `${randomItem(foundTexts)} ${tail}`
    : `${randomItem(privateTexts)} ${tail}`;
}

function createCarCard(car) {
  const year = randomItem(car.years);
  const engine = randomItem(car.engines);
  const gearbox = randomItem(car.gearboxes);
  const drive = randomItem(car.drives);
  const city = randomItem(car.cities);
  const photoNumber = randomInt(1, car.photos);
  const price = generatePrice(year, car.type, car.body);
  const mileage = generateMileage(year);
  const description = generateDescription(car, engine, gearbox);
  const badgeText = car.type === 'found' ? 'Найденный' : 'Частное';
  const badgeClass = car.type === 'found' ? 'red' : '';
  const priceLabel = car.type === 'found' ? 'цена площадки' : 'цена продавца';
  const metaText = car.type === 'found'
    ? `Лот № ${randomInt(1000, 9999)}`
    : `Объявление № ${randomInt(10000, 99999)}`;

  const imagePath = `${car.folder}/${photoNumber}.jpg`;
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

function buildRandomCars(limit = 12) {
  currentCars = pickWeightedCars(carsBase, limit);
}

function getFilteredCars() {
  const search = searchInput.value.trim().toLowerCase();
  const type = typeFilter.value;
  const city = cityFilter.value;
  const maxPrice = Number(priceFilter.value || 0);
  const gearbox = gearboxFilter.value;

  let result = currentCars.map(car => {
    const year = randomItem(car.years);
    const engine = randomItem(car.engines);
    const selectedGearbox = randomItem(car.gearboxes);
    const drive = randomItem(car.drives);
    const selectedCity = randomItem(car.cities);
    const photoNumber = randomInt(1, car.photos);
    const price = generatePrice(year, car.type, car.body);
    const mileage = generateMileage(year);

    return {
      ...car,
      selectedYear: year,
      selectedEngine: engine,
      selectedGearbox,
      selectedDrive: drive,
      selectedCity,
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
    result = result.filter(car => car.type === type);
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
  const badgeText = car.type === 'found' ? 'Найденный' : 'Частное';
  const badgeClass = car.type === 'found' ? 'red' : '';
  const priceLabel = car.type === 'found' ? 'цена площадки' : 'цена продавца';
  const metaText = car.type === 'found'
    ? `Лот № ${randomInt(1000, 9999)}`
    : `Объявление № ${randomInt(10000, 99999)}`;

  const imagePath = `${car.folder}/${car.selectedPhoto}.jpg`;
  const title = `${car.brand} ${car.model}${car.generation ? ` ${car.generation}` : ''}`;
  const description = generateDescription(car, car.selectedEngine, car.selectedGearbox);

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