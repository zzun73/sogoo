import member from "./member";
import store from "./store";
import food from "./food";
import payment from "./payment";
import subscribe from "./subscribe";

export default {
  ...store,
  ...member,
  ...food,
  ...payment,
  ...subscribe,
};
