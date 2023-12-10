import React, { useEffect, useRef, useState } from 'react';
import { getCookie, setCookie } from './Cookie';

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
        console.log(
            "오류"
        )
    });
}

const test = async(setUser) => {
    return  await fetch('http://localhost:3000/auth/authenticate',{
        headers: {
            Authorization: "Bearer " + getCookie('token')
        }
    })
    .then(res => {
        if(!res.ok){
            console.log("에러")
            throw new Error()
        }
        return res.json()
    })
    .then(res => {
        setUser(res)
    }).catch(() => {
        console.log("오류")
    });
}
function Login(props) {
    const pass = useRef()
    const email = useRef()
    const { setUser, setIsLog } = props

    return (
      <div className="Detail">
        <input placeholder='email' ref={email}/>
        <input placeholder='password' ref={pass}/>
        <button onClick={() => log(email.current.value, pass.current.value, setIsLog, setUser)}>로그인</button>
        <button onClick={() => test(setUser)}>로그인 중 인증</button>
      </div>
    );
}

export default Login;
