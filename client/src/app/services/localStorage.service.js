const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const ORDER_KEY = "order-good";
const ROLE_KEY = "role-os-key";

export function setTokens({ accessToken, refreshToken, userId, expiresIn = 3600, role }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  if (role) {
    localStorage.setItem(ROLE_KEY, role);
  }
};
export function setOrder(payload) {
  localStorage.setItem(ORDER_KEY, payload);
};
export function getOrder() {
  return localStorage.getItem(ORDER_KEY);
};
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
};
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
};
export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
};
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
};
export function getUserRole() {
  return localStorage.getItem(ROLE_KEY);
};
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(ROLE_KEY);
};
export function updateOrder(data) {
  localStorage.removeItem(ORDER_KEY);
  localStorage.setItem(ORDER_KEY, data);
};
export function removeOrder() {
  localStorage.removeItem(ORDER_KEY);
};

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserId,
  removeAuthData,
  updateOrder,
  getOrder,
  setOrder,
  getUserRole,
  removeOrder
};

export default localStorageService;
