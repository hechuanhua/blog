import React, { Component } from "react"
import { render } from 'react-dom'
import * as actions from '../actions/index'
import { Link, IndexLink } from 'react-router'

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
        this.type = this.props.type
        this.keyword = this.props.keyword
    }
    swtichPage(i) {
        if (this.type == "index") {
            this.props.ajaxData(this.type, i)
        } else if (this.type == "search") {
            this.props.ajaxData(this.keyword, i)
        }
    }
    render() {
        let pageTmp = [],
            pageList = this.props.pageList,
            pageNum = pageList && Math.ceil(pageList.count / pageList.limitNum) //页码最大条数
        if (this.type == "index") {
            if (pageNum > 1) {
                for (let i = 1; i <= pageNum; i++) {
                    pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                        < Link to = {{ pathname: "/", query: { page : i} }} activeClassName = "active" > { i } < /Link>
                        </li > )
                }
            }

        }
        if (this.type == "search") { 
            if(pageNum>1){
                for (let i = 1; i <= pageNum; i++) {
                    pageTmp.push( < li key = { i } onClick = {() => { this.swtichPage(i) } } > 
                        < Link to = {{ pathname: "search", query: { page: i, keyword: this.keyword } }} activeClassName = "active" > { i } < /Link>
                        </li > )
                }
            }
        }
        return <div className = "pageListBox" >
            < ul className = "pageList" > { pageTmp } < /ul> < /div >
    }
}
 
export const ArticleList = ({ articleList }) => {
    let articleTmp = []
    if (articleList && articleList.length) {
        let data = articleList
        for (let i = 0; i < data.length; i++) {
            articleTmp.push( < ArticleItem key = { i } data = { data[i] } />)
        }
    } 
    return <div > < ul className = "articleList" > { articleTmp.length ? articleTmp : "无搜索结果" } < /ul></div >
}

