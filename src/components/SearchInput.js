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
        // <div
        //     action="search"
        //     className="relative mr-5 min-w-[20rem] basis-3/12 lg:block"
        // >
        //     <input
        //         type="search"
        //         className="!focus:ring-accent border-jacarta-100 w-full rounded-3xl border py-[0.6875rem] px-12 !pl-16 border-transparent bg-white/[.15] !text-white placeholder-white"
        //         placeholder="Search"

        //         style={{borderRadius: "9999px"}}
        //     />
        //     <span className="absolute left-0 top-0 flex h-full w-20 items-center justify-center rounded-2xl">
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             viewBox="0 0 24 24"
        //             width="24"
        //             height="24"
        //             className="fill-white "
        //         >
        //             <path fill="none" d="M0 0h24v24H0z" />
        //             <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
        //         </svg>
        //     </span>
        // </div>
    )
}

export default SearchInput;