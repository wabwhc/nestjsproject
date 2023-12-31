import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { removeCookie } from './Cookie';

const a = async(test) => {
  return  await fetch('http://127.0.0.1:3000/boards')
  .then(res => res.json())
  .then(res => {
    test(res)
  });
}

function Main(props) {
  const [board, setBoard] = useState([])
  let navi = useNavigate()
  const { isLog, user, setIsLog, setUser } = props
  console.log(props)
  useEffect(() => {
    async function test(){
      await a(setBoard)
    }
    test()
  }, []);

  return (
    <div className="Main">
      {
        isLog ? <div><div>{user}님 로그인 중</div><button onClick={() => {
          removeCookie('token')
          setIsLog(false)
          setUser("")
        }}>로그아웃</button></div>
        : <button onClick={() => navi('login')}>로그인</button>
      }
      <button onClick={() => {
        if(isLog){
          navi('create')
        }else{
          window.alert('로그인이 필요합니다')
          navi('login')
        }
      }}>글쓰기</button>
      {
        board.map((title, idx) => {
          return <div>
            <li style={{width: '40%', margin: 'auto', marginBottom: '1px', marginTop: '5px', fontSize: '25px', borderBottomWidth: '2px', borderBottomColor: 'gray', borderBottomStyle: 'solid'}} key={idx} 
              onClick={() => navi(`${title.id}`)} 
            >
              {title.title}
            </li>
          </div>
        })
      }
    </div>
  );
}

export default Main;
