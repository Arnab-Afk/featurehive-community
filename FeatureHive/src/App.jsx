//App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Logout from "./pages/Logout"
import GoogleCallback from './pages/GoogleCallback.jsx';

import StudentDashboard from "./pages/StudentDashboard"
import PersonInfo from './components/forms/personinfo.jsx';
import Eduinfo from "./components/forms/eduinfo"
import Profile from './components/profile.jsx';
import Applications from "./components/applications.jsx";
import Jobpost from "./pages/jobpost.jsx";

import CompanyHome from './pages/company/Home.jsx';
import LoginCompany from './pages/company/LoginCompany.jsx';

import TpoDashboard from "./components/tpo/TpoDashboard.jsx";
import TpoBoard from "./pages/tpo/tpoBoard.jsx";
import TpoStudentTable from "./components/tpo/TpoStudentTable";
import TpoStats from "./components/tpo/tpostats.jsx";
import TpoCompanyCard from "./components/tpo/TpoCompany.jsx";
import TpoLogin from "./components/tpo/TpoLogin.jsx"
import AgGridStudentTable from "./components/tpo/AgGrid.jsx";
import useStore from "./store/store.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import TpoCreateJob from "./components/tpo/TpoCreateJob.jsx";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};



export default function App() {
  const { setIsUserLoggedIn, setLoading ,setIsUser } = useStore();
  const isUserLoggedIn = useStore(state => state.isUserLoggedIn);
  const loading = useStore(state => state.loading);
  const isTpo=useStore(state=>state.isTpo);
  const isUser=useStore(state=>state.isUser);
  const userType = useStore(state => state.userType);
  
  useEffect(() => {
    if (getCookie('auth-token')) {
      setIsUserLoggedIn(true);
      axios.get('/api/user/check', {
        headers: {
          'auth-token': getCookie('auth-token')
        }
      }).then((response) => {
        if(response== 'user'){
          useStore.setState({isUser: true});
          
        }
        else if(response== 'tpo'){
          useStore.setState({isTpo: true});
        }
      }).catch((error) => {
        console.error(error);

      });
    }

    setLoading(false);
    
  }, []);
  useEffect(() => {
    console.log("use effect called");
  }
  ,[]);
  
  if (loading) {
    return <div>Loading...</div>; 
  }else{
  return (
    <Router>
      <Routes>
      <Route path="/"  element={isUserLoggedIn ?<StudentDashboard /> : <Navigate to="/login" replace={true}/>} >
          <Route path='personalinfo' element={<PersonInfo/>} />
          <Route path='eduinfo' element={<Eduinfo/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='applications' element={<Applications/>} />
          <Route path='jobpost/:id' element={<Jobpost/>} />
          
        </Route>
        
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/callbackgoogle" element={<GoogleCallback/>} />
        <Route path='/tpo/login' element={<TpoLogin/>}/>
        <Route path="/company" element={<CompanyHome/>}>
        <Route path="login" element={<LoginCompany />} />
        </Route>
        {/* <Route path='/tpo' element={isTpo?<TpoDashboard/>: <Navigate to = "/tpo/login" replace ={true}/>}> */}
        <Route path='/tpo' element={<TpoDashboard/>}>
          <Route path='reports' element={<TpoStats/>}/>
          <Route path='students' element={<TpoStudentTable/>}/>
          <Route path='companies' element={<TpoCompanyCard/>}/>
          <Route path="jobpostings" element={<TpoCreateJob/>} />
        </Route>
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  )
} 
}