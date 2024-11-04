import { subscribeData } from "../../../../assets/dummyData";
import SubscribeInfo from "./SubscribeInfo";

const SubscribeList = () => {
  return (
    <div className="m-3 flex flex-col gap-y-5 min-h-80">
      {subscribeData &&
        subscribeData.map((sub) => (
          <SubscribeInfo sub={sub} key={`sub-${sub.subscribeName}`} />
        ))}
    </div>
  );
};

export default SubscribeList;
