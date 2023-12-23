import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Logs from './pages/logs/Logs';
import Entry from './pages/entry/Entry';
import DreamInfo from './pages/dreams/DreamInfo';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dreamlogs" element={<Logs />} />
      <Route path="/dreamentry" element={<Entry />} />
      <Route path="/dream/:id" element={<DreamInfo />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
