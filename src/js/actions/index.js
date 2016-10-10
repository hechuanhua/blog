import 'isomorphic-fetch';
import Promise from 'es6-promise'
import {hashHistory } from 'react-router'
export const requestAPI="http://localhost:8080/"

export const SwitchTab=(type,data)=>{
    return {
          type:"containers",
          data
    }
   /* switch(type){
      case "search":
        return {
          type:"search",
          data
        }
      default :
        return {
          type:"containers",
          data
        }
    }*/  
}
/*登录注册框
@type 判断类型
*/
export const mobBoxData=(type,data)=>{
    switch(type){
      case "loginShow":
        return {
            type:"loginShow",
            isShow:type
        }
      case "regShow":
        return {
            type:"regShow",
            isShow:type
        }
      case "mobBoxClose":
        return {
            type:"mobBoxClose",
            isShow:false
        }
      case "loginSubmit":
        return {
            type:"loginSubmit",
            data
        }
      case "regSubmit":
        return {
            type:"regSubmit",
            data
        }
    }
}
const submitCallback=(dispatch,params,type,data)=>{
    fetch(requestAPI+params, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data
    }).then(function(res) {
      return res.json()
    }).then(function(data){
      console.log(data)
      return dispatch(mobBoxData(type,data))
    }).then(function(req){
      let data=req.data
      if(data.code===1000){
        /*登录成功*/
         dispatch(mobBoxData("mobBoxClose"))
         if(type=="loginSubmit"){
            return dispatch(loginTop("loginIn",data))
         }
         if(type=="regSubmit"){
            return _alertStore(dispatch,data.messgage)
         }
      }else{
          return _alertStore(dispatch,data.messgage)
      }
    })
    .catch(function(e) {
      console.error(e)
      /*if(type=="loginSubmit"){
        console.log("登录错误");
      }else{
        console.log("注册错误");
      }*/
    });
}
const loginOutSubmit=(dispatch)=>{
    fetch(requestAPI+"loginOut", {
      credentials: 'include'
    }).then(function(res){
      return res.json()
    }).then(function(data){
      console.log(data)
      dispatch(loginTop("loginOut"))
     return _alertStore(dispatch,"退出成功",function(){
        hashHistory.push('/')
      })
    }).catch(function(e){
      console.error(e)
    })
}
/*登录注册
@type 注册or登录or退出登录
@data 注册数据or登录数据
*/
export const loginSubmit=(type,data)=>{
  return (dispatch,getState)=>{
    switch(type){
      case "loginSubmit":return submitCallback(dispatch,"login",type,data)
      case "regSubmit":return submitCallback(dispatch,"reg",type,data)
      case "loginOut":return loginOutSubmit(dispatch)
      default:return
    }
    
  }
}
/*搜索文章请求
@keyword 搜索关键字
@params 如果有代表页码切换
*/
export const searchSubmit=(keyword,params)=>{
  return(dispatch,getState)=>{
    var name=keyword
    if(params){//页码查询
      name=keyword+"&page="+params
    }
    fetch(requestAPI+"search?keyword="+name,{
        credentials: 'include'
        })
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log(data);
          return dispatch(SwitchTab("search",data))
        }).catch(function(e) {
          console.error(e);
        });
  }
}
/*留言
@data 留言提交的数据
@params 提交的URL路由
*/
export const commentsSubmit=(data,params)=>{
  return(dispatch)=>{
      fetch(requestAPI+"a/"+params.name+"/"+params.date+"/"+params.title,
        { method:"POST",
          headers:{"Content-Type": "application/x-www-form-urlencoded"},
          credentials: 'include',
          body:data
        })
      .then(function(response){
       return response.json()
      })
      .then(function(data){
        console.log(data)
        if(data.code===1000){
         return _alertStore(dispatch,"留言成功",function(){
            hashHistory.goBack()
          })
        }else{
          return _alertStore(dispatch,"留言失败",function(){
            hashHistory.goBack()
          })
        }
      })
      .catch(function(e) {
          console.error(e);
      });
  }
}
/*文章请求
@type 列表or文章详情
@params 如果有代表文章页码切换
*/
export const ajaxData=(type,params)=>{
    return (dispatch,getState)=>{
      var name=""
      switch(type){
        case "index":if(params){name="newsList?page="+params}else{name="newsList"};break;
        case "details":name="a/"+params.name+"/"+params.date+"/"+params.title;break;
        case "about":name="about";break;
        default:return{};
      }
      fetch(requestAPI+name,{
        credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(SwitchTab(type,data))
        })
        .catch(function(e) {
            console.error(e);
        });

    }
}
/*发布作品请求
@data 发布作品的数据
*/
export const publishSubmit=(data)=>{
  return (dispatch,getState)=>{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", requestAPI+"publish", true);
    xmlHttp.withCredentials=true;
    xmlHttp.send(data);
    xmlHttp.onreadystatechange = function(oEvent) {
      if (xmlHttp.readyState==4){
        if(xmlHttp.status == 200) {
          //console.log("发送成功");
          let data=JSON.parse(xmlHttp.response)
          if(data.code===1000){
              _alertStore(dispatch,"发布成功",function(){
                hashHistory.push('/')
              })
            }else{
              _alertStore(dispatch,data.messgage)
            }
        }else {
          console.log("发送失败");
        }
      }
    };
    /*fetch发送FormData有问题，只能改成AJAX*/
    /*var myInit = { method: "POST",
           headers: {"Content-Type": "multipart/form-data"},
           mode: 'cors',
           cache: 'default',
          credentials: 'include',//可以带cookie
           body:data
         };
    fetch("http://localhost:3001/publish",myInit)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          console.log(data);
          if(data.code===1000){
            _alertStore(dispatch,"发布成功")
          }else{
            _alertStore(dispatch,data.messgage)
          }
      })
      .catch(function(e) {
          console.log("请求失败");
      });*/
  }
}
/*登录切换上面欢迎条
@type 登录or退出登录
*/
export const loginTop=(type,data)=>{
  switch(type){
    case "loginIn":
      return {
        type:"loginIn",
        data
      }
    case "loginOut":
      return {
        type:"loginOut"
      }
  }
}
const tipsBox=(messgage,type)=>{
   switch(type){
    case "showTips":
      return{
        type:"showTips",
        messgage
      }
    case "hideTips":
      return {
        type:"hideTips",
        messgage:""
      }
    default:
      return{
        type:"showTips",
        messgage
      }
  }

}
/*component里面执行的提示弹出框
@messgage 提示文字
*/
export const _alert=(messgage)=>{
  return(dispatch,getState)=>{
     dispatch(tipsBox(messgage,"showTips"))
     setTimeout(function(){
      dispatch(tipsBox(messgage,"hideTips"))
    }, 1000)
  }
}
/*Store里面执行的提示弹出框
@dispatch 默认
@messgage 提示文字
@fn 提示框消失的回调
*/
export const _alertStore=(dispatch,messgage,fn)=>{
     dispatch(tipsBox(messgage,"showTips"))
     setTimeout(function(){
      dispatch(tipsBox(messgage,"hideTips"))
      fn&&fn()
    }, 1000)
}

/*获取用户登录信息*/
export const getUserInfo=()=>{
  return (dispatch)=>{
      fetch(requestAPI+"getUserInfo",{
        credentials: 'include'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            if(data.code===1000){//已登录
              return dispatch(loginTop("loginIn",data))
            }
            if(data.code===1001){
              return dispatch(loginTop("loginOut",data))
            }
        })
        .catch(function(e) {
            console.error(e);
        });
  }
}
/*修改关于网站的信息
@data  关于网站的内容
*/
export const SaveAbout=(data)=>{
  return (dispatch)=>{
    fetch(requestAPI+"about",
    { method:"POST",
      headers:{"Content-Type": "application/x-www-form-urlencoded"},credentials:'include',
      body:"neirong="+data
    })
    .then(function(response){
     return response.json()
    })
    .then(function(data){
      console.log(data)
      if(data.code===1000){
        return _alertStore(dispatch,data.messgage)
      }else{
        return _alertStore(dispatch,data.messgage)
      }
    })
    .catch(function(e) {
        console.error(e);
    });
  }
}

/*ReactDiyForm
------------------
*/
let nextId=0;
export const clickLi=(type)=>{
    return {
        type:type,
    }
}
export const clickPreviewLi=(id)=>{
    return {
        type:"CLICK",
        id
    }
}
export const oncopy=(id)=>{
    return {
        type:"COPY",
        id
    }
}
export const ondelete=(id)=>{
    return {
        type:"DELETE",
        id
    }
}
export const batchEdit=(data)=>{
    return {
        type:"BATCHEDIT",
        data
    }
}
export const isNone=()=>{
    return {
        type:"ISNONE",
    }
}
export const submitDate=(value)=>{
    return {
        type:"SUBMITDATE",
        value
    }
}
export const changeValue=(type,value,id,index,inputType)=>{
    switch(type){
        case "title":
            return {type:"TITLE",title:value,id}
        case "default":
            return {type:"DEFAULT",default:value,id}
        case "tis":
            return {type:"TIS",tis:value,id}
        case "manfen":
            return {type:"MANFEN",manfen:value,id}
        case "pingfenType":
            return {type:"PINGFENTYPE",curren:value,id}
        case "minValue":
            return {type:"MINVALUE",minValue:value,id}
        case "maxValue":
            return {type:"MAXVALUE",maxValue:value,id}
        case "required":
            return {type:"REQUIRED",required:value,id}
        case "readonly":
            return {type:"READONLY",readonly:value,id}
        case "choicesChecked":
            return {type:"CHOICESCHECKED",choices:value,id,index,inputType}
        case "choicesInput":
            return {type:"CHOICESINPUT",choices:value,id,index}
        case "addItem":
            return {type:"ADDITEM",choices:value,id,index}
        case "delItem":
            return {type:"DELITEM",choices:value,id,index}
    }
}

