import React from "react";
import './Nav.css'
import Link from "./Link";

export default props=> 
    <aside className="menu-area">
       <nav className="menu">
            <Link link="/" icon="home" linkName="Início"/>
            <Link link="/users" icon="users" linkName="Usuários"/>
       </nav>
    </aside>