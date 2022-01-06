import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Button } from "./styles";

function NavBar({setUser}) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    return (
        <HeaderStyle>
            <div className="navigation">
                <NavLink to="/home" exact><li><FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Feed</li></NavLink>
                <NavLink to="/account"><li><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Account</li></NavLink>
                <NavLink to="/search"><li><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Search</li></NavLink>

                <Button variant="outline" onClick={handleLogoutClick}><li><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          Logout</li>
        </Button>
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