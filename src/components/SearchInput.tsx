import { ChangeEvent } from "react"

type SearchInputProps = {
    searchTerm: string,
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchTerm, handleSearch }: SearchInputProps) => {
    return <input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearch} />
}

export default SearchInput