import { useEffect, useMemo, useState } from 'react';
import CircularGallery from './CircularGallery';
import './App.css';
import ReviewSection from './ReviewSection';

const translations = {
  kk: {
    title: '57 Coffee House — Өлгий',
    langLabel: 'Тіл',
    nav: {
      about: 'Біз туралы',
      gallery: 'Галерея',
      menu: 'Мәзір',
      atmosphere: 'Атмосфера',
      contact: 'Байланыс',
      visit: 'Бізге келіңіз'
    },
    hero: {
      kicker: 'Өлгий қаласы · Баян-Өлгий аймағы',
      tagline: 'Әр кесе — бір сезім, әр сәт — бір естелік',
      menuBtn: 'Мәзірді көру',
      locationBtn: 'Мекенжай',
      scroll: 'Төмен'
    },
    about: {
      eyebrow: 'Біз туралы',
      headingStart: 'Жылылық пен ',
      emphasis: 'дәмнің',
      headingEnd: 'үйі — 57',
      body1:
        '57 Coffee House — Өлгий қаласының жүрегінде орналасқан жайлы кофеханамыз. Мұнда сіз таңғы шайыңызды да, кешкі кездесуіңізді де жылы атмосферада өткізе аласыз.',
      body2:
        'Біз сапалы кофе мен тәтті тағамдарды сүйетіндер үшін, сонымен қатар жайбарақат демалып, жақындарымен уақыт өткізгісі келетіндер үшін ерекше кеңістік жасадық.',
      facts: [
        { num: '20+', label: 'Сусын түрі' },
        { num: '100%', label: 'Сапалы кофе' },
        { num: '☀️', label: 'Күн сайын ашық' }
      ],
      badge: 'Өлгий\nКофе Үйі'
    },
    gallery: {
      eye: 'Кофе әлемі',
      title: 'Галерея',
      items: [
        { image: '/images/coffee-1.jpg', text: 'Эспрессо' },
        { image: '/images/coffee-2.jpg', text: 'Капучино' },
        { image: '/images/coffee-3.jpg', text: 'Латте' },
        { image: '/images/coffee-4.jpg', text: 'Мокко' },
        { image: '/images/coffee-5.jpg', text: 'Флэт Уайт' },
        { image: '/images/coffee-6.jpg', text: 'Айс Кофе' },
        { image: '/images/coffee-7.jpg', text: 'Матча Латте' },
        { image: '/images/coffee-8.jpg', text: 'Десерт Кофе' }
      ]
    },
    menu: {
      eye: 'Тағамдар мен сусындар',
      title: 'Мәзіріміз',
      tabs: {
        hot: 'Ыстық сусындар',
        cold: 'Суық сусындар',
        food: 'Тағамдар',
        sweet: 'Тәттілер'
      },
      items: {
        hot: [
          { icon: '☕', name: 'Эспрессо', desc: 'Таза арабика дәнінен дайындалған қою және хош иісті эспрессо', price: '3 000 ₮' },
          { icon: '🥛', name: 'Капучино', desc: 'Кремді сүт көбігімен безендірілген классикалық капучино', price: '5 000 ₮' },
          { icon: '☕', name: 'Латте', desc: 'Жұмсақ буланған сүтпен дайындалған нәзік латте', price: '5 500 ₮' },
          { icon: '🍫', name: 'Мокко', desc: 'Шоколад пен кофенің тамаша үйлесімі', price: '6 000 ₮' },
          { icon: '🫖', name: 'Шай', desc: 'Таңдаулы шай жапырақтарынан дайындалған хош иісті шай', price: '2 500 ₮' },
          { icon: '🍵', name: 'Матча латте', desc: 'Жапондық жасыл шай ұнтағы мен сүттен жасалған сусын', price: '6 500 ₮' }
        ],
        cold: [
          { icon: '🧊', name: 'Айс латте', desc: 'Мұзды суық сүтпен дайындалған жаздық латте', price: '6 000 ₮' },
          { icon: '🧋', name: 'Фраппе', desc: 'Мұзды кофе, сүт және шантильи көбігімен', price: '7 000 ₮' },
          { icon: '🫐', name: 'Жидек смузи', desc: 'Таза жидектерден дайындалған сергітетін смузи', price: '6 500 ₮' },
          { icon: '🍋', name: 'Лимонад', desc: 'Үй рецепті бойынша дайындалған сергіткіш лимонад', price: '4 500 ₮' },
          { icon: '🥤', name: 'Айс матча', desc: 'Суық матча мен кокос сүтінің үйлесімі', price: '7 000 ₮' },
          { icon: '🧃', name: 'Табиғи шырын', desc: 'Табиғи жемістерден сығылған таза жеміс шырыны', price: '4 000 ₮' }
        ],
        food: [
          { icon: '🥐', name: 'Круассан', desc: 'Күн сайын пісірілетін майлы, қабатты французша круассан', price: '4 500 ₮' },
          { icon: '🥪', name: 'Сэндвич', desc: 'Таза өнімдерден дайындалған, таңдауыңызша сэндвич', price: '7 000 ₮' },
          { icon: '🍳', name: 'Таңғы ас', desc: 'Жұмыртқа, нан және жеңіл гарнир негізіндегі дәмді таңғы ас', price: '8 000 ₮' },
          { icon: '🥗', name: 'Жеңіл салат', desc: 'Маусымдық көкөністерден жасалған жеңіл, пайдалы салат', price: '6 000 ₮' }
        ],
        sweet: [
          { icon: '🎂', name: 'Торт', desc: 'Күн сайын пісірілетін үй тортынан бір кесім', price: '5 000 ₮' },
          { icon: '🧁', name: 'Кекс', desc: 'Шоколадты және жемісті кекс таңдауы', price: '3 500 ₮' },
          { icon: '🍪', name: 'Печенье', desc: 'Ваниль мен шоколад чиптері бар жұмсақ печенье', price: '2 500 ₮' },
          { icon: '🍮', name: 'Чизкейк', desc: 'Нәзік кремді чизкейк, жидек тұздығымен', price: '5 500 ₮' }
        ]
      }
    },
    atmosphere: {
      eye: 'Неге 57?',
      title: 'Атмосферамыз',
      cards: [
        {
          icon: '☕',
          title: 'Жылы атмосфера',
          text: 'Сыртта суық болса да, 57-де сізді жылылық пен кофенің хош иісі қарсы алады. Бұл тек кофехана емес — бұл сіздің жайлы кеңістігіңіз.',
          tall: true
        },
        {
          icon: '🌿',
          title: 'Жайлы орын',
          text: 'Жұмыс жасауға, кітап оқуға немесе достарыңызбен сөйлесуге ыңғайлы.'
        },
        {
          icon: '✨',
          title: 'Сапалы сервис',
          text: 'Баристаларымыз кофені жанымен дайындайды, сізге ерекше әсер сыйлайды.'
        },
        {
          icon: '📸',
          title: 'Инстаграмға лайықты',
          text: 'Сұлу интерьер мен безендірілген сусындар суретке түсуге дайын.'
        },
        {
          icon: '🎵',
          title: 'Тыныш музыка',
          text: 'Фондағы жайбарақат музыка демалысыңызды жайлы етеді.'
        }
      ]
    },
    info: {
      hoursTitle: 'Жұмыс уақыты',
      addressTitle: 'Мекенжай',
      addressLabel: 'Адрес',
      contactLabel: 'Байланыс',
      map: '📍 Картада ашу →',
      instaText: 'Тікелей хабарлама жіберіңіз',
      addressLines: ['Зуха Баатар көшесі,', 'Өлгий қаласы,', 'Баян-Өлгий аймағы, Монғолия'],
      hours: [
        ['Дүйсенбі', '08:00 – 22:00'],
        ['Сейсенбі', '08:00 – 22:00'],
        ['Сәрсенбі', '08:00 – 22:00'],
        ['Бейсенбі', '08:00 – 22:00'],
        ['Жұма', '08:00 – 23:00'],
        ['Сенбі', '09:00 – 23:00'],
        ['Жексенбі', '09:00 – 21:00']
      ]
    },
    footer: {
      desc: 'Өлгий қаласындағы жылы кофехана. Сапалы кофе, үй атмосферасы, жылы жүрек.',
      navTitle: 'Навигация',
      menuTitle: 'Мәзір',
      copy: '© 2025 57 Coffee House — Өлгий, Баян-Өлгий'
    }
  },

  mn: {
    title: '57 Coffee House — Өлгий',
    langLabel: 'Хэл',
    nav: {
      about: 'Бидний тухай',
      gallery: 'Галерей',
      menu: 'Цэс',
      atmosphere: 'Уур амьсгал',
      contact: 'Холбоо',
      visit: 'Зочлоорой'
    },
    hero: {
      kicker: 'Өлгий хот · Баян-Өлгий аймаг',
      tagline: 'Аяга бүр — мэдрэмж, мөч бүр — дурсамж',
      menuBtn: 'Цэс үзэх',
      locationBtn: 'Хаяг',
      scroll: 'Доош'
    },
    about: {
      eyebrow: 'Бидний тухай',
      headingStart: 'Дулаан ба ',
      emphasis: 'амтын',
      headingEnd: 'орон — 57',
      body1:
        '57 Coffee House бол Өлгий хотын төвд байрлах тухтай кофешоп юм. Та энд өглөөний цайгаа ч, оройн уулзалтаа ч дулаан уур амьсгалд өнгөрөөж болно.',
      body2:
        'Бид чанартай кофе, амтат хоолонд дуртай хүмүүст болон тайван амарч, дотнын хүмүүстэйгээ цагийг өнгөрөөхийг хүсдэг хүмүүст зориулсан онцгой орчин бүрдүүлсэн.',
      facts: [
        { num: '20+', label: 'Ундааны төрөл' },
        { num: '100%', label: 'Чанартай кофе' },
        { num: '☀️', label: 'Өдөр бүр нээлттэй' }
      ],
      badge: 'Өлгий\nКофе Хаус'
    },
    gallery: {
      eye: 'Кофены ертөнц',
      title: 'Галерей',
      items: [
        { image: '/images/coffee-1.jpg', text: 'Эспрессо' },
        { image: '/images/coffee-2.jpg', text: 'Капучино' },
        { image: '/images/coffee-3.jpg', text: 'Латте' },
        { image: '/images/coffee-4.jpg', text: 'Мокка' },
        { image: '/images/coffee-5.jpg', text: 'Флэт Уайт' },
        { image: '/images/coffee-6.jpg', text: 'Мөстэй кофе' },
        { image: '/images/coffee-7.jpg', text: 'Матча латте' },
        { image: '/images/coffee-8.jpg', text: 'Амттан кофе' }
      ]
    },
    menu: {
      eye: 'Хоол ба ундаа',
      title: 'Манай цэс',
      tabs: {
        hot: 'Халуун ундаа',
        cold: 'Хүйтэн ундаа',
        food: 'Хоол',
        sweet: 'Амттан'
      },
      items: {
        hot: [
          { icon: '☕', name: 'Эспрессо', desc: 'Цэвэр арабика шошоор бэлтгэсэн өтгөн, анхилуун эспрессо', price: '3 000 ₮' },
          { icon: '🥛', name: 'Капучино', desc: 'Сүүтэй хөөстэй сонгодог капучино', price: '5 000 ₮' },
          { icon: '☕', name: 'Латте', desc: 'Зөөлөн ууршуулсан сүүтэй латте', price: '5 500 ₮' },
          { icon: '🍫', name: 'Мокка', desc: 'Шоколад ба кофены төгс хослол', price: '6 000 ₮' },
          { icon: '🫖', name: 'Цай', desc: 'Сонгомол цайны навчаар бэлтгэсэн анхилуун цай', price: '2 500 ₮' },
          { icon: '🍵', name: 'Матча латте', desc: 'Япон ногоон цайны нунтаг, сүүтэй ундаа', price: '6 500 ₮' }
        ],
        cold: [
          { icon: '🧊', name: 'Айс латте', desc: 'Хүйтэн сүүтэй зуны латте', price: '6 000 ₮' },
          { icon: '🧋', name: 'Фраппе', desc: 'Мөстэй кофе, сүү, кремтэй', price: '7 000 ₮' },
          { icon: '🫐', name: 'Жимсний смүүти', desc: 'Шинэхэн жимсээр хийсэн сэрүүцүүлэгч смүүти', price: '6 500 ₮' },
          { icon: '🍋', name: 'Лимонад', desc: 'Гэрийн жороор хийсэн сэргээгч лимонад', price: '4 500 ₮' },
          { icon: '🥤', name: 'Айс матча', desc: 'Хүйтэн матча ба кокосын сүүний хослол', price: '7 000 ₮' },
          { icon: '🧃', name: 'Байгалийн шүүс', desc: 'Жимснээс шахсан цэвэр шүүс', price: '4 000 ₮' }
        ],
        food: [
          { icon: '🥐', name: 'Круассан', desc: 'Өдөр бүр шинээр жигнэдэг тослог, давхаргатай круассан', price: '4 500 ₮' },
          { icon: '🥪', name: 'Сэндвич', desc: 'Шинэхэн бүтээгдэхүүнээр хийсэн сэндвич', price: '7 000 ₮' },
          { icon: '🍳', name: 'Өглөөний цай', desc: 'Өндөг, талх, хөнгөн хачиртай амттай өглөөний цай', price: '8 000 ₮' },
          { icon: '🥗', name: 'Хөнгөн салат', desc: 'Улирлын ногоогоор хийсэн эрүүл салат', price: '6 000 ₮' }
        ],
        sweet: [
          { icon: '🎂', name: 'Бялуу', desc: 'Өдөр бүр шинээр хийсэн гарын бялуунаас нэг зүсэм', price: '5 000 ₮' },
          { icon: '🧁', name: 'Кекс', desc: 'Шоколадтай болон жимстэй кексний сонголт', price: '3 500 ₮' },
          { icon: '🍪', name: 'Жигнэмэг', desc: 'Ваниль, шоколадтай зөөлөн жигнэмэг', price: '2 500 ₮' },
          { icon: '🍮', name: 'Чизкейк', desc: 'Зөөлөн кремтэй чизкейк, жимсний соустай', price: '5 500 ₮' }
        ]
      }
    },
    atmosphere: {
      eye: 'Яагаад 57 гэж?',
      title: 'Манай уур амьсгал',
      cards: [
        {
          icon: '☕',
          title: 'Дулаан уур амьсгал',
          text: 'Гадаа хүйтэн байсан ч 57-д таныг дулаан уур амьсгал, кофены үнэр угтана. Энэ бол зүгээр нэг кофешоп биш — таны тухтай орон зай юм.',
          tall: true
        },
        {
          icon: '🌿',
          title: 'Тухтай орчин',
          text: 'Ажиллах, ном унших эсвэл найзуудтайгаа ярилцахад тохиромжтой.'
        },
        {
          icon: '✨',
          title: 'Чанартай үйлчилгээ',
          text: 'Манай бариста нар сэтгэлээсээ кофе бэлтгэж, онцгой мэдрэмж төрүүлнэ.'
        },
        {
          icon: '📸',
          title: 'Зураг авахад төгс',
          text: 'Гоё интерьер, үзэмжтэй ундаанууд зураг авахад бэлэн.'
        },
        {
          icon: '🎵',
          title: 'Тайван хөгжим',
          text: 'Зөөлөн хөгжим таны амралтыг улам тухтай болгоно.'
        }
      ]
    },
    info: {
      hoursTitle: 'Ажлын цаг',
      addressTitle: 'Хаяг',
      addressLabel: 'Хаяг',
      contactLabel: 'Холбоо',
      map: '📍 Газрын зураг дээр нээх →',
      instaText: 'Шууд мессеж илгээнэ үү',
      addressLines: ['Зуха Баатарын гудамж,', 'Өлгий хот,', 'Баян-Өлгий аймаг, Монгол'],
      hours: [
        ['Даваа', '08:00 – 22:00'],
        ['Мягмар', '08:00 – 22:00'],
        ['Лхагва', '08:00 – 22:00'],
        ['Пүрэв', '08:00 – 22:00'],
        ['Баасан', '08:00 – 23:00'],
        ['Бямба', '09:00 – 23:00'],
        ['Ням', '09:00 – 21:00']
      ]
    },
    footer: {
      desc: 'Өлгий хотын дулаан кофешоп. Чанартай кофе, гэр шиг уур амьсгал, халуун сэтгэл.',
      navTitle: 'Навигаци',
      menuTitle: 'Цэс',
      copy: '© 2025 57 Coffee House — Өлгий, Баян-Өлгий'
    }
  },

  en: {
    title: '57 Coffee House — Ulgii',
    langLabel: 'Language',
    nav: {
      about: 'About',
      gallery: 'Gallery',
      menu: 'Menu',
      atmosphere: 'Atmosphere',
      contact: 'Contact',
      visit: 'Visit Us'
    },
    hero: {
      kicker: 'Ulgii City · Bayan-Ulgii Province',
      tagline: 'Every cup is a feeling, every moment is a memory',
      menuBtn: 'View Menu',
      locationBtn: 'Location',
      scroll: 'Scroll'
    },
    about: {
      eyebrow: 'About Us',
      headingStart: 'A home of ',
      emphasis: 'warmth',
      headingEnd: 'and taste — 57',
      body1:
        '57 Coffee House is a cozy coffee shop located in the heart of Ulgii. Here you can enjoy your morning tea or evening meeting in a warm and elegant atmosphere.',
      body2:
        'We created a special space for people who love quality coffee and desserts, and for those who want to relax and spend time with loved ones.',
      facts: [
        { num: '20+', label: 'Drink options' },
        { num: '100%', label: 'Quality coffee' },
        { num: '☀️', label: 'Open every day' }
      ],
      badge: 'Ulgii\nCoffee House'
    },
    gallery: {
      eye: 'Coffee World',
      title: 'Gallery',
      items: [
        { image: '/images/coffee-1.jpg', text: 'Espresso' },
        { image: '/images/coffee-2.jpg', text: 'Cappuccino' },
        { image: '/images/coffee-3.jpg', text: 'Latte' },
        { image: '/images/coffee-4.jpg', text: 'Mocha' },
        { image: '/images/coffee-5.jpg', text: 'Flat White' },
        { image: '/images/coffee-6.jpg', text: 'Iced Coffee' },
        { image: '/images/coffee-7.jpg', text: 'Matcha Latte' },
        { image: '/images/coffee-8.jpg', text: 'Dessert Coffee' }
      ]
    },
    menu: {
      eye: 'Food & Drinks',
      title: 'Our Menu',
      tabs: {
        hot: 'Hot Drinks',
        cold: 'Cold Drinks',
        food: 'Food',
        sweet: 'Desserts'
      },
      items: {
        hot: [
          { icon: '☕', name: 'Espresso', desc: 'Rich and aromatic espresso made from pure arabica beans', price: '3 000 ₮' },
          { icon: '🥛', name: 'Cappuccino', desc: 'Classic cappuccino topped with creamy milk foam', price: '5 000 ₮' },
          { icon: '☕', name: 'Latte', desc: 'Smooth latte made with steamed milk', price: '5 500 ₮' },
          { icon: '🍫', name: 'Mocha', desc: 'A perfect blend of chocolate and coffee', price: '6 000 ₮' },
          { icon: '🫖', name: 'Tea', desc: 'Aromatic tea made from selected tea leaves', price: '2 500 ₮' },
          { icon: '🍵', name: 'Matcha Latte', desc: 'Japanese green tea powder with milk', price: '6 500 ₮' }
        ],
        cold: [
          { icon: '🧊', name: 'Iced Latte', desc: 'Refreshing latte served with cold milk and ice', price: '6 000 ₮' },
          { icon: '🧋', name: 'Frappe', desc: 'Iced coffee blended with milk and whipped cream', price: '7 000 ₮' },
          { icon: '🫐', name: 'Berry Smoothie', desc: 'Refreshing smoothie made from fresh berries', price: '6 500 ₮' },
          { icon: '🍋', name: 'Lemonade', desc: 'Refreshing homemade lemonade', price: '4 500 ₮' },
          { icon: '🥤', name: 'Iced Matcha', desc: 'Cold matcha with coconut milk', price: '7 000 ₮' },
          { icon: '🧃', name: 'Natural Juice', desc: 'Freshly squeezed fruit juice', price: '4 000 ₮' }
        ],
        food: [
          { icon: '🥐', name: 'Croissant', desc: 'Buttery layered croissant baked fresh every day', price: '4 500 ₮' },
          { icon: '🥪', name: 'Sandwich', desc: 'Fresh sandwich prepared with quality ingredients', price: '7 000 ₮' },
          { icon: '🍳', name: 'Breakfast', desc: 'Tasty breakfast with eggs, bread and a light side dish', price: '8 000 ₮' },
          { icon: '🥗', name: 'Light Salad', desc: 'Healthy salad made with seasonal vegetables', price: '6 000 ₮' }
        ],
        sweet: [
          { icon: '🎂', name: 'Cake', desc: 'A slice of homemade cake prepared fresh daily', price: '5 000 ₮' },
          { icon: '🧁', name: 'Cupcake', desc: 'Chocolate and fruit cupcake selection', price: '3 500 ₮' },
          { icon: '🍪', name: 'Cookies', desc: 'Soft cookies with vanilla and chocolate chips', price: '2 500 ₮' },
          { icon: '🍮', name: 'Cheesecake', desc: 'Creamy cheesecake with berry sauce', price: '5 500 ₮' }
        ]
      }
    },
    atmosphere: {
      eye: 'Why 57?',
      title: 'Our Atmosphere',
      cards: [
        {
          icon: '☕',
          title: 'Warm Atmosphere',
          text: 'Even when it is cold outside, 57 welcomes you with warmth and the aroma of coffee. It is not just a coffee shop — it is your cozy place.',
          tall: true
        },
        {
          icon: '🌿',
          title: 'Comfortable Space',
          text: 'Perfect for working, reading a book or chatting with friends.'
        },
        {
          icon: '✨',
          title: 'Quality Service',
          text: 'Our baristas prepare coffee with heart and create a special feeling.'
        },
        {
          icon: '📸',
          title: 'Instagram-Worthy',
          text: 'Beautiful interior and well-presented drinks are ready for photos.'
        },
        {
          icon: '🎵',
          title: 'Soft Music',
          text: 'Gentle background music makes your rest even more comfortable.'
        }
      ]
    },
    info: {
      hoursTitle: 'Opening Hours',
      addressTitle: 'Address',
      addressLabel: 'Address',
      contactLabel: 'Contact',
      map: '📍 Open on Map →',
      instaText: 'Send us a direct message',
      addressLines: ['Zukha Baatar Street,', 'Ulgii City,', 'Bayan-Ulgii Province, Mongolia'],
      hours: [
        ['Monday', '08:00 – 22:00'],
        ['Tuesday', '08:00 – 22:00'],
        ['Wednesday', '08:00 – 22:00'],
        ['Thursday', '08:00 – 22:00'],
        ['Friday', '08:00 – 23:00'],
        ['Saturday', '09:00 – 23:00'],
        ['Sunday', '09:00 – 21:00']
      ]
    },
    footer: {
      desc: 'A warm coffee house in Ulgii. Quality coffee, home-like atmosphere, warm heart.',
      navTitle: 'Navigation',
      menuTitle: 'Menu',
      copy: '© 2025 57 Coffee House — Ulgii, Bayan-Ulgii'
    }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('hot');
  const [lang, setLang] = useState('kk');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
  }, [lang, t.title]);

  const galleryItems = useMemo(() => t.gallery.items, [t]);

  return (
    <div className="site">
      <div className="grain"></div>

      <nav>
        <div className="nav-logo">
          <span className="nav-logo-num">57</span>
          <span className="nav-logo-text">Coffee House</span>
        </div>

        <ul>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#gallery">{t.nav.gallery}</a></li>
          <li><a href="#menu">{t.nav.menu}</a></li>
          <li><a href="#atmosphere">{t.nav.atmosphere}</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#info">{t.nav.contact}</a></li>
        </ul>

        <div className="nav-actions">
          <div className="lang-switch" aria-label={t.langLabel}>
            <button
              className={lang === 'kk' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLang('kk')}
            >
              ҚАЗ
            </button>
            <button
              className={lang === 'mn' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLang('mn')}
            >
              МН
            </button>
            <button
              className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLang('en')}
            >
              ENG
            </button>
          </div>

          <a className="nav-reserve" href="#info">{t.nav.visit}</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-light-orb orb-1"></div>
        <div className="hero-light-orb orb-2"></div>
        <div className="hero-light-orb orb-3"></div>

        <div className="hero-bg"></div>

        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>

        <div className="steams">
          <div className="s"></div>
          <div className="s"></div>
          <div className="s"></div>
        </div>

        <div className="hero-content">
          <p className="hero-kicker">{t.hero.kicker}</p>
          <span className="hero-number">57</span>
          <span className="hero-title">Coffee House</span>
          <p className="hero-tagline">{t.hero.tagline}</p>

          <div className="hero-btns">
            <a className="btn-primary" href="#menu">{t.hero.menuBtn}</a>
            <a className="btn-outline" href="#info">{t.hero.locationBtn}</a>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-bar"></div>
          <span>{t.hero.scroll}</span>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-visual reveal">
          <div className="about-frame">
            <img src="/images/coffee-1.jpg" alt="57 Coffee House" className="about-image" />
          </div>

          <div className="about-badge">
            <span className="about-badge-year">#57</span>
            <span className="about-badge-label">{t.about.badge}</span>
          </div>
        </div>

        <div className="about-copy reveal">
          <p className="about-eyebrow">{t.about.eyebrow}</p>
          <h2 className="about-heading">
            {t.about.headingStart}
            <em>{t.about.emphasis}</em>
            <br />
            {t.about.headingEnd}
          </h2>
          <p className="about-body">{t.about.body1}</p>
          <p className="about-body">{t.about.body2}</p>

          <div className="about-rule"></div>

          <div className="about-facts">
            {t.about.facts.map((fact, index) => (
              <div key={index}>
                <span className="fact-num">{fact.num}</span>
                <span className="fact-label">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="sec-header reveal">
          <span className="sec-eye">{t.gallery.eye}</span>
          <h2 className="sec-title">{t.gallery.title}</h2>
        </div>

        <div className="gallery-shell reveal">
          <CircularGallery
            items={galleryItems}
            bend={1.2}
            textColor="#8a5a32"
            borderRadius={0.06}
            scrollSpeed={2.2}
            scrollEase={0.06}
            autoScroll={0.02}
            font="bold 28px Arial"
          />
        </div>
      </section>

      <section className="menu" id="menu">
        <div className="sec-header reveal">
          <span className="sec-eye">{t.menu.eye}</span>
          <h2 className="sec-title">{t.menu.title}</h2>
        </div>

        <div className="menu-tabs reveal">
          <button className={activeTab === 'hot' ? 'mtab on' : 'mtab'} onClick={() => setActiveTab('hot')}>
            {t.menu.tabs.hot}
          </button>
          <button className={activeTab === 'cold' ? 'mtab on' : 'mtab'} onClick={() => setActiveTab('cold')}>
            {t.menu.tabs.cold}
          </button>
          <button className={activeTab === 'food' ? 'mtab on' : 'mtab'} onClick={() => setActiveTab('food')}>
            {t.menu.tabs.food}
          </button>
          <button className={activeTab === 'sweet' ? 'mtab on' : 'mtab'} onClick={() => setActiveTab('sweet')}>
            {t.menu.tabs.sweet}
          </button>
        </div>

        <div className="mpanel on reveal">
          {t.menu.items[activeTab].map((item, index) => (
            <div className="mcard" key={`${activeTab}-${index}`}>
              <span className="mcard-em">{item.icon}</span>
              <div className="mcard-name">{item.name}</div>
              <div className="mcard-desc">{item.desc}</div>
              <div className="mcard-price">{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="atmo" id="atmosphere">
        <div className="sec-header reveal">
          <span className="sec-eye">{t.atmosphere.eye}</span>
          <h2 className="sec-title">{t.atmosphere.title}</h2>
        </div>

        <div className="atmo-grid reveal">
          {t.atmosphere.cards.map((card, index) => (
            <div className={card.tall ? 'atmo-cell tall' : 'atmo-cell'} key={index}>
              <div className="atmo-cell-icon">{card.icon}</div>
              <h3 className="atmo-cell-title">{card.title}</h3>
              <p className="atmo-cell-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <ReviewSection lang={lang} />

      <section className="info" id="info">
        <div className="reveal">
          <h2 className="info-block-title">{t.info.hoursTitle}</h2>
          <ul className="hours-list">
            {t.info.hours.map(([day, time], index) => (
              <li key={index}>
                <span className="day-name">{day}</span>
                <span className="day-time">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <h2 className="info-block-title">{t.info.addressTitle}</h2>

          <div className="loc-card">
            <span className="loc-label">{t.info.addressLabel}</span>
            <p className="loc-text">
              {t.info.addressLines[0]}<br />
              {t.info.addressLines[1]}<br />
              {t.info.addressLines[2]}
            </p>
            <a
              className="loc-map-link"
              href="https://maps.app.goo.gl/UJrpZAwaFK4ELQJM7"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.info.map}
            </a>
          </div>

          <div className="loc-card">
            <span className="loc-label">{t.info.contactLabel}</span>
            <p className="loc-text">
              📱 Instagram:{' '}
              <a
                href="https://www.instagram.com/57coffeehouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                <strong>@57coffeehouse</strong>
              </a>
              <br />
              {t.info.instaText}
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div>
            <span className="footer-brand-num">57</span>
            <span className="footer-brand-name">Coffee House</span>
            <p className="footer-desc">{t.footer.desc}</p>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">{t.footer.navTitle}</span>
            <ul>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#gallery">{t.nav.gallery}</a></li>
              <li><a href="#menu">{t.nav.menu}</a></li>
              <li><a href="#info">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">{t.footer.menuTitle}</span>
            <ul>
              <li><a href="#menu">{t.menu.tabs.hot}</a></li>
              <li><a href="#menu">{t.menu.tabs.cold}</a></li>
              <li><a href="#menu">{t.menu.tabs.food}</a></li>
              <li><a href="#menu">{t.menu.tabs.sweet}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">{t.footer.copy}</span>

          <div className="footer-social">
            <a href="https://www.instagram.com/57coffeehouse/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#">Facebook</a>
            <a href="https://maps.app.goo.gl/UJrpZAwaFK4ELQJM7" target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}