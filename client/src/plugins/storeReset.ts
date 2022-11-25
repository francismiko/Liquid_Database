import { cloneDeep } from "lodash";

export default ({ store }) => {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
};
