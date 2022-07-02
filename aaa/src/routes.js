import Index from "./views/Index.js";
import Category from './views/Category/Category';
import Bill from './views/Bill/Showbill';
import Order from './views/Order/Order';
import Logout from './SignupSignin/Logout';
import history_order from './views/History_Order/Order';
import history_bill from './views/History_Bill/Showbill';
import Addfood from './views/Food/Food';

var routes = [
 
  {
    path: "/index",
    name: "หน้าหลัก",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/order",
    name: "ดูรายการที่สั่ง",
    icon: "ni ni-single-copy-04 text-blue",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/bill",
    name: "ดูรายการชำระเงิน",
    icon: "fa fa-credit-card text-orange",
    component: Bill,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "จัดการประเภทอาหาร",
    icon: "ni ni-collection text-yellow",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/food",
    name: "จัดการเมนูอาหาร",
    icon: "fas fa-utensils text-red",
    component: Addfood,
    layout: "/admin"
  },
  {
    path: "/history_order",
    name: "ดูประวัติการสั่งทั้งหมด",
    icon: "ni ni-money-coins text-pink",
    component: history_order,
    layout: "/admin"
  }, 
  {
    path: "/sales",
    name: "ดูยอดขาย",
    icon: "ni ni-money-coins text-info",
    component: history_bill,
    layout: "/admin"
  }, 
  {
    path: "",
    name: "ออกจากระบบ",
    icon: "ni ni-settings-gear-65 text-primary",
    component: Logout,
    layout: "/logout"
  },
  
 
];
export default routes;
