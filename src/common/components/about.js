import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'

class AboutComponent extends Component {
    constructor(props) {
        super(props)
        this.about
    }
    static ajaxData(location){
        return [actions.ajaxData('about')]
    }

    componentDidMount() {
        console.log("About==>componentWillMount")
        if( this.props.about.data&&this.props.about.data.neirong ){

        }else{
            this.props.actions.ajaxData("about")
        }
        
    }

    aboutSubmit() {
        console.log(this.about.innerHTML)
        this.props.actions.SaveAbout(this.about.innerHTML)
    }

    render() {
        let data = this.props.about.data;
        data = data ? data.neirong : ""
        return <div>
            <div className="aboutContent" ref={el => {
                this.about = el
            }} dangerouslySetInnerHTML={{__html: data}}></div>
            <div className="aboutBtn" onClick={() => {
                this.aboutSubmit()
            }} style={{display: "none"}}>更新
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {about: state.articlelist}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
const About = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent)

module.exports = About