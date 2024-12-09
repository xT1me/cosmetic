import React from "react";
import Categories from "../Categories/Categories.jsx";

const Main = ({onAddToCart, username}) => {
    return (
        <div className="main-container">
            <Categories onAddToCart={onAddToCart} username={username} />
        </div>
    )
}

export default Main