import React            from "react"
import {EditText}       from "../components/LiText.js"
import {EditTextarea}   from "../components/LiTextarea.js"
import {EditRadio}      from "../components/LiRadio.js"
import {EditCheckbox}   from "../components/LiCheckbox.js"
import {EditSelect}     from "../components/LiSelect.js"
import {EditNumber}     from "../components/LiNumber.js"
import {EditEmail}      from "../components/LiEmail.js"
import {EditIphone}     from "../components/LiIphone.js"
import {EditPosition}   from "../components/LiPosition.js"
import {EditTime}       from "../components/LiTime.js"
import {EditWx}         from "../components/LiWx.js"
import {EditMobile}     from "../components/LiMobile.js"
import {EditCity}       from "../components/LiCity.js"
import {EditFenjie}     from "../components/LiFenjie.js"
import {EditFujian}     from "../components/LiFujian.js"
import {EditJss}        from "../components/LiJss.js"
import {EditPic}        from "../components/LiPic.js"
import {EditPingfen}    from "../components/LiPingfen.js"
import {EditPs}         from "../components/LiPs.js"
const EditBox=({data,actions,modalBoxIsNone})=>{
    var tmp=null;
    var active=data.filter(el=>
            el.active
        )
    if(active.length){
        active=active[0]
        switch(active.type){
            case "text":         tmp=<EditText data={active} actions={actions}/>;break
            case "textarea":     tmp=<EditTextarea data={active} actions={actions}/>;break
            case "radio":        tmp=<EditRadio data={active} actions={actions}  modalBoxIsNone={modalBoxIsNone}/>;break
            case "checkbox":     tmp=<EditCheckbox data={active} actions={actions} modalBoxIsNone={modalBoxIsNone}/>;break
            case "select":       tmp=<EditSelect data={active} actions={actions} modalBoxIsNone={modalBoxIsNone}/>;break
            case "number":       tmp=<EditNumber data={active} actions={actions}/>;break
            case "email":        tmp=<EditEmail data={active} actions={actions} />;break
            case "iphone":       tmp=<EditIphone data={active} actions={actions}/>;break
            case "position":     tmp=<EditPosition data={active} actions={actions}/>;break
            case "time":         tmp=<EditTime data={active} actions={actions}/>;break
            case "wx":           tmp=<EditWx data={active} actions={actions}/>;break
            case "mobile":       tmp=<EditMobile data={active} actions={actions}/>;break
            case "city":         tmp=<EditCity data={active} actions={actions}/>;break
            case "fenjie":       tmp=<EditFenjie data={active} actions={actions}/>;break
            case "fujian":       tmp=<EditFujian data={active} actions={actions}/>;break
            case "jss":          tmp=<EditJss data={active} actions={actions}/>;break
            case "pic":          tmp=<EditPic data={active} actions={actions}/>;break
            case "pingfen":      tmp=<EditPingfen data={active} actions={actions}/>;break
            case "ps":           tmp=<EditPs data={active} actions={actions}/>;break
            default:break
        }
    }
    return ( <div>
                { tmp}
            </div>
    )
}
export default EditBox