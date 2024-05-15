import { useEffect } from 'react';
import ResultProducts from '../components/search/ResultProduct';

const ResultPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || ''; // null일 경우 빈 문자열을 할당

  useEffect(() => {
    if (search) {
      const decodedSearch = decodeURIComponent(search);
      console.log('Search keyword:', decodedSearch);
      // 여기서 해당 키워드를 사용하여 다른 로직 수행 가능
    }
  }, [search]);

  return (
    <div>
      <div> 커뮤니티 키워드 검색 한 결과 관련글 </div>
      <ResultProducts keyword={search} />
    </div>
  );
};

export default ResultPage;
