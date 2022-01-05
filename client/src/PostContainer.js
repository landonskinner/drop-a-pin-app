import React, {useState, useEffect} from 'react'
import Post from './Post'

function PostContainer({search}) {

    const [feedPosts, setFeedPosts] = useState([])
    // fetch to database for rendering of posts
    useEffect(() => {
        fetch("/posts")
        .then(resp => resp.json())
        .then(posts => {
            setFeedPosts(posts)
        })
    }, [])
    console.log(search)

    // const filteredPosts = () => {
    //     if (search !== undefined) {
    //         return feedPosts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    //     } else {
    //         return feedPosts
    //     }
        
    // }
    // console.log(filteredPosts)
    
    const renderPosts = feedPosts.map(post => <Post key={post.id} post={post} />)

    if (!feedPosts[0]) return <div>Loading...</div>
    return (
        <div>
            {renderPosts}
        </div>
    )
}

export default PostContainer
