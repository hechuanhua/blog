/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2016-09-05 00:58:23
 * @version $Id$
 */
import React,{Component} from "react"
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

const Footer = () => (
    < div className = "Footer" > 
        源码： < a target = "_blank" href = "https://github.com/hechuanhua/blog" > https: //github.com/hechuanhua/blog</a>
    </div>
)
//export default Footer
module.exports=Footer