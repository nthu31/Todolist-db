import React from 'react';
import { connect } from 'react-redux';
import TodoItem from 'components/TodoItem.jsx';
import { addTodo, deleteTodo, deleteCategory } from 'actions/action.js';
import './EditArea.css';


class EditArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTodoPopOut: false,
            addToggleImp: false
        };
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleAddImp = this.handleAddImp.bind(this);
        this.handleAddOutsideClick = this.handleAddOutsideClick.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
    }

    render() {
        let sideBarOpen = this.props.sideBarOpen;
        let sidebarDisplay = this.props.category;
        let important = this.state.addToggleImp;
        return (
            <div className={`editArea ${sideBarOpen ? 'moveRight' : 'moveLeft'}`}>
                <div className='editMasking'>
                    <button className="sideBtn" onClick={this.props.handleToggleSideBar}>☰&nbsp;&nbsp;{sidebarDisplay}</button>
                    {this.props.category != "All" && <button className='sideBtn' onClick={this.handleCategoryDelete}>CategoryDelete</button>}
                    <form onSubmit={this.handleDelete}>
                    {
                        this.props.category == "All" ? console.log("All") :
                        this.props.posts.map(post => {
                            return (
                                <TodoItem key={`${post.Id}`} {...post}/>
                            );
                        })
                    }
                        <button className='delete' type='submit'><i className="fas fa-trash-alt"></i>&nbsp;&nbsp;Delete</button>
                    </form>
                    <div ref={node => {this.node = node;}} id='add-target'>{
                        this.state.addTodoPopOut &&
                        <form className='todoPop' onSubmit={this.handleAddTodo}>
                            <div className='todo-2 d-flex justify-content-between'>
                                <div className='title'><i className="fas fa-clipboard-list"></i>Title:&nbsp;&nbsp;<input className='addTodoInput' name='titleInput'/></div>
                                <div>
                                    <span className='deadline'>Deadline:&nbsp;&nbsp;<input className='addTodoInput' name='deadlineInput'/></span>
                                    <i className={`important-icon fas fa-star ${important ? 'colorY' : ''}`} onClick={this.handleAddImp}></i>
                                </div>
                            </div>
                            <div className={`detail`}>
                                <div className='addD'>Description:&nbsp;&nbsp;<input className='addTodoInput' name='despInput'/></div>
                                <div className='addD'>Remark:&nbsp;&nbsp;<input className='addTodoInput' name='remarkInput'/></div>
                                <button className='confirm-add' type='submit'>Confirm</button>
                            </div>
                        </form>
                    }</div>

                    <button className='editFooter' onClick={this.handleAddClick}><i className="fas fa-plus"></i>&nbsp;&nbsp;Add</button>
                </div>
            </div>
        );
    }

    handleAddClick() {
        if(!this.state.addTodoPopOut) {
            document.addEventListener('click', this.handleAddOutsideClick);
        }else {
            document.removeEventListener('click', this.handleAddOutsideClick);
        }
        this.setState((prevState, props) => ({
            addTodoPopOut: !prevState.addTodoPopOut
        }));
    }

    handleAddImp() {
        this.setState((prevState, props) => ({
            addToggleImp: !prevState.addToggleImp
        }));
    }

    handleAddOutsideClick(e) {
        if(this.node.contains(e.target)) {
            return;
        }
        this.handleAddClick();
    }

    handleAddTodo(e) {
        e.preventDefault();
        let category = this.props.category;
        let title = e.target.titleInput.value;
        let desp = e.target.despInput.value;
        let dead = e.target.deadlineInput.value;
        let remark = e.target.remarkInput.value;
        let imp = this.state.addToggleImp;
        this.props.dispatch(addTodo(category, title, desp, dead, remark, imp));
        this.handleAddClick();
    }

    handleDelete(e) {
        e.preventDefault();
        let category = this.props.category;
        if(!e.target.checkBox) return;
        if(e.target.checkBox.length > 1) {
            for(let i = 0; i < e.target.checkBox.length; i++) {
                if(e.target.checkBox[i].checked) {
                    let id = e.target.checkBox[i].value;
                    this.props.dispatch(deleteTodo(category, id));
                }
            }
        }else {
            if(e.target.checkBox.checked) {
                let id = e.target.checkBox.value;
                this.props.dispatch(deleteTodo(category, id));
            }
        }
    }

    handleCategoryDelete() {
        console.log('Exe');
        this.props.dispatch(deleteCategory(this.props.category));
    }
}

export default connect(state => {
    return {
        ...state.categoryReducer
    };
})(EditArea)
