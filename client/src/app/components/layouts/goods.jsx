import React from "react";
import { useParams, Redirect } from "react-router-dom";
import AdminPage from "../pages/adminPage";
import GoodPage from "../pages/goodPage";
// import UserPage from "../pages/userPage";
import GoodsListPage from "../pages/goodsListPage";
// import EditUserPage from "../page/editUserPage";
// import { useSelector } from "react-redux";
// import { getCurrentUserId } from "../../store/users";
import GoodsLoader from "../ui/hoc/goodsLoader";

function Goods() {
  const params = useParams();
  const { admin, goodId } = params;
  // const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      {/* <GoodsLoader> */}
      {admin ? (
        <AdminPage />
      ) : ( goodId ? (
        <GoodPage />
      ) : ( <GoodsListPage /> ) 
      )} 
      {/* </GoodsLoader> */}
    </>
  );
}

export default Goods;
