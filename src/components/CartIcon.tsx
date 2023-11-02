import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CartIcon = ({ value }: { value: number }) => {
    return (
        <div className='cart-icon'>
            <AddShoppingCartIcon />
            <span className='numer-of-products'>
                {value}
            </span>
        </div>
    )
}

export default CartIcon