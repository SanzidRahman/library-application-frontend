// media route
export const ADMIN_MEDIA_EDIT = (id) => (id ? `/admin/media/edit/${id}` : "");
export const ADMIN_MEDIA_SHOW = "/admin/media/";
export const ADMIN_MEDIA_ADD = "/admin/media";

// Category Routes
export const ADMIN_CATEGORY_ADD = "/admin/category/add";
export const ADMIN_CATEGORY_SHOW = "/admin/category/";
export const ADMIN_CATEGORY_EDIT = (id) =>
  id ? `/admin/category/edit/${id}` : "";

// trash route
export const ADMIN_TRASH = "/admin/trash/";

// Products Routes
export const ADMIN_PRODUCT_ADD = "/admin/product/add";
export const ADMIN_PRODUCT_SHOW = "/admin/product";
export const ADMIN_PRODUCT_EDIT = (id) =>
  id ? `/admin/product/edit/${id}` : "";

// Authors Routes
export const ADMIN_AUTHORS_ADD = "/admin/authors/add";
export const ADMIN_AUTHORS_SHOW = "/admin/authors";
export const ADMIN_AUTHORS_EDIT = (id) =>
  id ? `/admin/authors/edit/${id}` : "";

// Books Routes
export const ADMIN_BOOKS_ADD = "/admin/books/add";
export const ADMIN_BOOKS_SHOW = "/admin/books";
export const ADMIN_BOOKS_EDIT = (id) =>
  id ? `/admin/books/edit/${id}` : "";


// Publisher Routes
export const ADMIN_PUBLISHER_ADD = "/admin/publisher/add";
export const ADMIN_PUBLISHER_SHOW = "/admin/publisher";
export const ADMIN_PUBLISHER_EDIT = (id) =>
  id ? `/admin/publisher/edit/${id}` : "";

// product Varient
export const ADMIN_PRODUCT_VARIENT_ADD = "/admin/product-varient/add";
export const ADMIN_PRODUCT_VARIENT_SHOW = "/admin/product-varient";
export const ADMIN_PRODUCT_VARIENT_EDIT = (id) =>
  id ? `/admin/product-varient/edit/${id}` : "";

// Website route
export const WEBSITE_SHOP = "/shop/";
export const PRODUCT_SHOW = "/product/";
export const PRODUCT_DETAILS = (slug) =>
  slug ? `/product/${slug}` : "/product";

// order route
export const ORDER_DETAILS = (orderid) =>
  orderid ? `/order-details/${orderid}` : "/order-details";
export const ORDER_ADD = "/admin/order/add";
export const ORDER_SHOW = "/admin/order";
