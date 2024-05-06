import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import CommunityPostPage from './pages/CommunityPostPage';
import Category from './pages/Category';
import Login from './pages/Login';
import Header from './components/common/Header';

function App() {

  const sections = [
    { title: '쇼핑홈', url: '/' },
    { title: '카테고리', url: '/shop' },
    { title: '베스트', url: '/shop/best' },
    { title: '세일', url: '/shop/sale' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Header title="Drururu" sections={sections} />
      <BrowserRouter>
        <Routes>
          <Route path='/shop' element={<Category />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/community/post' element={<CommunityPostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
