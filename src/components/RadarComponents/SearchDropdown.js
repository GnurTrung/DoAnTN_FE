import React, { useState } from 'react';



const SearchDropdown = ({ data, dropdownFor }) => {
    const [itemDateDropdown, setItemDateDropdown] = useState(false);
    const handleItemDateDropdown = () => {
        window.addEventListener('click', (w) => {
            if (w.target.closest('.itemDateDropdown')) {
                if (itemDateDropdown) {
                    setItemDateDropdown(false);
                } else {
                    setItemDateDropdown(true);
                }
            } else {
                setItemDateDropdown(false);
            }
        });
    };

    return (
        <div className="dropdown relative my-1 cursor-pointer">
            <button
                className="dark:bg-jacarta-700 itemDateDropdown dropdown-toggle border-jacarta-100 dark:border-jacarta-600 inline-flex w-48 items-center justify-between rounded-lg border bg-white py-2 px-3 text-sm dark:text-white"
                onClick={handleItemDateDropdown}
            >
                {/* <span className="font-display">Rank</span> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 h-4 w-4 dark:fill-white"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                </svg>
            </button>

            <div
                className={
                    itemDateDropdown
                        ? 'dropdown-menu dark:bg-jacarta-800 z-10 whitespace-nowrap rounded-xl max-w-xs w-[13rem] bg-white py-4 px-2 text-left shadow-xl show absolute top-full right-0'
                        : 'dropdown-menu dark:bg-jacarta-800 z-10 whitespace-nowrap rounded-xl max-w-xs w-[13rem] bg-white py-4 px-2 text-left shadow-xl hidden absolute top-full right-0'
                }
            >
                {data.map(({ id, text }) => {
                    return (
                        <button
                            key={id}
                            className="dropdown-item font-display text-jacarta-700 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                        >
                            {text}
                            {true && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="fill-accent mb-[3px] h-4 w-4"
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchDropdown;


