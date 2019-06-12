import React from 'react';
import CategoryList from 'components/CategoryList.jsx';
import EditArea from 'components/EditArea.jsx';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { categoryReducer } from 'reducers/reducer.js';

import './Main.css';


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarOpen: true
        };
        this.store = null;
        this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            categoryReducer
        }), composeEnhancers(applyMiddleware(thunkMiddleware)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className='main-container'>
                    <CategoryList sideBarOpen={this.state.sideBarOpen}/>
                    <EditArea handleToggleSideBar={this.handleToggleSideBar} sideBarOpen={this.state.sideBarOpen}/>
                </div>
            </Provider>
        );
    }

    handleToggleSideBar() {
        this.setState((prevState, props) => ({
            sideBarOpen: !prevState.sideBarOpen
        }));
    }
}
