import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getComments, selectComments, selectLoadingState } from "../slices/commentsSlice";
import { selectItems } from "../slices/storiesDataSlice";
import { unixToDate } from "../utils/unixToDate";

// Изменение времени из unix timestamp в формат даты
//const unixToDate = (unixTimestamp) => (new Date(unixTimestamp * 1000)).toLocaleDateString("ru-RU");

export default function ItemPage() {
    // Селекторы
    const comments = useSelector(selectComments);
    const loadingCommentsState = useSelector(selectLoadingState);

    const {id} = useParams();
    const dispatch = useDispatch();
    const itemMainId = [+id];

    // Состояния для фетчинга
    const [itemMain, setItemMain] = useState([]);
    console.log(itemMain)

    useEffect(() => {
        dispatch(getComments(itemMainId)).then(res => setItemMain(res.payload[0]));
        
    }, [id])


    return (
        <>
        <h1 onClick={() => {dispatch(getComments(itemMainId));}}>{loadingCommentsState ? "refreshing" : "GO REFRESH"}</h1>
            {loadingCommentsState ? "fetching items" :  
            <div>
                <div className="description">
                    <h2>{itemMain?.title}</h2>
                    <div className="item props">
                        <span>{itemMain?.by}</span>
                        <span>{unixToDate(itemMain?.time)}</span>
                    </div>
                </div>
                <div>
                    show
                </div>
            </div>}
        </>
        
    )
}