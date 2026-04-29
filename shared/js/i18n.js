/**
 * i18n.js — KidsMarket internationalization
 * Languages: Arabic (ar, default), English (en), Hebrew (he)
 * Load in <head> before other scripts so dir/lang are set before render.
 */
(function () {

  // ─── Translations ──────────────────────────────────────────────────────────
  const T = {
    en: {
      nav: {
        newCollection: 'New Collection',
        kids: 'Kids (0–4)',
        children: 'Children (5–16)',
        signIn: 'Sign In',
        signOut: 'Sign out',
        favourites: 'Favourites',
      },
      home: {
        heroBadge: 'NEW ARRIVALS 2024',
        heroLine1: 'Modern styles',
        heroLine2: 'for ',
        heroAccent: 'playful',
        heroLine3: ' hearts.',
        heroSub: 'Discover curated kids\' clothing for every age, every adventure, and every milestone.',
        btnKids: 'Shop Kids (0–4)',
        btnChildren: 'Shop Children (5–16)',
        statsStyles: 'Styles',
        statsAgeGroups: 'Age Groups',
        statsShipping: 'Worldwide Shipping',
        statsQuality: 'Quality Guaranteed',
        shopByAge: 'Shop by Age',
        shopByAgeSub: 'Two curated collections — one for every stage.',
        kidsCardTitle: 'Kids 0–4',
        kidsCardSub: 'Soft essentials for early explorers.',
        kidsCardCta: 'SHOP KIDS →',
        childrenCardTitle: 'Children 5–16',
        childrenCardSub: 'Bold styles for big adventures.',
        childrenCardCta: 'SHOP CHILDREN →',
        whyTitle: 'Why KidsMarket?',
        whySub: 'Everything a growing wardrobe needs.',
        feat1Title: 'Worldwide Shipping',
        feat1Text: 'Fast and reliable delivery to wherever your family calls home.',
        feat2Title: 'Curated Quality',
        feat2Text: 'Every item hand-picked for comfort, durability, and style.',
        feat3Title: 'Save Favourites',
        feat3Text: 'Heart the pieces you love and revisit them any time.',
        feat4Title: 'New Arrivals Weekly',
        feat4Text: 'Fresh drops every week — always something new to discover.',
        ctaTitle: 'Ready to explore?',
        ctaSub: 'Sign in with your Google account to browse, save favourites, and shop.',
        ctaBtn: 'Get Started →',
      },
      footer: {
        tagline: 'Modern styles for playful hearts.',
        shop: 'Shop',
        account: 'Account',
        info: 'Info',
        newCollection: 'New Collection',
        kids: 'Kids (0–4)',
        children: 'Children (5–16)',
        signIn: 'Sign In',
        myFavourites: 'My Favourites',
        shipping: 'Worldwide Shipping',
        returns: 'Returns',
        sizeGuide: 'Size Guide',
        copy: '© 2026 KidsMarket. All rights reserved.',
      },
      auth: {
        title: 'Welcome',
        sub: 'Sign in to browse and save your favourite styles.',
        btnGoogle: 'Continue with Google',
      },
      gallery: {
        badge: 'NEW ARRIVALS 2024',
        tagline: 'Modern styles for playful hearts. Discover our latest curated collection for every milestone.',
        kidsTitle: 'Kids 0–4',
        kidsSub: 'Soft essentials for early explorers.',
        kidsCta: 'SHOP KIDS →',
        childrenTitle: 'Children 5–16',
        childrenSub: 'Bold styles for big adventures.',
        childrenCta: 'SHOP CHILDREN →',
        trendingTitle: 'Trending Now',
        trendingSub: 'What\'s making waves this week.',
      },
      filter: {
        all: 'All',
        boys: 'Boys',
        girls: 'Girls',
        unisex: 'Unisex',
        allCategories: 'All Categories',
        tops: 'Tops',
        bottoms: 'Bottoms',
        dresses: 'Dresses',
        footwear: 'Footwear',
        accessories: 'Accessories',
        outwear: 'Outwear',
        sleepwear: 'Sleepwear',
        swimwear: 'Swimwear',
      },
      sort: {
        default: 'Sort: Default',
        priceAsc: 'Price: Low to High',
        priceDesc: 'Price: High to Low',
        nameAsc: 'Name: A to Z',
        nameDesc: 'Name: Z to A',
        new: 'New Arrivals First',
      },
      modal: {
        ageRange: 'Age Range',
        gender: 'Gender',
        sizes: 'Sizes',
        description: 'Description',
      },
      search: {
        clothes: 'Search clothes...',
        products: 'Search products...',
      },
      products: {
        showing: 'Showing {n} products',
        none: 'No products found',
      },
      fav: {
        title: 'My Favourites',
        items: '{n} saved item',
        itemsPlural: '{n} saved items',
        empty: 'Your favourites list is empty.',
        browseCta: 'Browse the collection →',
      },
      manager: {
        title: 'Product Inventory',
        subtitle: 'Manage your store\'s catalog, pricing, and availability.',
        addNew: 'Add New Item',
        ageLabel: 'AGE',
        genderLabel: 'GENDER',
        categoryLabel: 'CATEGORY',
        all: 'ALL',
        kids: 'KIDS',
        children: 'CHILDREN',
        boys: 'BOYS',
        girls: 'GIRLS',
        unisex: 'UNISEX',
        allCategories: 'All Categories',
        searchPH: 'Search products...',
        noProducts: 'No products found',
        prev: 'Previous',
        next: 'Next',
        deleteTitle: 'Delete Product?',
        deleteText: 'This action cannot be undone. The product will be permanently removed from your inventory.',
        cancel: 'Cancel',
        delete: 'Delete',
      },
      add: {
        backLink: 'Back to Inventory',
        pageTitle: 'Add New Item',
        detailsTitle: 'Product Details',
        nameLabel: 'Item Name',
        namePH: 'e.g. Classic Cotton Romper',
        descLabel: 'Description',
        optional: '(optional)',
        descPH: 'Describe the item, materials, and care instructions...',
        ageTitle: 'Age Range',
        kidsOption: 'Kids (0–4)',
        childrenOption: 'Children (5–16)',
        genderTitle: 'Gender Category',
        male: 'Male',
        female: 'Female',
        unisex: 'Unisex',
        sizeTitle: 'Size',
        categoryTitle: 'Categories',
        pricingTitle: 'Pricing',
        priceLabel: 'Price',
        originalPriceLabel: 'Original Price',
        ifOnSale: '(if on sale)',
        mediaTitle: 'Media',
        uploadTitle: 'Upload Photo',
        uploadSub: 'Drag and drop or click to browse',
        saveBtn: 'Save Item',
        cancelBtn: 'Cancel',
        savedToast: 'Item saved successfully!',
      },
    },

    ar: {
      nav: {
        newCollection: 'مجموعة جديدة',
        kids: 'أطفال (0–4)',
        children: 'أولاد (5–16)',
        signIn: 'تسجيل الدخول',
        signOut: 'تسجيل الخروج',
        favourites: 'المفضلة',
      },
      home: {
        heroBadge: 'وصلت حديثاً 2024',
        heroLine1: 'أزياء عصرية',
        heroLine2: 'لـ ',
        heroAccent: 'مرحة',
        heroLine3: ' قلوب.',
        heroSub: 'اكتشف ملابس أطفال منتقاة بعناية لكل عمر، وكل مغامرة، وكل مرحلة.',
        btnKids: 'تسوق أطفال (0–4)',
        btnChildren: 'تسوق أولاد (5–16)',
        statsStyles: 'نمط',
        statsAgeGroups: 'فئات عمرية',
        statsShipping: 'شحن عالمي',
        statsQuality: 'جودة مضمونة',
        shopByAge: 'تسوق حسب العمر',
        shopByAgeSub: 'مجموعتان منتقاتان — واحدة لكل مرحلة.',
        kidsCardTitle: 'أطفال 0–4',
        kidsCardSub: 'أساسيات ناعمة للمستكشفين الصغار.',
        kidsCardCta: '← تسوق أطفال',
        childrenCardTitle: 'أولاد 5–16',
        childrenCardSub: 'أنماط جريئة لمغامرات كبيرة.',
        childrenCardCta: '← تسوق أولاد',
        whyTitle: 'لماذا كيدز ماركت؟',
        whySub: 'كل ما يحتاجه خزانة الملابس المتنامية.',
        feat1Title: 'شحن عالمي',
        feat1Text: 'توصيل سريع وموثوق أينما كانت عائلتك.',
        feat2Title: 'جودة منتقاة',
        feat2Text: 'كل قطعة مختارة بعناية للراحة والمتانة والأناقة.',
        feat3Title: 'احفظ المفضلة',
        feat3Text: 'احفظ القطع التي تحبها وارجع إليها في أي وقت.',
        feat4Title: 'وصلات جديدة أسبوعياً',
        feat4Text: 'قطع جديدة كل أسبوع — دائماً هناك ما تكتشفه.',
        ctaTitle: 'هل أنت مستعد للاستكشاف؟',
        ctaSub: 'سجل دخولك بحساب Google للتصفح وحفظ المفضلة والتسوق.',
        ctaBtn: '← ابدأ الآن',
      },
      footer: {
        tagline: 'أزياء عصرية لقلوب مرحة.',
        shop: 'تسوق',
        account: 'الحساب',
        info: 'معلومات',
        newCollection: 'مجموعة جديدة',
        kids: 'أطفال (0–4)',
        children: 'أولاد (5–16)',
        signIn: 'تسجيل الدخول',
        myFavourites: 'مفضلتي',
        shipping: 'شحن عالمي',
        returns: 'الإرجاع',
        sizeGuide: 'دليل المقاسات',
        copy: '© 2026 KidsMarket. جميع الحقوق محفوظة.',
      },
      auth: {
        title: 'مرحباً بك',
        sub: 'سجل دخولك لتصفح وحفظ أنماطك المفضلة.',
        btnGoogle: 'المتابعة مع Google',
      },
      gallery: {
        badge: 'وصلت حديثاً 2024',
        tagline: 'أزياء عصرية لقلوب مرحة. اكتشف أحدث مجموعتنا المنتقاة لكل مرحلة.',
        kidsTitle: 'أطفال 0–4',
        kidsSub: 'أساسيات ناعمة للمستكشفين الصغار.',
        kidsCta: '← تسوق أطفال',
        childrenTitle: 'أولاد 5–16',
        childrenSub: 'أنماط جريئة لمغامرات كبيرة.',
        childrenCta: '← تسوق أولاد',
        trendingTitle: 'الرائج الآن',
        trendingSub: 'ما يحدث ضجة هذا الأسبوع.',
      },
      filter: {
        all: 'الكل',
        boys: 'أولاد',
        girls: 'بنات',
        unisex: 'للجنسين',
        allCategories: 'جميع الفئات',
        tops: 'توبات',
        bottoms: 'بناطيل',
        dresses: 'فساتين',
        footwear: 'أحذية',
        accessories: 'اكسسوارات',
        outwear: 'ملابس خارجية',
        sleepwear: 'ملابس نوم',
        swimwear: 'ملابس سباحة',
      },
      sort: {
        default: 'ترتيب: افتراضي',
        priceAsc: 'السعر: من الأقل للأعلى',
        priceDesc: 'السعر: من الأعلى للأقل',
        nameAsc: 'الاسم: أ إلى ي',
        nameDesc: 'الاسم: ي إلى أ',
        new: 'الوصلات الجديدة أولاً',
      },
      modal: {
        ageRange: 'الفئة العمرية',
        gender: 'الجنس',
        sizes: 'المقاسات',
        description: 'الوصف',
      },
      search: {
        clothes: 'ابحث عن ملابس...',
        products: 'ابحث عن منتجات...',
      },
      products: {
        showing: 'عرض {n} منتج',
        none: 'لا توجد منتجات',
      },
      fav: {
        title: 'مفضلتي',
        items: '{n} منتج محفوظ',
        itemsPlural: '{n} منتجات محفوظة',
        empty: 'قائمة مفضلتك فارغة.',
        browseCta: '← استعرض المجموعة',
      },
      manager: {
        title: 'مخزون المنتجات',
        subtitle: 'أدر كتالوج متجرك وأسعاره وتوفره.',
        addNew: 'إضافة منتج جديد',
        ageLabel: 'العمر',
        genderLabel: 'الجنس',
        categoryLabel: 'الفئة',
        all: 'الكل',
        kids: 'أطفال',
        children: 'أولاد',
        boys: 'أولاد',
        girls: 'بنات',
        unisex: 'للجنسين',
        allCategories: 'جميع الفئات',
        searchPH: 'ابحث عن منتجات...',
        noProducts: 'لا توجد منتجات',
        prev: 'السابق',
        next: 'التالي',
        deleteTitle: 'حذف المنتج؟',
        deleteText: 'لا يمكن التراجع عن هذا الإجراء. سيتم حذف المنتج نهائياً من مخزونك.',
        cancel: 'إلغاء',
        delete: 'حذف',
      },
      add: {
        backLink: 'العودة للمخزون',
        pageTitle: 'إضافة منتج جديد',
        detailsTitle: 'تفاصيل المنتج',
        nameLabel: 'اسم المنتج',
        namePH: 'مثلاً: بدلة قطنية كلاسيكية',
        descLabel: 'الوصف',
        optional: '(اختياري)',
        descPH: 'اصف المنتج والمواد وتعليمات العناية...',
        ageTitle: 'الفئة العمرية',
        kidsOption: 'أطفال (0–4)',
        childrenOption: 'أولاد (5–16)',
        genderTitle: 'الجنس',
        male: 'ذكر',
        female: 'أنثى',
        unisex: 'للجنسين',
        sizeTitle: 'المقاس',
        categoryTitle: 'الفئة',
        pricingTitle: 'التسعير',
        priceLabel: 'السعر',
        originalPriceLabel: 'السعر الأصلي',
        ifOnSale: '(في حال التخفيض)',
        mediaTitle: 'الصورة',
        uploadTitle: 'رفع صورة',
        uploadSub: 'اسحب وأفلت أو انقر للاختيار',
        saveBtn: 'حفظ المنتج',
        cancelBtn: 'إلغاء',
        savedToast: 'تم حفظ المنتج بنجاح!',
      },
    },

    he: {
      nav: {
        newCollection: 'קולקציה חדשה',
        kids: 'תינוקות (0–4)',
        children: 'ילדים (5–16)',
        signIn: 'התחברות',
        signOut: 'התנתקות',
        favourites: 'מועדפים',
      },
      home: {
        heroBadge: 'חדשים 2024',
        heroLine1: 'סגנונות מודרניים',
        heroLine2: 'ל',
        heroAccent: 'שובבים',
        heroLine3: ' לבבות.',
        heroSub: 'גלו בגדי ילדים נבחרים לכל גיל, כל הרפתקה, וכל אבן דרך.',
        btnKids: 'קנה תינוקות (0–4)',
        btnChildren: 'קנה ילדים (5–16)',
        statsStyles: 'סגנונות',
        statsAgeGroups: 'קבוצות גיל',
        statsShipping: 'משלוח עולמי',
        statsQuality: 'איכות מובטחת',
        shopByAge: 'קנה לפי גיל',
        shopByAgeSub: 'שני מבחרים — אחד לכל שלב.',
        kidsCardTitle: 'תינוקות 0–4',
        kidsCardSub: 'בגדי יסוד רכים לחוקרים קטנים.',
        kidsCardCta: '← קנה תינוקות',
        childrenCardTitle: 'ילדים 5–16',
        childrenCardSub: 'סגנונות נועזים להרפתקאות גדולות.',
        childrenCardCta: '← קנה ילדים',
        whyTitle: 'למה KidsMarket?',
        whySub: 'כל מה שארון הבגדים הגדל צריך.',
        feat1Title: 'משלוח עולמי',
        feat1Text: 'משלוח מהיר ואמין לכל מקום שמשפחתך קוראת לו בית.',
        feat2Title: 'איכות מבחר',
        feat2Text: 'כל פריט נבחר ביד לנוחות, עמידות וסגנון.',
        feat3Title: 'שמור מועדפים',
        feat3Text: 'סמן את הפריטים שאהבת וחזור אליהם בכל עת.',
        feat4Title: 'חדשים שבועיים',
        feat4Text: 'פריטים חדשים כל שבוע — תמיד יש מה לגלות.',
        ctaTitle: 'מוכן לחקור?',
        ctaSub: 'התחבר עם חשבון Google שלך לגלישה, שמירת מועדפים וקנייה.',
        ctaBtn: '← בוא נתחיל',
      },
      footer: {
        tagline: 'סגנונות מודרניים ללבבות שובבים.',
        shop: 'חנות',
        account: 'חשבון',
        info: 'מידע',
        newCollection: 'קולקציה חדשה',
        kids: 'תינוקות (0–4)',
        children: 'ילדים (5–16)',
        signIn: 'התחברות',
        myFavourites: 'המועדפים שלי',
        shipping: 'משלוח עולמי',
        returns: 'החזרות',
        sizeGuide: 'מדריך מידות',
        copy: '© 2026 KidsMarket. כל הזכויות שמורות.',
      },
      auth: {
        title: 'ברוך הבא',
        sub: 'התחבר לגלישה ושמירת הסגנונות האהובים.',
        btnGoogle: 'המשך עם Google',
      },
      gallery: {
        badge: 'חדשים 2024',
        tagline: 'סגנונות מודרניים ללבבות שובבים. גלו את הקולקציה האחרונה שלנו לכל אבן דרך.',
        kidsTitle: 'תינוקות 0–4',
        kidsSub: 'בגדי יסוד רכים לחוקרים קטנים.',
        kidsCta: '← קנה תינוקות',
        childrenTitle: 'ילדים 5–16',
        childrenSub: 'סגנונות נועזים להרפתקאות גדולות.',
        childrenCta: '← קנה ילדים',
        trendingTitle: 'טרנדי עכשיו',
        trendingSub: 'מה שעושה גלים השבוע.',
      },
      filter: {
        all: 'הכל',
        boys: 'בנים',
        girls: 'בנות',
        unisex: 'יוניסקס',
        allCategories: 'כל הקטגוריות',
        tops: 'חולצות',
        bottoms: 'מכנסיים',
        dresses: 'שמלות',
        footwear: 'נעליים',
        accessories: 'אביזרים',
        outwear: 'מעילים',
        sleepwear: 'פיג\'מות',
        swimwear: 'בגדי ים',
      },
      sort: {
        default: 'מיון: ברירת מחדל',
        priceAsc: 'מחיר: מהנמוך לגבוה',
        priceDesc: 'מחיר: מהגבוה לנמוך',
        nameAsc: 'שם: א עד ת',
        nameDesc: 'שם: ת עד א',
        new: 'חדשים קודם',
      },
      modal: {
        ageRange: 'טווח גיל',
        gender: 'מין',
        sizes: 'מידות',
        description: 'תיאור',
      },
      search: {
        clothes: 'חפש בגדים...',
        products: 'חפש מוצרים...',
      },
      products: {
        showing: 'מציג {n} מוצרים',
        none: 'לא נמצאו מוצרים',
      },
      fav: {
        title: 'המועדפים שלי',
        items: '{n} פריט שמור',
        itemsPlural: '{n} פריטים שמורים',
        empty: 'רשימת המועדפים שלך ריקה.',
        browseCta: '← עיין בקולקציה',
      },
      manager: {
        title: 'מלאי מוצרים',
        subtitle: 'נהל את קטלוג החנות, מחירים וזמינות.',
        addNew: 'הוסף פריט חדש',
        ageLabel: 'גיל',
        genderLabel: 'מין',
        categoryLabel: 'קטגוריה',
        all: 'הכל',
        kids: 'תינוקות',
        children: 'ילדים',
        boys: 'בנים',
        girls: 'בנות',
        unisex: 'יוניסקס',
        allCategories: 'כל הקטגוריות',
        searchPH: 'חפש מוצרים...',
        noProducts: 'לא נמצאו מוצרים',
        prev: 'הקודם',
        next: 'הבא',
        deleteTitle: 'מחק מוצר?',
        deleteText: 'לא ניתן לבטל פעולה זו. המוצר יוסר לצמיתות מהמלאי שלך.',
        cancel: 'בטל',
        delete: 'מחק',
      },
      add: {
        backLink: 'חזרה למלאי',
        pageTitle: 'הוסף פריט חדש',
        detailsTitle: 'פרטי המוצר',
        nameLabel: 'שם הפריט',
        namePH: 'לדוגמה: בגד ים קלאסי',
        descLabel: 'תיאור',
        optional: '(אופציונלי)',
        descPH: 'תאר את הפריט, החומרים והוראות טיפול...',
        ageTitle: 'טווח גיל',
        kidsOption: 'תינוקות (0–4)',
        childrenOption: 'ילדים (5–16)',
        genderTitle: 'קטגוריית מין',
        male: 'זכר',
        female: 'נקבה',
        unisex: 'יוניסקס',
        sizeTitle: 'מידה',
        categoryTitle: 'קטגוריות',
        pricingTitle: 'תמחור',
        priceLabel: 'מחיר',
        originalPriceLabel: 'מחיר מקורי',
        ifOnSale: '(אם במכירה)',
        mediaTitle: 'מדיה',
        uploadTitle: 'העלה תמונה',
        uploadSub: 'גרור ושחרר או לחץ לבחירה',
        saveBtn: 'שמור פריט',
        cancelBtn: 'בטל',
        savedToast: 'הפריט נשמר בהצלחה!',
      },
    },
  };

  // ─── Core ──────────────────────────────────────────────────────────────────
  const DEFAULT_LANG = 'ar';

  function getLang() {
    return localStorage.getItem('km_lang') || DEFAULT_LANG;
  }

  function t(key, vars) {
    const lang = getLang();
    const parts = key.split('.');
    let val = T[lang];
    for (const p of parts) val = val?.[p];
    if (val == null) {
      let fb = T.en;
      for (const p of parts) fb = fb?.[p];
      val = fb;
    }
    if (val && vars) {
      Object.keys(vars).forEach(k => { val = val.replace('{' + k + '}', vars[k]); });
    }
    return val != null ? val : key;
  }

  function setLang(lang) {
    localStorage.setItem('km_lang', lang);
    location.reload();
  }

  // ─── Dir / lang on <html> — runs immediately (before body) ────────────────
  const lang = getLang();
  const isRTL = lang === 'ar' || lang === 'he';
  document.documentElement.setAttribute('dir',  isRTL ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);

  // ─── Font for Arabic / Hebrew ─────────────────────────────────────────────
  if (lang === 'ar' || lang === 'he') {
    const name = lang === 'ar' ? 'Cairo' : 'Heebo';
    const l = document.createElement('link');
    l.rel  = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + name + ':wght@400;600;700;800;900&display=swap';
    document.head.appendChild(l);
  }

  // ─── CSS: lang switcher + RTL overrides ───────────────────────────────────
  (function injectCSS() {
    if (document.getElementById('_km_i18n_css')) return;
    const s = document.createElement('style');
    s.id = '_km_i18n_css';
    s.textContent = `
      /* ── Font overrides ────────────────────────────── */
      [lang="ar"] body,[lang="ar"] h1,[lang="ar"] h2,[lang="ar"] h3,
      [lang="ar"] h4,[lang="ar"] p,[lang="ar"] span,[lang="ar"] a,
      [lang="ar"] button,[lang="ar"] input,[lang="ar"] select,[lang="ar"] textarea,
      [lang="ar"] label {
        font-family: 'Cairo', 'Nunito', sans-serif !important;
        letter-spacing: 0 !important;
      }
      [lang="he"] body,[lang="he"] h1,[lang="he"] h2,[lang="he"] h3,
      [lang="he"] h4,[lang="he"] p,[lang="he"] span,[lang="he"] a,
      [lang="he"] button,[lang="he"] input,[lang="he"] select,[lang="he"] textarea,
      [lang="he"] label {
        font-family: 'Heebo', 'Nunito', sans-serif !important;
        letter-spacing: 0 !important;
      }

      /* ── RTL layout overrides ───────────────────────── */
      [dir="rtl"] .navbar                { flex-direction: row-reverse; }
      [dir="rtl"] .navbar__links         { flex-direction: row-reverse; }
      [dir="rtl"] .navbar__right         { flex-direction: row-reverse; }
      [dir="rtl"] .search-bar            { flex-direction: row-reverse; }
      [dir="rtl"] .auth-chip             { flex-direction: row-reverse; }

      [dir="rtl"] .hero__content         { text-align: right; }
      [dir="rtl"] .hero__actions         { flex-direction: row-reverse; justify-content: flex-end; }
      [dir="rtl"] .hero__badge           { align-self: flex-end; }

      [dir="rtl"] .stats-bar             { flex-direction: row-reverse; }
      [dir="rtl"] .section-header        { text-align: right; }
      [dir="rtl"] .category-card__overlay { text-align: right; }
      [dir="rtl"] .feature-card          { text-align: right; align-items: flex-end; }
      [dir="rtl"] .cta-banner__inner     { text-align: right; align-items: flex-end; }

      [dir="rtl"] .footer__inner         { flex-direction: row-reverse; }
      [dir="rtl"] .footer__brand         { text-align: right; }
      [dir="rtl"] .footer__links         { text-align: right; }
      [dir="rtl"] .footer__copy          { text-align: right; }

      [dir="rtl"] .filters-bar           { flex-direction: row-reverse; }
      [dir="rtl"] .filters-bar__tabs     { flex-direction: row-reverse; }
      [dir="rtl"] .filters-bar__right    { flex-direction: row-reverse; }

      [dir="rtl"] .trending__header      { flex-direction: row-reverse; }
      [dir="rtl"] .trending__header > div { text-align: right; }

      [dir="rtl"] .page-header           { flex-direction: row-reverse; }
      [dir="rtl"] .page-header > div     { text-align: right; }
      [dir="rtl"] .filter-row            { flex-direction: row-reverse; }
      [dir="rtl"] .filter-group          { flex-direction: row-reverse; }
      [dir="rtl"] .modal__actions        { flex-direction: row-reverse; }
      [dir="rtl"] .modal                 { text-align: right; }

      [dir="rtl"] .fav-header            { text-align: right; }
      [dir="rtl"] .empty-state           { text-align: right; }

      [dir="rtl"] .product-modal__info   { text-align: right; }
      [dir="rtl"] .product-modal__row    { flex-direction: row-reverse; }
      [dir="rtl"] .product-modal__sizes  { justify-content: flex-end; }

      [dir="rtl"] .auth-card             { text-align: right; }
      [dir="rtl"] .btn-google            { flex-direction: row-reverse; justify-content: center; }

      [dir="rtl"] .back-link             { flex-direction: row-reverse; }
      [dir="rtl"] .back-link svg         { transform: scaleX(-1); }
      [dir="rtl"] .page-title            { flex-direction: row-reverse; }
      [dir="rtl"] .form-card             { text-align: right; }
      [dir="rtl"] .field__label          { text-align: right; }
      [dir="rtl"] .radio-group           { text-align: right; }
      [dir="rtl"] .checkbox-group        { text-align: right; }
      [dir="rtl"] .radio-option          { flex-direction: row-reverse; justify-content: flex-end; }
      [dir="rtl"] .checkbox-option       { flex-direction: row-reverse; justify-content: flex-end; }
      [dir="rtl"] .field__input-prefix   { flex-direction: row-reverse; }

      /* ── Language Switcher ──────────────────────────── */
      .lang-switcher {
        position: relative;
        flex-shrink: 0;
      }
      .lang-switcher__toggle {
        display: flex;
        align-items: center;
        gap: .35rem;
        background: none;
        border: 1.5px solid #e0e4ee;
        border-radius: 8px;
        padding: .3rem .55rem;
        cursor: pointer;
        font-size: .75rem;
        font-weight: 700;
        color: #4a5568;
        transition: border-color .2s, background .2s;
        white-space: nowrap;
        font-family: inherit;
      }
      .lang-switcher__toggle:hover {
        border-color: #2d6cdf;
        background: rgba(45,108,223,.06);
        color: #2d6cdf;
      }
      .lang-switcher__toggle svg { flex-shrink: 0; }
      .lang-switcher__menu {
        display: none;
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        background: #fff;
        border: 1.5px solid #e0e4ee;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,.1);
        min-width: 130px;
        overflow: hidden;
        z-index: 9999;
      }
      [dir="rtl"] .lang-switcher__menu { right: auto; left: 0; }
      .lang-switcher__menu.open { display: block; }
      .lang-switcher__item {
        display: block;
        width: 100%;
        padding: .55rem .85rem;
        background: none;
        border: none;
        text-align: left;
        font-size: .82rem;
        font-weight: 600;
        color: #4a5568;
        cursor: pointer;
        transition: background .15s, color .15s;
        font-family: inherit;
        white-space: nowrap;
      }
      [dir="rtl"] .lang-switcher__item { text-align: right; }
      .lang-switcher__item:hover { background: #f0f4ff; color: #2d6cdf; }
      .lang-switcher__item.active { color: #2d6cdf; font-weight: 800; background: #f0f4ff; }

      /* Auth page floating switcher */
      .lang-switcher--floating {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 9999;
      }
      [dir="rtl"] .lang-switcher--floating { right: auto; left: 1rem; }
    `;
    document.head.appendChild(s);
  })();

  // ─── Apply data-i18n attributes ────────────────────────────────────────────
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-ph'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  }

  // ─── Language switcher injection ──────────────────────────────────────────
  function injectLangSwitcher() {
    const currentLang = getLang();
    const codes = { ar: 'عر', en: 'EN', he: 'עב' };

    const el = document.createElement('div');
    el.className = 'lang-switcher';
    el.innerHTML =
      '<button class="lang-switcher__toggle" type="button" aria-label="Language">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<circle cx="12" cy="12" r="10"/>' +
          '<line x1="2" y1="12" x2="22" y2="12"/>' +
          '<path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>' +
        '</svg>' +
        '<span>' + (codes[currentLang] || currentLang) + '</span>' +
        '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
          '<polyline points="6 9 12 15 18 9"/>' +
        '</svg>' +
      '</button>' +
      '<div class="lang-switcher__menu" id="_km_lang_menu">' +
        '<button class="lang-switcher__item' + (currentLang === 'ar' ? ' active' : '') + '" data-lang="ar">العربية</button>' +
        '<button class="lang-switcher__item' + (currentLang === 'en' ? ' active' : '') + '" data-lang="en">English</button>' +
        '<button class="lang-switcher__item' + (currentLang === 'he' ? ' active' : '') + '" data-lang="he">עברית</button>' +
      '</div>';

    const toggle = el.querySelector('.lang-switcher__toggle');
    const menu   = el.querySelector('.lang-switcher__menu');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      menu.classList.remove('open');
    });
    el.querySelectorAll('.lang-switcher__item').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        setLang(btn.getAttribute('data-lang'));
      });
    });

    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.querySelector('.lang-switcher')) {
      navbar.appendChild(el);
      return;
    }

    // Auth page: floating
    const authCard = document.querySelector('.auth-card');
    if (authCard && !document.querySelector('.lang-switcher')) {
      el.classList.add('lang-switcher--floating');
      document.body.appendChild(el);
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyTranslations();
      injectLangSwitcher();
    });
  } else {
    applyTranslations();
    injectLangSwitcher();
  }

  // ─── Exports ──────────────────────────────────────────────────────────────
  window.KidsI18n = { t: t, getLang: getLang, setLang: setLang };
  window.t = t;

})();
