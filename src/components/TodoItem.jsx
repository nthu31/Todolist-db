import React from 'react';
import { connect } from 'react-redux';
import { importantToggle, checkTodo } from 'actions/action.js';
import './TodoItem.css';


class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleImportantClick = this.handleImportantClick.bind(this);
        this.handleDoneClick = this.handleDoneClick.bind(this);
    }

    render() {
        let detailOpen = this.state.detailOpen;
        let title = this.props.Title;
        let deadline = this.props.Deadline
        let important = this.props.Important;
        return (
            <div className={`todo ${this.props.Done ? 'text_line' : ''}`}>
                <div className='todo-2 d-flex justify-content-between'>
                    <div className='title' onClick={this.handleClick}><i className="fas fa-clipboard-list"></i>{title}</div>
                    <div>
                        <span className='deadline'>{deadline}</span>
                        <i className={`important-icon fas fa-star ${important ? 'colorY' : ''}`}
                            onClick={this.handleImportantClick}></i>
                        <input type="checkbox" className='check' name='checkBox' value={this.props.Id}/>
                    </div>
                </div>
                <div className={`detail ${detailOpen ? 'detailOpen' : 'detailHide'}`}>
                    <div>Description:&nbsp;{this.props.Description}</div>
                    <div>Remark:&nbsp;{this.props.Remark}</div>
                    <button className='doneButton' onClick={this.handleDoneClick}>Done</button>
                </div>
            </div>
        );
    }

    handleClick() {
        this.setState((prevState, props) => ({
            detailOpen: !prevState.detailOpen
        }));
    }

    handleImportantClick() {
        let category = this.props.category;
        let id = this.props.Id;
        this.props.dispatch(importantToggle(category, id));
    }

    handleDoneClick(e) {
        e.preventDefault();
        let category = this.props.category;
        let id = this.props.Id;
        this.props.dispatch(checkTodo(category, id));
    }
}

export default connect(state => {
    return {
        ...state.categoryReducer
    }
})(TodoItem)
