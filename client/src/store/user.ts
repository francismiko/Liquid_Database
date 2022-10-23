import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      checkLogin: {
        isLogin: false,
      },
      userInfo: {
        isRoot: false,
        userID: "",
        userName: "",
      },
    };
  },
  persist: true,
});
