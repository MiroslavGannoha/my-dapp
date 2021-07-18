import React from 'react';

export const Input: React.FC<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
> = ({ ...otherProps }) => {
    return (
        <input
            className="p-2 rounded-md w-200 m-3 focus:outline-none transition-colors  shadow-inner-lg duration-800 ease-in-out"
            {...otherProps}
        />
    );
};
