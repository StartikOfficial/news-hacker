import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getComments, selectLoadingState } from "../slices/commentsSlice";
import { unixToDate } from "../utils/unixToDate";

export default function MyButton({kidsKids}) {
    const [otherComments, setOtherComments] = useState([]);
    const dispatch = useDispatch();

    console.log(otherComments)

    function showComments(kids) {
        if (kids[0]) 
        {   
            dispatch(getComments(kids)).then(e => {setOtherComments(e.payload)});
        } 
    }
        

    return (
        <><button className="mt-2" onClick={() => showComments(kidsKids)}>Посмотреть ответы</button>
        <ul className="comments__section">
                    {otherComments.length ? otherComments.map((el, i) => <li key={el.id} className="comment ml-10">
                        <div className="Description">
                                <span className="text-gray-400 mr-4">{el.by}</span>
                                <span>{unixToDate(el.time)}</span>
                            </div>
                            {<p dangerouslySetInnerHTML={{__html: el.text}}></p>}
                            {(el.kids && !el.deleted && !el.dead) && <MyButton kidsKids={el.kids}/>}
                        </li>) : ''} 
        </ul>
        </>
        )
}