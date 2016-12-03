
import React,{Component} from "react"
import { render } from 'react-dom'
import * as actions from '../actions/index'
import { Link,IndexLink } from 'react-router'

const ArticleItem=({data})=>{
  return <li><a href={"/#"+data.name+"/"+data.time.day+"/"+data.title}>
          <div className="title" >{data.title}</div>
          <div className="describe">{data.neirong?data.neirong.substr(0,50):""}...</div>
          <div className="info">作者：{data.name} 阅读量：{data.pv} 发布时间：{data.time.minute}</div>
          </a>
        </li>
}
export class PageLi extends Component{
  swtichPage(){
    let type=this.props.type
    if(type=="index"){
      this.props.ajaxData(type,this.props.currenNum)
    }else if(type=="search"){
      this.props.ajaxData(this.props.keyword,this.props.currenNum)
    }
  }
  render(){
    let pageList=this.props.pageList,
        pageTmp=[];
    let pageNum=pageList&&Math.ceil(pageList.count/pageList.limitNum)//页码最大条数
    let currenNum=this.props.current
    let type=this.props.type,pathname="",query={},keyword=this.props.keyword
    if(pageNum>1){
        for(let i=1;i<=pageNum;i++){
          pageTmp.push(<li key={i} onClick={()=>{this.swtichPage()}}><Link to={{ pathname: pathname, query: query }} activeClassName="active" >{i}</Link></li>)
        }
    }
    if(type=="index"){pathname="/",query={ page: currenNum }}
    if(type=="search"){pathname="search",query={ page: currenNum,keyword:keyword }}
    return <div className="pageListBox">
          <ul className="pageList">
           {pageTmp}
           </ul>
          </div>
  }
}

export const ArticleList=({articleList,articleAction,type,keyword})=>{
    let articleTmp=[],pageTmp=[],pageNum=0;
    if(articleList&&articleList.length){
      let data=articleList
      //page=articleList["page"]
      //pageNum=Math.ceil(page.count/page.limitNum)//页码最大条数
      for(let i=0;i<data.length;i++){
        articleTmp.push(<ArticleItem key={i} data={data[i]}/>)
      }
      // if(pageNum>1){
      //   for(let i=1;i<=pageNum;i++){
      //     pageTmp.push(<PageLi key={i} currenNum={i} ajaxData={articleAction} type={type} keyword={keyword}/>)
      //   }
      // }
    }
  return <div><ul className="articleList">{articleTmp.length?articleTmp:"无搜索结果"}</ul></div>
}

// export default 
