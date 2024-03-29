import create from "zustand";
import { persist } from 'zustand/middleware';

const defaultAuthState = {
  loggedIn: false,
  // permissions : [] // This will be implemented later using the laravel sanctum abilities 
}

const useAuthStore = create(persist((set, get) => ({
  ...defaultAuthState,
  setLoggedIn: (data) => {
    return set((state) =>  {
      const tempState = {
        loggedIn : true
      }
      return tempState;
    })
  },

  setLoggedOut: (data) => {
    return set((state) => {
      return defaultAuthState;
    })
  },


}), {
  name: 'authStorage',
  // getStorage: () =>
  //   /**
  //    * (optional) by default, 'local storage' is used
  //    * but personally, i use sessionStorage so that it will only
  //    * be stored in the current tab/window i am on and will not
  //    * affect other tabs.
  //    * 
  //    * because of the 'persist' middle-ware, the above
  //    * saveToBrowserStorage & takeFromBrowserStorage are now 
  //    * obsolete
  //    */
  //   sessionStorage,
}))

const defaultThemeState = {
  'theme': 'light'
}

const themeState = create(persist((set, get) => ({
  ...defaultThemeState,
  setToggle: (data) => {
    return set((state) => {
      return defaultAuthState.theme = 'dark';
    });
  },

  setToggleOut: () => {
    return set((state) => {
      return defaultThemeState;
    })
  }

})))


export default useAuthStore;