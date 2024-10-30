interface MemberInfo {
  memberId: number;
  name: string;
  email: string;
  phoneNumber: string;
  birth: string;
  address: string;
  role: string;
}

interface MemberStore {
  memberInfo: MemberInfo | null;
  isLogin: boolean;
  setLogin: (userInfo: MemberInfo) => void;
  setLogout: () => void;
  setIsLogin: (isLogin: boolean) => void;
}
