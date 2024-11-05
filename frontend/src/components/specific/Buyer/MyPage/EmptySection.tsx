import { HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

type EmptySectionType = "subscription" | "foodTrade" | "review";

interface EmptySectionProps {
  type: EmptySectionType;
}

interface ContentType {
  [key: string]: {
    icon: JSX.Element;
    title: string;
    description: string;
  };
}

const EmptySection = ({ type }: EmptySectionProps) => {
  const content: ContentType = {
    subscription: {
      icon: <HiOutlineShoppingBag className="w-12 h-12 text-gray-400" />,
      title: "구독 중인 상품이 없습니다",
      description: "지금 바로 구독 상품을 둘러보세요!",
    },
    foodTrade: {
      icon: <HiOutlineSparkles className="w-12 h-12 text-gray-400" />,
      title: "주문 내역이 없습니다",
      description: "맛있는 반찬을 주문해보세요!",
    },
    review: {
      icon: <HiOutlineChatBubbleLeftRight className="w-12 h-12 text-gray-400" />,
      title: "작성한 리뷰가 없습니다",
      description: "상품 리뷰를 작성하고 반찬 개선에 기여해 보세요!",
    },
  };

  const defaultContent = {
    icon: <HiOutlineShoppingBag className="w-12 h-12 text-gray-400" />,
    title: "데이터가 없습니다",
    description: "데이터를 추가해주세요",
  };

  const { icon, title, description } = content[type] || defaultContent;

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg space-y-4">
      {icon}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default EmptySection;
