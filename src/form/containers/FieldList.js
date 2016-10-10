import React from "react"
import {LiText}       from "../components/LiText.js"
import {LiTextarea}   from "../components/LiTextarea.js"
import {LiRadio}      from "../components/LiRadio.js"
import {LiCheckbox}   from "../components/LiCheckbox.js"
import {LiSelect}     from "../components/LiSelect.js"
import {LiNumber}     from "../components/LiNumber.js"
import {LiEmail}      from "../components/LiEmail.js"
import {LiIphone}     from "../components/LiIphone.js"
import {LiPosition}   from "../components/LiPosition.js"
import {LiTime}       from "../components/LiTime.js"
import {LiWx}         from "../components/LiWx.js"
import {LiMobile}     from "../components/LiMobile.js"
import {LiCity}       from "../components/LiCity.js"
import {LiFenjie}     from "../components/LiFenjie.js"
import {LiFujian}     from "../components/LiFujian.js"
import {LiJss}        from "../components/LiJss.js"
import {LiPic}        from "../components/LiPic.js"
import {LiPingfen}    from "../components/LiPingfen.js"
import {LiPs}         from "../components/LiPs.js"
const FieldList=({onclick,clickFieldList})=>{
    return(
        <ul className="fieldList" style={{display:"none"}} onClick={()=>{clickFieldList()}}>
            <LiText onclick={onclick}/>
            <LiTextarea onclick={onclick} />
            <LiRadio onclick={onclick} />
            <LiCheckbox onclick={onclick} />
            <LiSelect onclick={onclick} />
            <LiNumber onclick={onclick} />
            <LiEmail onclick={onclick} />
            <LiIphone onclick={onclick} />
            <LiPosition onclick={onclick} />
            <LiTime onclick={onclick} />
            <LiWx onclick={onclick} />
            <LiMobile onclick={onclick} />
            <LiCity onclick={onclick} />
            <LiFenjie onclick={onclick} />
            <LiFujian onclick={onclick} />
            <LiJss onclick={onclick} />
            <LiPic onclick={onclick} />
            <LiPingfen onclick={onclick} />
            <LiPs onclick={onclick} />
        </ul>
    )
}
export default FieldList