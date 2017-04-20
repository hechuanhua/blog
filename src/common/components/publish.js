
import React,{Component} from "react"
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

var marked = require('marked')
var hljs = require('highlight.js')
var renderer = new marked.Renderer()


if(typeof window != 'undefined'){
    console.log(window)
    window.onload=function(){
        hljs.initHighlightingOnLoad()
    }
}

renderer.code = function(code, lang) {
    var language = lang && (' language-' + lang) || ''
    return '<pre class="prettyprint' + language + '">'
    + '<code class="hljs javascript">' + hljs.highlightAuto(code).value; + '</code>'
    + '</pre>'
}

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    }
})

export class PublishComponent extends Component{
    constructor(props) {
        super(props)
        this.title
        this.content
        this.file
        this.form
        this.category
        this.message1Value = '' 
        this.state = { message1Value: '' }
    }

    handleSubmit(){
        //let data="title="+this.title.value+"&content="+this.content.value+"&upload="+this.file.value
        let _alert=this.props.actions._alert,
        titleValue=this.title.value.trim(),
        contentValue=this.content.value.trim()
        if(titleValue.length<5){
            _alert("标题最少5个字")
            return
        }
        if(contentValue.length<20){
            _alert("内容最少20个字")
            return
        }
        if(this.file.value){
            if(this.file.files[0].type.indexOf("image")==-1){
              _alert("只能上传图片")
              return 
          }
          if(this.file.files[0].size>100*1024){
              _alert("图片大小不能超过100KB")
              return 
          }
      }
      let data=new FormData(this.form);
      this.props.actions.publishSubmit(data)
    }
    textareaChange(e){
        this.setState({
            message1Value : marked(e.target.value)
        })
    }
    deyDowntab(event){
        if (event.keyCode == 9) {
            event.preventDefault();
            var indent = '    ';
            var start = this.content.selectionStart;
            var end = this.content.selectionEnd;
            var selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, '\n' + indent);
            this.content.value = this.content.value.substring(0, start) + selected
                    + this.content.value.substring(end);
            this.content.setSelectionRange(start + indent.length, start
                    + selected.length);
        }
    }
    render(){
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
                    <textarea placeholder="请输入文章内容" ref={el=>{this.content=el}} rows="10" name="content"  placeholder="最少20个字,支持markdown写法" onChange={(event)=>{this.textareaChange(event)}} onKeyDown={(event)=>{this.deyDowntab(event)}}></textarea>
                </div>
            </div>
            <div className="publishItem">
                <div className="name">预览区：</div>
                <div className="inputDiv" dangerouslySetInnerHTML={{__html:this.state.message1Value}} style={{height:'100px'}}></div>
            </div>
            <div className="publishItem">
                <div className="name">上传封面：</div>
                <div className="inputDiv">
                    <input type="file" name="upload" ref={el=>{this.file=el}}  accept="*.jpg"/>
                </div>
            </div>
            <div className="publishItem">
                <div className="name">文章分类：</div>
                <div className="inputDiv">
                    <select name="category" ref={el=>{this.category=el}}>
                        <option value="1">web开发</option>
                        <option value="2">node开发</option>
                    </select>
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
    mapStateToProps,
    mapDispatchToProps
)(PublishComponent)

module.exports = Publish
