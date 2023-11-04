import { ThemeProvider } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import themes from '../Theme/Themes';

const CartIcon = ({ value }: { value: number }) => {
    return (
        <ThemeProvider theme={themes}>
            <div className='cart-icon'>
                <AddShoppingCartIcon />
                <span className='numer-of-products'>
                    {value}
                </span>
            </div>
        </ThemeProvider>
    )
}

export default CartIcon