import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import { API_ENDPOINT } from '../constants';
import { removeUser } from '../redux/action/user';
import { requestHandler } from '../services';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function OrdersPage({ user, cart, removeUser }) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [available, setAvailable] = useState({
        next: false,
        pre: false
    });

    useEffect(async () => {
        setIsLoading(true);
        const url = `${API_ENDPOINT}/order/?user=${user.user.user._id}&limit=5&skip=${page}`;
        const data = null;
        const header = {
            'Content-Type': 'application/json',
        };
        const method = "GET";
        const response = await requestHandler(url, data, header, method);
        setIsLoading(false);
        const { success } = response;
        if (success === true) {
            setOrders([...response.orders]);
            setAvailable({
                next: response.orders.length >= 5,
                pre: page <= 0 ? false : true
            })
        } else {
            // alert('Something went wrong');
        }
    }, [page]);

    return (
        <div>
            <Navbar
                user={user}
                cart={cart}
                history={history}
                removeUser={removeUser}
            />
            <div style={{
                textAlign: "center",
                margin: "10px",
                fontSize: "21px",
                fontWeight: "bold"

            }}>My Orders</div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                margin: "auto"
            }}>
                {available.pre &&
                    <Button onClick={() => {
                        setPage(pre => pre - 5);
                    }}>
                        PRE PAGE
                    </Button>}

                {available.next &&
                    <Button onClick={() => {
                        setPage(pre => pre + 5);
                    }}>
                        NEXT PAGE
                    </Button>}
            </div>
            <LoadingOverlay
                active={isLoading}
                spinner
            >
                {orders.map(item => {
                    return (

                        <Accordion style={{
                            backgroundColor: "#f3f3f3"
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div style={{
                                    display: "flex",
                                    width: "98%",
                                    justifyContent: "space-around",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    margin: "auto",
                                    marginTop: "10px"
                                }}>
                                    <div>
                                        <div>#{item.orderNumber}</div>
                                        <div>{item.status}</div>
                                        <div>
                                            <div>
                                                Shipping Address
                                                <div>
                                                    {item.shippingAddress.line1},
                                                </div>
                                                <div>
                                                    {item.shippingAddress.line2 ? item.shippingAddress.line2 + "," : ""}
                                                </div>
                                                <div>
                                                    {item.shippingAddress.city}, {item.shippingAddress.state}, {item.shippingAddress.pinCode}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{
                                        textAlign: "center"
                                    }}>

                                        <div>
                                            {item.items.length} Item(s)
                                        </div>
                                        <div>
                                            INR. {item.total}
                                        </div>
                                        <div>
                                            {item.isPaid === true ? "PAID" : "NOT PAID"}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item.items.map(product => {
                                    return (
                                        <div style={{
                                            display: "flex",
                                            width: "98%",
                                            justifyContent: "space-around",
                                            alignSelf: "center",
                                            alignItems: "center",
                                            margin: "auto",
                                            marginTop: "10px"
                                        }}>
                                            <div>
                                                <div>Product: {product.name}</div>
                                                <div>Each INR. {product.price}</div>
                                                <div>Quantity Chosen: {product.quantity}</div>
                                            </div>
                                            <div style={{
                                                textAlign: "center"
                                            }}>


                                                <div>
                                                    INR. {Number(product.price) * product.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </AccordionDetails>
                        </Accordion>
                    )
                })}
                {orders.length === 0 ? <div>No Recent Orders to show.</div> : <></>}
            </LoadingOverlay>
            <Footer style={{ marginTop: 10 }} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeUser: () => dispatch(removeUser())
});

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
