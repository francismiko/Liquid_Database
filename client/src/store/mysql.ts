import { defineStore } from "pinia";
import { ref } from "vue";

export const useMysqlStore = defineStore(
  "mysql",
  () => {
    const mysqlConfig = ref({
      mysql_host: "",
      mysql_port: "",
      mysql_user: "",
      mysql_password: "",
      mysql_database: "",
    });
    return { mysqlConfig };
  },
  {
    persist: true,
  }
);
