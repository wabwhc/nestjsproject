import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { getCookie } from './Cookie';

const editReply = async(boardId, title, content) => {
    await fetch('http://127.0.0.1:3000/auth/edit', {
      method: 'post',
      headers: {
        "Content-Type" : "application/json",
        Authorization: "Bearer " + getCookie('token')
      },
      body: JSON.stringify(
        {
          boardId: boardId,
          content: content,
          title: title
        }
      )
    })
}

function Edit(props) {
  const { isLog, user } = props
  const titleRef = useRef()
  const contentRef = useRef()
  const navi = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="Main">
      <input placeholder='title' ref={titleRef} />
      <input placeholder='content' ref={contentRef} />
      <button onClick={async() => {
        if(isLog){
            await editReply(pathname.slice(6), titleRef.current.value, contentRef.current.value)
            navi('/')
        }else{
            window.alert('로그인이 필요합니다.')
            navi('/login')
        }
      }}>수정</button>
    </div>
  );
}

export default Edit;
