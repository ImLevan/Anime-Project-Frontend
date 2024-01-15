// import Cookies from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AnimeTable from "./AnimeTable";
import "./home.css"
import AnimeForm from "./AnimeForm";
import Cookies from "universal-cookie";
import { dayTranslations, genreTranslations } from "./Diccionarios";
import { AnimeContext } from "../../context/AnimesContext";

function Home() {

  //Esto lo estoy probando para extraer la ID del usuario y poder utilizarla en las diferentes funciones
  const cookies = new Cookies();
  const userCookie = cookies.get('user');
  const userId = userCookie ? userCookie.id : null;
  const [animeForm, setAnimeForm] = useState(false);

  const { getUserShows } = useContext(AnimeContext);
  const [isAnimeListInitialized, setIsAnimeListInitialized] = useState(false);

  const [animeList, setAnimeList] = useState([
    { id: null, title: "", image: "", genre: "", emision_day: "", status: "", user_id: null },
  ]);


  useEffect(() => {
    if (userId) {
      const showAnimes = async () => {
        const value = await getUserShows(userId);
        const animes = value.map((anime) => ({
          id: anime.id,
          title: anime.title,
          image: anime.image,
          genre: genreTranslations[anime.genre] || anime.genre, 
          emision_day: dayTranslations[anime.emision_day] || anime.emision_day,
          status: anime.status,
          user_id: anime.user_id
        }));
        setAnimeList(animes);
        setIsAnimeListInitialized(true);
      };

      if(!isAnimeListInitialized) {
        showAnimes();
      }

    }
  }, [getUserShows, isAnimeListInitialized, userId]);

  const handleForm = () => {
    document.body.classList.add('modal-open');
    setAnimeForm(!animeForm);
  }

  return (
    <div className="home-root">
      <Header />
      <div className="div-home">
        <h1 className="title-home">Lista de Animes</h1>
        <button onClick={handleForm}>Agregar anime</button>
      </div>
      <AnimeTable animeList={animeList} />
      {animeForm &&
        <AnimeForm setAnimeForm={setAnimeForm} userId={userId} />
      }
      <Footer />
    </div>
  )
}

export default Home;