const localStorageKey = "AUTH_KEY";

export function getAuthKey() {
  return window.localStorage.getItem(localStorageKey);
}

export function setAuthKey(authKey: string) {
  window.localStorage.setItem(localStorageKey, authKey);
}

export function removeAuthKey() {
  window.localStorage.removeItem(localStorageKey);
}
