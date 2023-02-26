import { createSlice } from "@reduxjs/toolkit";
import tabService from "../services/tab.service";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    tabsRequested: (state) => {
      state.isLoading = true;
    },
    tabsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    tabsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: tabsReducer } = tabsSlice;
const { tabsRequested, tabsReceived, tabsRequestFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
};

export const loadTabsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().tabs;
  if (isOutdated(lastFetch)) {
    dispatch(tabsRequested());
    try {
      const { content } = await tabService.fetchAll();
      dispatch(tabsReceived(content));
    } catch (error) {
      dispatch(tabsRequestFailed(error.message));
    }
  }
};

export const getTabs = () => (state) => state.tabs.entities;
export const getTabsLoadingStatus = () => (state) => state.tabs.isLoading;
export const getTabById = (id) => (state) => {
  if (state.tabs.entities) {
    return state.tabs.entities.find((tab) => tab._id === id);
  }
};

export default tabsReducer;
