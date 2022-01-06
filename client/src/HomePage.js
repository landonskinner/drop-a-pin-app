import React from 'react'
import PostContainer from './PostContainer'


function HomePage({user}) {
    return (
        <div>
            <PostContainer user={user}/>
        </div>
    )
}

export default HomePage
