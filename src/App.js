import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/Home';
import Edit from './pages/Edit.js';
import New from './pages/New.js';
import Diary from './pages/Diary';
import React, { useEffect, useReducer, useRef } from 'react';

const reducer =  ( state, action ) =>{
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      const newItem = {
        ...action.data
      };
      newState = [newItem, ... state];
      break;
    }
    case 'REMOVE':{
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT':{
      newState = state.map((it)=>
      it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState
}

export const Diarystatecontext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {id: 1,
  emotion: 5,
  content: "오늘의 일기 1번",
  date : 1681738171000},
  {id: 2,
  emotion: 4,
  content: "오늘의 일기 2번",
  date : 1681738171100},
  {id: 3,
  emotion: 2,
  content: "오늘의 일기 3번",
  date : 1681738171200},
  {id: 4,
  emotion: 1,
  content: "오늘의 일기 4번",
  date : 1681738171300},
  {id: 5,
  emotion: 2,
  content: "오늘의 일기 5번",
  date : 1681738171400}
  ]

function App() {
  useEffect(() =>{
    localStorage.setItem("key1", 10);
    localStorage.setItem("key2", "20");
    localStorage.setItem("key3", JSON.stringify({value:30}));
    const item1 = localStorage.getItem('key1');
    const item2 = localStorage.getItem('key2');
    const item3 = localStorage.getItem('key3');
    console.log({item1, item2, item3});
  }, [])

  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(6);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data:{
      id: dataId.current,
      date: new Date(date).getTime(),
        content,
        emotion,
    },
  });
  dataId.current += 1;
  }
  // REMOVE
  const onRemove = (targetId) =>{
    dispatch({type: "REMOVE", targetId});
  }
  // EDIT
  const onEdit = (targetId, date, content, emotion ) => {
    dispatch({
      type: "EDIT",
      data:{
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  };
  return (
    <Diarystatecontext.Provider value = {data}>
      <DiaryDispatchContext.Provider
      value = {{
        onCreate,
        onEdit,
        onRemove
      }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/new" element={<New/>} />
              <Route path="/diary/:id" element={<Diary/>} />
              <Route path="/edit/:id" element={<Edit/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </Diarystatecontext.Provider>
  );
}
export default App;
