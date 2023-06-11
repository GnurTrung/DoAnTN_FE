import { useState } from "react";
import { useContexts } from "../../contexts/radars";
import SearchInput from '../SearchInput'

const Search = () => {
    const { setTextSearch, setParamsSearch, paramsSearch } = useContexts()
    return (
        <SearchInput onInputChange={(value) => setParamsSearch({...paramsSearch, name: value})} />
    )
}

export default Search;