import React from "react";
import './Main.css'
import Header from "./Header";

export default props => 
    <>
        <Header {...props} />
        <main className="content">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </>