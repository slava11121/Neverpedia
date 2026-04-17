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
  '코라',
  '미리',
  '도시 D',
  '아브토보',
  '말타',
  '바라르',
  '람야',
  '포르타',
  '류치',
  '마기 마을',
  '나가리 마을',
  '올레나',
  '오레고르',
  '에티 마을',
  '셴타호르',
  '말리노',
  '북쪽의 극지',
  '안드로이',
  '페랴노예 마을',
  '보드케',
  '가조노',
  'M 마을',
  '첸',
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
    engines: ['W12 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '쿠페',
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
    engines: ['3.0 디젤', '3.2 디젤', '3.5 가솔린'],
    gearboxes: ['자동'],
    drives: ['사륜'],
    body: 'SUV',
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
    engines: ['1.5 가솔린', '1.6 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['1.6 가솔린', '1.8 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.8 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['4기통 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['1.8 하이브리드', '2.0 하이브리드'],
    gearboxes: ['자동'],
    drives: ['전륜', '사륜'],
    body: '세단',
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
    engines: ['2.5 가솔린', '3.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['후륜'],
    body: '쿠페',
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
    engines: ['3.0 가솔린', '3.5 가솔린'],
    gearboxes: ['자동'],
    drives: ['후륜', '사륜'],
    body: '쿠페',
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
    engines: ['1.6 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['1.8 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜', '사륜'],
    body: '왜건',
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
    engines: ['2.0 가솔린', '2.2 디젤'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜', '사륜'],
    body: '왜건',
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
    engines: ['2.0 터보', '2.2 디젤'],
    gearboxes: ['자동'],
    drives: ['사륜'],
    body: '왜건',
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
    engines: ['V6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '해치백',
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
    engines: ['1.8 가솔린', '2.0 가솔린', 'V6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '왜건',
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
    engines: ['1.8 가솔린', '2.0 가솔린', '2.0 하이브리드'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '왜건',
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
    engines: ['2.0 디젤', '2.2 디젤'],
    gearboxes: ['수동', '자동'],
    drives: ['후륜'],
    body: '밴',
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
    engines: ['2.0 디젤', '2.2 디젤'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '밴',
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
  engines: ['1.0 가솔린', '1.2 가솔린'],
  gearboxes: ['수동'],
  drives: ['전륜'],
  body: '해치백',
  typeOptions: ['private', 'found'],
  cities: allCities,
  spawnWeight: 80,
  priceMin: 50000,
  priceMax: 190000,
  descriptionText: 'Tarifa Auto의 저렴한 도심형 차량입니다. 구매 전 기본 점검이 필요하며, 저가 대중형 세그먼트에 속하는 차량입니다.'
},
  {
    brand: 'Tarifa',
    model: 'Style',
    generation: '',
    folder: 'Tarifa Style',
    photos: 3,
    years: [2013, 2014, 2015, 2016, 2017],
    engines: ['1.8 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.8 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['1.6 가솔린', '1.8 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.6 가솔린', '1.8 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '해치백',
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
    engines: ['1.6 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.5 터보', '2.0 가솔린'],
    gearboxes: ['자동', '수동'],
    drives: ['전륜'],
    body: '해치백',
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
    engines: ['2.4 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['2.1 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['2.3 가솔린', '2.4 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['1.5 터보', '2.0 터보'],
    gearboxes: ['자동'],
    drives: ['전륜', '사륜'],
    body: '크로스오버',
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
    engines: ['1.5 가솔린', '1.6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.8 가솔린', '2.0 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.4 가솔린', '1.6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.4 가솔린', '1.6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.7 가솔린'],
    gearboxes: ['수동'],
    drives: ['사륜'],
    body: 'SUV',
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
    engines: ['1.6 가솔린'],
    gearboxes: ['수동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.5 가솔린', '1.6 가솔린'],
    gearboxes: ['수동'],
    drives: ['후륜'],
    body: '세단',
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
    engines: ['1.6 가솔린', '1.8 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['2.0 가솔린', '2.4 가솔린', '3.0 가솔린'],
    gearboxes: ['자동'],
    drives: ['전륜', '사륜'],
    body: '크로스오버',
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
    engines: ['1.6 가솔린', '1.7 가솔린'],
    gearboxes: ['수동'],
    drives: ['전륜'],
    body: '해치백',
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
    engines: ['1.5 가솔린', '1.6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.4 가솔린', '1.6 가솔린'],
    gearboxes: ['수동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.6 가솔린', '1.8 터보', '2.0 디젤'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '리프트백',
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
    engines: ['2.0 가솔린', '2.5 가솔린'],
    gearboxes: ['자동', '수동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['2.2 가솔린', '2.4 가솔린', '3.0 가솔린'],
    gearboxes: ['자동', '수동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['2.4 가솔린', '2.5 가솔린', '3.5 가솔린'],
    gearboxes: ['자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.3 가솔린', '1.5 가솔린', '1.6 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.4 가솔린', '1.6 가솔린', '1.8 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.4 가솔린', '1.6 가솔린', '1.8 가솔린'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '세단',
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
    engines: ['1.4 터보', '1.6 가솔린', '2.0 디젤'],
    gearboxes: ['수동', '자동'],
    drives: ['전륜'],
    body: '해치백',
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

  if (body === 'SUV' || body === '크로스오버') {
    price += randomInt(90000, 260000);
  }

  if (body === '밴') {
    price += randomInt(50000, 180000);
  }

  if (body === '쿠페') {
    price += randomInt(100000, 320000);
  }

  if (body === '왜건') {
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
    '주행 가능하며, 급하게 손볼 부분은 없고 현장 확인 가능합니다.',
    '차량은 정상 운행 상태이며, 현재 상태 그대로 판매됩니다.',
    '연식 대비 무난한 상태이며, 직접 보는 것이 좋습니다.',
    '서류는 정상이지만, 기술적인 부분은 현장에서 확인해 주세요.',
    '차체와 실내 상태는 무난하며, 일반적인 사용 흔적이 있습니다.',
    '무리하게 운행하지 않았고, 교환 없이 판매합니다.',
    '연식에 비해 괜찮은 편이며, 현장 확인 시 가격 조정 가능합니다.',
    '새 차는 아니지만 상태는 무난하고, 자세한 내용은 현장에서 설명드립니다.',
    '연식에 따른 소소한 부분은 있지만, 이 모델에서 흔한 수준입니다.',
    '일상용으로 무난한 차량이며, 과장 없이 실물 확인을 권장합니다.'
  ];

  const foundTexts = [
    '이 차량은 발견 차량 카테고리에 등록되어 있습니다.',
    '이 매물은 서비스의 발견 차량 섹션을 통해 게시되었습니다.',
    '이 카드 정보는 발견된 차량을 표시하기 위해 생성되었습니다.',
    '이 차량은 발견 차량 데이터베이스에 추가되었습니다.',
    '이 항목은 서비스의 발견 차량 섹션에 등록되었습니다.',
    '이 매물은 발견 차량 카테고리에 속합니다.',
    '이 정보는 플랫폼의 발견 차량 섹션에서 게시되었습니다.',
    '이 카드는 서비스에 의해 발견 차량으로 등록되었습니다.',
    '이 항목은 발견 차량 카테고리에 표시됩니다.',
    '이 차량은 발견 차량 카탈로그에 포함되었습니다.'
  ];

  const privateExtraTexts = [
    '차체에는 연식에 따른 작은 흔적이 있을 수 있습니다.',
    '실내는 특별한 부분 없이 일반적인 상태입니다.',
    '하체와 기술적인 부분은 직접 확인하는 것이 좋습니다.',
    '연식 대비 외관은 무난한 편입니다.',
    '가격 협의는 실물 확인 후에만 가능합니다.',
    '전시용 차량이 아니라 일반적으로 살아 있는 차량입니다.',
    '일상용 차량으로 적합합니다.',
    '서류 관련 세부 사항은 현장에서 확인해 주세요.',
    '자연스러운 사용 흔적이 있습니다.',
    '사진 한 장보다 실물로 판단하는 것이 좋습니다.'
  ];

  const foundExtraTexts = [
    '설명은 참고용 정보입니다.',
    '정보는 서비스 카드 형식으로 표시됩니다.',
    '외관 및 기술 상태는 현장 확인이 필요합니다.',
    '정보는 개인 판매자의 평가 없이 플랫폼 기준으로 제공됩니다.',
    '데이터는 서비스 등록 형식으로 제공됩니다.',
    '차량 정보는 매물 카드 기준으로 표시됩니다.',
    '차량 사양은 플랫폼 카탈로그 형식으로 표기됩니다.',
    '구매 전 직접 상태 확인이 필요합니다.',
    '서비스는 차량의 기본 정보만 게시합니다.',
    '구매 결정 전 실물 확인을 권장합니다.'
  ];

  const mainText = car.type === 'found'
    ? randomItem(foundTexts)
    : randomItem(privateTexts);

  const extraText = car.type === 'found'
    ? randomItem(foundExtraTexts)
    : randomItem(privateExtraTexts);

  return `${mainText} ${extraText} ${engine}, ${gearbox}, 차체 타입 ${car.body}.`;
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
  const badgeText = car.type === 'found' ? '발견 차량' : '개인 판매';
  const badgeClass = car.type === 'found' ? 'red' : '';
  const priceLabel = car.type === 'found' ? '플랫폼 가격' : '판매자 가격';
  const metaText = car.type === 'found'
    ? `로트 번호 ${randomInt(1000, 9999)}`
    : `매물 번호 ${randomInt(10000, 99999)}`;

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
            <div class="car-sub">${city} • ${year} • ${mileage.toLocaleString("ko-KR")} km</div>
          </div>

          <div class="price">
            <strong>${price.toLocaleString("ko-KR")} Ksh</strong>
            <span>${priceLabel}</span>
          </div>
        </div>

        <div class="specs">
          <div class="spec"><b>엔진</b><span>${engine}</span></div>
          <div class="spec"><b>변속기</b><span>${gearbox}</span></div>
          <div class="spec"><b>구동 방식</b><span>${drive}</span></div>
          <div class="spec"><b>차체</b><span>${car.body}</span></div>
        </div>

        <div class="car-desc">${description}</div>

        <div class="car-actions">
          <div class="car-meta">${metaText}</div>
          <div class="mini-btns">
            <button class="mini-btn">즐겨찾기</button>
            <button class="mini-btn red">열기</button>
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

    const index = randomInt(0, duplicateCandidates.length - 1);
    const duplicateCar = duplicateCandidates.splice(index, 1)[0];

    const insertAt = randomInt(0, currentCars.length);
    currentCars.splice(insertAt, 0, duplicateCar);
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
  const badgeText = car.selectedType === 'found' ? '발견 차량' : '개인 판매';
  const badgeClass = car.selectedType === 'found' ? 'red' : '';
  const priceLabel = car.selectedType === 'found' ? '플랫폼 가격' : '판매자 가격';
  const metaText = car.selectedType === 'found'
    ? `로트 번호 ${randomInt(1000, 9999)}`
    : `매물 번호 ${randomInt(10000, 99999)}`;

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
            <div class="car-sub">${car.selectedCity} • ${car.selectedYear} • ${car.selectedMileage.toLocaleString("ko-KR")} km</div>
          </div>

          <div class="price">
            <strong>${car.selectedPrice.toLocaleString("ko-KR")} Ksh</strong>
            <span>${priceLabel}</span>
          </div>
        </div>

        <div class="specs">
          <div class="spec"><b>엔진</b><span>${car.selectedEngine}</span></div>
          <div class="spec"><b>변속기</b><span>${car.selectedGearbox}</span></div>
          <div class="spec"><b>구동 방식</b><span>${car.selectedDrive}</span></div>
          <div class="spec"><b>차체</b><span>${car.body}</span></div>
        </div>

        <div class="car-desc">${description}</div>

        <div class="car-actions">
          <div class="car-meta">${metaText}</div>
          <div class="mini-btns">
            <button class="mini-btn">즐겨찾기</button>
            <button class="mini-btn red">열기</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCars() {
  const filteredCars = getFilteredCars();
  carsGrid.innerHTML = filteredCars.map(createRenderedCard).join('');
  resultsText.textContent = `${filteredCars.length}개의 매물이 표시됨`;
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