import React from 'react';
import { connect } from 'react-redux';
import './CategoryList.css';
import CategorySearch from 'components/CategorySearch.jsx';
import CategoryItem from 'components/CategoryItem.jsx';
import { getCategory, getCategoryKeys, createCategory } from 'actions/action.js';
import { Row, Tooltip } from 'reactstrap';


class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpVisible: false,
            tooltipOpen: false
        };
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.handleCreateCategory = this.handleCreateCategory.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    render() {
        let sideBarOpen = this.props.sideBarOpen;
        return (
            <div className={`categList ${sideBarOpen ? 'appear' : 'hide'}`}>
                <CategorySearch />
                {
                this.props.keys.map(k => {
                    return (
                        <CategoryItem name={k} key={k}/>
                    );
                })
                }
                <div ref={node => {this.node = node;}} id='tooltip-target'>{
                    this.state.popUpVisible &&
                    <div>
                        <Row className='createInput'><i className="far fa-folder-open"></i>&nbsp;&nbsp;
                            <form onSubmit={this.handleCreateCategory}>
                                <input className='inputArea' name='input'/>
                                <button className='createCatButton'>+</button>
                            </form>
                        </Row>
                        <Tooltip placement='bottom' isOpen={this.state.tooltipOpen} target='tooltip-target' toggle={this.toggle}>
                            Input can't be empty!
                        </Tooltip>
                    </div>
                }</div>
                <div className='footer' id='footer' onClick={this.handleCreateClick}>
                    <i className="fas fa-plus"></i>
                    &nbsp;&nbsp;CREATE LIST
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.props.dispatch(getCategoryKeys());
        this.props.dispatch(getCategory('All'));
    }

    handleCreateClick() {
        if(!this.state.popUpVisible) {
            document.addEventListener('click', this.handleOutsideClick);
        }else {
            document.removeEventListener('click', this.handleOutsideClick);
        }
        this.setState((prevState, props) => ({
            popUpVisible: !prevState.popUpVisible
        }));
    }

    handleOutsideClick(e) {
        if(this.node.contains(e.target)) {
            return;
        }
        this.handleCreateClick();
    }

    handleCreateCategory(e) {
        e.preventDefault();
        if(!e.target.input.value) {
            let setState = this.setState.bind(this);
            this.setState({
                tooltipOpen: true
            }, function() {
                setTimeout(function() {
                    setState({
                        tooltipOpen: false
                    });
                }, 1000);
            });
        }else {
            const name = e.target.input.value.charAt(0).toUpperCase() + e.target.input.value.slice(1);
            this.props.dispatch(createCategory(name))
            this.handleCreateClick();
        }
    }

    toggle() {
        this.setState((prevState, props) => {
            tooltipOpen: !prevState.tooltipOpen
        });
    }
}

export default connect(state => {
    return {
        ...state.categoryReducer
    };
})(CategoryList)
