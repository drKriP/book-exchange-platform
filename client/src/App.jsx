import './App.css';
import {BrowserRouter as Router, Route, useNavigate, Navigate, useLocation, Routes} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import UserContext from './UserContext';

import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//components
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


import {getUser} from './api/user';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        console.log(res);
        if(res.error) {
          toast.error(res.error);
        } else {
          setUser(res.user);
          toast(res.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
    fetchUser();
  }, []);
  return(
    <div>
      <Router>  
        <UserContext.Provider value={{user, setUser}}>
        <Header />
        <ToastContainer />
        {/* <AppFunction /> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

function AppFunction() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login'); 
    }
  }, [user, navigate]);
} 

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
export default App;
