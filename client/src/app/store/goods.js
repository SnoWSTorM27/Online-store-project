import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import goodService from "../services/good.service";
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

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    goodsRequested: (state) => {
      state.isLoading = true;
    },
    goodsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    goodsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // authRequested: (state) => {
    //   state.error = null;
    // },
    // authRequestSuccess: (state, action) => {
    //   state.auth = action.payload;
    //   state.isLoggedIn = true;
    // },
    // authRequestFailed: (state, action) => {
    //   state.error = action.payload;
    // },
    goodCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    goodUpdated: (state, action) => {
      state.dataLoaded = false;
      state.entities.map((g) => {
        if (g._id === action.payload._id) {
          return g = action.payload;
        }
      });
    },
    goodRemoved: (state, action) => {
      state.entities = state.entities.filter(g => g._id !== action.payload);
    }
  }
});

const { actions, reducer: goodsReducer } = goodsSlice;
const {
  goodsRequested,
  goodsReceived,
  goodsRequestFailed,
  goodCreated,
  goodUpdated,
  goodRemoved
} = actions;

export const loadGoodsList = () => async (dispatch) => {
  dispatch(goodsRequested());
  try {
    const { content } = await goodService.fetchAll();
    dispatch(goodsReceived(content));
  } catch (error) {
    dispatch(goodsRequestFailed(error.message));
  }
};

const goodCreateRequested = createAction("goods/goodCreateRequested");
const createGoodFailed = createAction("goods/createGoodFailed");
const goodRemoveRequested = createAction("goods/goodRemoveRequested");
const removeGoodFailed = createAction("goods/removeGoodFailed");
const goodUpdateRequested = createAction("goods/goodUpdateRequested");
const updateGoodFailed = createAction("goods/updateGoodFailed");

export const createGood = (payload) => async (dispatch) => {
  dispatch(goodCreateRequested());
  try {
    const { content } = await goodService.create(payload);
    dispatch(goodCreated(content));
  } catch (error) {
    dispatch(createGoodFailed(error.message));
  }
};

export const removeGood = (id) => async (dispatch) => {
  dispatch(goodRemoveRequested());
  try {
    const { content } = await goodService.remove(id);
    if (!content) {
      dispatch(goodRemoved(id));
    }
  } catch (error) {
    dispatch(removeGoodFailed(error.message));
  }
};

export const updateGoodData = (payload) => async (dispatch) => {
  dispatch(goodUpdateRequested());
  try {
    const { content } = await goodService.update(payload);
    dispatch(goodUpdated(content));
    history.push(`/admin/goods`);
  } catch (error) {
    dispatch(updateGoodFailed(error.message));
  }
};


export const getGoods = () => (state) => state.goods.entities;
export const getGoodsLoadingStatus = () => (state) => state.goods.isLoading;
export const getGoodById = (id) => (state) => {
  if (state.goods.entities) {
    return state.goods.entities.find((g) => g._id === id);
  }
};
export const getGoodsDataStatus = () => (state) => state.goods.dataLoaded;

export default goodsReducer;
