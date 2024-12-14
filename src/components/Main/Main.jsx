import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  return (
    // Main-Top section
    <div className='main'>
        <div className="nav">
            <p>Gemini 2.0</p>
            <img src={assets.user_icon} alt="" />
        </div>
        
        <div className="main-container">
            {!showResult?
            <>  <div className="greet">
            <p><span>Hello, Navneeth Dev</span></p>
            <p>How can i assist you today</p>
        </div>  <div className="cards">
                <div className="card">
                    <p>“We cannot solve problems with the kind of thinking we employed when we came up with them.” —Albert Einstein</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>“Learn as if you will live forever, live like you will die tomorrow.” —Mahatma Gandhi</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>“When you change your thoughts, remember to also change your world.” —Norman Vincent Peale</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div> </>

            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="resultData">
                    <img src={assets.gemini_icon} alt="" />
                    {loading?
                    <div className='loader'>
                        <hr />
                        <hr />
                        <hr />

                    </div> : <p dangerouslySetInnerHTML={{__html:resultData}} ></p>}
                   
                </div>
                
                </div>}
            
            


            {/* Main Bottom-section */}
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src= {assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}
                        
                    </div>
                </div>
                <p className="bottom-info">
                Gemini is a powerful language model, but it's not perfect. It can sometimes make mistakes, especially when dealing with complex or nuanced topics.
                </p>
            </div>
            
            </div> 
    </div>
  )
}

export default Main;
