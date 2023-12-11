import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from './Main';
import Detail from './Detail';
import Login from './Login';
import { useEffect, useState } from 'react';
import { getCookie } from './Cookie';
import Create from './Create';
import Edit from './Edit';

const isLogin = async(setUser,setIsLog) => {
  return  await fetch('http://localhost:3000/auth/authenticate',{
      headers: {
          Authorization: "Bearer " + getCookie('token')
      }
  })
  .then(res => {
      if(!res.ok){
        throw new Error()
      }
      return res.json()
  })
  .then(res => {
    setUser(res.user)
    setIsLog(true)
  }).catch(() => {
    setIsLog(false)
  });
}

function App() {
  const [user, setUser] = useState("")
  const [isLog, setIsLog] = useState(false)
  useEffect(() => {
    async function checkLogin(){
      await isLogin(setUser, setIsLog)
    }
    checkLogin()
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main isLog={isLog} user={user} setUser={setUser} setIsLog={setIsLog} />} />
          <Route path='/login' element={<Login setUser={setUser} setIsLog={setIsLog} />} />
          <Route path='/create' element={<Create isLog={isLog} user={user} />} />
          <Route path='/edit/*' element={<Edit isLog={isLog} user={user} />} />
          <Route path='/*' element={<Detail user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
