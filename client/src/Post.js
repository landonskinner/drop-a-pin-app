import React, {useState, useEffect} from 'react'

import styled from 'styled-components'
import PostComment from './PostComment'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'


function Post({post, setPosts, feedPosts}) {
    
    // pass id from user as props
    const userId = 2;

    const ownPost = () => {
        if (post.user.id === userId) {
            return (
                <div>
                    <ButtonStyle>
                        <button type="button" onClick={handleNewPost}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit Post</button>
                    </ButtonStyle>
                    <ButtonStyle>
                        <button onClick={handleRemovePost} id={parseInt(post.id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
                    </ButtonStyle> 
                </div>
            )
        } else {
            return null
        }
    }


    const [newComment, setNewComment] = useState({
        text: "",
        post_id: post.id,
        username: ""
    })

    const [isLiked, setIsLiked] = useState(false)

    const [openComments, setOpenComments] = useState(false)
    
    const [isSelected, setIsSelected] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        photo: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    let id = post.id
    
    const handleSubmit = (e) => {
        const configObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        e.preventDefault();
        setIsSelected(false)
        
        fetch(`/posts/${id}`, configObj).then((resp) => {
            if (resp.ok) {
            resp.json().then(() => {
                setFormData({
                    title: "",
                    body: "",
                    photo: ""
                });
            });
            } else {
            resp.json().then((errors) => {
                console.error(errors);
            });
            }
        });
    }

    function handleRemovePost(postToRemove) {

        fetch(`/posts/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
    }
    })
    // console.log(postToRemove)
        .then(res => res.json())
        .then(data => {
        setPosts((data) =>
            feedPosts.filter((data) => data.id !== parseInt(postToRemove.target.id))
            );
        })
    };

    const handleNewPost = () => {
        setIsSelected(true)
    }

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
    
    const handleComment = (e) => {
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
{isSelected ? 
        <FormStyle>   
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="title">Title </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                />
            </p>
            <p>
                <label htmlFor="body">Post Content </label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={(e) => handleChange(e)}
                />
            </p>
            <p>
                <label htmlFor="photo">Photos </label>
                <input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={(e) => handleChange(e)}
                />
            </p>
            <p>
                <button type="submit">Edit Post</button>
            </p>
        </form>
        </FormStyle> 
        :
        <div>
            {ownPost()}
        </div>
        }
        
            
            <div className="post-content">
                <h1>{post.title}</h1>
                <h3>By: {post.user.username}</h3>
                <img src={post.photos} alt={post.title} />
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
                                onChange={(e) => handleComment(e)}
                            />
                        </p>
                        <p>
                            <button type="submit" onClick={handleNewComment}>Comment</button>
                        </p>
                        </form> 
                        </div>
                        : 
                        <button type="button" onClick={handleExpand}><FontAwesomeIcon icon={faComments}></FontAwesomeIcon> Comments ▼</button>
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
    
`
const ButtonStyle = styled.div`
    button {
            display: inline-block;
            margin-bottom: 5px;
            margin-top: 10px;
            padding: 6px 20px 6px 20px;
            font-size: 18px;
            background: #afdfd4;
            border-radius: 20px;
            border: 2px solid #9fd0c1;
            font-family: Georgia, serif;
            cursor: pointer;

        }

        button:hover {
            background: #7fa69a;
        }
        `

const FormStyle = styled.div`

    background: #f3eedb;
    padding: 10px;
    width: 50%;
    margin: auto;
    border-radius: 5px;
    border: 5px solid #afdfd4;
    box-shadow: 0 0 0 10px #f3eedb;


    textarea {
        resize: none;
        display: block;
        margin: auto;
        width: 80%;
        height: 300px;
        border: 3px solid #afdfd4;
        border-radius: 4px;
    }

    input {
        display: block;
        justify-content: center;
        margin: auto;
        width: 80%;
        border: 3px solid #afdfd4;
        border-radius: 4px;
    }

    label {
        display: inline-block;
        margin-bottom: 5px;
        font-size: 18px;
        border-top: 2px solid #9fd0c1;
        border-bottom: 2px solid #9fd0c1;
    }


    button {
        display: inline-block;
        margin-bottom: 5px;
        margin-top: 10px;
        padding: 3px 10px 3px 10px;
        font-size: 16px

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
    

    }

    button:hover {
        background: #7fa69a;
    }


`