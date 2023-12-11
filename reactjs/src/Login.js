import React, { useEffect, useRef, useState } from 'react';
import { getCookie, setCookie } from './Cookie';
import { useNavigate } from "react-router-dom"

const log = async(email, pass, setIsLog, setUser) => {
    return  await fetch('http://localhost:3000/auth/sign-in', {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(
            {
                email: email,
                password: pass
            }
        )
    })
    .then(res => {
        if(!res.ok){
            console.log("에러")
            throw new Error()
        }
        return res.json()
    })
    .then(res => {
      setCookie("token", res.accessToken)
      setIsLog(true)
      console.log(email)
      setUser(email)
    }).catch(() => {
        window.alert('로그인 실패')
        console.log(
            "오류"
        )
    });
}

const signin = async(email, password) => {
    return  await fetch('http://localhost:3000/users/register',{
        method: 'post',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(
            {
                email: email,
                password: password,
            }
        )
    })
    .then(res => res.json())
    .then(res => console.log(res))   
    .catch(() => {
        console.log("오류")
    });
}

function Login(props) {
    const pass = useRef()
    const email = useRef()
    const { setUser, setIsLog } = props
    const navi = useNavigate()

    return (
      <div className="Detail">
        <div style={{width: '50%', margin: 'auto', marginTop: '10%', backgroundColor: 'blue'}}>
            <input style={{display: 'block', width: '50%', textAlign: 'center', margin: 'auto', marginTop: '20px' }} placeholder='email' ref={email}/>
            <input type='password' style={{display: 'block', width: '50%', textAlign: 'center', margin: 'auto', marginTop: '20px'}} placeholder='password' ref={pass}/>
        </div>
        <button onClick={async() => {
            await log(email.current.value, pass.current.value, setIsLog, setUser)
            navi('/')
        }}>로그인</button>
        <button onClick={() => signin(email.current.value, pass.current.value)}>회원가입</button>
      </div>
    );
}

export default Login;
