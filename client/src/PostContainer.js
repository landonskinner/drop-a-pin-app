import React, {useState, useEffect} from 'react'
import Post from './Post'

function PostContainer({search, user, name, setEdited, edited}) {

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
        } else if (name === "account") {
            return feedPosts.filter(post => post.user.id === user.id)
        } else {
            return feedPosts
        }
    }

    const renderPosts = filteredPosts().map(post => <Post key={post.id} user={user} post={post} feedPosts={feedPosts} setPosts={setFeedPosts} setEdited={setEdited} edited={edited}/>)

    if (!feedPosts[0]) return <div>Loading...</div>
    return (
        <div>
            {renderPosts}
        </div>
    )
}

export default PostContainer

