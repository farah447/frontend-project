import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { sortProducts } from '../redux/slices/products/productSlice';
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';
const SortProducts = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleOptiononChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(sortProducts(event.target.value))
    };

    return (
        <ThemeProvider theme={themes} >
            <div>
                <label htmlFor="sort">Sort by:</label>
                <select name="sort" id="sort" onChange={handleOptiononChange}>
                    <option value='price' defaultValue='price' >price</option>
                    <option value='name'>name</option>
                </select>
            </div>
        </ThemeProvider>
    );
};


export default SortProducts