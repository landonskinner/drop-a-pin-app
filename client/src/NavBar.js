import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

function NavBar() {
    return (
        <HeaderStyle>
            <div className="navigation">
                <NavLink to="/home" exact><li>Feed</li></NavLink>
                <NavLink to="/account"><li>Account</li></NavLink>
                <NavLink to="/search"><li>Search</li></NavLink>
            </div>
        </HeaderStyle>
    )
}

export default NavBar

const HeaderStyle = styled.div`

    .navigation {
        background: #f3eedb;
    }

    a {
        list-style-type: none;
        color: black;
        margin: 0;
        padding-left: 30px;
        padding-right: 30px;
    }

    a:link {
        text-decoration: none;
    }

    a:visited {
        text-decoration: none;
        color: black;
    }

    a:hover {
        border-bottom: 2px solid #afdfd4;
        color: #afdfd4;
    }

    li {
        margin: 10px;
        padding: 5px;
        display: inline-block;
        border-radius: 15px;
        line-height: 10px;
        /* background: white; */
    }

`