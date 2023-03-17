import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../Redux/features/PostSlice";
import './Posts.css'

const Posts = () => {
    const [id, setId] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading , post} = useSelector(state => ({...state.app}))

    const handleFetch = (e) => {
        e.preventDefault()
        if(id){
            dispatch(getPost({id}))
            setId("")
        }
    }
    return (<div>
        <label>Search Post by Post ID : </label>
        <input
            className="searchField"
            type="number"
            value={id}
            onChange={(e)=> setId(e.target.value)}
        />
        <div>
            <button type="submit" onClick={handleFetch}>Fetch Post</button>
            <button type="submit" onClick={() => navigate("/create")}>Create Post</button>
        </div>
    </div>)
}

export default Posts;
