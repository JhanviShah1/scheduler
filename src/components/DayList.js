import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  //("=============", props);
  return(
    <ul>   
      {props.days.map(day=>
   
<DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value}//if selected={true}
        setDay={()=>props.onChange(day.name)}  
      />
      )};
    </ul>
  )
}