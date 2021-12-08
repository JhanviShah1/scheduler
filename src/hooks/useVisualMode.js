import { useState } from "react";
/* 
history -["EMPTY"] & mode = "EMPTY"
history -["EMPTY", "SHOW"] & mode = "SHOW"
history -["EMPTY", "SHOW", "SAVE"] & mode = "SAVING"
mode IS THE LAST ELEMENT OF THE history array
*/
export default function useVisualMode(initial) {
  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
   
    if(replace){
    setHistory(prev=>[...prev.slice(0,-1),newMode])
  }else{
    setHistory(prev=>[...prev,newMode])
  }
  }
  
  function back() {
    if(history.length<2){
      return
    }
    setHistory([...history.slice(0,history.length-1)])
    //setMode(history[history.length - 2])
  }

  return { mode:history[history.length -1], transition, back }; //It is like returning {value,onChange} {mode, transition,back};
}
