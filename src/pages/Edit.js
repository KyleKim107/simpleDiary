import { useNavigate, useParams} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Diarystatecontext } from '../App';
import DiaryEditor from '../components/DiaryEditor';
const Edit = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(Diarystatecontext);
    const [originData, setOriginData] = useState();
    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id) )
            console.log(targetDiary);
            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                navigate("/", {replace:true});
            }
        }
    }, [id, diaryList]);
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
};

export default Edit;


