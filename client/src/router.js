import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import ChatWindow from './components/ChatWindow';
import Chats from './pages/Chats';
import Home from './pages/Home';
import Room from './pages/Room';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/chats', element: <Chats /> },
      { path: '/', element: <Home /> },
      { path: '/room/:roomId', element: <Room /> },
    ],
  },
]);
export default router;
