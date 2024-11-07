import { subscribeData } from "../../../../assets/dummyData";
import SubscribeInfo from "./SubscribeInfo";

const SubscribeList = () => {
  return (
    <div className="flex flex-col gap-y-5 min-h-80 w-11/12 mx-auto mt-5">
      {subscribeData &&
        subscribeData.map((sub) => (
          <SubscribeInfo sub={sub} key={`sub-${sub.subscribeName}`} />
        ))}
    </div>
  );
};

export default SubscribeList;
