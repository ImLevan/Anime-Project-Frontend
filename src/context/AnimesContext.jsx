/*eslint-disable */
import { createContext } from "react";
import {
  DeleteShow,
  GetUserShows,
  ModifyShow,
  PostNewShow,
} from "../api/API-methods";


export const AnimeContext = createContext({});

export const AnimeContextProvider = ({ children }) => {
  async function saveShow(showData, setLoading) {
    const postShow = await PostNewShow(showData);
    const { value, postedShow } = postShow;
    if (postedShow) {
      //Aca deberia poner algo para recuperar la id del usuario, y pasarlo como parametro a la ruta
      window.location.reload();
    } else {
      if (value) {
        window.alert(value);
        setLoading(false);
      }else{
        window.alert("Ocurrio un error al crear el anime");
        setLoading(false);
      }
      // setSpanAlreadyExistsUser(true);
    }
  }

  async function getUserShows(id) {
    const userShows = await GetUserShows(id);
    const { getUserShow, allUserShows } = userShows;
    if (getUserShow) {
      return allUserShows;
    } else {
      if (!getUserShow) {
        window.alert("Error al obtener los animes");
      }
    }
  }

  const deleteShow = async (showID) => {
    const deletedShow= await DeleteShow(showID);
    const { deleteShow} = deletedShow;
    if(!deleteShow){
      window.alert("Ocurrió un error al borrar el anime");

    }else{
       //Probar despues con implementar un modal de confirmacion en la pantalla
      window.alert("El anime se eliminó con exito");
      window.location.reload();
    }
  };

  const updateShowState = async (showID, show) => {
    const putShow = await ModifyShow(showID, show);
    console.log(putShow)
    const { value, updateShow} = putShow;
    if(updateShow){
      window.alert("Anime modificado con exito");
      window.location.reload();

    }else{
      if(value){
        window.alert("Ocurrio un error: ", value);
      }
    }
  };

  const providerValue = {
    saveShow,
    getUserShows,
    deleteShow,
    updateShowState
  };

  return (
    <AnimeContext.Provider value={providerValue}>
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeContextProvider;