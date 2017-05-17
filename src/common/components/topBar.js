
import React,{Component} from "react"
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

class TopBar extends Component{
  render(){
    if(this.props.userInfo.isLogin){
        return <div className="welcome content">{this.props.userInfo.info.name} 欢迎您的到来
              <a href="javascript:;" onClick={(e)=>{this.props.actions.loginSubmit("loginOut")}}>退出登录</a>
            </div>
    }else{
        return <div className="welcome content">
              <span style={{float:"left",color:"red"}}>登录即可发布文章</span>
              欢迎您访问  请
              <a href="javascript:;" onClick={(e)=>{this.props.actions.mobBoxData("loginShow")}}>登录</a>或
              <a href="javascript:;" onClick={(e)=>{this.props.actions.mobBoxData("regShow")}}>注册</a>
          </div>
    }
  }
}
const mapStateToProps=(state)=>{
    return {userInfo:state.userInfo}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(TopBar)

