import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
// import { sortProducts } from '../redux/slices/products/productSlice';
import { ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import themes from '../Theme/Themes';

const SortProducts = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleOptiononChange = (event: SelectChangeEvent<string>) => {
        // dispatch(sortProducts(event.target.value))
    };

    return (
        <ThemeProvider theme={themes} >
            <div className='.search-and-sort'>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
                    <Select
                        name="Sort"
                        onChange={handleOptiononChange}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Sort"
                        sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='Low to hight price' defaultValue='price'>Low to hight price</MenuItem>
                        <MenuItem value='hight to Low price' >hight to Low price</MenuItem>
                        <MenuItem value='name'>name</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </ThemeProvider>
    );
};


export default SortProducts