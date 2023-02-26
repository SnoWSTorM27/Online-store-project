import React, { useEffect } from "react";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/user";
import UserOrders from "../../ui/userOrders";
import { getOrders, getOrdersLoadingStatus } from "../../../store/orders";
import localStorageService from "../../../services/localStorage.service";

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser());
  const orders = useSelector(getOrders());
  const ordersLoadingStatus = useSelector(getOrdersLoadingStatus());
  const role = localStorageService.getUserRole();

  if (user && orders) {
    return (
      <div className="container">
        <div className="col-md-12 mb-3">
          <UserCard user={user} />
        </div>
        {role === "ADMIN" ? "" : (
          <div className="col-md-12 mb-3">
            {orders && !ordersLoadingStatus ? <UserOrders orders={orders} /> : (<h2>Пока ещё нет заказов</h2>) }
          </div> )}
      </div>
    );
  }
  return <Loader />;
}

export default UserPage;
