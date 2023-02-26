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
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    bagRequested: (state) => {
      state.isLoading = true;
    },
    bagReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    bagRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    bagCreated: (state, action) => {
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
    createBagFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeBagFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    bagRemoved: (state, action) => {
      state.entities = state.entities.filter(g => g._id !== action.payload);
      state.isLoading = false;
    },
    bagEmpty: (state) => {
      state.entities = null;
      state.dataLoaded = false;
    }
  }
});

const { actions, reducer: bagReducer } = bagSlice;
const {
  bagRequested,
  bagReceived,
  bagRequestFailed,
  bagCreated,
  createBagFailed,
  bagRemoved,
  removebagFailed,
  bagEmpty
} = actions;

export const loadUserBagList = () => async (dispatch) => {
  dispatch(bagRequested());
  try {
    const content  = JSON.parse((localStorageService.getOrder()));
    dispatch(bagReceived(content));
  } catch (error) {
    dispatch(bagRequestFailed(error.message));
  }
};

export const clearBag = () => (dispatch) => {
  localStorageService.removeOrder();
  dispatch(bagEmpty());
};

const bagCreateRequested = createAction("bag/bagCreateRequested");
const bagRemoveRequested = createAction("bag/bagRemoveRequested");

export const createBagItem = (payload) => async (dispatch, getState) => {
  dispatch(bagCreateRequested());
  try {
    dispatch(bagCreated(payload));
    const { entities } = getState().bag;
    await localStorageService.setOrder(JSON.stringify(entities));
  } catch (error) {
    dispatch(createBagFailed(error.message));
  }
};

export const removeBagItem = (id) => async (dispatch, getState) => {
  dispatch(bagRemoveRequested());
  try {
    dispatch(bagRemoved(id));

    const { entities } = getState().bag;
    await localStorageService.updateOrder(JSON.stringify(entities));
  } catch (error) {
    dispatch(removebagFailed(error.message));
  }
};

export const getBagItems = () => (state) => state.bag.entities;
export const getBagLoadingStatus = () => (state) => state.bag.isLoading;
export const getBagDataStatus = () => (state) => state.bag.dataLoaded;

export default bagReducer;
