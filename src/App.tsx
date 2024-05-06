import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import CommunityPostPage from './pages/CommunityPostPage';
import Category from './pages/Category';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
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
