
import React,{Component} from "react"
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

class NoLoginTop extends Component{
  render(){
    let props=this.props
    return <div className="welcome content">
              <span style={{float:"left",color:"red"}}>登录即可发布文章</span>
              欢迎您访问我的个人网站  请
              <a href="javascript:;" onClick={(e)=>{this.props.actions.mobBoxData("loginShow")}}>登录</a>或
              <a href="javascript:;" onClick={(e)=>{this.props.actions.mobBoxData("regShow")}}>注册</a>
          </div>
  }
}
const mapStateToProps=(state)=>{
    return {nav:state.nav}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(NoLoginTop)

