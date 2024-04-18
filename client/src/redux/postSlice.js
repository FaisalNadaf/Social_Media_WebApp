import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    // updateComment(state,action){
    //   const {postId,comment}=action.payload;

    //   return {
    //     ...state,
    //     posts:state.posts.map((post)=>{
    //       if(post._id===postId){
    //         return {
    //           ...post,
    //           comments:[comment,...post.comments]
          
    //         }
    //       }else{
    //         return post;
    //       }

        
         
    //     })
    //   }
    
    // }
  },
});

export default postSlice.reducer;

export function SetPosts(post) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.getPosts(post));
  };
}

// export function updateComments(data){
//   return (dispatch,getState)=>{
//     dispatch(postSlice.actions.updateComment(data));

//   }
// }