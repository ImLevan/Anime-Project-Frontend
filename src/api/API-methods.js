import axios from "axios";
export const client = axios.create({
  baseURL: "anime-project-backend-production.up.railway.app/api/v1",
  //baseURL: "http://localhost:8080/api/v1",
});

export const authLogin = async (user) => {
  try {
    const response = await client.post("/login/startLogin", user);
    console.log(response.data)
    if (
      "USUARIO_ENCONTRADO" ===
      response.data?.result.sessionStatus && response.data?.result.enabled === true
    ) {
      return {userID: response.data.result.id, authLoginBoolean: true};
    }else{
      return {value: response.data.error.message, authLoginBoolean: false};
    }
  } catch (error) {
    return false;
  }
};

export const PostNewUser = async (user) => {
  try {
    const response = await client.post("/signup/user", user);
    console.log(response.data)
    if (response.data.result.value) {
      return { value: response.data.result.message, registeredUser: false };
    }
    return { userID:response.data.result.id ,registeredUser: true };
  } catch (error) {
    return { registeredUser: false };
  }
};

export const PostToken = async (userToken) => {
  try {
    const response = await client.post("/signup/auth", userToken);
    if (response.data.result.value) {
      return { value: response.data.result.message, authenticatedUser: false };
    }
    return { authenticatedUser: true };
  } catch (error) {
    return { authenticatedUser: false };
  }
};

export const PostNewShow = async (show) => {
  try {
    const response = await client.post("/show/save", show);
    console.log(response.data)
    if (response.data.result.value) {
      return { value: response.data.result.message, postedShow: false };
    }
    return { postedShow: true };
  } catch (error) {
    return { postedShow: false };
  }
};


export const GetUserShows = async (id) => {
  try {
    const response = await client.get(`/show/getUserShows/${id}`);
    return { allUserShows: response.data, getUserShow: true };
  } catch (error) {
    return { getUserShow: false };
  }
};

export const DeleteShow = async (showID) => {
  try{
    const response = await client.delete(`/show/deleteShow/${showID}`);
    console.log(response.data)
    if(response.data != null){
      return {value: response.data, deleteShow: true};
    }
  }catch{
    return {deleteShow: false};
  }
}

export const ModifyShow= async (showID, show) => {
  try{
    const response = await client.put(`/show/modifyShow/${showID}`, show);
    console.log(response.data)
    if(response.data.error.message){
      return {value: response.data.error.message, updateShow: false};
    }
    return {updateShow: true};
  }catch{
    return {updateShow: false};
  }
}
