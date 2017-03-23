
import React,{Component} from "react"
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

export class Reg extends Component{
  constructor(props) {
    super(props)
    this.userName
    this.password
    this.repassword
  }
  submitReg(){
    let _alert=this.props.actions._alert
    if(this.userName.value.length<2){
      _alert("用户名长度为2-10位数")
      return
    }
    if((/\s/ig).test(this.userName.value)){
      _alert("用户名不能有空格")
      return
    }
    if(this.password.value.length<6){
      _alert("密码长度为6-16位数")
      return
    }
    if((/\s/ig).test(this.password.value)){
      _alert("密码不能有空格")
      return
    }
    if(this.password.value!==this.repassword.value){
      _alert("两次输入的密码不一致")
      return
    }
    let data="userName="+this.userName.value+"&password="+this.password.value;
    this.props.actions.loginSubmit("regSubmit",data)
  }
  render(){
    return <form className="innerMobBox reg" onClick={(e)=>{e.stopPropagation()}}>
                <i className="close" onClick={()=>{this.props.actions.mobBoxData("mobBoxClose")}}>x</i>
                <div className="title">欢迎注册</div>
                <div className="item">
                  <div className="name">用户名：</div>
                  <div className="inputDiv">
                    <input type="text" name="userName" ref={el=>{this.userName=el}} maxLength="10" placeholder="长度为2-10"/>
                  </div>
                </div>
                <div className="item">
                  <div className="name">密码：</div>
                  <div className="inputDiv">
                    <input type="password" name="password" ref={el=>{this.password=el}} maxLength="16"  placeholder="长度为6-16"/>
                  </div>
                </div>
                <div className="item">
                  <div className="name">确认密码：</div>
                  <div className="inputDiv">
                    <input type="password" name="password" maxLength="16" ref={el=>{this.repassword=el}}  placeholder="长度为6-16"/>
                  </div>
                </div>
                <div className="btn" onClick={()=>{this.submitReg()}}>注册</div>
          </form>
  }
}

const mapStateToProps=(state)=>{
    return {reg:state.reg}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Reg)

