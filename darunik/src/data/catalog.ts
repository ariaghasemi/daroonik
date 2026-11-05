export type SeedCategory = {
  slug: string;
  title: string;
  parentSlug: string | null;
  icon: string;
  description: string;
  image: string;
  sort: number;
};

export type SeedBrand = {
  slug: string;
  name: string;
  nameEn: string;
  country: string;
  description: string;
  featured: boolean;
};

export type SeedProduct = {
  slug: string;
  name: string;
  brandSlug: string;
  categorySlug: string;
  rootSlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  sold: number;
  stock: number;
  image: string;
  shortDesc: string;
  description: string[];
  specs: { label: string; value: string }[];
  variants: { label: string; options: string[] }[];
  usage: string;
  warning: string;
  faq: { q: string; a: string }[];
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  tags: string[];
};

export const BRANDS: SeedBrand[] = [
  {
    slug: "ariana-pharma",
    name: "آریانا فارما",
    nameEn: "Ariana Pharma",
    country: "ایران",
    description:
      "آریانا فارما یک برند نمونه در حوزه مکمل‌های دارویی است که در این نمونه‌کار برای نمایش ساختار صفحه برند استفاده شده است. تمرکز محصولات این برند روی مکمل‌های روزانه و ویتامین‌های پرمصرف خانواده است.",
    featured: true,
  },
  {
    slug: "nutrilife",
    name: "نوتری‌لایف",
    nameEn: "NutriLife",
    country: "ایران",
    description:
      "نوتری‌لایف برند نمونه مکمل‌های ورزشی و پروتئینی است؛ از پروتئین وی و کراتین تا آمینواسیدهای زنجیره شاخه‌دار برای ورزشکاران آماتور و حرفه‌ای.",
    featured: true,
  },
  {
    slug: "dermacare",
    name: "درماکر",
    nameEn: "DermaCare",
    country: "فرانسه",
    description:
      "درماکر برند نمونه مراقبت پوست با فرمولاسیون‌های ملایم و مناسب پوست‌های حساس؛ شامل ضدآفتاب، مرطوب‌کننده و سرم‌های تخصصی.",
    featured: true,
  },
  {
    slug: "vitaplus",
    name: "ویتاپلاس",
    nameEn: "VitaPlus",
    country: "آلمان",
    description:
      "ویتاپلاس برند نمونه ویتامین‌ها و مینرال‌ها با تنوع بالا در فرم‌های قرص، کپسول، قطره و جوشان.",
    featured: true,
  },
  {
    slug: "medico-health",
    name: "مدیکو هلث",
    nameEn: "Medico Health",
    country: "ژاپن",
    description:
      "مدیکو هلث برند نمونه تجهیزات پزشکی خانگی شامل فشارسنج، دستگاه تست قند خون، دماسنج و پالس اکسیمتر.",
    featured: true,
  },
  {
    slug: "beautylab",
    name: "بیوتی‌لب",
    nameEn: "BeautyLab",
    country: "کره جنوبی",
    description:
      "بیوتی‌لب برند نمونه محصولات آرایشی و بهداشتی با الهام از روتین‌های چندمرحله‌ای مراقبت پوست.",
    featured: true,
  },
  {
    slug: "kidscare",
    name: "کیدزکر",
    nameEn: "KidsCare",
    country: "ایران",
    description:
      "کیدزکر برند نمونه محصولات مادر و کودک؛ از شامپو بدون اشک تا کرم‌های محافظ پوست نوزاد.",
    featured: true,
  },
  {
    slug: "purefit",
    name: "پیورفیت",
    nameEn: "PureFit",
    country: "آمریکا",
    description:
      "پیورفیت برند نمونه تغذیه ورزشی و مکمل‌های تناسب اندام با تمرکز بر خلوص فرمولاسیون.",
    featured: true,
  },
  {
    slug: "herbalis",
    name: "هربالیس",
    nameEn: "Herbalis",
    country: "ایران",
    description:
      "هربالیس برند نمونه فرآورده‌های گیاهی و مکمل‌های طبیعی برای آرامش، خواب و سلامت گوارش.",
    featured: false,
  },
  {
    slug: "oraclean",
    name: "اوراکلین",
    nameEn: "OraClean",
    country: "سوئیس",
    description:
      "اوراکلین برند نمونه بهداشت دهان و دندان شامل خمیردندان، دهان‌شویه و لوازم مراقبت روزانه.",
    featured: false,
  },
];

export const CATEGORIES: SeedCategory[] = [
  {
    slug: "sports-supplements",
    title: "مکمل‌های ورزشی",
    parentSlug: null,
    icon: "dumbbell",
    description:
      "مکمل‌های ورزشی برای عضله‌سازی، ریکاوری و افزایش توان تمرین؛ شامل پروتئین وی، کراتین، آمینواسید، گینر و مکمل‌های پیش از تمرین. انتخاب مکمل ورزشی باید متناسب با هدف تمرینی، وزن بدن و برنامه تغذیه شما انجام شود.",
    image: "/images/products/whey-protein.webp",
    sort: 1,
  },
  {
    slug: "protein",
    title: "پروتئین و وی",
    parentSlug: "sports-supplements",
    icon: "shaker",
    description:
      "انواع پودر پروتئین وی، ایزوله و کازئین برای تأمین پروتئین روزانه و کمک به ریکاوری عضلات پس از تمرین.",
    image: "/images/products/whey-protein.webp",
    sort: 1,
  },
  {
    slug: "creatine",
    title: "کراتین",
    parentSlug: "sports-supplements",
    icon: "bolt",
    description:
      "کراتین مونوهیدرات و فرم‌های ترکیبی آن، از شناخته‌شده‌ترین مکمل‌های افزایش توان در تمرینات قدرتی و انفجاری هستند.",
    image: "/images/products/creatine.webp",
    sort: 2,
  },
  {
    slug: "amino",
    title: "آمینو اسید و BCAA",
    parentSlug: "sports-supplements",
    icon: "molecule",
    description:
      "آمینواسیدهای زنجیره شاخه‌دار و مکمل‌های EAA برای کاهش خستگی تمرین و حمایت از ریکاوری.",
    image: "/images/products/bcaa.webp",
    sort: 3,
  },
  {
    slug: "mass-gainer",
    title: "گینر و افزایش وزن",
    parentSlug: "sports-supplements",
    icon: "trendingUp",
    description: "مکمل‌های پرکالری برای افرادی که در افزایش وزن و حجم عضلانی چالش دارند.",
    image: "/images/products/whey-protein.webp",
    sort: 4,
  },
  {
    slug: "pre-workout",
    title: "پیش از تمرین",
    parentSlug: "sports-supplements",
    icon: "flame",
    description: "مکمل‌های پیش‌تمرین برای افزایش تمرکز، انرژی و پمپ عضلانی در جلسات سنگین.",
    image: "/images/products/bcaa.webp",
    sort: 5,
  },
  {
    slug: "vitamins",
    title: "ویتامین و مکمل",
    parentSlug: null,
    icon: "pill",
    description:
      "ویتامین‌ها و مکمل‌های غذایی روزانه برای حمایت از سیستم ایمنی، انرژی، سلامت استخوان و پوست. در این دسته انواع مولتی‌ویتامین، ویتامین D، ویتامین C، امگا ۳ و مینرال‌ها را می‌بینید.",
    image: "/images/products/multivitamin.webp",
    sort: 2,
  },
  {
    slug: "multivitamin",
    title: "مولتی‌ویتامین",
    parentSlug: "vitamins",
    icon: "capsules",
    description: "مولتی‌ویتامین‌های آقایان، بانوان و کودکان برای پوشش کمبودهای رایز رژیم روزانه.",
    image: "/images/products/multivitamin.webp",
    sort: 1,
  },
  {
    slug: "vitamin-d",
    title: "ویتامین D",
    parentSlug: "vitamins",
    icon: "sun",
    description: "قرص، پرل و قطره ویتامین D برای حمایت از سلامت استخوان و عملکرد سیستم ایمنی.",
    image: "/images/products/vitamin-d3.webp",
    sort: 2,
  },
  {
    slug: "vitamin-c",
    title: "ویتامین C",
    parentSlug: "vitamins",
    icon: "citrus",
    description: "ویتامین C در فرم‌های جوشان، قرص و آهسته‌رهش برای حمایت از ایمنی بدن و سلامت پوست.",
    image: "/images/products/zinc.webp",
    sort: 3,
  },
  {
    slug: "omega",
    title: "امگا ۳ و روغن ماهی",
    parentSlug: "vitamins",
    icon: "fish",
    description: "مکمل‌های امگا ۳ با EPA و DHA برای سلامت قلب، مغز و مفاصل.",
    image: "/images/products/omega3.webp",
    sort: 4,
  },
  {
    slug: "minerals",
    title: "مینرال‌ها",
    parentSlug: "vitamins",
    icon: "flask",
    description: "زینک، منیزیم، آهن و کلسیم در فرم‌های جذب‌پذیر برای نیازهای روزانه بدن.",
    image: "/images/products/magnesium.webp",
    sort: 5,
  },
  {
    slug: "women-supplement",
    title: "مکمل بانوان",
    parentSlug: "vitamins",
    icon: "flower",
    description: "مکمل‌های تخصصی بانوان شامل کلاژن، آهن، فولیک اسید و ترکیبات مو و ناخن.",
    image: "/images/products/collagen.webp",
    sort: 6,
  },
  {
    slug: "kids-supplement",
    title: "مکمل کودکان",
    parentSlug: "vitamins",
    icon: "teddy",
    description: "قطره، شربت و پاستیل‌های ویتامینه مخصوص کودکان با طعم‌های خوشایند.",
    image: "/images/products/baby-bottle.webp",
    sort: 7,
  },
  {
    slug: "skin-care",
    title: "مراقبت پوست",
    parentSlug: null,
    icon: "face",
    description:
      "محصولات مراقبت پوست شامل ضدآفتاب، مرطوب‌کننده، سرم صورت، پاک‌کننده و محصولات ضدجوش. برای ساخت یک روتین مؤثر، ابتدا نوع پوست خود را بشناسید و سپس محصولات را لایه‌به‌لایه انتخاب کنید.",
    image: "/images/products/serum.webp",
    sort: 3,
  },
  {
    slug: "sunscreen",
    title: "ضدآفتاب",
    parentSlug: "skin-care",
    icon: "sun",
    description: "کرم و فلوئید ضدآفتاب با SPF بالا، مناسب پوست چرب، خشک و حساس.",
    image: "/images/products/sunscreen.webp",
    sort: 1,
  },
  {
    slug: "moisturizer",
    title: "مرطوب‌کننده",
    parentSlug: "skin-care",
    icon: "droplet",
    description: "کرم و ژل آبرسان با ترکیباتی مثل هیالورونیک اسید، سرامید و پانتنول.",
    image: "/images/products/moisturizer.webp",
    sort: 2,
  },
  {
    slug: "face-serum",
    title: "سرم صورت",
    parentSlug: "skin-care",
    icon: "dropper",
    description: "سرم‌های تخصصی ویتامین C، نیاسینامید، رتینول و هیالورونیک اسید.",
    image: "/images/products/serum.webp",
    sort: 3,
  },
  {
    slug: "cleanser",
    title: "پاک‌کننده صورت",
    parentSlug: "skin-care",
    icon: "bubbles",
    description: "میسلار واتر، ژل شست‌وشو و فوم پاک‌کننده برای انواع پوست.",
    image: "/images/products/micellar.webp",
    sort: 4,
  },
  {
    slug: "anti-acne",
    title: "ضدجوش و ضدلک",
    parentSlug: "skin-care",
    icon: "target",
    description: "محصولات کمک‌کننده به کنترل چربی، جوش و لک‌های سطحی پوست.",
    image: "/images/products/serum.webp",
    sort: 5,
  },
  {
    slug: "hair-care",
    title: "مراقبت مو",
    parentSlug: null,
    icon: "hair",
    description:
      "شامپو، سرم، ماسک و محصولات ضدریزش مو برای انواع مو؛ از موهای چرب و شوره‌دار تا موهای خشک و آسیب‌دیده.",
    image: "/images/products/shampoo.webp",
    sort: 4,
  },
  {
    slug: "shampoo",
    title: "شامپو",
    parentSlug: "hair-care",
    icon: "bottle",
    description: "شامپوهای تخصصی ضدشوره، ملایم روزانه و مخصوص موهای رنگ‌شده.",
    image: "/images/products/shampoo.webp",
    sort: 1,
  },
  {
    slug: "hair-serum",
    title: "سرم و روغن مو",
    parentSlug: "hair-care",
    icon: "dropper",
    description: "سرم‌های ترمیم‌کننده و روغن‌های مغذی برای کاهش وز و افزایش درخشندگی مو.",
    image: "/images/products/hair-serum.webp",
    sort: 2,
  },
  {
    slug: "anti-hairloss",
    title: "ضدریزش مو",
    parentSlug: "hair-care",
    icon: "shieldCheck",
    description: "محصولات کمکی برای کاهش ریزش موی فصلی و تقویت ساقه مو.",
    image: "/images/products/hair-serum.webp",
    sort: 3,
  },
  {
    slug: "hair-mask",
    title: "ماسک و نرم‌کننده",
    parentSlug: "hair-care",
    icon: "jar",
    description: "ماسک‌های ترمیم‌کننده عمقی برای موهای آسیب‌دیده و رنگ‌شده.",
    image: "/images/products/shampoo.webp",
    sort: 4,
  },
  {
    slug: "oral-care",
    title: "بهداشت دهان و دندان",
    parentSlug: null,
    icon: "tooth",
    description:
      "خمیردندان، دهان‌شویه، مسواک و نخ دندان برای مراقبت روزانه از دهان و دندان و پیشگیری از پوسیدگی.",
    image: "/images/products/toothpaste.webp",
    sort: 5,
  },
  {
    slug: "toothpaste",
    title: "خمیر دندان",
    parentSlug: "oral-care",
    icon: "toothpaste",
    description: "خمیردندان‌های سفیدکننده، ضدحساسیت و مخصوص لثه.",
    image: "/images/products/toothpaste.webp",
    sort: 1,
  },
  {
    slug: "mouthwash",
    title: "دهان‌شویه",
    parentSlug: "oral-care",
    icon: "leaf",
    description: "دهان‌شویه‌های بدون الکل و ضدپلاک برای تنفس تازه و سلامت لثه.",
    image: "/images/products/mouthwash.webp",
    sort: 2,
  },
  {
    slug: "toothbrush",
    title: "مسواک و نخ دندان",
    parentSlug: "oral-care",
    icon: "toothbrush",
    description: "مسواک‌های نرم و متوسط، نخ دندان و لوازم جانبی بهداشت دهان.",
    image: "/images/products/toothpaste.webp",
    sort: 3,
  },
  {
    slug: "medical-devices",
    title: "تجهیزات پزشکی",
    parentSlug: null,
    icon: "stethoscope",
    description:
      "تجهیزات پزشکی خانگی شامل فشارسنج، دستگاه تست قند خون، دماسنج، نبولایزر، پالس اکسیمتر و محصولات ارتوپدی برای پایش سلامت در منزل.",
    image: "/images/products/bp-monitor.webp",
    sort: 6,
  },
  {
    slug: "blood-pressure",
    title: "فشارسنج",
    parentSlug: "medical-devices",
    icon: "heartPulse",
    description: "فشارسنج‌های بازویی و مچی دیجیتال با حافظه چندکاربره.",
    image: "/images/products/bp-monitor.webp",
    sort: 1,
  },
  {
    slug: "glucose",
    title: "تست قند خون",
    parentSlug: "medical-devices",
    icon: "bloodDrop",
    description: "گلوکومتر و نوار تست قند خون برای پایش روزانه قند خون.",
    image: "/images/products/glucose-meter.webp",
    sort: 2,
  },
  {
    slug: "thermometer",
    title: "دماسنج",
    parentSlug: "medical-devices",
    icon: "thermometer",
    description: "دماسنج‌های دیجیتال و مادون قرمز پیشانی برای اندازه‌گیری سریع دما.",
    image: "/images/products/thermometer.webp",
    sort: 3,
  },
  {
    slug: "nebulizer",
    title: "نبولایزر و بخور",
    parentSlug: "medical-devices",
    icon: "wind",
    description: "دستگاه‌های بخور سرد و نبولایزر خانگی برای مراقبت‌های تنفسی.",
    image: "/images/products/nebulizer.webp",
    sort: 4,
  },
  {
    slug: "orthopedic",
    title: "ارتوپدی",
    parentSlug: "medical-devices",
    icon: "bone",
    description: "زانوبند، مچ‌بند و کمربندهای طبی برای حمایت از مفاصل.",
    image: "/images/products/knee-brace.webp",
    sort: 5,
  },
  {
    slug: "oximeter",
    title: "پالس اکسیمتر",
    parentSlug: "medical-devices",
    icon: "monitor",
    description: "پالس اکسیمتر انگشتی برای اندازه‌گیری اکسیژن خون و ضربان قلب.",
    image: "/images/products/oximeter.webp",
    sort: 6,
  },
  {
    slug: "mom-baby",
    title: "مادر و کودک",
    parentSlug: null,
    icon: "babyBottle",
    description:
      "محصولات مادر و کودک شامل شامپو بدون اشک، کرم‌های محافظ پوست، شیشه شیر و لوازم تغذیه نوزاد با فرمولاسیون‌های ملایم.",
    image: "/images/products/baby-shampoo.webp",
    sort: 7,
  },
  {
    slug: "baby-wash",
    title: "شامپو و شوینده کودک",
    parentSlug: "mom-baby",
    icon: "bath",
    description: "شامپو و شوینده‌های بدون اشک و ملایم مخصوص پوست حساس نوزاد.",
    image: "/images/products/baby-shampoo.webp",
    sort: 1,
  },
  {
    slug: "baby-skin",
    title: "مراقبت پوست کودک",
    parentSlug: "mom-baby",
    icon: "teddy",
    description: "کرم‌های محافظ، پماد سوختگی پوشک و لوسیون‌های آبرسان کودک.",
    image: "/images/products/baby-cream.webp",
    sort: 2,
  },
  {
    slug: "baby-feeding",
    title: "شیشه شیر و تغذیه",
    parentSlug: "mom-baby",
    icon: "babyBottle",
    description: "شیشه شیر، سرشیشه و لوازم تغذیه نوزاد با متریال ایمن.",
    image: "/images/products/baby-bottle.webp",
    sort: 3,
  },
];

/* ---------- content builders (real Persian copy, per product family) ---------- */

type Family = "supplement" | "skin" | "hair" | "oral" | "device" | "baby";

const familyOfRoot: Record<string, Family> = {
  "sports-supplements": "supplement",
  vitamins: "supplement",
  "skin-care": "skin",
  "hair-care": "hair",
  "oral-care": "oral",
  "medical-devices": "device",
  "mom-baby": "baby",
};

const usageText: Record<Family, string> = {
  supplement:
    "میزان و زمان مصرف این محصول به وزن بدن، شدت فعالیت و رژیم غذایی شما بستگی دارد. توصیه عمومی روی بسته‌بندی درج شده است؛ با این حال بهتر است دوز دقیق را با پزشک، داروساز یا کارشناس تغذیه هماهنگ کنید. مصرف مکمل جایگزین یک رژیم غذایی متعادل نیست.",
  skin:
    "پیش از استفاده، پوست را با یک پاک‌کننده ملایم بشویید و خشک کنید. مقدار مناسب محصول را روی پوست پخش کنید و به‌آرامی ماساژ دهید. برای محصولات جدید، ابتدا تست حساسیت روی ناحیه کوچکی از پوست ساعد انجام دهید و ۲۴ ساعت واکنش پوست را بررسی کنید.",
  hair:
    "محصول را روی موی مرطوب یا خشک (مطابق راهنمای بسته) استفاده کنید و پوست سر را به‌آرامی ماساژ دهید. برای نتیجه بهتر، استفاده منظم و ترکیب با یک روتین ثابت مراقبت مو توصیه می‌شود.",
  oral:
    "دو بار در روز، صبح و پیش از خواب استفاده کنید. مسواک زدن حداقل دو دقیقه و همراه با نخ دندان بیشترین اثر را دارد. برای کودکان زیر ۶ سال، مصرف با نظارت بزرگ‌تر انجام شود.",
  device:
    "پیش از اولین استفاده، دفترچه راهنما را کامل مطالعه کنید. اندازه‌گیری را در وضعیت نشسته و آرام انجام دهید و برای نتایج قابل مقایسه، اندازه‌گیری را در ساعت مشخصی از روز تکرار کنید. نتایج دستگاه‌های خانگی جایگزین تشخیص و نظر پزشک نیست.",
  baby:
    "مقدار کمی از محصول را روی پوست تمیز و خشک کودک استفاده کنید. از تماس با چشم خودداری کنید و در صورت بروز قرمزی یا حساسیت، مصرف را متوقف کرده و با پزشک کودک مشورت کنید.",
};

const warningText: Record<Family, string> = {
  supplement:
    "این محصول یک مکمل غذایی است و برای درمان، تشخیص یا پیشگیری از بیماری ارائه نمی‌شود. مصرف در دوران بارداری و شیردهی، افراد دارای بیماری زمینه‌ای یا مصرف‌کنندگان داروهای خاص، تنها با نظر پزشک انجام شود. دور از دسترس کودکان نگهداری کنید.",
  skin:
    "مصرف خارجی است. از تماس با چشم‌ها خودداری کنید. در صورت بروز سوزش، قرمزی یا حساسیت، مصرف را قطع کرده و با پزشک یا داروساز مشورت کنید. محصول را در دمای اتاق و دور از نور مستقیم خورشید نگهداری کنید.",
  hair:
    "مصرف خارجی است. در صورت تماس با چشم، با آب فراوان شست‌وشو دهید. اگر سابقه حساسیت پوستی دارید، پیش از استفاده تست حساسیت انجام دهید.",
  oral:
    "بلعیدن محصول توصیه نمی‌شود. در صورت بروز حساسیت در لثه یا مخاط دهان، مصرف را متوقف کنید و با دندان‌پزشک مشورت کنید.",
  device:
    "این دستگاه برای پایش خانگی طراحی شده و جایگزین معاینه پزشکی نیست. در صورت مشاهده نتایج غیرعادی یا تکرارشونده، حتماً به پزشک مراجعه کنید.",
  baby:
    "مصرف خارجی و مخصوص پوست کودک است. از تماس با چشم خودداری کنید و دور از دسترس کودکان نگهداری شود. در صورت بروز حساسیت، مصرف را قطع و با پزشک کودک مشورت کنید.",
};

function buildDescription(name: string, family: Family, short: string, brand: string): string[] {
  const common = [
    `${name} یکی از محصولات پرطرفدار برند ${brand} در فروشگاه اینترنتی دارونیک است. ${short}`,
  ];
  const byFamily: Record<Family, string[]> = {
    supplement: [
      "فرمولاسیون این محصول با تمرکز بر جذب بهتر و مصرف روزانه آسان طراحی شده است؛ به همین دلیل می‌تواند مکمل خوبی برای رژیم غذایی افرادی باشد که به دلیل مشغله یا محدودیت‌های غذایی، دریافت روزانه‌شان کامل نیست.",
      "پیش از خرید هر مکمل، پیشنهاد می‌کنیم هدف خود را مشخص کنید: تأمین کمبود، حمایت از ریکاوری ورزشی یا مراقبت عمومی از سلامت. تیم داروسازان دارونیک در بخش «مشاوره دارویی» آماده پاسخ‌گویی به پرسش‌های شماست.",
      "تمام محصولات این دسته با شرایط استاندارد نگهداری و زنجیره ارسال کنترل‌شده به دست شما می‌رسند و اصالت کالا در زمان تحویل قابل بررسی است.",
    ],
    skin: [
      "بافت این محصول سبک و غیرچرب است و به‌سرعت روی پوست جذب می‌شود؛ بنابراین می‌توانید آن را زیر آرایش یا در کنار سایر مراحل روتین پوستی استفاده کنید.",
      "برای رسیدن به بهترین نتیجه، مراقبت پوست را به شکل یک روتین منظم ببینید: پاک‌سازی، آبرسانی، درمان اختصاصی و در روز، ضدآفتاب. ترتیب استفاده از محصولات از سبک به سنگین است.",
      "این محصول برای استفاده روزمره طراحی شده است؛ با این حال اگر پوست حساس یا شرایط پوستی خاصی دارید، مشورت با متخصص پوست انتخاب مطمئن‌تری است.",
    ],
    hair: [
      "سلامت مو به عوامل مختلفی مثل تغذیه، سطح استرس، شست‌وشوی صحیح و مراقبت از پوست سر وابسته است؛ محصولات مراقبتی بخشی از این مجموعه‌اند و بهترین نتیجه در کنار یک سبک زندگی سالم به دست می‌آید.",
      "فرمول این محصول برای استفاده منظم طراحی شده و به کاهش خشکی، وز و شکنندگی ساقه مو کمک می‌کند.",
      "اگر ریزش مو شدید یا ناگهانی دارید، پیش از هر انتخابی بررسی علت با پزشک را در اولویت قرار دهید.",
    ],
    oral: [
      "مراقبت روزانه از دهان و دندان ساده‌ترین راه پیشگیری از پوسیدگی و مشکلات لثه است. ترکیب مسواک، نخ دندان و دهان‌شویه یک روتین کامل می‌سازد.",
      "این محصول برای مصرف روزانه طراحی شده و طعم ملایم آن استفاده منظم را آسان‌تر می‌کند.",
      "معاینه دوره‌ای دندان‌پزشکی هر شش ماه یک‌بار همچنان بخش جدانشدنی سلامت دهان است.",
    ],
    device: [
      "این دستگاه برای پایش ساده و سریع شاخص‌های سلامت در منزل طراحی شده است و نمایشگر خوانا و منوی فارسی‌پسند آن، استفاده برای سالمندان را نیز آسان می‌کند.",
      "ثبت منظم نتایج و مقایسه روند آن‌ها در طول زمان، اطلاعات ارزشمندی در اختیار پزشک شما قرار می‌دهد.",
      "کالا دارای گارانتی تعویض نمونه‌ای و خدمات پس از فروش در این نمونه‌کار در نظر گرفته شده است.",
    ],
    baby: [
      "پوست نوزاد نازک‌تر و حساس‌تر از پوست بزرگسال است؛ به همین دلیل محصولات این دسته با فرمولاسیون ملایم و pH متعادل انتخاب شده‌اند.",
      "پیش از استفاده گسترده، تست حساسیت روی ناحیه کوچکی از پوست کودک را فراموش نکنید.",
      "همه محصولات مادر و کودک دارونیک با بسته‌بندی سالم و تاریخ انقضای معتبر ارسال می‌شوند.",
    ],
  };
  return [...common, ...byFamily[family]];
}

function buildFaq(name: string, family: Family): { q: string; a: string }[] {
  const base = [
    {
      q: `آیا ${name} اصل است و اصالت کالا قابل بررسی است؟`,
      a: "بله. در این نمونه‌کار فرض بر این است که همه کالاها از مسیر رسمی تأمین می‌شوند و در زمان تحویل، بسته‌بندی و برچسب اصالت قابل بررسی است.",
    },
    {
      q: "ارسال چقدر طول می‌کشد؟",
      a: "سفارش‌های ثبت‌شده تا ساعت ۱۴ در همان روز کاری پردازش می‌شوند؛ ارسال درون‌شهری ۲۴ ساعته و ارسال به سایر شهرها بین ۲ تا ۴ روز کاری در نظر گرفته شده است.",
    },
    {
      q: "امکان مرجوع کردن کالا وجود دارد؟",
      a: "کالاهای سالم و پلمب‌شده تا ۷ روز پس از تحویل قابل مرجوع هستند. اقلام باز شده به دلیل ماهیت بهداشتی، مطابق قوانین فروشگاه مرجوع نمی‌شوند.",
    },
  ];
  const extra: Record<Family, { q: string; a: string }> = {
    supplement: {
      q: "بهترین زمان مصرف این مکمل چه موقع است؟",
      a: "زمان مصرف به نوع مکمل بستگی دارد؛ بسیاری از مکمل‌های ویتامینی همراه وعده غذایی جذب بهتری دارند. برای برنامه دقیق، مشورت با داروساز یا کارشناس تغذیه توصیه می‌شود.",
    },
    skin: {
      q: "این محصول برای پوست حساس مناسب است؟",
      a: "فرمولاسیون این دسته معمولاً ملایم است، اما پوست هر فرد متفاوت واکنش نشان می‌دهد. انجام تست حساسیت پیش از استفاده کامل توصیه می‌شود.",
    },
    hair: {
      q: "چند وقت طول می‌کشد تا نتیجه را ببینم؟",
      a: "چرخه رشد مو کند است؛ معمولاً برای ارزیابی اثر یک محصول مراقبتی، حداقل ۸ تا ۱۲ هفته استفاده منظم لازم است.",
    },
    oral: {
      q: "روزی چند بار استفاده کنم؟",
      a: "استفاده دو بار در روز، صبح و شب، برای اغلب افراد کافی است؛ مگر آنکه دندان‌پزشک برنامه دیگری توصیه کند.",
    },
    device: {
      q: "دقت اندازه‌گیری دستگاه چقدر است؟",
      a: "دستگاه‌های خانگی برای پایش روند طراحی شده‌اند. برای دقت بیشتر، اندازه‌گیری را در شرایط آرام و ساعت مشخصی از روز تکرار کنید.",
    },
    baby: {
      q: "از چه سنی می‌توان استفاده کرد؟",
      a: "بازه سنی پیشنهادی روی بسته‌بندی درج شده است؛ برای نوزادان زیر سه ماه، پیش از استفاده با پزشک کودک مشورت کنید.",
    },
  };
  return [extra[family], ...base];
}

type Row = {
  slug: string;
  name: string;
  brand: string;
  cat: string;
  root: string;
  price: number;
  old?: number;
  rating: number;
  rc: number;
  sold: number;
  stock: number;
  img: string;
  short: string;
  specs: [string, string][];
  variants?: [string, string[]][];
  flags?: ("new" | "best" | "featured")[];
};

const ROWS: Row[] = [
  // ---------- sports supplements ----------
  { slug: "whey-protein-nutrilife-2kg", name: "پروتئین وی نوتری‌لایف ۲ کیلوگرم", brand: "nutrilife", cat: "protein", root: "sports-supplements", price: 3480000, old: 4290000, rating: 4.8, rc: 412, sold: 1830, stock: 24, img: "/images/products/whey-protein.webp", short: "پودر پروتئین وی کنسانتره با ۲۴ گرم پروتئین در هر پیمانه، مناسب ریکاوری بعد از تمرین.", specs: [["نوع پروتئین", "وی کنسانتره"], ["وزن", "۲۰۰۰ گرم"], ["پروتئین در هر سروینگ", "۲۴ گرم"], ["تعداد سروینگ", "۶۰"], ["طعم", "شکلات / وانیل"]], variants: [["طعم", ["شکلات", "وانیل", "توت‌فرنگی"]], ["وزن", ["۹۰۰ گرم", "۲۰۰۰ گرم"]]], flags: ["best", "featured"] },
  { slug: "isolate-protein-purefit", name: "پروتئین ایزوله پیورفیت ۱.۸ کیلوگرم", brand: "purefit", cat: "protein", root: "sports-supplements", price: 4650000, old: 5200000, rating: 4.7, rc: 226, sold: 940, stock: 15, img: "/images/products/whey-protein.webp", short: "ایزوله وی با فیلتراسیون سرد، کربوهیدرات و چربی بسیار پایین برای دوره‌های کات.", specs: [["نوع پروتئین", "ایزوله"], ["وزن", "۱۸۰۰ گرم"], ["پروتئین در هر سروینگ", "۲۷ گرم"], ["قند", "کمتر از ۱ گرم"]], variants: [["طعم", ["شکلات", "بیسکوییت"]]], flags: ["featured"] },
  { slug: "creatine-monohydrate-nutrilife", name: "کراتین مونوهیدرات نوتری‌لایف ۳۰۰ گرم", brand: "nutrilife", cat: "creatine", root: "sports-supplements", price: 1180000, old: 1450000, rating: 4.9, rc: 508, sold: 2410, stock: 40, img: "/images/products/creatine.webp", short: "کراتین مونوهیدرات میکرونایز با خلوص بالا برای افزایش توان در تمرینات قدرتی.", specs: [["فرم", "مونوهیدرات میکرونایز"], ["وزن", "۳۰۰ گرم"], ["هر سروینگ", "۵ گرم"], ["تعداد سروینگ", "۶۰"]], flags: ["best"] },
  { slug: "creatine-hcl-purefit", name: "کراتین HCL پیورفیت ۱۵۰ گرم", brand: "purefit", cat: "creatine", root: "sports-supplements", price: 1490000, rating: 4.5, rc: 96, sold: 320, stock: 18, img: "/images/products/creatine.webp", short: "کراتین هیدروکلراید با حلالیت بالا و نیاز به دوز کمتر نسبت به فرم مونوهیدرات.", specs: [["فرم", "HCL"], ["وزن", "۱۵۰ گرم"], ["هر سروینگ", "۳ گرم"]], flags: ["new"] },
  { slug: "bcaa-2-1-1-purefit", name: "بی‌سی‌ای‌ای ۲:۱:۱ پیورفیت ۴۵۰ گرم", brand: "purefit", cat: "amino", root: "sports-supplements", price: 1980000, old: 2350000, rating: 4.6, rc: 187, sold: 760, stock: 22, img: "/images/products/bcaa.webp", short: "آمینواسیدهای زنجیره شاخه‌دار با نسبت استاندارد ۲:۱:۱ برای کاهش خستگی تمرین.", specs: [["نسبت", "۲:۱:۱"], ["وزن", "۴۵۰ گرم"], ["ویتامین B6", "دارد"]], variants: [["طعم", ["هندوانه", "لیمو", "پرتقال"]]], flags: ["best"] },
  { slug: "eaa-complex-nutrilife", name: "آمینو اسید EAA کمپلکس نوتری‌لایف", brand: "nutrilife", cat: "amino", root: "sports-supplements", price: 2290000, rating: 4.4, rc: 74, sold: 280, stock: 12, img: "/images/products/bcaa.webp", short: "ترکیب ۹ آمینواسید ضروری برای حمایت از سنتز پروتئین عضلانی.", specs: [["تعداد آمینواسید", "۹"], ["وزن", "۳۹۰ گرم"], ["الکترولیت", "دارد"]], flags: ["new"] },
  { slug: "mass-gainer-purefit-3kg", name: "گینر افزایش وزن پیورفیت ۳ کیلوگرم", brand: "purefit", cat: "mass-gainer", root: "sports-supplements", price: 3950000, old: 4600000, rating: 4.3, rc: 132, sold: 510, stock: 9, img: "/images/products/whey-protein.webp", short: "مکمل پرکالری با ترکیب کربوهیدرات پیچیده و پروتئین برای افزایش وزن تدریجی.", specs: [["کالری هر سروینگ", "۶۵۰ کیلوکالری"], ["وزن", "۳۰۰۰ گرم"], ["پروتئین", "۳۰ گرم"]], variants: [["طعم", ["شکلات", "موز"]]] },
  { slug: "pre-workout-nutrilife", name: "پیش‌تمرین انرژی‌زا نوتری‌لایف", brand: "nutrilife", cat: "pre-workout", root: "sports-supplements", price: 1750000, old: 2100000, rating: 4.5, rc: 118, sold: 430, stock: 16, img: "/images/products/bcaa.webp", short: "فرمول پیش از تمرین با بتاآلانین، سیترولین و کافئین برای افزایش تمرکز و پمپ.", specs: [["کافئین", "۲۰۰ میلی‌گرم"], ["بتاآلانین", "دارد"], ["وزن", "۳۰۰ گرم"]], variants: [["طعم", ["انبه", "آلبالو"]]] },
  { slug: "glutamine-purefit", name: "گلوتامین خالص پیورفیت ۳۰۰ گرم", brand: "purefit", cat: "amino", root: "sports-supplements", price: 1420000, rating: 4.4, rc: 61, sold: 210, stock: 20, img: "/images/products/creatine.webp", short: "ال-گلوتامین با خلوص بالا برای حمایت از ریکاوری و سلامت گوارش ورزشکاران.", specs: [["فرم", "پودر"], ["وزن", "۳۰۰ گرم"], ["هر سروینگ", "۵ گرم"]] },

  // ---------- vitamins ----------
  { slug: "multivitamin-daily-vitaplus", name: "مولتی‌ویتامین روزانه ویتاپلاس ۶۰ عددی", brand: "vitaplus", cat: "multivitamin", root: "vitamins", price: 680000, old: 850000, rating: 4.7, rc: 640, sold: 3120, stock: 60, img: "/images/products/multivitamin.webp", short: "مولتی‌ویتامین کامل با ۲۳ ویتامین و مینرال برای پوشش نیازهای روزانه بزرگسالان.", specs: [["تعداد", "۶۰ قرص"], ["فرم", "قرص روکش‌دار"], ["مصرف روزانه", "۱ عدد"], ["مناسب", "بزرگسالان"]], flags: ["best", "featured"] },
  { slug: "multivitamin-women-ariana", name: "مولتی‌ویتامین بانوان آریانا فارما", brand: "ariana-pharma", cat: "women-supplement", root: "vitamins", price: 720000, old: 890000, rating: 4.6, rc: 298, sold: 1180, stock: 35, img: "/images/products/multivitamin.webp", short: "فرمول تخصصی بانوان با آهن، فولیک اسید، بیوتین و ویتامین‌های گروه B.", specs: [["تعداد", "۶۰ قرص"], ["آهن", "دارد"], ["بیوتین", "دارد"]], flags: ["best"] },
  { slug: "vitamin-d3-1000-vitaplus", name: "ویتامین D3 هزار واحدی ویتاپلاس", brand: "vitaplus", cat: "vitamin-d", root: "vitamins", price: 390000, old: 470000, rating: 4.8, rc: 720, sold: 4210, stock: 80, img: "/images/products/vitamin-d3.webp", short: "پرل ویتامین D3 با دوز روزانه ۱۰۰۰ واحد، مناسب مصرف مداوم بزرگسالان.", specs: [["دوز", "۱۰۰۰ IU"], ["تعداد", "۱۰۰ پرل"], ["پایه روغنی", "دارد"]], flags: ["best", "featured"] },
  { slug: "vitamin-d3-drop-ariana", name: "قطره ویتامین D3 آریانا فارما", brand: "ariana-pharma", cat: "vitamin-d", root: "vitamins", price: 285000, rating: 4.7, rc: 331, sold: 1620, stock: 45, img: "/images/products/vitamin-d3.webp", short: "قطره خوراکی ویتامین D3 مناسب شیرخواران و کودکان با قطره‌چکان مدرج.", specs: [["حجم", "۱۵ میلی‌لیتر"], ["هر قطره", "۴۰۰ واحد"], ["مناسب", "شیرخوار و کودک"]] },
  { slug: "vitamin-c-1000-effervescent", name: "ویتامین C جوشان ۱۰۰۰ ویتاپلاس", brand: "vitaplus", cat: "vitamin-c", root: "vitamins", price: 320000, old: 420000, rating: 4.5, rc: 254, sold: 1980, stock: 70, img: "/images/products/zinc.webp", short: "قرص جوشان ویتامین C با طعم پرتقال، همراه با زینک برای حمایت از سیستم ایمنی.", specs: [["دوز", "۱۰۰۰ میلی‌گرم"], ["تعداد", "۲۰ قرص"], ["طعم", "پرتقال"]], flags: ["best"] },
  { slug: "vitamin-c-slow-release-ariana", name: "ویتامین C آهسته‌رهش آریانا فارما", brand: "ariana-pharma", cat: "vitamin-c", root: "vitamins", price: 410000, rating: 4.4, rc: 88, sold: 340, stock: 28, img: "/images/products/zinc.webp", short: "ویتامین C با فناوری آهسته‌رهش برای جذب تدریجی در طول روز و ملایمت بیشتر با معده.", specs: [["دوز", "۵۰۰ میلی‌گرم"], ["تعداد", "۶۰ قرص"], ["آهسته‌رهش", "بله"]] },
  { slug: "omega3-fish-oil-vitaplus", name: "امگا ۳ روغن ماهی ویتاپلاس ۱۰۰۰", brand: "vitaplus", cat: "omega", root: "vitamins", price: 890000, old: 1090000, rating: 4.8, rc: 476, sold: 2240, stock: 38, img: "/images/products/omega3.webp", short: "روغن ماهی با EPA و DHA بالا و فرایند تصفیه مولکولی برای کاهش بوی ماهی.", specs: [["EPA", "۳۶۰ میلی‌گرم"], ["DHA", "۲۴۰ میلی‌گرم"], ["تعداد", "۹۰ پرل"]], flags: ["best", "featured"] },
  { slug: "omega3-kids-kidscare", name: "امگا ۳ کودکان کیدزکر", brand: "kidscare", cat: "kids-supplement", root: "vitamins", price: 540000, rating: 4.6, rc: 143, sold: 620, stock: 30, img: "/images/products/omega3.webp", short: "پرل جویدنی امگا ۳ با طعم پرتقال، مناسب کودکان بالای ۳ سال.", specs: [["فرم", "پرل جویدنی"], ["تعداد", "۶۰ عدد"], ["طعم", "پرتقال"]], flags: ["new"] },
  { slug: "zinc-plus-vitaplus", name: "زینک پلاس ویتاپلاس ۲۵ میلی‌گرم", brand: "vitaplus", cat: "minerals", root: "vitamins", price: 340000, old: 420000, rating: 4.6, rc: 212, sold: 1340, stock: 55, img: "/images/products/zinc.webp", short: "زینک با فرم جذب‌پذیر گلوکونات، برای حمایت از ایمنی، پوست و مو.", specs: [["دوز", "۲۵ میلی‌گرم"], ["تعداد", "۶۰ قرص"], ["فرم", "گلوکونات"]] },
  { slug: "magnesium-complex-vitaplus", name: "منیزیم کمپلکس ویتاپلاس", brand: "vitaplus", cat: "minerals", root: "vitamins", price: 620000, old: 760000, rating: 4.7, rc: 305, sold: 1520, stock: 42, img: "/images/products/magnesium.webp", short: "ترکیب منیزیم سیترات و اکسید همراه ویتامین B6 برای حمایت از عضلات و آرامش.", specs: [["فرم", "سیترات + اکسید"], ["دوز", "۴۰۰ میلی‌گرم"], ["ویتامین B6", "دارد"]], flags: ["best"] },
  { slug: "iron-plus-ariana", name: "آهن پلاس آریانا فارما", brand: "ariana-pharma", cat: "minerals", root: "vitamins", price: 380000, rating: 4.3, rc: 97, sold: 480, stock: 33, img: "/images/products/multivitamin.webp", short: "مکمل آهن با ویتامین C برای جذب بهتر و فرمولاسیون ملایم با دستگاه گوارش.", specs: [["دوز آهن", "۱۴ میلی‌گرم"], ["ویتامین C", "دارد"], ["تعداد", "۳۰ قرص"]] },
  { slug: "marine-collagen-beautylab", name: "کلاژن دریایی بیوتی‌لب ۳۰۰ گرم", brand: "beautylab", cat: "women-supplement", root: "vitamins", price: 1480000, old: 1850000, rating: 4.7, rc: 389, sold: 1710, stock: 26, img: "/images/products/collagen.webp", short: "پپتید کلاژن دریایی با ویتامین C و هیالورونیک اسید برای پوست، مو و ناخن.", specs: [["نوع کلاژن", "دریایی هیدرولیز"], ["وزن", "۳۰۰ گرم"], ["ویتامین C", "دارد"]], variants: [["طعم", ["بدون طعم", "توت‌فرنگی"]]], flags: ["best", "featured"] },
  { slug: "biotin-hair-nail-beautylab", name: "بیوتین مو و ناخن بیوتی‌لب", brand: "beautylab", cat: "women-supplement", root: "vitamins", price: 690000, rating: 4.5, rc: 164, sold: 720, stock: 31, img: "/images/products/collagen.webp", short: "بیوتین ۵۰۰۰ میکروگرم همراه زینک و سلنیوم برای حمایت از سلامت مو و ناخن.", specs: [["بیوتین", "۵۰۰۰ میکروگرم"], ["تعداد", "۶۰ کپسول"]], flags: ["new"] },
  { slug: "kids-gummy-vitamin-kidscare", name: "پاستیل ویتامینه کودکان کیدزکر", brand: "kidscare", cat: "kids-supplement", root: "vitamins", price: 460000, old: 560000, rating: 4.8, rc: 271, sold: 1490, stock: 48, img: "/images/products/multivitamin.webp", short: "پاستیل مولتی‌ویتامین با طعم میوه‌ای، بدون رنگ مصنوعی، مخصوص کودکان بالای ۴ سال.", specs: [["تعداد", "۶۰ پاستیل"], ["طعم", "میوه‌های مخلوط"], ["بدون گلوتن", "بله"]], flags: ["best"] },
  { slug: "herbal-sleep-herbalis", name: "کپسول آرامش و خواب هربالیس", brand: "herbalis", cat: "minerals", root: "vitamins", price: 520000, rating: 4.2, rc: 58, sold: 190, stock: 25, img: "/images/products/magnesium.webp", short: "ترکیب گیاهی سنبل‌الطیب، بادرنجبویه و منیزیم برای حمایت از کیفیت خواب.", specs: [["فرم", "کپسول گیاهی"], ["تعداد", "۳۰ عدد"]], flags: ["new"] },

  // ---------- skin care ----------
  { slug: "sunscreen-spf50-dermacare", name: "کرم ضدآفتاب SPF50 درماکر", brand: "dermacare", cat: "sunscreen", root: "skin-care", price: 780000, old: 980000, rating: 4.8, rc: 852, sold: 3980, stock: 52, img: "/images/products/sunscreen.webp", short: "ضدآفتاب فلوئید با پوشش وسیع UVA/UVB، بدون چربی و مناسب زیر آرایش.", specs: [["SPF", "۵۰+"], ["حجم", "۵۰ میلی‌لیتر"], ["نوع پوست", "چرب و مختلط"], ["ضدآب", "بله"]], variants: [["رنگ", ["بی‌رنگ", "بژ روشن", "بژ طبیعی"]]], flags: ["best", "featured"] },
  { slug: "sunscreen-sensitive-dermacare", name: "ضدآفتاب پوست حساس درماکر SPF30", brand: "dermacare", cat: "sunscreen", root: "skin-care", price: 690000, rating: 4.6, rc: 214, sold: 890, stock: 34, img: "/images/products/sunscreen.webp", short: "ضدآفتاب مینرال با اکسید روی، بدون عطر و مناسب پوست‌های حساس و مستعد قرمزی.", specs: [["SPF", "۳۰"], ["فیلتر", "مینرال"], ["بدون عطر", "بله"]] },
  { slug: "vitamin-c-serum-beautylab", name: "سرم ویتامین C بیوتی‌لب ۱۵٪", brand: "beautylab", cat: "face-serum", root: "skin-care", price: 1150000, old: 1490000, rating: 4.7, rc: 466, sold: 2130, stock: 29, img: "/images/products/serum.webp", short: "سرم روشن‌کننده با ۱۵٪ ویتامین C پایدار و ویتامین E برای یکدست شدن رنگ پوست.", specs: [["غلظت", "۱۵ درصد"], ["حجم", "۳۰ میلی‌لیتر"], ["مصرف", "صبح"]], flags: ["best", "featured"] },
  { slug: "niacinamide-serum-beautylab", name: "سرم نیاسینامید ۱۰٪ بیوتی‌لب", brand: "beautylab", cat: "face-serum", root: "skin-care", price: 890000, old: 1090000, rating: 4.6, rc: 318, sold: 1540, stock: 37, img: "/images/products/serum.webp", short: "سرم کنترل چربی و منافذ باز با نیاسینامید و زینک، مناسب پوست چرب و جوش‌دار.", specs: [["نیاسینامید", "۱۰ درصد"], ["زینک", "۱ درصد"], ["حجم", "۳۰ میلی‌لیتر"]], flags: ["best"] },
  { slug: "hyaluronic-serum-dermacare", name: "سرم هیالورونیک اسید درماکر", brand: "dermacare", cat: "face-serum", root: "skin-care", price: 960000, rating: 4.5, rc: 176, sold: 720, stock: 24, img: "/images/products/serum.webp", short: "سرم آبرسان با سه وزن مولکولی هیالورونیک اسید برای آبرسانی چندلایه پوست.", specs: [["حجم", "۳۰ میلی‌لیتر"], ["نوع پوست", "همه انواع"]], flags: ["new"] },
  { slug: "moisturizer-ceramide-dermacare", name: "کرم مرطوب‌کننده سرامیده درماکر", brand: "dermacare", cat: "moisturizer", root: "skin-care", price: 840000, old: 1020000, rating: 4.8, rc: 523, sold: 2410, stock: 41, img: "/images/products/moisturizer.webp", short: "کرم ترمیم‌کننده سد دفاعی پوست با سرامید، پانتنول و شی‌باتر، مناسب پوست خشک.", specs: [["حجم", "۵۰ میلی‌لیتر"], ["سرامید", "دارد"], ["نوع پوست", "خشک و حساس"]], flags: ["best", "featured"] },
  { slug: "gel-moisturizer-beautylab", name: "ژل آبرسان بیوتی‌لب پوست چرب", brand: "beautylab", cat: "moisturizer", root: "skin-care", price: 620000, rating: 4.4, rc: 149, sold: 640, stock: 30, img: "/images/products/moisturizer.webp", short: "ژل سبک و غیرکومدون‌زا با بافت خنک، مناسب پوست چرب و آب‌وهوای گرم.", specs: [["حجم", "۵۰ میلی‌لیتر"], ["بافت", "ژل"], ["غیرکومدون‌زا", "بله"]] },
  { slug: "micellar-water-dermacare", name: "میسلار واتر پاک‌کننده درماکر", brand: "dermacare", cat: "cleanser", root: "skin-care", price: 470000, old: 590000, rating: 4.7, rc: 402, sold: 2260, stock: 58, img: "/images/products/micellar.webp", short: "محلول پاک‌کننده آرایش صورت و چشم بدون نیاز به آب‌کشی، مناسب پوست حساس.", specs: [["حجم", "۴۰۰ میلی‌لیتر"], ["بدون الکل", "بله"], ["مناسب چشم", "بله"]], flags: ["best"] },
  { slug: "foam-cleanser-beautylab", name: "فوم شست‌وشوی صورت بیوتی‌لب", brand: "beautylab", cat: "cleanser", root: "skin-care", price: 520000, rating: 4.5, rc: 188, sold: 810, stock: 44, img: "/images/products/micellar.webp", short: "فوم پاک‌کننده ملایم با pH متعادل که چربی اضافه را بدون خشکی پاک می‌کند.", specs: [["حجم", "۱۵۰ میلی‌لیتر"], ["pH", "۵.۵"]] },
  { slug: "anti-acne-gel-dermacare", name: "ژل ضدجوش موضعی درماکر", brand: "dermacare", cat: "anti-acne", root: "skin-care", price: 560000, old: 690000, rating: 4.4, rc: 231, sold: 1080, stock: 27, img: "/images/products/serum.webp", short: "ژل موضعی با سالیسیلیک اسید و عصاره درخت چای برای کمک به کنترل جوش‌های سطحی.", specs: [["سالیسیلیک اسید", "۲ درصد"], ["حجم", "۳۰ میلی‌لیتر"]] },
  { slug: "hand-cream-dermacare", name: "کرم دست و ناخن درماکر", brand: "dermacare", cat: "moisturizer", root: "skin-care", price: 260000, rating: 4.6, rc: 137, sold: 960, stock: 65, img: "/images/products/handcream.webp", short: "کرم مغذی دست با اوره و ویتامین E برای ترمیم خشکی و ترک‌های سطحی.", specs: [["حجم", "۷۵ میلی‌لیتر"], ["اوره", "۵ درصد"]] },

  // ---------- hair care ----------
  { slug: "anti-dandruff-shampoo-dermacare", name: "شامپو ضدشوره درماکر", brand: "dermacare", cat: "shampoo", root: "hair-care", price: 480000, old: 610000, rating: 4.6, rc: 344, sold: 1830, stock: 46, img: "/images/products/shampoo.webp", short: "شامپو تخصصی ضدشوره با زینک پیریتیون، مناسب پوست سر چرب و خارش‌دار.", specs: [["حجم", "۲۰۰ میلی‌لیتر"], ["زینک پیریتیون", "دارد"], ["دفعات مصرف", "۲ تا ۳ بار در هفته"]], flags: ["best"] },
  { slug: "daily-shampoo-beautylab", name: "شامپو روزانه ملایم بیوتی‌لب", brand: "beautylab", cat: "shampoo", root: "hair-care", price: 390000, rating: 4.4, rc: 162, sold: 740, stock: 50, img: "/images/products/shampoo.webp", short: "شامپو بدون سولفات با فرمول ملایم، مناسب استفاده روزانه و موهای رنگ‌شده.", specs: [["حجم", "۳۰۰ میلی‌لیتر"], ["بدون سولفات", "بله"]] },
  { slug: "hair-serum-repair-beautylab", name: "سرم ترمیم‌کننده مو بیوتی‌لب", brand: "beautylab", cat: "hair-serum", root: "hair-care", price: 720000, old: 890000, rating: 4.5, rc: 205, sold: 890, stock: 32, img: "/images/products/hair-serum.webp", short: "سرم بدون آبکشی با روغن آرگان و کراتین برای کاهش وز و ترمیم موخوره.", specs: [["حجم", "۱۰۰ میلی‌لیتر"], ["روغن آرگان", "دارد"]], flags: ["best"] },
  { slug: "anti-hairloss-serum-dermacare", name: "سرم ضدریزش مو درماکر", brand: "dermacare", cat: "anti-hairloss", root: "hair-care", price: 1290000, old: 1590000, rating: 4.3, rc: 178, sold: 620, stock: 19, img: "/images/products/hair-serum.webp", short: "سرم تقویتی پوست سر با کافئین و پپتید برای کمک به کاهش ریزش موی فصلی.", specs: [["حجم", "۶۰ میلی‌لیتر"], ["کافئین", "دارد"], ["دوره پیشنهادی", "۳ ماه"]], flags: ["featured"] },
  { slug: "hair-mask-keratin-beautylab", name: "ماسک مو کراتینه بیوتی‌لب", brand: "beautylab", cat: "hair-mask", root: "hair-care", price: 560000, rating: 4.5, rc: 121, sold: 480, stock: 28, img: "/images/products/shampoo.webp", short: "ماسک ترمیم عمقی برای موهای آسیب‌دیده از حرارت و رنگ، با کراتین هیدرولیز.", specs: [["حجم", "۲۵۰ میلی‌لیتر"], ["زمان ماسک", "۱۰ دقیقه"]], flags: ["new"] },

  // ---------- oral care ----------
  { slug: "whitening-toothpaste-oraclean", name: "خمیر دندان سفیدکننده اوراکلین", brand: "oraclean", cat: "toothpaste", root: "oral-care", price: 210000, old: 260000, rating: 4.5, rc: 296, sold: 2140, stock: 75, img: "/images/products/toothpaste.webp", short: "خمیر دندان با ذرات پولیش ملایم و فلوراید، برای کاهش لکه‌های سطحی دندان.", specs: [["حجم", "۷۵ میلی‌لیتر"], ["فلوراید", "۱۴۵۰ ppm"], ["RDA", "پایین"]], flags: ["best"] },
  { slug: "sensitive-toothpaste-oraclean", name: "خمیر دندان ضدحساسیت اوراکلین", brand: "oraclean", cat: "toothpaste", root: "oral-care", price: 240000, rating: 4.6, rc: 184, sold: 1120, stock: 60, img: "/images/products/toothpaste.webp", short: "مخصوص دندان‌های حساس به سرما و گرما با پتاسیم نیترات.", specs: [["حجم", "۷۵ میلی‌لیتر"], ["پتاسیم نیترات", "دارد"]] },
  { slug: "mouthwash-alcohol-free-oraclean", name: "دهان‌شویه بدون الکل اوراکلین", brand: "oraclean", cat: "mouthwash", root: "oral-care", price: 320000, old: 390000, rating: 4.7, rc: 233, sold: 1460, stock: 54, img: "/images/products/mouthwash.webp", short: "دهان‌شویه ضدپلاک بدون الکل با طعم نعناع ملایم، بدون ایجاد سوزش.", specs: [["حجم", "۵۰۰ میلی‌لیتر"], ["بدون الکل", "بله"], ["کلرهگزیدین", "ندارد"]], flags: ["best"] },
  { slug: "soft-toothbrush-oraclean", name: "مسواک نرم اوراکلین (بسته ۲ عددی)", brand: "oraclean", cat: "toothbrush", root: "oral-care", price: 180000, rating: 4.4, rc: 108, sold: 980, stock: 90, img: "/images/products/toothpaste.webp", short: "مسواک با موی نرم و سر کوچک برای دسترسی بهتر به دندان‌های عقب.", specs: [["زبری", "نرم"], ["تعداد", "۲ عدد"]] },

  // ---------- medical devices ----------
  { slug: "bp-monitor-arm-medico", name: "فشارسنج بازویی دیجیتال مدیکو هلث", brand: "medico-health", cat: "blood-pressure", root: "medical-devices", price: 2480000, old: 2950000, rating: 4.8, rc: 517, sold: 1930, stock: 21, img: "/images/products/bp-monitor.webp", short: "فشارسنج بازویی با حافظه دو کاربره، تشخیص آریتمی و نمایشگر بزرگ.", specs: [["نوع", "بازویی"], ["حافظه", "۲×۹۹ رکورد"], ["تشخیص آریتمی", "دارد"], ["گارانتی", "۲۴ ماه"]], flags: ["best", "featured"] },
  { slug: "bp-monitor-wrist-medico", name: "فشارسنج مچی مدیکو هلث", brand: "medico-health", cat: "blood-pressure", root: "medical-devices", price: 1690000, rating: 4.4, rc: 142, sold: 560, stock: 17, img: "/images/products/bp-monitor.webp", short: "فشارسنج مچی جمع‌وجور و قابل حمل، مناسب سفر و استفاده روزانه.", specs: [["نوع", "مچی"], ["حافظه", "۹۰ رکورد"], ["گارانتی", "۱۸ ماه"]] },
  { slug: "glucometer-medico", name: "دستگاه تست قند خون مدیکو هلث", brand: "medico-health", cat: "glucose", root: "medical-devices", price: 1850000, old: 2200000, rating: 4.7, rc: 388, sold: 1420, stock: 23, img: "/images/products/glucose-meter.webp", short: "گلوکومتر با نتیجه ۵ ثانیه‌ای، نیاز به نمونه خون بسیار کم و حافظه ۵۰۰ رکورد.", specs: [["زمان نتیجه", "۵ ثانیه"], ["حجم نمونه", "۰.۵ میکرولیتر"], ["همراه", "۱۰ نوار تست"]], flags: ["best", "featured"] },
  { slug: "glucose-strips-medico", name: "نوار تست قند خون مدیکو (۵۰ عددی)", brand: "medico-health", cat: "glucose", root: "medical-devices", price: 890000, rating: 4.6, rc: 214, sold: 2310, stock: 64, img: "/images/products/glucose-meter.webp", short: "نوار تست سازگار با گلوکومترهای مدیکو هلث، بسته ۵۰ عددی.", specs: [["تعداد", "۵۰ عدد"], ["سازگاری", "گلوکومتر مدیکو"]] },
  { slug: "infrared-thermometer-medico", name: "تب‌سنج مادون قرمز پیشانی مدیکو", brand: "medico-health", cat: "thermometer", root: "medical-devices", price: 1120000, old: 1390000, rating: 4.5, rc: 276, sold: 1680, stock: 36, img: "/images/products/thermometer.webp", short: "اندازه‌گیری بدون تماس دمای بدن در یک ثانیه، مناسب کودکان و نوزادان.", specs: [["زمان اندازه‌گیری", "۱ ثانیه"], ["بدون تماس", "بله"], ["هشدار تب", "دارد"]], flags: ["best"] },
  { slug: "nebulizer-compressor-medico", name: "نبولایزر کمپرسوری مدیکو هلث", brand: "medico-health", cat: "nebulizer", root: "medical-devices", price: 2950000, rating: 4.6, rc: 118, sold: 420, stock: 11, img: "/images/products/nebulizer.webp", short: "نبولایزر خانگی با ماسک بزرگسال و کودک، کارکرد کم‌صدا و قابلیت استفاده مداوم.", specs: [["نوع", "کمپرسوری"], ["اندازه ذرات", "۳ میکرون"], ["گارانتی", "۲۴ ماه"]], flags: ["featured"] },
  { slug: "pulse-oximeter-medico", name: "پالس اکسیمتر انگشتی مدیکو هلث", brand: "medico-health", cat: "oximeter", root: "medical-devices", price: 890000, old: 1150000, rating: 4.5, rc: 322, sold: 2180, stock: 47, img: "/images/products/oximeter.webp", short: "اندازه‌گیری سریع درصد اکسیژن خون و ضربان قلب با نمایشگر OLED.", specs: [["نمایشگر", "OLED"], ["اندازه‌گیری", "SpO2 و ضربان"], ["باتری", "۲ عدد AAA"]], flags: ["best"] },
  { slug: "knee-support-medico", name: "زانوبند طبی کشکک‌باز مدیکو", brand: "medico-health", cat: "orthopedic", root: "medical-devices", price: 760000, rating: 4.3, rc: 96, sold: 380, stock: 26, img: "/images/products/knee-brace.webp", short: "زانوبند نئوپرن با طراحی کشکک‌باز برای حمایت از مفصل زانو در فعالیت روزانه.", specs: [["جنس", "نئوپرن"], ["سایز", "M / L / XL"]], variants: [["سایز", ["M", "L", "XL"]]] },
  { slug: "wrist-support-medico", name: "مچ‌بند طبی مدیکو هلث", brand: "medico-health", cat: "orthopedic", root: "medical-devices", price: 420000, rating: 4.2, rc: 64, sold: 240, stock: 38, img: "/images/products/knee-brace.webp", short: "مچ‌بند قابل تنظیم برای حمایت از مچ دست هنگام کار با کامپیوتر یا ورزش.", specs: [["نوع", "قابل تنظیم"], ["سایز", "فری‌سایز"]], flags: ["new"] },

  // ---------- mom & baby ----------
  { slug: "baby-shampoo-kidscare", name: "شامپو بچه بدون اشک کیدزکر", brand: "kidscare", cat: "baby-wash", root: "mom-baby", price: 240000, old: 310000, rating: 4.8, rc: 428, sold: 2740, stock: 68, img: "/images/products/baby-shampoo.webp", short: "شامپو ملایم و بدون اشک با pH متعادل، مناسب پوست سر حساس نوزاد.", specs: [["حجم", "۳۰۰ میلی‌لیتر"], ["بدون اشک", "بله"], ["بدون پارابن", "بله"]], flags: ["best", "featured"] },
  { slug: "baby-body-wash-kidscare", name: "شست‌وشوی بدن کودک کیدزکر", brand: "kidscare", cat: "baby-wash", root: "mom-baby", price: 260000, rating: 4.6, rc: 152, sold: 730, stock: 44, img: "/images/products/baby-shampoo.webp", short: "شوینده ملایم بدن کودک با عصاره جو دوسر برای پوست‌های خشک و حساس.", specs: [["حجم", "۳۰۰ میلی‌لیتر"], ["عصاره جو", "دارد"]] },
  { slug: "diaper-rash-cream-kidscare", name: "کرم سوختگی پوشک کیدزکر", brand: "kidscare", cat: "baby-skin", root: "mom-baby", price: 290000, old: 350000, rating: 4.7, rc: 367, sold: 2010, stock: 57, img: "/images/products/baby-cream.webp", short: "کرم محافظ با اکسید روی و پانتنول برای پیشگیری و تسکین سوختگی ناحیه پوشک.", specs: [["حجم", "۱۰۰ گرم"], ["اکسید روی", "دارد"], ["بدون عطر", "بله"]], flags: ["best"] },
  { slug: "baby-lotion-kidscare", name: "لوسیون بدن کودک کیدزکر", brand: "kidscare", cat: "baby-skin", root: "mom-baby", price: 270000, rating: 4.5, rc: 131, sold: 640, stock: 39, img: "/images/products/baby-cream.webp", short: "لوسیون آبرسان روزانه با بافت سبک و جذب سریع، مناسب پوست نوزاد.", specs: [["حجم", "۲۰۰ میلی‌لیتر"], ["هیپوآلرژنیک", "بله"]], flags: ["new"] },
  { slug: "baby-bottle-kidscare-240", name: "شیشه شیر کیدزکر ۲۴۰ میلی‌لیتر", brand: "kidscare", cat: "baby-feeding", root: "mom-baby", price: 380000, old: 460000, rating: 4.6, rc: 189, sold: 870, stock: 42, img: "/images/products/baby-bottle.webp", short: "شیشه شیر ضدنفخ با سرشیشه سیلیکونی نرم و بدنه مقاوم و عاری از BPA.", specs: [["حجم", "۲۴۰ میلی‌لیتر"], ["بدون BPA", "بله"], ["سیستم ضدنفخ", "دارد"]], variants: [["سایز سرشیشه", ["۰ تا ۳ ماه", "۳ تا ۶ ماه", "بالای ۶ ماه"]]], flags: ["best"] },
  { slug: "baby-bottle-brush-kidscare", name: "برس شست‌وشوی شیشه شیر کیدزکر", brand: "kidscare", cat: "baby-feeding", root: "mom-baby", price: 150000, rating: 4.3, rc: 72, sold: 410, stock: 53, img: "/images/products/baby-bottle.webp", short: "برس دو سر با موی نرم برای شست‌وشوی کامل شیشه شیر و سرشیشه.", specs: [["جنس", "نایلون و سیلیکون"], ["دو سر", "بله"]] },
];

export const PRODUCTS: SeedProduct[] = ROWS.map((r) => {
  const family = familyOfRoot[r.root];
  const brand = BRANDS.find((b) => b.slug === r.brand)!;
  return {
    slug: r.slug,
    name: r.name,
    brandSlug: r.brand,
    categorySlug: r.cat,
    rootSlug: r.root,
    price: r.price,
    oldPrice: r.old,
    rating: r.rating,
    reviewCount: r.rc,
    sold: r.sold,
    stock: r.stock,
    image: r.img,
    shortDesc: r.short,
    description: buildDescription(r.name, family, r.short, brand.name),
    specs: r.specs.map(([label, value]) => ({ label, value })),
    variants: (r.variants ?? []).map(([label, options]) => ({ label, options })),
    usage: usageText[family],
    warning: warningText[family],
    faq: buildFaq(r.name, family),
    isNew: !!r.flags?.includes("new"),
    isBestseller: !!r.flags?.includes("best"),
    isFeatured: !!r.flags?.includes("featured"),
    tags: [],
  };
});

/* ---------- demo reviews ---------- */
const REVIEW_POOL: { author: string; rating: number; title: string; body: string; pros: string[]; cons: string[] }[] = [
  { author: "سارا محمدی", rating: 5, title: "کیفیت بالاتر از انتظار", body: "بسته‌بندی سالم و پلمب بود و ارسال هم سریع انجام شد. تا الان از خرید راضی‌ام و قطعاً دوباره سفارش می‌دهم.", pros: ["ارسال سریع", "بسته‌بندی مطمئن"], cons: [] },
  { author: "امیر رضایی", rating: 4, title: "نسبت قیمت به کیفیت خوب", body: "با توجه به قیمتی که پرداخت کردم، کیفیت محصول منطقی است. یک ستاره کم کردم چون دوست داشتم حجم بسته بزرگ‌تر باشد.", pros: ["قیمت مناسب"], cons: ["حجم بسته کوچک"] },
  { author: "مریم کاظمی", rating: 5, title: "دقیقاً همان چیزی که می‌خواستم", body: "قبلاً هم همین محصول را استفاده کرده بودم؛ این بار از دارونیک خریدم و تفاوتی با نمونه داروخانه نداشت.", pros: ["اصل بودن کالا", "قیمت رقابتی"], cons: [] },
  { author: "حسین نادری", rating: 4, title: "راضی هستم", body: "استفاده منظم دارم و روند خوبی داشته. پشتیبانی هم برای پاسخ به سؤالم درباره نحوه مصرف همکاری کرد.", pros: ["پشتیبانی خوب"], cons: ["زمان ارسال کمی طولانی"] },
  { author: "نگار افشار", rating: 5, title: "پیشنهاد می‌کنم", body: "کیفیت ساخت و بسته‌بندی حرفه‌ای است. تاریخ انقضا هم طولانی بود که برای من مهم بود.", pros: ["تاریخ انقضای طولانی", "کیفیت ساخت"], cons: [] },
  { author: "پویا اسدی", rating: 3, title: "متوسط بود", body: "بد نیست ولی انتظار بیشتری داشتم. شاید باید مدت بیشتری استفاده کنم تا نتیجه نهایی را ببینم.", pros: ["ارسال سریع"], cons: ["نتیجه دیرتر از انتظار"] },
];

export const REVIEWS = PRODUCTS.flatMap((p, i) =>
  [0, 1, 2].map((k) => {
    const r = REVIEW_POOL[(i + k * 2) % REVIEW_POOL.length];
    return { productSlug: p.slug, ...r, verified: k !== 2 ? true : false };
  }),
);

export const PROVINCES = [
  "تهران", "البرز", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "گیلان", "مازندران", "خوزستان", "کرمان", "یزد", "قم", "همدان", "کرمانشاه", "بوشهر",
];
