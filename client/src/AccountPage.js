import React from 'react'
import PostForm from './PostForm';
import PostContainer from './PostContainer';
import {useParams} from 'react-router-dom'

function AccountPage() {

    const params = useParams()
    console.log(!!params.id)

    return (
        
        <div>
            <h1>name</h1>
            <h2>username</h2>
            <p>bio?</p>
            {!!params.id ? 
            null
            :
            <PostForm /> 
            }
            <PostContainer id={params.id}/>
        </div>
    )
}

export default AccountPage
