import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const getStringDate = (date) =>{
  return date.toISOString().slice(0,10);
}

const New = () => {
  console.log(getStringDate(new Date()))
const naviagte = useNavigate();
const [date, setDate] = useState();
  return (
    <div>
      <MyHeader 
      headText={"새 일기쓰기"}
      leftChild={<MyButton text={"< 뒤로가기"} onclick={() => naviagte(-1)} />}
       />
       <div>
          <section>
            <h4>오늘은 언제인가요?</h4>
            <div className="input-box">
              <input 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"/>
            </div>
          </section>
       </div>
    </div>
  );
};

export default New;
