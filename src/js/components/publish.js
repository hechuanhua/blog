
import React,{Component} from "react"
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

export class PublishComponent extends Component{
  constructor(props) {
    super(props)
    this.title
    this.neirong
    this.file
    this.form
  }
  handleSubmit(){
      //let data="title="+this.title.value+"&neirong="+this.neirong.value+"&upload="+this.file.value
      let _alert=this.props.actions._alert,
      titleValue=this.title.value.trim(),
      neirongValue=this.neirong.value.trim()
      if(titleValue.length<5){
        _alert("标题最少5个字")
        return
      }
      if(neirongValue.length<20){
        _alert("内容最少20个字")
        return
      }
      if(this.file.value){
        if(this.file.files[0].type.indexOf("image")==-1){
          _alert("只能上传图片")
          return 
        }
        if(this.file.files[0].size>50*1024){
          _alert("图片大小不能超过50KB")
          return 
        }
      }
      let data=new FormData(this.form);
      this.props.actions.publishSubmit(data)
  }
  render(){
    let data=this.props.news;
    return <form className="publish" ref={el=>{this.form=el}} >
    <div className="publishItem">
      <div className="name">文章标题：</div>
      <div className="inputDiv">
        <input type="text" className="title" ref={el=>{this.title=el}} name="title" placeholder="请输入文章标题" placeholder="最少5个字"/>
      </div>
    </div>
    <div className="publishItem">
      <div className="name">文章内容：</div>
      <div className="inputDiv">
        <textarea placeholder="请输入文章内容" ref={el=>{this.neirong=el}} rows="10" name="neirong"  placeholder="最少20个字"></textarea>
      </div>
    </div>
    <div className="publishItem">
      <div className="name">上传封面：</div>
      <div className="inputDiv">
        <input type="file" name="upload" ref={el=>{this.file=el}}  accept="*.jpg"/>
      </div>
    </div>
    <input type="button" className="btn publishBtn" value="发布文章" onClick={()=>{this.handleSubmit()}} />
    </form>
  }
}

const mapStateToProps=(state)=>{
    return {publish:state.container}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
const Publish= connect(
    mapStateToProps,//只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并,如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用
    mapDispatchToProps//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
    )(PublishComponent)
module.exports = Publish
