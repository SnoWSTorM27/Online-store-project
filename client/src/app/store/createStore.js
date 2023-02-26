import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bag";
import categoriesReducer from "./categories";
import goodsReducer from "./goods";
import ordersReducer from "./orders";
import tabsReducer from "./tabs";
import userReducer from "./user";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  tabs: tabsReducer,
  user: userReducer,
  goods: goodsReducer,
  orders: ordersReducer,
  bag: bagReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
};
