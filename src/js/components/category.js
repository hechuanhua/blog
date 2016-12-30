import React, { Component } from "react"
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
import { ArticleList,PageLi } from './articleList'

export class CategoryComponent extends Component {
    render() {
        let data = this.props.category;
        return <div className = "search">
            <ArticleList articleList = { data.data } ajaxData = { this.props.actions.searchSubmit } type = "search" query = { this.props.location.query } /> 
            <PageLi pageList = { data.page } ajaxData = { this.props.actions.searchSubmit } type = "search" query = { this.props.location.query } actions = {this.props.actions} />
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
const Category = connect(
    mapStateToProps, 
    mapDispatchToProps 
)(CategoryComponent)
module.exports = Category
