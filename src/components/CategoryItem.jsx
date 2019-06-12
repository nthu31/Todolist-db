import React from 'react';
import { connect } from 'react-redux';
import { getCategory } from 'actions/action.js';
import './CategoryItem.css';
import { Row } from 'reactstrap';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <Row className='item' onClick={this.handleClick}><i className="far fa-folder-open"></i>&nbsp;&nbsp;{this.props.name}</Row>
        );
    }

    handleClick() {
        this.props.dispatch(getCategory(this.props.name));
    }
}

export default connect(state => {
    return {
        ...state.categoryReducer
    };
})(CategoryItem)
