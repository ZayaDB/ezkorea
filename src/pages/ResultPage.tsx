// import { useEffect } from 'react';
import ResultProducts from '../components/category/search/ResultProduct';
import ResultCommunity from '../components/community/search/ResultCommunity';
import SubTitle from '../components/community/post/SubTitle';
const ResultPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || ''; // null일 경우 빈 문자열을 할당

  return (
    <div
      style={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: '0 5px 60px',
      }}
    >

      <SubTitle text={`PRODUCTS / ${search}`} isRequired={false} />
      <ResultProducts keyword={search} />
      <SubTitle text={`FEEDS / ${search}`} isRequired={false} />
      <ResultCommunity keyword={search} />
    </div>
  );
};

export default ResultPage;
