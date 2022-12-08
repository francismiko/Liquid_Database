import { defineStore } from "pinia";
import { ref } from "vue";

export const useMysqlStore = defineStore(
  "mysql",
  () => {
    const mysqlConfig = ref({
      mysql_host: "1",
      mysql_port: "2",
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
