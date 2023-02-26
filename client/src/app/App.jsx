import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import NavBar from "./components/ui/navBar";
import Login from "./components/layouts/login";
import LogOut from "./components/layouts/logOut";
import Goods from "./components/layouts/goods";
import AppLoader from "./components/ui/hoc/appLoader";
import ProtectedRoute from "./components/common/protectedRoute";
import Users from "./components/layouts/user";
import AdminPage from "./components/pages/adminPage";
import BagPage from "./components/pages/bagPage";
import OrderPage from "./components/pages/orderPage";
import AdminProtectedRoute from "./components/common/adminProtectedRoute";
import OrdersListPage from "./components/pages/ordersListPage";
import { DarkModeProvider, useDarkMode } from "./components/hooks/useDarkMode";
import "./App.css"

export default function App() {
  const theme = useDarkMode();
  return (
    <>
      <AppLoader>
        <DarkModeProvider theme={theme}>
          <NavBar />

          <Switch>
            <Route path="/goods/:goodId?" component={Goods}/>
            <Route path="/orders/:orderId?" component={OrderPage}/>
            <ProtectedRoute path="/order" component={BagPage}/>
            <AdminProtectedRoute path="/admin/goods/:goodId?" component={AdminPage}/>
            <AdminProtectedRoute path="/admin/orders" component={OrdersListPage}/>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
            <Route path="/login/:type?" component={Login}/>
            <Route path="/logout" component={LogOut}/>
            <Route exact path="/" component={Main}/>
            <Redirect to="/" />
          </Switch>
        </DarkModeProvider>
      </AppLoader>
    </>
  );
}
