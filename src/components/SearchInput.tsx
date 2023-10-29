import { ChangeEvent } from "react"
import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';

type SearchInputProps = {
    searchTerm: string,
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchTerm, handleSearch }: SearchInputProps) => {

    return (
        <ThemeProvider theme={themes} >
            <input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearch} />
        </ThemeProvider>)

}

export default SearchInput