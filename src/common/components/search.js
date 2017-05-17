import React, { Component } from "react"
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import { ArticleList,PageLi } from './articleList'

export class SearchComponent extends Component {

    static ajaxData(props){
        
        let keyword = props.location.query.keyword
        return [actions.ajaxData('search', { 'keyword': keyword })]
        
    }

    render() {

        let data = this.props.search
        return <div className = "search">
            <ArticleList articleList = { data.data } type = "search" query = { this.props.location.query } actions = {this.props.actions} /> 
            <PageLi pageList = { data.page }  type = "search" query = { this.props.location.query } actions = {this.props.actions} />
            </div>
    }
}

const mapStateToProps = (state) => {
    return { search: state.articlelist }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
const Search = connect(
    mapStateToProps, 
    mapDispatchToProps 
)(SearchComponent)

module.exports = Search
