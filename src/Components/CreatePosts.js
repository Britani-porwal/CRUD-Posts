import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../Redux/features/PostSlice";

const CreatePosts = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [values, setValues] = useState({ title: "", body: "" })
    const { title, body } = values;
    const [displayPost, setDisplayPost] = useState(false)
    const { loading, post } = useSelector(state => ({ ...state.app }))

    const handlePost = (e) => {
        e.preventDefault()
        if (title) {
            dispatch(createPost({ values }))
            setValues({ title: "", body: "" })
            setDisplayPost(true)
        }
        else {
            window.alert("Enter Title for Your Post")
        }
    }

    const publishPost = () => {
        return (<>
            {loading ? <h2>Loading...</h2> : (
                <>
                    {post.length > 0 &&
                        <div className="postHolder">
                            <p className="postTitle">{post[0].title}</p>
                            <p className="postBody">{post[0].body}</p>
                        </div>}
                </>
            )}
        </>)
    }
    
    return (<div>
        <form>
            <input
                placeholder="Enter Post Title"
                value={title}
                onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
            <textarea
                placeholder="Create Post"
                value={body}
                onChange={(e) => setValues({ ...values, body: e.target.value })}
            />
            <button onClick={() => navigate("/")}>Back</button>
            <button
                type="submit"
                onClick={handlePost}>Post</button>
        </form>
        <div>
            {displayPost && publishPost()}
        </div>
    </div>)
}

export default CreatePosts;