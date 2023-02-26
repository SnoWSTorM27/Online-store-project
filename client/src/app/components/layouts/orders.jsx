import React from "react";
import { useParams, Redirect } from "react-router-dom";
import BagPage from "../pages/bagPage";
// import UserPage from "../pages/userPage";
import GoodsListPage from "../pages/goodsListPage";
import OrderPage from "../pages/orderPage";
// import EditUserPage from "../page/editUserPage";
// import { useSelector } from "react-redux";
// import { getCurrentUserId } from "../../store/users";
import GoodsLoader from "../ui/hoc/goodsLoader";
import Main from "./main";

function Orders() {
  const { admin, orderId } = useParams();
  // const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      {/* <GoodsLoader> */}
      {orderId ? (
        <OrderPage />
      ) : ( <BagPage /> ) 
      } 
      {/* </GoodsLoader> */}
    </>
  );
}

export default Orders;
