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
    // const [enableButton, setEnableButton] = useState(disabled)
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

      // устранение бага, когда на первом месте массива появляется null, undefined
      (items[0] == null) && dispatch(getNewItems());

    return (
        <>
        <button className="z-10 drop-shadow-lg fixed bottom-0 right-0 h-28 w-28 mx-12 my-12 leading-4 text-[#fb6357] md:mx-8 md:my-24 md:h-56 md:w-56 md:text-4xl bg-[#4e3038] rounded-3xl font-bold"
        onClick={() => {dispatch(getNewItems());}}>{loadingItemsState ? <span>
            загрузка...</span> : <span className="text-[#fb6357] bg-inherit p-0">Новости обновятся через: {timeLeft}</span>}</button>
        <ul className="flex flex-col items-center md:max-w-5/6 w-4/5 m-auto">
            {loadingItemsState ? <svg className="animate-spin fixed left-50" fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="100px" height="100px" viewBox="0 0 26.349 26.35" 
            space="preserve">
            <g><g><circle cx="13.792" cy="3.082" r="3.082"/><circle cx="13.792" cy="24.501" r="1.849"/><circle cx="6.219" cy="6.218" r="2.774"/><circle cx="21.365" cy="21.363" r="1.541"/><circle cx="3.082" cy="13.792" r="2.465"/><circle cx="24.501" cy="13.791" r="1.232"/><path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05C6.902,18.996,5.537,18.988,4.694,19.84z"/><circle cx="21.364" cy="6.218" r="0.924"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
             :  
            items?.map((el, i) => 
            <li className="max-680:text-sm px-8 py-4 flex flex-row mb-6 h-24 items-center justify-between min-w-full drop-shadow-2xl bg-[#2d2d3a]" key={i}>
                <div className="Description flex flex-col">
                    <Link to={el?.id.toString()}>
                        <h2 className="font-bold">{el?.title}</h2>
                    </Link>
                    <div className="Props flex flex-row">
                        <span className="text-gray-400 mr-6">by {el?.by}</span>
                        <span className="flex flex-row">
                            {unixToDate(el?.time)}</span>
                    </div>
                </div>
                <div className="Score h-16 max-w-12 w-20 justify-around text rounded-2xl flex flex-col items-center bg-[#2f3743] drop-shadow-xl">
                    <svg className="w-6 h-6 bg-inherit" fill="white" width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-q</title><path d="M464,464H48a16,16,0,0,1-14.07-23.62l208-384a16,16,0,0,1,28.14,0l208,384A16,16,0,0,1,464,464Z"/></svg>
                    {el?.score}
                </div>
            </li>)}
        </ul>
        </>
    )
}