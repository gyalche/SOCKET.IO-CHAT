import { Container, Typography } from '@mui/material';
import './App.css';
import ChatWindow from './components/ChatWindow';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
function App() {
  return (
    <div>
      <Container>
        <Header />
       
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
