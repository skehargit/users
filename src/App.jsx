import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetailsPage from './Pages/UserDetailsPage';
import Home from './Pages/Home';
import { Toaster, toast } from 'react-hot-toast';
function App() {
  return (
    <>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
