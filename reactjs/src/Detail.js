import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from './Cookie';


const baord = async(test, id, navi) => {
    return  await fetch('http://127.0.0.1:3000/boards/' + id)
    .then(res => {
        if(!res.ok){
            console.log("에러")
            throw new Error()
        }
        return res.json()
    })
    .then(res => {

      console.log(res)
      test(res)
    }).catch(() => {
        console.log(
            "오류"
        )
        navi('/')
    });
}
const getReply = async(setReplies, id) => {
  return  await fetch('http://127.0.0.1:3000/replies/reply/' + id)
    .then(res => res.json() )
    .then(res => {
      console.log(res)
      setReplies(res)
    })
}

const deleteBoard = async(id) => {
  await fetch('http://127.0.0.1:3000/auth/delete', {
    method: 'delete',
    headers: {
      "Content-Type" : "application/json",
      Authorization: "Bearer " + getCookie('token')
    },
    body: JSON.stringify(
      {
        boardId: id
      }
    )
  })
}

function Detail(props) {
    const { pathname } = useLocation()
    const [detail, setDetail] = useState({
        id: 0,
        title: "로딩 중 ",
        content: "로딩 중 ",
        time: '로딩 중 ',
        user: '로딩 중 '
    })
    const [replies, setReplies] = useState([])
    const navi = useNavigate()
    const { user } = props

    useEffect(() => {
        async function getboad(){
          await baord(setDetail, pathname.slice(1), navi)
          await getReply(setReplies, pathname.slice(1))
        }
        getboad()
    }, []);
    
    
    return (
      <div className="Detail">
        <button onClick={async() => {
          if(user === detail.user){
            await deleteBoard(detail.id)
            navi('/')
          }else{
            window.alert('작성자만 삭제 가능합니다.')
          }
        }}>Delete</button>
        <div>{detail.title}</div>
        <div>{detail.time}</div>
        <div>{detail.user}</div>
        <div>{detail.content}</div>
        <div>=======================</div>
        {
          replies.length === 0 ? <div>댓글없음</div> : 
          replies.map((reply) => {
            return <div>
              <a>{reply.content}:{reply.user}</a>
            </div>
          })
        }
      </div>
    );
}

export default Detail;
