import React, {useState, useEffect} from 'react'
import PostForm from './PostForm';
import PostContainer from './PostContainer';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

function AccountPage({user, name}) {

    const params = useParams()
    console.log(params)

    const [submitted, setSubmitted] = useState(false)
    const [edited, setEdited] = useState(false)
    console.log(edited)

    
    useEffect(() => {
        fetch("/me")
        .then(resp => resp.json())
        .then(user => console.log(user))
    }, [submitted, edited])

    return (
        
        <AccountStyle>
            <div className="account-head">
                <h1>{user.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h1>
                <h2>@{user.username}</h2>
            </div>
            {!!params.id ? 
            null
            :
            <PostForm user={user} setSubmitted={setSubmitted} submitted={submitted}/> 
            }
            <PostContainer id={params.id} user={user} name={name} setEdited={setEdited} edited={edited}/>
        </AccountStyle>
    )
}

export default AccountPage

const AccountStyle = styled.div`
    .account-head {
    display: inline-block;
    width: 30%;
    margin-bottom: 5px;
    margin-top: 10px;
    padding: 6px 20px 6px 20px;
    /* font-size: 18px; */
    background: #f3eedb;
    border-radius: 20px;
    border: 2px solid #9fd0c1;
    font-family: Georgia, serif;
    }
`