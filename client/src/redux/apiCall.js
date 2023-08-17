import {  logOut} from "./userSlice";


// export const login = async(dispatch, user)=>{
//     dispatch(loginStart());
//     try {
//         console.log(user);
//         const res = await axios.post("/auth/login", user);
//         dispatch(loginSuccess(res.data));
//     }catch(err){
//         dispatch(loginFaiure());
//     }
// }

export const logout= (dispatch)=>{
    dispatch(logOut());
}