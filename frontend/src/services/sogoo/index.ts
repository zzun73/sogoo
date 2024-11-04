import auth from "./auth";
import member from "./member";
import store from "./store";
import food from "./food";

export default {
  ...auth,
  ...store,
  ...member,
  ...food,
};
