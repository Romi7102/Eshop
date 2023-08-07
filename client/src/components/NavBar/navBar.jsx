import React, { useContext } from "react";
import { Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";
import { Store } from "../../Context/Store";
import { USER_SIGNOUT } from "../../Reducers/Actions";
import SearchBox from "../SearchBox/searchBox";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { cartItems } = cart;

  const signOutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT }); //! add to store!!!
  };

  return (
    <>
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Link
            className="ms-5"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Link>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src="/imgs/amazonlogo.png" width={100} alt="AMZN" />
              </Navbar.Brand>
            </LinkContainer>
            <nav className="d-flex mx-auto align-items-center">
              <SearchBox />
            </nav>

            <Link to="/cart" className="nav-link me-4 ms-4">
              <i className="fas fa-shopping-cart text-white"></i>
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {""}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link>
            
            {
              userInfo? (
                <NavDropdown className="text-white me-5" title={userInfo.name}>
                  <Link className="dropdown-item" to='#signout' onClick={signOutHandler}>Sign Out</Link>
                </NavDropdown>
              ):
              (
                <Link to='/signin' className="text-white">Sign In</Link>
              )
            }
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavBar;
