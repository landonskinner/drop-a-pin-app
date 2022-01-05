import React, {useState} from 'react'
import styled from 'styled-components';

function PostForm() {

    const [isSelected, setIsSelected] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        photos: "",
        user_id: 1
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          };
          e.preventDefault();
          
        // update fetch path once completed on backend  
          fetch("/posts", configObj).then((resp) => {
            if (resp.ok) {
              resp.json().then(() => {
                  console.log(formData)
                setFormData({
                    title: "",
                    body: "",
                    photos: "",
                    user_id: 1
                });
                setIsSelected(false);
              });
            } else {
              resp.json().then((errors) => {
                console.error(errors);
              });
            }
          });
    }

    const handleNewPost = () => {
        setIsSelected(true)
    }

    return (
        <div>
        {isSelected ? 
        <FormStyle>   
        <form onSubmit={handleSubmit}>
            <h2>Share Your Travels...</h2>
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
                <label htmlFor="photos">Photos </label>
                <input
                    type="text"
                    name="photos"
                    value={formData.photo}
                    onChange={(e) => handleChange(e)}
                />
            </p>
            <p>
                <button type="submit">Post!</button>
            </p>
        </form>
        </FormStyle> 
        :
        <ButtonStyle>
            <button type="button" onClick={handleNewPost}>Share Your Travels!</button>
        </ButtonStyle>
        }
        </div>
    )
}

export default PostForm

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