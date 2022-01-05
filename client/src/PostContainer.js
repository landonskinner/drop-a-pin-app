import React, { useState, useEffect } from 'react'
import Post from './Post'

function PostContainer() {
const [posts, setPosts] = useState([])

useEffect(() => {
    fetch("/posts")
    .then ((r) => r.json())
    .then(setPosts)
},[])


        
    return (
        <div>
            {posts.map((post) => {
                return <Post key={post.id} post={post} setPosts={setPosts} />
            })}
            
        </div>
    )
}

export default PostContainer
