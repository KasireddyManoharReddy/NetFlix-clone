import React, { useRef, useState } from 'react'
import Card from './Card'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import "./CardSlider.css";


export default React.memo(function CardSlider({ data, title }) {
  const [ShowControls, setShowControls] = useState(false);
  const listRef = useRef();
  const [SliderPosition, setSliderPosition] = useState(0);
  const handleDirection = (direction ) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && SliderPosition > 0)
    {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(SliderPosition - 1);
    }
    if (direction === "right" && SliderPosition < 4)
    {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(SliderPosition + 1);
      }
   };
  return (
    <div className="container flex column" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)} >
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!ShowControls?"none":""} flex j-center a-center`}>
            <AiOutlineLeft onClick={()=>handleDirection("left")}/>
        </div>
        <div className="flex slider" ref={listRef}>{
      data.map((movie, index) => {
        return <Card movieData ={movie} index ={index} key={movie.id} />
      })}
        </div>
         <div className={`slider-action right ${!ShowControls?"none":""} flex j-center a-center`}>
            <AiOutlineRight onClick={()=>handleDirection("right")}/>
        </div>
      </div>
      </div>
  )
})

