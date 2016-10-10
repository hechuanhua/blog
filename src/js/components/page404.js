import React,{Component} from "react"
import { render } from 'react-dom'

 const Page404=()=>{
  return <div className="page404" style={{"textAlign": "center","marginTop": "50px","color": "#45a7ff"}}>
  <div style={{"fontSize": "130px"}}>404</div>
  <div style={{"fontSize": "30px"}}>页面找不到了</div>
  <a href="/" style={{    width: "100px",
    display: "block",
    margin: "0 auto",
    background: "#45a7ff",
    color: "#fff",
    marginTop: "30px",
    padding: "5px 0"}}>返回首页</a>
  </div>
}
module.exports=Page404