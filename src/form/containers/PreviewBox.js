import React from "react"
import {PreviewText}        from "../components/LiText.js"
import {PreviewTextarea}    from "../components/LiTextarea.js"
import {PreviewRadio}       from "../components/LiRadio.js"
import {PreviewCheckbox}    from "../components/LiCheckbox.js"
import {PreviewSelect}      from "../components/LiSelect.js"
import {PreviewNumber}      from "../components/LiNumber.js"
import {PreviewEmail}       from "../components/LiEmail.js"
import {PreviewIphone}      from "../components/LiIphone.js"
import {PreviewPosition}    from "../components/LiPosition.js"
import {PreviewTime}        from "../components/LiTime.js"
import {PreviewWx}          from "../components/LiWx.js"
import {PreviewMobile}      from "../components/LiMobile.js"
import {PreviewCity}        from "../components/LiCity.js"
import {PreviewFenjie}      from "../components/LiFenjie.js"
import {PreviewFujian}      from "../components/LiFujian.js"
import {PreviewJss}         from "../components/LiJss.js"
import {PreviewPic}         from "../components/LiPic.js"
import {PreviewPingfen}     from "../components/LiPingfen.js"
import {PreviewPs}          from "../components/LiPs.js"
const PreviewBox=({data,actions})=>{
    return (
        <div className="previewBox">
            {data.map(el=>{
                switch(el.type){
                    case "text":
                        return <PreviewText key={el.id} data={el} actions={actions} />
                    case "textarea":
                        return <PreviewTextarea  key={el.id} data={el} actions={actions} />
                    case "radio":
                        return <PreviewRadio  key={el.id} data={el} actions={actions} />
                    case "checkbox":
                        return <PreviewCheckbox  key={el.id} data={el} actions={actions} />
                    case "select":
                        return <PreviewSelect  key={el.id} data={el} actions={actions} />
                    case "number":
                        return <PreviewNumber  key={el.id} data={el} actions={actions} />
                    case "iphone":
                        return <PreviewIphone  key={el.id} data={el} actions={actions} />
                    case "position":
                        return <PreviewPosition  key={el.id} data={el} actions={actions} />
                    case "email":
                        return <PreviewEmail  key={el.id} data={el} actions={actions} />
                    case "time":
                        return <PreviewTime  key={el.id} data={el} actions={actions} />
                    case "wx":
                        return <PreviewWx  key={el.id} data={el} actions={actions} />
                    case "mobile":
                        return <PreviewMobile  key={el.id} data={el} actions={actions} />
                    case "city":
                        return <PreviewCity  key={el.id} data={el} actions={actions} />
                    case "fenjie":
                        return <PreviewFenjie key={el.id} data={el} actions={actions} />
                    case "fujian":
                        return <PreviewFujian key={el.id} data={el} actions={actions} />
                    case "jss":
                        return <PreviewJss  key={el.id} data={el} actions={actions} />
                    case "pic":
                        return <PreviewPic  key={el.id} data={el} actions={actions} />
                    case "pingfen":
                        return <PreviewPingfen  key={el.id} data={el} actions={actions} />
                    case "ps":
                        return <PreviewPs  key={el.id} data={el} actions={actions} />
                    default: 
                        return 
                }
            })}
        </div>
    )
}
export const updateTop=()=>{
      var $allDiv=document.querySelectorAll('.previewItem')
      var $currentDiv=document.querySelector('.previewItem.active')
      var h=document.body.scrollTop||document.documentElement.scrollTop
      var top=$currentDiv.getBoundingClientRect().top-170+h+parseInt(getComputedStyle($currentDiv).height)/2-49;
      if([].indexOf.call($allDiv,$currentDiv)==0){top=0}
      document.querySelector('.sfForm_editBox').style.cssText="top:"+top+"px"
}

export default PreviewBox