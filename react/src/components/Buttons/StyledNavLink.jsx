import React from "react";
import { NavLink } from "react-router-dom";

const StyledNavLink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `pl-4 pt-5 px-2 py-3 flex flex-row font-semibold items-center rounded-br-xl rounded-tr-xl transition-all ease-linear text-sm md:pl-16 md:px-4 md:py-3 md:text-base ${
                    isActive
                        ? "bg-black text-white hover:shadow-xl"
                        : "text-black hover:bg-gray-200 shadow-none"
                }`
            }
        >
            <div className="flex flex-col md:flex-row">
                {React.Children.map(children, child => {
                    if (typeof child === 'string') {
                        return <span className="hidden md:inline-block">{child}</span>;
                    }
                    return <div className="mb-2 md:mb-0 md:mr-2 self-center">{child}</div>;
                })}
            </div>
        </NavLink>
    );
};

export default StyledNavLink;
