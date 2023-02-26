import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import orderService from "../services/order.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  adminEntities: null,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  adminEntities: null,
  dataLoaded: false
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersRequested: (state) => {
      state.isLoading = true;
    },
    ordersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    ordersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    ordersAdminReceived: (state, action) => {
      state.adminEntities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    ordersAdminRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderPaidCreated: (state, action) => {
      state.entities = [];
      state.isLoading = false;
      state.dataLoaded = false;
    },
    orderCreated: (state, action) => {
      state.isLoading = false;
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      const isExist = state.entities.findIndex(g => g._id === action.payload._id);
      if (isExist !== -1) {
        return;
      }
      state.entities.push(action.payload);
    },
    createOrderFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeOrderFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderRemoved: (state, action) => {
      state.entities = state.entities.filter(g => g._id !== action.payload);
      state.isLoading = false;
    }
  }
});

const { actions, reducer: ordersReducer } = ordersSlice;
const {
  ordersRequested,
  ordersReceived,
  ordersRequestFailed,
  orderCreated,
  ordersAdminReceived,
  ordersAdminRequestFailed,
  orderPaidCreated
} = actions;

export const loadAdminOrdersList = () => async (dispatch) => {
  dispatch(ordersRequested());
  try {
    const { content } = await orderService.get();
    dispatch(ordersAdminReceived(content));
  } catch (error) {
    dispatch(ordersAdminRequestFailed(error.message));
  }
};

export const loadUserOrdersList = () => async (dispatch) => {
  dispatch(ordersRequested());
  try {
    const { content } = await orderService.getCurrentUserOrders();
    dispatch(ordersReceived(content));
  } catch (error) {
    dispatch(ordersRequestFailed(error.message));
  }
};

const orderCreateRequested = createAction("orders/orderCreateRequested");
// const createOrderFailed = createAction("orders/createOrderFailed");
const createPaidOrderFailed = createAction("orders/createPaidOrderFailed");
// const removeOrderFailed = createAction("orders/removeOrderFailed");
const orderRemoveRequested = createAction("orders/orderRemoveRequested");
// const orderUpdateRequested = createAction("orders/orderUpdateRequested");
// const updateorderFailed = createAction("orders/updateorderFailed");

export const createPaidOrder = (payload) => async (dispatch) => {
  dispatch(orderCreateRequested());
  try {
    const { content } = await orderService.create(payload);
    localStorageService.removeOrder();
    dispatch(orderPaidCreated());
  } catch (error) {
    dispatch(createPaidOrderFailed(error.message));
  }
};


export const getOrders = () => (state) => state.orders.entities;
export const getAdminOrders = () => (state) => state.orders.adminEntities;

export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;
export const getOrderById = (id) => (state) => {
  if (state.orders.adminEntities) {
    return state.orders.adminEntities.find((o) => o._id === id);
  }
};
export const getLoadingStatus = () => (state) => state.orders.isLoading;
export const getOrdersDataStatus = () => (state) => state.orders.dataLoaded;

export default ordersReducer;
