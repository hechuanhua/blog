import React, { Component } from "react"
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import { ArticleList, PageLi } from './articleList'


export class Index extends Component {

    constructor(props) {
        super(props)
    }

    static ajaxData (props) {

        let page = props.location.query.page,
            type = props.location.query.category?'category':'index'

        if( type == 'category' ){
            let params = { 'category' : props.location.query.category || 1, 'page' : page}
            return [actions.ajaxData(type,params)]
        } else {
            return [actions.ajaxData(type,page)]
        }

    }

    componentDidMount() {
        
        if ( this.props.articlelist.page&&this.props.articlelist.page.count ) {

        } else {
            let page = this.props.location.query.page
            this.props.actions.ajaxData('index',page)
        }
        
    }

    render() {
        let data = this.props.articlelist,
            type = this.props.location.query.category?'category':'index'
        return <div className = "index">
            <ArticleList articleList = { data.data }  query = {this.props.location.query}  actions = { this.props.actions } type={ type }/> 
            <PageLi pageList = { data.page }  query = {this.props.location.query} actions = { this.props.actions } type={ type }/> </div>
    }
}

const mapStateToProps = (state) => {
    return { articlelist: state.articlelist }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps 
)(Index)
