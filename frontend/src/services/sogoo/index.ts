import auth from "./auth";
import member from "./member";
import store from "./store";

export default {
  ...auth,
  ...store,
  ...member,
};
