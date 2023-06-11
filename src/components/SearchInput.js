import IconSearch from "assets/icons/IconSearch";
import { useState } from "react";
import TextInput from "./input/TextInput";

const SearchInput = ({ onInputChange }) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        const { value } = e.target;
        setValue(value);
        onInputChange && onInputChange(value)
    }

    return (
        <div className="search flex justify-end md:flex-none ml-[0rem] !mr-[0rem]">
            <TextInput
                className={""}
                placeholder="Search..."
                iconSearch
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchInput;