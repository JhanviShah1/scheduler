import React from "react";
import "components/DayListItem.scss";
//const classNames = require('classnames');
import classNames from "classnames";

export default function DayListItem(props) {
  //console.log('$$$$$$$$$$', props);
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  //console.log(props);
  //console.log('++++++',dayClass);
  const formatSpots = ()=>{
    if(props.spots === 0){
      return "no spots remaining";
    }else if(props.spots === 1){
    return "1 spot remaining";
    }else{
      return `${props.spots} spots remaining`
    }
  }

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular"> {props.name}</h2>
      <h2 className="text--light">{formatSpots(props.spots)}</h2>
    </li>
  );
}
