import React,{Component} from "react"
import render from "react-dom"
import {updateTop} from "../containers/PreviewBox.js"
export const LiPingfen=({onclick})=>{
    return( 
      <li onClick={()=>{onclick("PINGFEN")}}><i className="iconfont icon-xingxing"></i>评分</li>
    )
}
export const Pingfenitem=({type})=>{
  if(type=="xingxing"){
    return <i className='iconfont icon-xingxing'></i>
  }else{
    return <i className='iconfont icon-aixin'></i>
  }
}
export const PreviewPingfen=({data,actions})=>{
    var tmp=[];
    for(var i=0;i<data.manfen;i++){
      tmp.push(<Pingfenitem key={i} type={data.curren} />)
    }
    return <div className={data.active?"previewItem active":"previewItem"} onClick={()=>{actions.clickPreviewLi(data.id)}}>
              <div className="title">{data.title}<span className="red ml5">{data.required?"*":""}</span></div>
              <div className="readOnly">
                {tmp}
              </div>
              <div className="sort-handlerBox"><i className="icon sort-handler"></i> </div> 
              <div className="cz">
                   <i className="fa fa-plus-circle addBtn" title="复制" onClick={(e)=>{e.stopPropagation();actions.oncopy(data.id)}}></i>
                   <i className="fa fa-minus-circle delBtn" title="删除" onClick={(e)=>{e.stopPropagation();actions.ondelete(data.id)}}></i>
              </div>
           </div>
}
export class EditPingfen extends Component{
    constructor(props, data) {
        super(props, data)
    }
    componentDidMount(){
        updateTop()
    }
    componentDidUpdate(){
        updateTop()
    }
    render(){
    let data=this.props.data;
    let actions=this.props.actions;
    let title,defaultinput,tis,minValue,maxValue,required,readonly,manfen
    return <div className="fieldEdit textFieldEdit">
             <div className="title"><i className="fa fa-edit"></i>评分</div>
             <div className="edit_item">   
                 <div className="tit">标题</div>   
                 <div className="write"> 
                      <input type="text" className="sf-tit-value" ref={el=>{title=el}} name="tit_value" value={data.title} onChange={()=>{actions.changeValue("title",title.value,data.id)}} placeholder="未命名"/>
                 </div>
             </div>
             <div className="edit_item">   
                 <div className="tit">满分</div>   
                 <div className="write"> 
                   <select value={data.manfen} ref={el=>{manfen=el}} onChange={()=>{actions.changeValue("manfen",manfen.value,data.id)}}>
                     <option value="3">3</option>
                     <option value="5">5</option>
                     <option value="10">10</option>
                   </select>
                 </div>
             </div>
             <div className="edit_item">   
                 <div className="tit">外观</div>   
                 <div className="write"> 
                 <div className="pingfen">
                   <i className={data.curren=="xingxing"?"iconfont icon-xingxing active":"iconfont icon-xingxing"} onClick={()=>{actions.changeValue("pingfenType","xingxing",data.id)}}></i>
                   <i className={data.curren=="aixin"?"iconfont icon-aixin active":"iconfont icon-aixin"} onClick={()=>{actions.changeValue("pingfenType","aixin",data.id)}}></i>
                 </div>
                 </div>
             </div>
             <div className="edit_item">   
               <div className="tit">校验</div>   
               <div className="write">     
                   <ul>     
                       <li className=""><label className="checkbox"><input type="checkbox" ref={el=>{required=el}} 
                       onChange={()=>{actions.changeValue("required",required.checked,data.id)}} checked={data.required}/>必须填</label></li>       
                   </ul>   
               </div>
            </div>
        </div>
    }
}