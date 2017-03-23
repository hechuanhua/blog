import React, { Component } from "react"
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import { ArticleList,PageLi } from './articleList'

export class SearchComponent extends Component {
    render() {
        let data = this.props.search;
        return <div className = "search">
            <ArticleList articleList = { data.data } ajaxData = { this.props.actions.ajaxData } type = "search" query = { this.props.location.query } /> 
            <PageLi pageList = { data.page } ajaxData = { this.props.actions.ajaxData } type = "search" query = { this.props.location.query } actions = {this.props.actions} />
            </div>
    }
}

const mapStateToProps = (state) => {
    return { search: state.container }
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
