import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const checkLogin = reactive({
      isLogin: false,
    });

    const userInfo = reactive({
      isAdmin: false,
      userId: "",
      userName: "",
    });
    return { checkLogin, userInfo };
  },
  {
    persist: true,
  }
);
