import { useGetSearchResult } from "../../../../queries/queries";
import useRootStore from "../../../../stores";

const SearchResult: React.FC = () => {
  const searchKeyword = useRootStore().searchKeyword;

  const result = useGetSearchResult(searchKeyword);

  console.log(result);

  return (
    <div>
      <h1>검색 결과</h1>
    </div>
  );
};

export default SearchResult;
