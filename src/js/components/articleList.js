import React, { Component } from "react"
import { render } from 'react-dom'
import * as actions from '../actions/index'
import { Link, IndexLink } from 'react-router'
import {hashHistory } from 'react-router'

const ArticleItem = ({ data }) => {
    return <li > < a href = { "/#" + data.name + "/" + data.time.day + "/" + data.title } >
            < div className = "title" > { data.title } < /div> 
            < div className = "describe" > { data.neirong ? data.neirong.substr(0, 50) : "" }... < /div > 
            < div className = "info" > 作者： { data.name } 阅读量： { data.pv } 发布时间： { data.time.minute } < /div> 
        < /a > < /li>
}
export class PageLi extends Component {
    constructor(props) {
        super(props)
        this._alert=this.props.actions._alert
    }
    swtichPage(i,type) {
        //this.props.query.page=i;
        if (this.props.type == "index") {
            this.props.ajaxData(this.props.type, i)
                this.input.value = ""
                hashHistory.push({
                    pathname: '/',
                    query: {page:i}
                })
            
        } else if (this.props.type == "search") {
            this.props.ajaxData(this.props.query.keyword, i)
            console.log(i,this.props.query.keyword)
            this.input.value = ""
            hashHistory.push({
                pathname: 'search',
                query: {page:i,keyword: this.props.query.keyword}
            })
        }
    }
    render() {
        let pageTmp = [],
            pageList = this.props.pageList,
            len = pageList && Math.ceil(pageList.count / pageList.limitNum), //页码最大条数
            pageCurrent = this.props.query.page, //当前处于第几页
            maxPage = 6,//页码最多展示几页
            edgePage = maxPage%2?Math.floor(maxPage/2):maxPage/2
        if (pageCurrent <= maxPage - edgePage) {
            if (len <= maxPage) {
                for (let i = 1; i <= len; i++) {
                    pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                        <a className={pageCurrent==i?"active":""}>{i}</a>
                        </li > )
                }
            } else {
                for (let i = 1; i <= maxPage; i++) {
                    pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                        <a className={pageCurrent==i?"active":""}>{i}</a>
                        </li > )
                }
            }
        } else if (pageCurrent > len) {
            console.error("页码错误")
        } else if (pageCurrent >= len - edgePage) {
            if (len <= maxPage-1) {
                for (let i = 1; i <= pageCurrent; i++) {
                    pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                        <a className={pageCurrent==i?"active":""}>{i}</a>
                        </li > )
                }
            } else {
                for (let i = len - ( maxPage - 1 ); i <= len; i++) {
                    pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                        <a className={pageCurrent==i?"active":""}>{i}</a>
                        </li > )
                }
            }
        } else {
            for (let i = pageCurrent - edgePage; i <= (Number(pageCurrent) + edgePage); i++) {
                pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                    <a className={pageCurrent==i?"active":""}>{i}</a>
                    </li > )
            }
        }
        return <div className = "pageListBox" >
            <ul className = "pageList" > 
            <li onClick = {() => { if(pageCurrent<=1){this._alert("已经是第一页了");return}; this.swtichPage(Number(pageCurrent)-1) } } > 
            <a className="pageBtn"> 上一页 </a>
            </li>
             { pageTmp } 
            <li onClick = {() => { if(pageCurrent>=len){this._alert("已经是最后一页了");return}; this.swtichPage(Number(pageCurrent)+1) } } > 
                <a className="pageBtn"> 下一页 </a>
            </li>
            <li><input type="text" ref={el=>{this.input=el}} /></li>
            <li onClick = {() => {
                if(this.input.value<=0){
                    this._alert("你输入的页码不正确，请重新输入")
                    return
                };
                if(this.input.value>len){
                    this._alert("你输入的页码超过最大页数，请重新输入")
                    return
                }
                this.swtichPage(Number(this.input.value),"jump") 
            } } > 
            <a className="pageBtn pageJumpBtn"> 跳转 </a> </li>
            </ul> </div >

    }
}
 
export class ArticleList extends Component{
    componentWillMount(){
        if (this.props.type == "index") {
            if(!this.props.query.page){this.props.query.page = 1}
            this.props.ajaxData(this.props.type, this.props.query.page)
        } else if (this.props.type == "search") {
            if(!this.props.query.keyword.trim()){return false}
            if(!this.props.query.page){this.props.query.page = 1}
            this.props.ajaxData(this.props.query.keyword,this.props.query.page )
        }
    }
    render(){
        let articleTmp = [],
            articleList=this.props.articleList
        if (articleList) {
            let data = articleList
            for (let i = 0; i < data.length; i++) {
                articleTmp.push( < ArticleItem key = { i } data = { data[i] } />)
            }
        } 
        return <div > < ul className = "articleList" > { articleTmp.length ? articleTmp : "无搜索结果" } < /ul></div >
    }
}

