import auth from "./auth";
import member from "./member";
import store from "./store";
import food from "./food";
import payment from "./payment";
import seller from "./seller";

export default {
  ...auth,
  ...store,
  ...member,
  ...food,
  ...payment,
  ...seller,
};
