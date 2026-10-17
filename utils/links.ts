type NavBarLinks = {
  href: string;
  name: string;
};

export const dropDownMenuLinks: NavBarLinks[] = [

  { href: '/admin/products/create', name: 'لوحة التحكم' },
  { href: '/reviews', name: 'التقييمات' },

  { href: '/cart', name: 'سلة التسوق' },
  { href: '/about', name: 'من نحن' },

];

export const navLinks: NavBarLinks[] = [
  { href: '/', name: 'الرئيسية' },
  { href: '/products', name: 'المتجر' },
  { href: '/orders', name: 'طلباتي' },
  { href: '/favorites', name: 'المفضلة' },
];

export let links = {
  HOME: { href: '/', name: 'الرئيسية' },
  ABOUT: { href: '/about', name: 'من نحن' },
  CART: { href: '/cart', name: 'السلة' },
  PRODUCTS: { href: '/products', name: 'المنتجات' },
  AdminProducts: { href: '/admin/products', name: 'المنتجات' },
  AdminCategories: { href: '/admin/category', name: 'الأقسام' },


} as const


export const adminLinks: NavBarLinks[] = [
  { href: '/admin/category/create', name: 'إضافة قسم' },
  { href: '/admin/products/create', name: 'إضافة منتج' },
  { href: '/admin/products', name: 'منتجاتي' },
  { href: '/admin/category', name: 'أقسامي' },


];
