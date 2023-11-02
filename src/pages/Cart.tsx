import { useSelector } from "react-redux"
import { RootState, AppDispatch } from "../redux/store"
import { Button } from "@mui/material"
import { Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeAllFromCart, removeFromCart } from "../redux/cart/cartSlice";

import themes from "../Theme/Themes";
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const { cartItems } = useSelector((state: RootState) => state.cartR)

    const dispatch: AppDispatch = useDispatch()

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id))
    }

    const handleRemoveAllCartItems = () => {
        dispatch(removeAllFromCart())
    }

    const cartTotal = () => {
        let totalAmount = 0
        cartItems.length > 0 && cartItems.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
        return totalAmount
    }

    return (
        <div className="cart-container">
            <div className='cart-icon'>
                <h2>you have {cartItems.length > 0 ? cartItems.length : 0} in the cart </h2>
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
            </div>
            <div className="cart-main">
                {cartItems.length > 0 && <>
                    <div className="cart-items">
                        {cartItems.map((cartItem) => {
                            return <article key={cartItem.id} className='cart-card'>
                                <div className="cart-left">
                                    <img src={cartItem.image} alt={cartItem.name} className="cart-img" />
                                </div>
                                <div className="cart-right">
                                    <h3> Name: {cartItem.name} </h3>
                                    <h4> Price: {cartItem.price} </h4>
                                    <p> Description: {cartItem.description.substring(0, 50)}... </p>
                                    <Button
                                        className="Delete"
                                        variant="outlined"
                                        color="secondary"
                                        size='small'
                                        onClick={() => {
                                            handleRemoveFromCart(cartItem.id)
                                        }}>
                                        <DeleteIcon />
                                        Delete </Button>
                                </div>
                            </article>
                        })}
                    </div>
                    <div className="checkout-info">
                        <h2> cart summary</h2>
                        <h3>Total amount: {cartTotal()}</h3>
                        <h3> delivery adress: </h3>
                        <button>update delevary adress</button>
                        <p>payment options</p>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Cart