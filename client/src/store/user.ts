import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const checkLogin = ref({
      isLogin: false,
    });

    const userInfo = ref({
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
