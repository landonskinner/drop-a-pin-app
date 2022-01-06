import React, {useState, useEffect} from 'react'
import Post from './Post'

function PostContainer({search, id, user, name}) {

    const [feedPosts, setFeedPosts] = useState([])
    // fetch to database for rendering of posts
    useEffect(() => {
        fetch("/posts")
        .then(resp => resp.json())
        .then(posts => {
            setFeedPosts(posts)
        })
    }, [])

    const filteredPosts = () => {
        if (!!search) {
            return feedPosts.filter(post => {
                console.log(post)
                return post.title.toLowerCase().includes(search.toLowerCase()) || post.user.username.toLowerCase().includes(search.toLowerCase())
            })
        // } else if (!!id) {
        //     return feedPosts.filter(post => {
        //         console.log(post, id)
        //         return post.user.id === parseInt(id)
        //     })
        } else if (name === "account") {
            return feedPosts.filter(post => post.user.id === user.id)
        } else {
            return feedPosts
        }
    }

    const renderPosts = filteredPosts().map(post => <Post key={post.id} user={user} page_id={id} post={post} feedPosts={feedPosts} setPosts={setFeedPosts}/>)

    if (!feedPosts[0]) return <div>Loading...</div>
    return (
        <div>
            {renderPosts}
        </div>
    )
}

export default PostContainer

