import React from 'react';

export const Button: React.FC<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
> = ({ children, ...otherProps }) => {
    return (
        <button
            className="bg-green-300 p-3 rounded-md border-green-400 border-solid border w-200 m-3 focus:outline-none shadow-md hover:shadow-lg active:shadow-inner transition-shadow transform duration-900 ease-in-out"
            {...otherProps}
        >
            {children}
        </button>
    );
};
