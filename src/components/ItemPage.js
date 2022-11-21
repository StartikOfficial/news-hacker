import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getComments, selectComments, selectLoadingState } from "../slices/commentsSlice";
import { getNewItems, selectItems } from "../slices/storiesDataSlice";
import { unixToDate } from "../utils/unixToDate";
import MainPage from "./MainPage";
import MyButton from "./MyButton";

export default function ItemPage() {
    const [loadingCommentsState, setLoadingCommentsState] = useState(false);
    // console.log(loadingCommentsState);

    const {id} = useParams();
    const dispatch = useDispatch();
    const itemMainId = [+id];

    const [itemMain, setItemMain] = useState([]);
    const [mainComments, setMainComments] = useState([]);    


    useEffect(() => {
        if (itemMain.kids) {dispatch(getComments(itemMain.kids)).then(el => setMainComments(el.payload)); console.log(mainComments)}
        else dispatch(getComments(itemMainId)).then((res) => setItemMain(res.payload[0]));
    }, [itemMain]);


    return (
        <>
        <Link className="no-underline" to="/"><svg className="mb-6" 
  width="48"
  height="48"
  viewBox="0 0 24 24"
  fill="white"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11.9481 14.8285L10.5339 16.2427L6.29126 12L10.5339 7.7574L11.9481 9.17161L10.1197 11H17.6568V13H10.1197L11.9481 14.8285Z"
    fill="currentColor"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M23 19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19ZM19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z"
    fill="currentColor"
  />
</svg>
</Link>
        <button className="border border-black p-4 mr-4 mb-6"
        onClick={() => {setLoadingCommentsState(true); dispatch(getComments(itemMainId)).then(setLoadingCommentsState(false));}}>{!loadingCommentsState && <span className="">Обновить комментарии</span>}</button>
            {loadingCommentsState ? "fetching items" :  
            <div>
                <div className="description mb-6">
                    <h2><a href={itemMain?.url?.toString()} target="_blank" rel="noopener noreferrer">{itemMain?.title}</a></h2>
                    <div className="item props">
                        <span className="text-gray-400 mr-4">by {itemMain?.by}</span>
                        <span className=" mr-4">{unixToDate(itemMain?.time)}</span>
                        <span>Комментариев: {itemMain?.descendants} (с учетом удаленных)</span>
                    </div>
                </div>
                <div className="border border-t-0 italic border-r-0 border-l-0 border-white flex flex-row items-center text-cener"><span className="my-0 mx- text-center">Комментарии</span></div>
                <ul className="comments__section">
                    {mainComments.length ? mainComments.map((el, i) => (!el.dead && !el.deleted) && <li key={el.id} className="comment">
                        <div className="Description">
                                <span className="text-gray-400 mr-4 mt-6">{el.by}</span>
                                <span className="mr-4">{unixToDate(el.time)}</span>
                            </div>
                            {<p dangerouslySetInnerHTML={{__html: el.text}}></p>}
                            {(el.kids && !el.deleted && !el.dead) && <MyButton kidsKids={el.kids}/>}
                        </li>) : <div>Нет комментариев</div>} 
                </ul>
            </div>
            }
        </>
        
    )
}