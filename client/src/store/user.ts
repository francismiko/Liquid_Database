import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      checkLogin: {
        isLogin: false,
      },
      userInfo: {
        isAdmin: false,
        userID: "",
        userName: "",
      },
    };
  },
  persist: true,
});
