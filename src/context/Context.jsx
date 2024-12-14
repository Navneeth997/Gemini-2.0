import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const[input,setInput]= useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[prevPrompts,setPrevPrompts]=useState([]);
    const[showResult,setShowResult]= useState(false);
    const[loading,setLoading]= useState(false);
    const[resultData,setresultData]= useState("");

    const delayPara = (index,nextWord)=>{
      setTimeout(function () {
        setresultData(prev=>prev+nextWord);
      }, 75*index);
    }
    
    const newChat =()=>{
      setLoading(false)
      setShowResult(false)
    }


  const onSent = async (prompt) => {
    setresultData("")
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(input)
    setPrevPrompts(prev=>[...prev,input])

    const response=await run(input);
    let responseArray=response.split("**");
    let newResponse="";
    let i;
    for( i=0;i<responseArray.length;i++)
   { 
    if (i ===0 ||i%2!==1) {
      newResponse+= responseArray[i]
      
    } else {
      newResponse +="<b>" + responseArray[i] + "</b>";
    }}

    let newResponse2=newResponse.split("*").join("</br>");

    let newResponeArray=newResponse2.split(" ");
    for(let i=0;i<newResponeArray.length;i++){
      const nextWord = newResponeArray[i];
      delayPara(i,nextWord+" ")
    }
    setLoading(false);
    setInput("")
  };

  

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
