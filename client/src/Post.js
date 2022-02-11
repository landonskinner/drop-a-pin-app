import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import styled from 'styled-components'
import PostComment from './PostComment'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'


function Post({post, setPosts, feedPosts, user, edited, setEdited}) {

    const ownPost = () => {
        // if post belongs to logged in user, give post edit and delete functionality
        if (post.user.id === user.id) {
            return (
                <div>
                    <ButtonStyle>
                        <button type="button" className="edit" onClick={() => setIsSelected(true)}>
                            <FontAwesomeIcon icon={faEdit}  />
                        </button>
                    </ButtonStyle>
                    <ButtonStyle>
                        <button type="button" className="delete" onClick={handleRemovePost}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </ButtonStyle> 
                </div>
            )
        }
    }

    const [newComment, setNewComment] = useState({
        text: "",
        post_id: post.id,
        username: user.username
    })
    const [isLiked, setIsLiked] = useState(false)
    const [openComments, setOpenComments] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        photo: ""
    })

    useEffect(() => {
        fetch(`/posts/${post.id}`)
        .then(resp => resp.json())
        .then(post => setFormData(post))
    }, [isSelected])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        const configObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        fetch(`/posts/${post.id}`, configObj).then((resp) => {
            if (resp.ok) {
            resp.json().then(() => {
                setFormData({
                    title: "",
                    body: "",
                    photo: ""
                });
                console.log(edited)
                setEdited(!edited)
                setIsSelected(false)
            });
            } else {
            resp.json().then((errors) => {
                console.error(errors);
            });
            }
        });
    }

    function handleRemovePost() {
        fetch(`/posts/${post.id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(setPosts(feedPosts.filter((data) => data.id !== post.id)))
    };

    useEffect(() => {
        fetch("/likes")
        .then(resp => resp.json())
        .then(data => {
            const filtered = data.filter(data => {
                return (data.post.id === post.id) && (data.username === user.username)
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
                username: user.username
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
                return (data.post.id === post.id) && (data.username === user.username)
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
            
        {isSelected ? 
        <FormStyle className="edit-form">   
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
<>
        <div>
            {ownPost()}
        </div>
        
       
            <div className="post-content">
            <img src={post.photos} alt={post.title} />
                <h1>{post.title}</h1>
                <Link to={`/user/${post.user.id}`}>
                    <h3 id="profile-link">By: {post.user.username}</h3>
                </Link>

                <div className="post-like">
            <ButtonStyle className="like-button">
                {isLiked ? 
                <button type="button" onClick={handleUnlike}>♥</button> 
                :
                <button type="button" onClick={handleLike}>♡</button>
                }
            </ButtonStyle>
                
            </div>
                
                <p>
                    {post.body}
                </p>
            </div>
            <div className="post-comments">
                <div>
                    {openComments ? 
                    <div>
                        <ButtonStyle>
                        <button type="button" className="comment-button" onClick={handleExpand}><FontAwesomeIcon icon={faComments} /> Comments ▲</button>
                        </ButtonStyle>
                        {renderComments}
                        <CommentFormStyle>
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
                        </CommentFormStyle>
                        </div>
                        : 
                        <ButtonStyle>
                        <button type="button" className="comment-button" onClick={handleExpand}><FontAwesomeIcon icon={faComments}></FontAwesomeIcon> Comments ▼</button>
                        </ButtonStyle>

                      
                        } 
                </div> 
            </div>
            </>
}
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

    a {
        text-decoration: none;
        color: inherit;
    }

    .post-content h1 {
        position: relative;
        bottom: 110px;
        font-family: 'Coming Soon', cursive;
        font-weight: bold;
    }

    .post-content h3 {
        position: relative;
        font-size: 18px;
        bottom: 135px;
        font-family: 'Coming Soon', cursive;
    }

    .post-content p {
        text-align: left;
        margin: auto;
        position: relative;
        bottom: 110px;
        width: 85%;
        background: white;
        padding: 15px;
        border: 2px solid #afdfd4;
        border-radius: 5px;
    }
    
    .edit-form {
        margin: auto;
    }
    
`
const ButtonStyle = styled.div`
    button {
            display: inline-block;
            margin-bottom: 5px;
            margin-top: 10px;
            padding: 6px 20px 6px 20px;
            /* font-size: 18px; */
            background: #afdfd4;
            border-radius: 20px;
            border: 2px solid #9fd0c1;
            font-family: Georgia, serif;
            cursor: pointer;

        }

        button:hover {
            background: #7fa69a;
            
        }

        .comment-button {
            position: relative;
            bottom: 50px;
        }

        .edit {
            float: left;
            border: none;
            background: none;
            font-size: 18px;
        }

        .edit:hover {
            transform: scale(1.2);
            color: #afdfd4;
            background: none;
        }

        .delete {
            float: right;
            border: none;
            background: none;
            font-size: 18px;
        }

        .delete:hover {
            transform: scale(1.2);
            color: #afdfd4;
            background: none;
        }
        `

const FormStyle = styled.div`

    background: #f3eedb;
    padding: 10px;
    width: 50%;
    min-width: 950px
    margin: auto;
    


    textarea {
        resize: none;
        display: block;
        margin: auto;
        width: 100%;
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
    

    }

    button:hover {
        background: #7fa69a;
    }


`

const CommentFormStyle = styled.div`

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

    button {
        display: inline-block;
        margin-bottom: 0px;
        margin-top: 5px;
        padding: 3px 10px 3px 10px;
        font-size: 16px;
        background: #afdfd4;
        border-radius: 20px;
        border: 2px solid #9fd0c1;
        font-family: Georgia, serif;
        cursor: pointer;

    }
`