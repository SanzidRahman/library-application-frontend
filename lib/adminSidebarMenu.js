import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { ADMIN_AUTHORS_ADD, ADMIN_AUTHORS_SHOW, ADMIN_BOOKS_ADD, ADMIN_BOOKS_SHOW, ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW, ADMIN_PRODUCT_VARIENT_ADD, ADMIN_PRODUCT_VARIENT_SHOW, ADMIN_PUBLISHER_ADD, ADMIN_PUBLISHER_SHOW, ORDER_SHOW } from "./AdminPanelRoute";


export const AdminSidebarMenu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: AiOutlineDashboard,
  },
  {
    title: "Category",
    href: "#",
    icon: BiCategory,
    submenu: [
      {
        title: "Add-Category",
        href: ADMIN_CATEGORY_ADD,
      },
      {
        title: "All-Category",
        href: ADMIN_CATEGORY_SHOW,
      },
    ],
  },
  {
    title: "Books",
    href: "#",
    icon: IoShirtOutline,
    submenu: [
      {
        title: "Add-Books",
        href: ADMIN_BOOKS_ADD,
      },

      {
        title: "All-Books",
        href: ADMIN_BOOKS_SHOW,
      },

    ],
  },
  {
    title: "Authors",
    href: "#",
    icon: RiCoupon2Line,
    submenu: [
      {
        title: "Add-Authors",
        href: ADMIN_AUTHORS_ADD,
      },
      {
        title: "All-Authors",
        href: ADMIN_AUTHORS_SHOW,
      },
    ],
  },
  {
    title: "Publisher",
    href: "#",
    icon: RiCoupon2Line,
    submenu: [
      {
        title: "Add-Publisher",
        href: ADMIN_PUBLISHER_ADD,
      },
      {
        title: "All-Publisher",
        href: ADMIN_PUBLISHER_SHOW,
      },
    ],
  },
  {
    title: "Coupons",
    href: "#",
    icon: RiCoupon2Line,
    submenu: [
      {
        title: "Add-Coupons",
        href: "",
      },
      {
        title: "All-Coupons",
        href: "",
      },
    ],
  },
  {
    title: "Orders",
    href: ORDER_SHOW,
    icon: MdOutlineShoppingBag,
  },
  {
    title: "Customer",
    href: "#",
    icon: LuUserRound,
  },
  {
    title: "Rating",
    href: "#",
    icon: IoMdStarOutline,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: MdOutlinePermMedia,
  },
];
