import auth from "./auth";
import store from "./store";
import food from "./food";

export default {
  ...auth,
  ...store,
  ...food,
};
