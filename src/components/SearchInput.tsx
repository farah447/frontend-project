import { ChangeEvent } from "react"
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';
import { FormControl, TextField } from "@mui/material";

type SearchInputProps = {
    searchTerm: string,
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchTerm, handleSearch }: SearchInputProps) => {

    return (
        <ThemeProvider theme={themes} >
            <FormControl sx={{ m: 1, minWidth: 210 }}>
                <TextField
                    label="Search"
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </FormControl>
            {/*<input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearch} />*/}
        </ThemeProvider>)

}

export default SearchInput