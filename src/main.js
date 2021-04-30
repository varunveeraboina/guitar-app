import reactDom from "react-dom";
import {useState,useEffect, useRef} from "react";
import react, {Component} from "react";
import "./main.css";
function main(){

    function Submain(){
        
        let [currState,setcurrState] = useState("pre-loading");
        let [numStrings,setnumStrings] = useState(0);
        let [timePerRound,settimePerRounf] = useState(0);
        let [counter,setCounter] = useState(4);
        let [seq,setSeq] = useState("");
        var rep = useRef(10);
        const one1 = useRef();
        const two1 = useRef();

        function handleSubmit(){


            if(one1.current.value===""||two1.current.value==="")
            return;

            let one = parseInt(one1.current.value,10);
            let two = parseInt(two1.current.value,10);
            setnumStrings(one);
            settimePerRounf(two);
            setcurrState("loading");



        }

        function handleExit(){

            setcurrState("exit");
            return;

        }
        function handleRestart(){
            setcurrState("pre-loading");
            rep=10;
            setCounter(4);
        }

        function createSeq(){

            let nextString = "";
            let temp;
            let tempNum;
            // console.log(numStrings);
            for(let i=0;i<numStrings;i++)
            {
                 temp = Math.random();
                // console.log(temp);
                
                temp*=6;
                tempNum = Math.floor(temp);
                // console.log(tempNum);
                if(tempNum === 0 )
                {
                    nextString+="E1 ";
                }
                else if(tempNum ===1 )
                {
                    nextString+="A ";
                }
                else if(tempNum ===2 )
                {
                    nextString+="D ";
                }
                else if(tempNum === 3)
                {
                    nextString+="G ";
                }
                else if(tempNum === 4)
                {
                    nextString+="B ";
                }
                else if(tempNum === 5)
                {
                    nextString+="E2 ";
                }

            }
            
            setSeq(nextString);
            console.log(seq);
        }

        function pause(milliseconds) {
            var dt = new Date();
            while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
        }
        useEffect(()=>{

            console.log(currState);
            if(currState==="loading")
            {   
                setTimeout(()=>{
                    if(counter>1)
                    setCounter(counter-1);
                    else
                    {
                        setcurrState("post-loading");
                        createSeq();
                    }

                },1000);
                return ;
                
            }
            else if(currState==="post-loading")
            {   
                console.log(rep.current);
                if(rep.current>0){

                    // setTimeout(()=>{
                    //     createSeq();
                    // }, timePerRound*1000);
                    pause(timePerRound*1000);
                    createSeq();
                    
                }    
                rep.current--;
            }

            


        });

        if(currState==="pre-loading")
        {
            return (
                <div>
                    <input ref={one1} placeholder="Enter length of strings per round"/>
                    <input ref={two1} placeholder="Time per each round"/>
                    <button onClick={handleSubmit} >GOOOO!</button>        
                </div>
                
            );
        }
        else if(currState==="loading")
        {
            return(
            <h1 className="timer">{counter-1}</h1>
            );
        }
        else if(currState==="post-loading"){

            return(
            <div>    
                <h1>{seq}</h1>
                <button onClick={handleExit}>DONE!</button>
            </div>
            );
        }
        else
        {
            return(
                <div>
                <p> YOU HAVE DONE WELLL!!!!</p>
                <button onClick={handleRestart}>
                    Restart
                </button>
                </div>
            );
        }
       


    }

    let content = Submain();

    return (

        <div className="wrapper">

            {content}

        </div>

    );
}    

export default main;