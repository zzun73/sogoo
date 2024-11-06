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
    <div className="grid grid-cols-3 text-center">
      {tabs.map((item) => (
        <div
          key={item.key}
          className={`py-5 ${
            selectedTab === item.key ? "border border-black border-b-0" : ""
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
