import { subscribeData } from "../../../../assets/dummyData";
import SubscribeInfo from "./SubscribeInfo";

const SubscribeList = () => {
  return (
    <div className="m-3 flex flex-col gap-y-5">
      {subscribeData && subscribeData.map((sub) => <SubscribeInfo sub={sub} />)}
    </div>
  );
};

export default SubscribeList;
