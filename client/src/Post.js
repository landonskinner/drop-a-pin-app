import React, { useState } from 'react'
import styled from 'styled-components'

function Post({post, setPosts}) {

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
        .then(res => res.json())
        .then(data => {
        console.log(data);
        setPosts((data) =>
            data.filter((data) => data.id !== postToRemove.id)
            );
        }
    )};

    const handleNewPost = () => {
        setIsSelected(true)
    }

    return (
        <PostStyle>
            <ButtonStyle>
            <div>
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
        <ButtonStyle>
            <button type="button" onClick={handleNewPost}>Edit Post</button>
        </ButtonStyle>
        }
        </div>
            <button onClick={handleRemovePost}>Delete</button>
            </ButtonStyle>
            <img src="" />
            <h1>{post.title}</h1>
            <h3>{post.user.username}</h3>
            <img src={post.photos} alt={post.title} />
            <p>
                {post.body}
            </p>
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