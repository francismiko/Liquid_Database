import { Action, Exception } from "@/types/action";
import axios from "./axios";

class axiosRequest {
  public postActions = (action: Action) => {
    axios.post("/user/actions", {
      account: action.account,
      action_type: action.type,
      action_content: action.content,
      action_date: new Date(),
    });
  };

  public postException = (exception: Exception) => {
    axios.post("/user/exceptionActions", {
      account: exception.account,
      exception_type: exception.type,
      exception_code: exception.code,
      exception_content: exception.content,
      exception_date: new Date(),
    });
  };
}

export default new axiosRequest();
