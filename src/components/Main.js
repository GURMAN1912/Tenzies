import Block from './Block'
import React from 'react'
import { nanoid } from 'nanoid'
// import Confetti from "react-confetti"

export default function Main() {
  const [dice,setDice]=React.useState(allnewDice())
  const[tenzies,setTenzies]=React.useState(false)
  React.useEffect(()=>{
    const allHeld=dice.every(die=>die.isHeld)
    const firstvalue=dice[0].value
    const allsameValue=dice.every(die=>die.value===firstvalue)
    if(allHeld && allsameValue){
      setTenzies(true)
      console.log("you won! ")
    }
  },[dice])
  function genrateNew() {
   return{
     value: Math.ceil(Math.random()*6),
     isHeld:false,
     id:nanoid()
   }
  }
  function allnewDice()
  {
    const newdice=[];
    for(let i=0;i<10;i++){
      newdice.push(genrateNew())
    }
    return (newdice);
  }
  function heldDice()
  {
    if(!tenzies){
      setDice(oldDie=>oldDie.map(die=>{
        return die.isHeld?
        die: 
        (genrateNew())
      }))
    }
    else{
      setTenzies(false)
      setDice(allnewDice())
    }
  }
  function handleClick(id)
  {
    setDice(oldDie=>oldDie.map(die =>{
      return die.id===id?{...die,isHeld:!die.isHeld} :
      die
    }))
  }
  const diceElement=dice.map(die => <Block key={die.id} value={die.value}id={die.id} handleClick={()=>handleClick(die.id)} isHeld={die.isHeld}></Block> )


  return (
    // {tenzies && <Confetti />}
    <div className='heading'>
        <div className="title">Tenzies</div>
        <div className="description">Roll until all dice are the same.
         Click each die to freeze it at its current value between rolls.</div>      
         <div className="blocks">
          {diceElement}
         </div>
         <button className='roll' onClick={ heldDice}>{tenzies ? "New Game":"Roll"}</button>
    </div>
  )
}
