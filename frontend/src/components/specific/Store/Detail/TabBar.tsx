interface TabProps {
  key: string;
  word: string;
}

interface TabBarProps {
  selectedTab: string;
  handleTab: (tab: string) => void;
}

const TabBar = ({ selectedTab, handleTab }: TabBarProps) => {
  const tabs: TabProps[] = [
    { key: "subscribe", word: "구독 상품 목록" },
    { key: "foods", word: "개별 상품 목록" },
    { key: "review", word: "리뷰" },
  ];

  return (
    <div className="w-full grid grid-cols-3 text-center">
      {tabs.map((item) => (
        <div
          key={item.key}
          className={`py-5 ${
            selectedTab === item.key
              ? "border border-black border-b-0"
              : "border border-black border-t-0 border-l-0 border-r-0"
          }`}
          onClick={() => handleTab(item.key)}
        >
          {item.word}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
