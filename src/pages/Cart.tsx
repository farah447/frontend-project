import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Button, ThemeProvider, Card, CardContent, Typography, CardActions, CardMedia } from "@mui/material";
import { Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeAllFromCart, removeFromCart } from "../redux/cart/cartSlice";
import themes from "../Theme/Themes";
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const { cartItems } = useSelector((state: RootState) => state.cartReducer)

    const dispatch: AppDispatch = useDispatch()

    const handleRemoveFromCart = (slug: number) => {
        dispatch(removeFromCart(slug))
    }

    const handleRemoveAllCartItems = () => {
        dispatch(removeAllFromCart())
    }

    const cartTotal = () => {
        let totalAmount = 0
        cartItems.length > 0 && cartItems.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
        return totalAmount
    }
    // const cartTotal = () => {
    //     return cartItems.reduce((totalAmount, cartItem) => totalAmount + cartItem.price, 0);
    // }
    return (
        <ThemeProvider theme={themes}>
            <div className="cart-container">
                <Card>
                    <CardContent>
                        <Typography variant="h5">You have {cartItems.length > 0 ? cartItems.length : 0} in the cart</Typography>
                        {cartItems.length > 0 && (
                            <Button
                                className="Delete"
                                variant="outlined"
                                color="secondary"
                                size='small'
                                onClick={handleRemoveAllCartItems}>
                                Remove all
                            </Button>
                        )}
                    </CardContent>
                </Card>
                {cartItems.length > 0 && cartItems.map((cartItem) => {
                    return (
                        <Card key={cartItem.slug}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={cartItem.image}
                                alt={cartItem.title}
                            />
                            <CardContent>
                                <Typography variant="h5">Name: {cartItem.title}</Typography>
                                <Typography variant="body2">Price: {cartItem.price}</Typography>
                                <Typography variant="body2">Description: {cartItem.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    className="Delete"
                                    variant="outlined"
                                    color="secondary"
                                    size='small'
                                    onClick={() => {
                                        handleRemoveFromCart(Number(cartItem.slug))
                                    }}>
                                    <DeleteIcon />
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })}
                <Card>
                    <CardContent>
                        <Typography variant="h5">Cart Summary</Typography>
                        <Typography variant="body2">Total amount: {cartTotal()}</Typography>
                        <Typography variant="body2">Delivery address:</Typography>
                        <Button variant="outlined" color="primary">Update delivery address</Button>
                        <Typography variant="body2">Payment options:</Typography>
                    </CardContent>
                </Card>
            </div>
        </ThemeProvider>
    )
}

export default Cart;