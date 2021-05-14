import { Component, Fragment } from 'react';
import Navbar from "../UI/navbar";
import Sidebar from "../UI/sidebar";
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container, ButtonGroup, Row, Col , Form} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./CartScreen.css";

// Components
import Checkout from './Checkout';


// Actions
import { getCart, deleteFromCart } from '../../../actions/cartActions';
import { checkout } from '../../../actions/orderActions';
import { addToCart } from '../../../actions/cartActions';
import { removeOneFromCart} from '../../../actions/cartActions';

class Cart extends Component {

    state = {
        loaded: false,
        qty:0
    }

    static propTypes = {
        getCart: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        removeOneFromCart:PropTypes.func.isRequired,
        deleteFromCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        cart: PropTypes.object.isRequired,
        checkout: PropTypes.func.isRequired
    }

    getCartItems = async (id) => {
        await this.props.getCart(id);
        this.state.loaded = true; 
    }

    onDeleteFromCart = (id, itemId) => {
        this.props.deleteFromCart(id, itemId);
    }

    onAddToCart = async (id, productId) => {
        const user = this.props.user; 
        await this.props.addToCart(id, productId, 1);
        this.getCartItems(user.id);
    }

    onRemoveOneFromCart = async (id, productId) => {
        const user = this.props.user; 
        await this.props.removeOneFromCart(id, productId, 1);
        this.getCartItems(user.id);
        setTimeout(this.getCartItems(user.id), 500);
    }

    render() {
        const user = this.props.user;
        if (this.props.isAuthenticated && !this.props.cart.loading && !this.state.loaded) {
            this.getCartItems(user.id);
        }


        return (
            <div>
                <Navbar />
                <div className="d-flex" id="wrapper">
                    <Sidebar />
                    {this.props.isAuthenticated ?
                        <Fragment>
                            {this.props.cart.cart ? null :
                                <div class="container">
                                    <div class="child"><Alert color="info" style={{ position: 'relative' }}>Your cart is empty!</Alert></div>
                                </div>

                            }
                        </Fragment>
                        : <Alert color="danger" className="text-center">Login to View!</Alert>
                    }


                    {this.props.isAuthenticated && !this.props.cart.loading && this.state.loaded && this.props.cart.cart ?
                        <Container>
                            <div className="row">
                                {this.props.cart.cart.items.map((item) => (
                                    <div className="col-md-4">
                                        <Card>
                                            <CardBody>
                                                <CardTitle tag="h5">{item.name}</CardTitle>
                                                <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                                                <CardText>Quantity - {item.quantity}</CardText>
                                                <Row>
                                                    <Col>
                                                        <ButtonGroup>
                                                            <Button onClick={this.onRemoveOneFromCart.bind(this, user.id, item.productId)}>-</Button>
                                                            <Button disabled>{item.quantity}</Button>
                                                            <Button  onClick={this.onAddToCart.bind(this, user.id, item.productId)}>+</Button>
                                                        </ButtonGroup>
                                                    </Col>
                                                </Row>
                                                <br></br>
                                                <Button color="danger" onClick={this.onDeleteFromCart.bind(this, user.id, item.productId)}>Delete</Button>

                                            </CardBody>
                                        </Card>
                                        <br />
                                    </div>
                                ))}
                                <div class="col-md-12">
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h5">Total Cost = Rs. {this.props.cart.cart.bill}</CardTitle>
                                            <Checkout
                                                user={user.id}
                                                amount={this.props.cart.cart.bill}
                                                checkout={this.props.checkout}
                                            />
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </Container>
                        : null}
                </div>

            </div>

        )


    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
})

export default connect(mapStateToProps, { getCart, deleteFromCart, checkout,addToCart,removeOneFromCart })(Cart);