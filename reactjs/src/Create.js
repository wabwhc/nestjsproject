import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { getCookie } from './Cookie';

const createBoard = async(title, content) => {
    return  await fetch('http://127.0.0.1:3000/auth/create', {
        method: 'post',
        headers: {
            "Content-Type" : "application/json",
            Authorization: "Bearer " + getCookie('token')
        },
        body: JSON.stringify(
            {
                title: title,
                content: content,
            }
        )
    })
    //   .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

function Create(props) {
  const { isLog, user } = props
  const titleRef = useRef()
  const contentRef = useRef()
  const navi = useNavigate()

  return (
    <div className="Main">
      <input placeholder='title' ref={titleRef} />
      <input placeholder='content' ref={contentRef} />
      <button onClick={async() => {
        if(isLog){
            await createBoard(titleRef.current.value, contentRef.current.value)
            navi('/')
        }else{
            window.alert('로그인이 필요합니다.')
            navi('/login')
        }
      }}>작성</button>
    </div>
  );
}

export default Create;
