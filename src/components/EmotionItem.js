import React from "react";

const EmotionItem = ({emotion_id
    , emotion_img
    , emotion_descript
    , onclick
    ,isSelected
}) =>{
    return (<div 
        onClick={() => onclick(emotion_id)}  
        className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off` ].join(" ")}>
    <img src={emotion_img} />
    <span>{emotion_descript}</span>
    </div>);
}

export default React.memo(EmotionItem);