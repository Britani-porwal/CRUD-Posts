import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk('post/getPosts',
    async ({ id }) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
    })

const PostSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        post: [],
        error: null
    },
    extraReducers: {
        [getPost.pending]: (state, action) => {
            state.loading = true
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload]
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = [action.payload]
        }
    }
})
export default PostSlice.reducer;