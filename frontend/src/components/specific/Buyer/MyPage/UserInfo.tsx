import React from "react";
import formatters from "../../../../utils/formatters";

interface UserInfoProps {
  memberInfo: {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
  } | null;
}

const UserInfo = ({ memberInfo }: UserInfoProps) => {
  if (!memberInfo) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
        <h3 className="text-xl font-semibold">내 정보</h3>
      </div>
      <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <p className="w-24 font-bold">성명</p>
            <p>{memberInfo.name}</p>
          </div>
          <div className="flex items-center">
            <p className="w-24 font-bold">휴대폰</p>
            <p>{formatters.formatPhoneNumber(memberInfo.phoneNumber)}</p>
          </div>
          <div className="flex items-center">
            <p className="w-24 font-bold">이메일</p>
            <div className="flex-1 w-full">{memberInfo.email}</div>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="w-24 font-bold">주소</p>
            <div className="flex-1 w-full">{memberInfo.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
