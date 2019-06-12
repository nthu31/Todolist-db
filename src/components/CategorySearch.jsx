import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import './CategorySearch.css';


export default class CategorySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <Navbar color="faded" light className='navb'>
                <NavbarToggler className="togg" onClick={this.toggle}/>
                <div className='search d-flex'>
                    <input className="searchBar"/>
                    <Button outline className='btnn'><i className="fas fa-search"></i></Button>
                </div>
                <Collapse isOpen={this.state.collapse} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink>Family</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Friend</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

    toggle() {
        this.setState((prevState, props) => ({
            collapse: !prevState.collapse
        }));
    }
}
