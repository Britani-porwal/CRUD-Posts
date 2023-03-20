import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getPost, setEditing, updatePost } from "../Redux/features/PostSlice";
import './Posts.css'

const Posts = () => {
    const [id, setId] = useState(0)
    const [postContent, setPostContent] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { editing, deleting, loading, post, body } = useSelector(state => ({ ...state.app })) //app (reducer) from store 

    useEffect(() => {
        if (body) {
            setPostContent(body)
        }
    }, [body])

    const handleFetch = (e) => {
        e.preventDefault()
        if (id) {
            dispatch(getPost({ id }))
            setId("")
        }
    }

    const handleDelete = ({ id }) => {
        dispatch(deletePost({ id: post[0].id }))
    }

    return (<div>
        <label>Search Post by Post ID : </label>
        <input
            className="searchField"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
        />
        <div>
            <button type="submit" onClick={handleFetch}>Fetch Post</button>
            <button type="submit" onClick={() => navigate("/create")}>Create Post</button>
        </div>
        {deleting && <h2>Deleting ...</h2>}
        {
            loading ? <h2>Loading ...</h2> : (
                <>
                    {post.length > 0 &&
                        <div className="postHolder">
                            <p className="postTitle">{post[0].title}</p>
                            {
                                editing ? (
                                    <>
                                        <textarea
                                            value={postContent}
                                            onChange={(e) => setPostContent(e.target.value)}
                                        />
                                        <div className="postButtons">
                                            <button onClick={() => {
                                                dispatch(updatePost({
                                                    id: post[0].id,
                                                    title: post[0].title,
                                                    body: postContent
                                                }))
                                                dispatch(setEditing({ editing: false, body: "" })) //second dispatch to set the editing mode & empty body contents 
                                            }}>Save</button>
                                            <button onClick={() => {
                                                dispatch(setEditing({ editing: false, body: "" }))
                                            }}  >Cancel</button>

                                        </div>
                                    </>) :
                                    <>
                                        <p className="postBody">{post[0].body}</p>
                                        <div className="postButtons">
                                            <button onClick={() => dispatch(setEditing({ editing: true, body: post[0].body }))}>Edit</button>
                                            <button onClick={handleDelete}>Delete</button>
                                        </div>
                                    </>

                            }

                        </div>}
                </>)
        }
    </div>)
}

export default Posts;
