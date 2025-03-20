
export interface StateData {
  id: string;
  name: string;
  capital: string;
  type: 'state' | 'union-territory';
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  population: string;
  area: string;
  languages: string[];
  description: string;
  url: string;
  color?: string;
}

export const indianStates: StateData[] = [
  {
    id: 'AN',
    name: 'Andaman and Nicobar Islands',
    capital: 'Port Blair',
    type: 'union-territory',
    region: 'east',
    population: '380,581',
    area: '8,249 km²',
    languages: ['Bengali', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Nicobarese'],
    description: 'A union territory consisting of 572 islands, of which 37 are inhabited. Known for its pristine beaches, coral reefs, and marine life.',
    url: 'https://en.wikipedia.org/wiki/Andaman_and_Nicobar_Islands'
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    capital: 'Amaravati',
    type: 'state',
    region: 'south',
    population: '49,386,799',
    area: '160,205 km²',
    languages: ['Telugu', 'Urdu'],
    description: 'A state in southeastern India with the second-longest coastline in the country. Known for its rich history, diverse cultures, and cuisine.',
    url: 'https://en.wikipedia.org/wiki/Andhra_Pradesh'
  },
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    type: 'state',
    region: 'northeast',
    population: '1,383,727',
    area: '83,743 km²',
    languages: ['Nyishi', 'Adi', 'Galo', 'Tagin', 'Hindi', 'English'],
    description: 'The "Land of the Dawn-Lit Mountains" is the easternmost state of India, sharing international borders with Bhutan, Myanmar, and China.',
    url: 'https://en.wikipedia.org/wiki/Arunachal_Pradesh'
  },
  {
    id: 'AS',
    name: 'Assam',
    capital: 'Dispur',
    type: 'state',
    region: 'northeast',
    population: '31,205,576',
    area: '78,438 km²',
    languages: ['Assamese', 'Bengali', 'Bodo'],
    description: 'Known for its tea plantations and silk, Assam is home to the one-horned Indian rhinoceros and contains the world\'s largest river island, Majuli.',
    url: 'https://en.wikipedia.org/wiki/Assam'
  },
  {
    id: 'BR',
    name: 'Bihar',
    capital: 'Patna',
    type: 'state',
    region: 'east',
    population: '104,099,452',
    area: '94,163 km²',
    languages: ['Hindi', 'Urdu', 'Maithili', 'Bhojpuri'],
    description: 'One of the oldest inhabited places in the world with a rich cultural heritage. Bihar was a great religious center for Hinduism, Buddhism, and Jainism.',
    url: 'https://en.wikipedia.org/wiki/Bihar'
  },
  {
    id: 'CH',
    name: 'Chandigarh',
    capital: 'Chandigarh',
    type: 'union-territory',
    region: 'north',
    population: '1,055,450',
    area: '114 km²',
    languages: ['Hindi', 'Punjabi', 'English'],
    description: 'A city and union territory that serves as the capital of two states, Punjab and Haryana. It was designed by the Swiss-French architect Le Corbusier.',
    url: 'https://en.wikipedia.org/wiki/Chandigarh'
  },
  {
    id: 'CT',
    name: 'Chhattisgarh',
    capital: 'Raipur',
    type: 'state',
    region: 'central',
    population: '25,545,198',
    area: '135,192 km²',
    languages: ['Chhattisgarhi', 'Hindi'],
    description: 'Rich in mineral resources, forests, and tribal culture, Chhattisgarh is known for its abundant natural beauty and wildlife.',
    url: 'https://en.wikipedia.org/wiki/Chhattisgarh'
  },
  {
    id: 'DN',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    capital: 'Daman',
    type: 'union-territory',
    region: 'west',
    population: '585,764',
    area: '603 km²',
    languages: ['Gujarati', 'Hindi', 'Marathi', 'Portuguese'],
    description: 'Formed by the merger of two former union territories, it consists of four districts and is known for its beaches and Portuguese colonial architecture.',
    url: 'https://en.wikipedia.org/wiki/Dadra_and_Nagar_Haveli_and_Daman_and_Diu'
  },
  {
    id: 'DL',
    name: 'Delhi',
    capital: 'New Delhi',
    type: 'union-territory',
    region: 'north',
    population: '16,787,941',
    area: '1,484 km²',
    languages: ['Hindi', 'Punjabi', 'Urdu', 'English'],
    description: 'The national capital territory includes New Delhi, India\'s capital. It\'s known for its historical significance, architectural marvels, and cultural diversity.',
    url: 'https://en.wikipedia.org/wiki/Delhi'
  },
  {
    id: 'GA',
    name: 'Goa',
    capital: 'Panaji',
    type: 'state',
    region: 'west',
    population: '1,458,545',
    area: '3,702 km²',
    languages: ['Konkani', 'Marathi', 'Portuguese', 'English'],
    description: 'India\'s smallest state by area and the fourth smallest by population. Known for its beaches, nightlife, places of worship, and world heritage architecture.',
    url: 'https://en.wikipedia.org/wiki/Goa'
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    type: 'state',
    region: 'west',
    population: '60,439,692',
    area: '196,024 km²',
    languages: ['Gujarati'],
    description: 'The home state of Mahatma Gandhi, known for its diverse and vibrant culture, business-friendly environment, and unique architecture.',
    url: 'https://en.wikipedia.org/wiki/Gujarat'
  },
  {
    id: 'HR',
    name: 'Haryana',
    capital: 'Chandigarh',
    type: 'state',
    region: 'north',
    population: '25,351,462',
    area: '44,212 km²',
    languages: ['Hindi', 'Punjabi', 'Haryanvi'],
    description: 'Created from the eastern portion of Punjab, Haryana surrounds Delhi on three sides. Known for its agricultural production and dairy farming.',
    url: 'https://en.wikipedia.org/wiki/Haryana'
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    capital: 'Shimla',
    type: 'state',
    region: 'north',
    population: '6,864,602',
    area: '55,673 km²',
    languages: ['Hindi', 'Pahari', 'Kangri', 'Dogri'],
    description: 'Known as the "Land of Gods," Himachal Pradesh is famous for its Himalayan landscapes, hill stations, and ancient temples.',
    url: 'https://en.wikipedia.org/wiki/Himachal_Pradesh'
  },
  {
    id: 'JK',
    name: 'Jammu and Kashmir',
    capital: 'Srinagar (Summer), Jammu (Winter)',
    type: 'union-territory',
    region: 'north',
    population: '12,267,032',
    area: '42,241 km²',
    languages: ['Kashmiri', 'Dogri', 'Hindi', 'Urdu'],
    description: 'Known for its scenic beauty, Kashmir Valley is often referred to as "Paradise on Earth." The region has a rich cultural heritage and diverse geography.',
    url: 'https://en.wikipedia.org/wiki/Jammu_and_Kashmir_(union_territory)'
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    capital: 'Ranchi',
    type: 'state',
    region: 'east',
    population: '32,988,134',
    area: '79,714 km²',
    languages: ['Hindi', 'Santali', 'Bengali', 'Odia'],
    description: 'Created in 2000 from the southern part of Bihar, Jharkhand is known for its forests, minerals, tribal culture, and industrial cities.',
    url: 'https://en.wikipedia.org/wiki/Jharkhand'
  },
  {
    id: 'KA',
    name: 'Karnataka',
    capital: 'Bengaluru',
    type: 'state',
    region: 'south',
    population: '61,095,297',
    area: '191,791 km²',
    languages: ['Kannada', 'Tulu', 'Konkani', 'Urdu'],
    description: 'Home to the technology hub of Bengaluru, Karnataka is known for its ancient architectural monuments, national parks, wildlife sanctuaries, and beaches.',
    url: 'https://en.wikipedia.org/wiki/Karnataka'
  },
  {
    id: 'KL',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    type: 'state',
    region: 'south',
    population: '33,406,061',
    area: '38,863 km²',
    languages: ['Malayalam', 'English'],
    description: 'Known as "God\'s Own Country," Kerala is famous for its tropical beauty, backwaters, ayurvedic treatments, and cultural traditions.',
    url: 'https://en.wikipedia.org/wiki/Kerala'
  },
  {
    id: 'LA',
    name: 'Ladakh',
    capital: 'Leh',
    type: 'union-territory',
    region: 'north',
    population: '274,000',
    area: '59,146 km²',
    languages: ['Ladakhi', 'Balti', 'Hindi', 'English'],
    description: 'Known for its remote mountain landscapes, Buddhist culture, and high-altitude lakes. Ladakh is often called "Little Tibet" or "Land of High Passes."',
    url: 'https://en.wikipedia.org/wiki/Ladakh'
  },
  {
    id: 'LD',
    name: 'Lakshadweep',
    capital: 'Kavaratti',
    type: 'union-territory',
    region: 'south',
    population: '64,473',
    area: '32 km²',
    languages: ['Malayalam', 'Mahl'],
    description: 'India\'s smallest union territory by population and area, it\'s an archipelago of 36 islands known for coral reefs, pristine beaches, and marine life.',
    url: 'https://en.wikipedia.org/wiki/Lakshadweep'
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    type: 'state',
    region: 'central',
    population: '72,626,809',
    area: '308,252 km²',
    languages: ['Hindi'],
    description: 'The "Heart of India" is the second-largest state by area. Known for its religious sites, architectural heritage, and natural beauty.',
    url: 'https://en.wikipedia.org/wiki/Madhya_Pradesh'
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    capital: 'Mumbai',
    type: 'state',
    region: 'west',
    population: '112,374,333',
    area: '307,713 km²',
    languages: ['Marathi', 'Hindi', 'English'],
    description: 'Home to Mumbai, India\'s financial center, Maharashtra is the second-most populous state and third-largest by area. Known for its ancient caves, forts, and vibrant culture.',
    url: 'https://en.wikipedia.org/wiki/Maharashtra'
  },
  {
    id: 'MN',
    name: 'Manipur',
    capital: 'Imphal',
    type: 'state',
    region: 'northeast',
    population: '2,855,794',
    area: '22,327 km²',
    languages: ['Meiteilon (Manipuri)', 'English'],
    description: 'Known as the "Land of Jewels," Manipur is known for its beautiful landscapes, indigenous martial arts, classical dance forms, and diverse culture.',
    url: 'https://en.wikipedia.org/wiki/Manipur'
  },
  {
    id: 'ML',
    name: 'Meghalaya',
    capital: 'Shillong',
    type: 'state',
    region: 'northeast',
    population: '2,966,889',
    area: '22,429 km²',
    languages: ['Khasi', 'Garo', 'Jaintia', 'English'],
    description: 'Called the "Abode of Clouds," Meghalaya is known for being one of the wettest places on Earth, with living root bridges and rich biodiversity.',
    url: 'https://en.wikipedia.org/wiki/Meghalaya'
  },
  {
    id: 'MZ',
    name: 'Mizoram',
    capital: 'Aizawl',
    type: 'state',
    region: 'northeast',
    population: '1,097,206',
    area: '21,081 km²',
    languages: ['Mizo', 'English'],
    description: 'One of the "Seven Sister States" of Northeast India, Mizoram is known for its rolling hills, valleys, lakes, and diverse flora and fauna.',
    url: 'https://en.wikipedia.org/wiki/Mizoram'
  },
  {
    id: 'NL',
    name: 'Nagaland',
    capital: 'Kohima',
    type: 'state',
    region: 'northeast',
    population: '1,978,502',
    area: '16,579 km²',
    languages: ['English', 'Nagamese', 'various Naga languages'],
    description: 'Known as the "Land of Festivals," Nagaland has 16 major tribes, each with distinct festivals and cultural practices.',
    url: 'https://en.wikipedia.org/wiki/Nagaland'
  },
  {
    id: 'OD',
    name: 'Odisha',
    capital: 'Bhubaneswar',
    type: 'state',
    region: 'east',
    population: '41,974,218',
    area: '155,707 km²',
    languages: ['Odia'],
    description: 'Formerly known as Orissa, it\'s known for its ancient temples, tribal cultures, abundant natural resources, and traditional handloom crafts.',
    url: 'https://en.wikipedia.org/wiki/Odisha'
  },
  {
    id: 'PY',
    name: 'Puducherry',
    capital: 'Puducherry',
    type: 'union-territory',
    region: 'south',
    population: '1,247,953',
    area: '492 km²',
    languages: ['Tamil', 'Malayalam', 'Telugu', 'French'],
    description: 'A former French colony, Puducherry consists of four non-contiguous districts. Known for its French influence, spiritual centers, and beaches.',
    url: 'https://en.wikipedia.org/wiki/Puducherry'
  },
  {
    id: 'PB',
    name: 'Punjab',
    capital: 'Chandigarh',
    type: 'state',
    region: 'north',
    population: '27,743,338',
    area: '50,362 km²',
    languages: ['Punjabi'],
    description: 'The "Land of Five Rivers" is known for its vibrant culture, festivals, fertile plains, historical sites, and Sikh heritage.',
    url: 'https://en.wikipedia.org/wiki/Punjab,_India'
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    capital: 'Jaipur',
    type: 'state',
    region: 'north',
    population: '68,548,437',
    area: '342,239 km²',
    languages: ['Hindi', 'Rajasthani'],
    description: 'India\'s largest state by area, known for its majestic palaces, forts, deserts, colorful festivals, and rich cultural heritage.',
    url: 'https://en.wikipedia.org/wiki/Rajasthan'
  },
  {
    id: 'SK',
    name: 'Sikkim',
    capital: 'Gangtok',
    type: 'state',
    region: 'northeast',
    population: '610,577',
    area: '7,096 km²',
    languages: ['Nepali', 'Sikkimese', 'Lepcha', 'English'],
    description: 'India\'s least populous state and the second-smallest by area. Known for its Buddhist monasteries, alpine meadows, and views of Mount Kanchenjunga.',
    url: 'https://en.wikipedia.org/wiki/Sikkim'
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    type: 'state',
    region: 'south',
    population: '72,147,030',
    area: '130,058 km²',
    languages: ['Tamil'],
    description: 'Known for its ancient Dravidian culture, Tamil classical language, grand temple architecture, classical arts, and rich cuisine.',
    url: 'https://en.wikipedia.org/wiki/Tamil_Nadu'
  },
  {
    id: 'TG',
    name: 'Telangana',
    capital: 'Hyderabad',
    type: 'state',
    region: 'south',
    population: '35,193,978',
    area: '112,077 km²',
    languages: ['Telugu', 'Urdu'],
    description: 'India\'s youngest state, formed in 2014. Known for its tech hub Hyderabad, historical monuments, art, culture, cuisine, and natural landscapes.',
    url: 'https://en.wikipedia.org/wiki/Telangana'
  },
  {
    id: 'TR',
    name: 'Tripura',
    capital: 'Agartala',
    type: 'state',
    region: 'northeast',
    population: '3,673,917',
    area: '10,491 km²',
    languages: ['Bengali', 'Kokborok', 'English'],
    description: 'The third-smallest state in India, Tripura is known for its diverse indigenous cultures, bamboo handicrafts, and ancient temples.',
    url: 'https://en.wikipedia.org/wiki/Tripura'
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    type: 'state',
    region: 'north',
    population: '199,812,341',
    area: '240,928 km²',
    languages: ['Hindi', 'Urdu'],
    description: 'India\'s most populous state, home to historic sites like the Taj Mahal, important Hindu pilgrimage centers, and the holy city of Varanasi.',
    url: 'https://en.wikipedia.org/wiki/Uttar_Pradesh'
  },
  {
    id: 'UK',
    name: 'Uttarakhand',
    capital: 'Dehradun (Winter), Gairsain (Summer)',
    type: 'state',
    region: 'north',
    population: '10,086,292',
    area: '53,483 km²',
    languages: ['Hindi', 'Garhwali', 'Kumaoni'],
    description: 'Known as the "Land of Gods" due to numerous Hindu temples and pilgrimage centers. Famous for its Himalayan landscapes and wildlife.',
    url: 'https://en.wikipedia.org/wiki/Uttarakhand'
  },
  {
    id: 'WB',
    name: 'West Bengal',
    capital: 'Kolkata',
    type: 'state',
    region: 'east',
    population: '91,276,115',
    area: '88,752 km²',
    languages: ['Bengali', 'English'],
    description: 'Known for its cultural heritage, literature, freedom movement history, Sundarbans delta, tea gardens, and the city of Kolkata.',
    url: 'https://en.wikipedia.org/wiki/West_Bengal'
  }
];
