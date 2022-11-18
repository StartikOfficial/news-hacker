import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { selectItems, getNewItems, selectLoadingState } from "../slices/storiesDataSlice";
import { unixToDate } from "../utils/unixToDate";



export default function MainPage() {
    const loadingItemsState = useSelector(selectLoadingState);
    const items = useSelector(selectItems);
    
    const dispatch = useDispatch();
    // время таймера
    const seconds = 60;

    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
        if (!timeLeft) {dispatch(getNewItems()); setTimeLeft(seconds)};
        // if (!timeLeft) {dispatch(getNewItems()); setTimeLeft(seconds)};

        if (!loadingItemsState) {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
        else {setTimeLeft(seconds)}
        

      }, [timeLeft, loadingItemsState]);


    return (
        <>
        <button className="z-10 drop-shadow-lg fixed bottom-0 right-0 h-28 w-28 mx-12 my-12 leading-4 text-[#fb6357] md:mx-8 md:my-24 md:h-56 md:w-56 md:text-4xl bg-[#4e3038] rounded-3xl font-bold"
        onClick={() => {dispatch(getNewItems());}}>{loadingItemsState ? "загрузка" : <span className="text-[#fb6357] bg-inherit p-0">Истории обновятся через: {timeLeft}</span>}</button>
        <ul className="flex flex-col items-center md:max-w-5/6 w-4/5 m-auto">
            {loadingItemsState ? "fetching items" : items?.map((el, i) => 
            <li className="px-8 py-4 flex flex-row mb-6 h-24 items-center justify-between min-w-full drop-shadow-xl bg-[#2d2d3a]" key={i}>
                <div className="description flex flex-col">
                    <Link to={el?.id.toString()}>
                        <h2 className="font-bold">{el?.title}</h2>
                    </Link>
                    <div className="item props flex flex-row justify-between">
                        <span className="text-gray-400">by {el?.by}</span>
                        <span className="flex flex-row">
                            {unixToDate(el?.time)}</span>
                    </div>
                </div>
                <div className="h-16 max-w-12 w-20 justify-around text rounded-2xl flex flex-col items-center bg-[#2f3743] drop-shadow-xl">
                    <svg className="w-6 h-6 bg-inherit" fill="white" width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-q</title><path d="M464,464H48a16,16,0,0,1-14.07-23.62l208-384a16,16,0,0,1,28.14,0l208,384A16,16,0,0,1,464,464Z"/></svg>
                    {el?.score}
                </div>
            </li>)}
        </ul>
        </>
    )
}