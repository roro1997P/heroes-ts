export interface AuthStoreInterface {
  isLoggedIn: boolean;
  tokenExpiration: number;
}

function state (): AuthStoreInterface {
  return {
    isLoggedIn: false,
    tokenExpiration: 0
  }
}

export default state
