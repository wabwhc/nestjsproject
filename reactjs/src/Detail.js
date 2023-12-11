import React, { useEffect, useRef, useState } from 'react';
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
      const dateObject = new Date(res.time)
      res.time = dateObject.toLocaleString('ko-kr')
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

const createReply = async(content, boardId) => {
  await fetch('http://127.0.0.1:3000/auth/reply/create', {
    method: 'post',
    headers: {
      "Content-Type" : "application/json",
      Authorization: "Bearer " + getCookie('token')
    },
    body: JSON.stringify(
      {
        boardId: boardId,
        content, content
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
    const replyRef = useRef()

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
        <button onClick={() => {
          if(user === detail.user){
            navi('/edit/' + pathname.slice(1))
          }else{
            window.alert('작성자만 수정 가능합니다.')
          }
        }}>Edit</button>
        <div style={{height: "20px"}}/>
        <div>
          <div style={{display: 'inline', marginLeft: '6px'}}>제목: </div>
          <div style={{display: 'inline', marginLeft: '6px'}}>{detail.title}</div>
        </div>
        <div>
          <div style={{display: 'inline', marginLeft: '6px'}}>날짜: </div>
          <div style={{display: 'inline', marginLeft: '6px'}}>{detail.time}</div>
        </div>
        <div>
          <div style={{display: 'inline', marginLeft: '6px'}}>작성자: </div>
          <div style={{display: 'inline', marginLeft: '6px'}}>{detail.user}</div>
        </div>
        <div>
          <div style={{display: 'inline', marginLeft: '6px'}}>내용: </div>
          <div style={{display: 'inline', marginLeft: '6px'}}>{detail.content}</div>
        </div>
        <div style={{marginTop: '10px', marginBottom: '10px'}}>=================================</div>
        <input style={{textAlign: 'center'}} placeholder='댓글' ref={replyRef} />
        <button onClick={async() => {
          await createReply(replyRef.current.value, pathname.slice(1))
          getReply(setReplies, pathname.slice(1))
        }}>댓글 입력</button>
        <table style={{width: '30%', margin: 'auto'}}>
          <tr>
            <th scope='col'>내용</th>
            <th scope='col'>작성자</th>
          </tr>
          {
            replies.length === 0 ? <div>댓글없음</div> : 
            replies.map((reply) => {
              return <tr>
                <td>{reply.content}</td>
                <td>{reply.user}</td>
              </tr>
            })
          }
        </table>
        
      </div>
    );
}

export default Detail;
