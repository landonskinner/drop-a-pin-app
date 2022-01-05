import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PostComment from './PostComment'

function Post({post}) {
    
    const [newComment, setNewComment] = useState({
        text: "",
        post_id: post.id,
        username: ""
    })

    const [isLiked, setIsLiked] = useState(false)

    const [openComments, setOpenComments] = useState(false)

    useEffect(() => {
        fetch("/likes")
        .then(resp => resp.json())
        .then(data => {
            const filtered = data.filter(data => {
                return (data.post.id === post.id) && (data.username === "bob123")
            })
            if (!!filtered[0]) {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }
        })
    }, [])

    const renderComments = post.comments.map(comment => <PostComment key={comment.id} comment={comment} />)
    
    const handleChange = (e) => {
        console.log(newComment)
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    const handleNewComment = (e) => {
        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
          };

          // reload without losing spot on page??
          fetch("/comments", configObj).then((resp) => {
            if (resp.ok) {
              resp.json().then(() => {
                setNewComment({
                    text: "",
                    post_id: post.id,
                    username: ""
                });
              });
            } else {
              resp.json().then((errors) => {
                console.error(errors);
              });
            }
          });
    }

    const handleLike = () => {
        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id: post.id,
                username: 'bob123'
                // change username to be dynamic once sessions is implemented
            }),
          };

          fetch("/likes", configObj).then((resp) => {
            if (resp.ok) {
              resp.json().then((data) => {
                setIsLiked(true)
              });
            } else {
              resp.json().then((errors) => {
                console.error(errors);
              });
            }
          });
    }

    const handleUnlike = () => {
        fetch("/likes")
        .then(resp => resp.json())
        .then(data => {
            const filtered = data.filter(data => {
                return (data.post.id === post.id) && (data.username === "bob123")
            })
            filtered.map(like => {
                fetch(`/likes/${like.id}`, {
                    method: "DELETE"
                })
                .then((resp) => {
                    if (resp.ok) {
                      resp.json().then(() => {
                        setIsLiked(false)
                      });
                    } else {
                      resp.json().then((errors) => {
                        console.error(errors);
                      });
                    }
                  });
            })
        })

        
    }

    const handleExpand = () => {
        setOpenComments(!openComments)
    }

    return (
        <PostStyle>
            <div className="post-like">
                {isLiked ? 
                <button type="button" onClick={handleUnlike}>♥</button> 
                :
                <button type="button" onClick={handleLike}>♡</button>
                }
                
            </div>
            <div className="post-content">
                <img src={post.photos} />
                <h1>{post.title}</h1>
                <h3>By: {post.user.username}</h3>
                <p>
                    {post.body}
                </p>
            </div>
            <div className="post-comments">
                 
                <div>
                    {openComments ? 
                    <div>
                        <button type="button" onClick={handleExpand}>Comments ▲</button>
                        {renderComments}
                        <form>
                        <p>
                            <input
                                type="text"
                                name="text"
                                placeholder="Participate in the conversation!"
                                value={newComment.text}
                                onChange={(e) => handleChange(e)}
                            />
                        </p>
                        <p>
                            <button type="submit" onClick={handleNewComment}>Comment</button>
                        </p>
                        </form> 
                        </div>
                        : 
                        <button type="button" onClick={handleExpand}>Comments ▼</button>
                        } 
                </div> 
                
                
            </div>
        </PostStyle>
    )
}

export default Post

const PostStyle = styled.div`
    background: #f3eedb;
    padding: 10px;
    width: 50%;
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 5px;
    border: 5px solid #afdfd4;
    box-shadow: 0 0 0 10px #f3eedb;

    button {
        display: inline-block;
        margin-bottom: 5px;
        margin-top: 10px;
        padding: 3px 10px 3px 10px;
        font-size: 16px;
        background: #afdfd4;
        border-radius: 20px;
        border: 2px solid #9fd0c1;
        font-family: Georgia, serif;
        cursor: pointer;
    }

    input {
        margin: auto;
        width: 97%;
        border: 2px solid white;
        border-bottom: 2px solid #afdfd4;
        border-radius: 10px;
        height: 40px;
        padding-left: 10px;
        font-family: Georgia;
    }
    
   


`