import {useState} from 'react';
import logo from '../assets/logo.png';
import {
    Navbar,
    Nav, 
    NavbarBrand, 
    NavbarToggler, 
    Collapse, 
    NavItem, 
    NavLink, 
    UncontrolledDropdown, 
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { MDBCol, MDBInput } from "mdbreact";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (<div>
                <Navbar expand="md" color="primary"  light>
                    <div className="container">
                        {/* only toggle works, for other if i put to the parent tag, some funny behavior */}
                        <NavbarToggler 
                            onMouseOver={() => setIsOpen(true)}
                            onFocus={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                            onBlur={() => setIsOpen(false)}
                            toggle={() => setIsOpen(!isOpen)}
                        />
                        <NavbarBrand href="/" ><img className="App-logo nav-item" src= {logo} height="40" width="40" alt="easyLearningComputerScience"/><span id = "slogan-home">EasyLearingCS.com</span></NavbarBrand>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className = "dropdown-toggle text-white" nav caret>
                                        Data Structures
                                    </DropdownToggle>
                                    <DropdownMenu className = "bg-primary" right>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/Array" >Array</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/LinkedList">LinkedList</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/backtracking/Backtracking">Backtracking</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/backtracking/Backtracking">Backtracking</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/tree/BinarySearchTree">BinarySearchTree</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/tree/AVLTree">AVLTree</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle className = "dropdown-toggle text-white" nav caret >
                                        Algorithms
                                    </DropdownToggle>
                                    <DropdownMenu className = "bg-primary" right>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/backtracking/N-Queen" >N-Queen</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/backtracking/Backtracking">Backtracking</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/Sorting">Sorting</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/PathFinding/BFS">BFS</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink className="text-white"  href="/playground">playground</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                    
                            </Nav>
                        </Collapse>
                        <MDBCol md="3" className = "search-bar">
                            <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
                        </MDBCol>
                    </div>
                </Navbar>
            </div>
            );
};

export default Header;