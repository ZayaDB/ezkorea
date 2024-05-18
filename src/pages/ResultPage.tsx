import { useEffect } from 'react';
import ResultProducts from '../components/search/ResultProduct';
import ResultCommunity from '../components/community/search/ResultCommunity';
import SubTitle from '../components/community/post/SubTitle';
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
    <div
      style={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: '0 20px 60px',
      }}
    >
      <SubTitle text='PRODUCTS' isRequired={false} />
      <ResultProducts keyword={search} />
      <SubTitle text='FEEDS' isRequired={false} />
      <ResultCommunity keyword={search} />
    </div>
  );
};

export default ResultPage;
