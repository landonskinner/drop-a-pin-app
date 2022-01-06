import React from 'react'
import PostForm from './PostForm';
import PostContainer from './PostContainer';
import {useParams} from 'react-router-dom'

function AccountPage({user, name}) {

    const params = useParams()
    console.log(params)

    return (
        
        <div>
            <h1>{user.name}</h1>
            <h2>{user.username}</h2>
            {!!params.id ? 
            null
            :
            <PostForm user={user}/> 
            }
            <PostContainer id={params.id} user={user} name={name}/>
        </div>
    )
}

export default AccountPage
