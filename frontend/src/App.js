
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

axios.defaults.withCredentials=true;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='forgot' element={<Forgot/>}/>
          <Route path='/resetpassword/:resetToken' element={<Reset/>}/>
          <Route path='/dashboard' element={<Sidebar>
             <Layout>
              <Dashboard/>
             </Layout>
          </Sidebar>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
