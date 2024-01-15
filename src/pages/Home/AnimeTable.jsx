/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import "./animeTable.css"
import { useContext, useState } from "react";
import { AnimeContext } from "../../context/AnimesContext";
import ModalComponent from "./ModalComponent";

const AnimeTable = ({ animeList }) => {

  const { deleteShow, updateShowState } = useContext(AnimeContext);
  const [open, setOpen] = useState(false);


  const [selectedAnime, setSelectedAnime] = useState(null);
  const handleModalOpen = (anime) => {
    setSelectedAnime(anime);
    setOpen(true);
  }
  const handleModalClose = () => setOpen(false);

  //Dropdown de estado
  const [animeState, setAnimeState] = useState('');

  const handleChange = (event) => {
      setAnimeState(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);

    const updatedAnime = { ...selectedAnime, status: animeState };
    try {
      //Enviar anime a una funcion del UserContext para almecenarlo en la base de datos
      await updateShowState(updatedAnime.id, updatedAnime);
    } catch (error) {
      console.error('Error al borrar anime:', error);
      // Manejar el error aquí sea necesario.
    }
  }


  const handleDelete = async (id) => {
    //Probar despues con implementar un modal de confirmacion
    const confirmed = window.confirm("¿Seguro que quieres borrar este anime?");

    if(confirmed){
      await deleteShow(id);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>En emisión/viendo</th>
          <th>Esperando temporada</th>
          <th>Pausadas por mí</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{renderAnimeCell(animeList.filter(anime => anime.status === 'En emisión'), handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange)}</td>
          <td>{renderAnimeCell(animeList.filter(anime => anime.status === 'Esperando temporada'), handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange)}</td>
          <td>{renderAnimeCell(animeList.filter(anime => anime.status === 'Pausadas por mí'), handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange)}</td>
        </tr>
      </tbody>
    </table>
  );
};

const renderAnimeCell = (animes, handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange) => {

  return (
    <ul className="anime-list">
      {animes.map((anime) => (
        <li key={anime.id}>
          <img src={anime.image} alt={anime.title} />
          <div className="table-anime-info">
            <a href={`https://www.crunchyroll.com/search?q=${encodeURIComponent(anime.title)}`} title="Buscar en Crunchyroll" target="_blank" rel="noreferrer">
              <strong>{anime.title}</strong>
            </a>
            <div className="div-anime-props">
                {anime.status === 'En emisión' ?(
                  <><div className="anime-props"><p>{anime.emision_day}</p></div><div className="anime-props"><p>{anime.genre}</p></div></>
                ):(
                  <div className="anime-props"><p>{anime.genre}</p></div>
                )}
            </div>
            <IconButton aria-label="delete" className="button-delete" title="Borrar anime" onClick={() => handleDelete(anime.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="move" className="button-move" title="Mover anime" onClick={() => handleModalOpen(anime)}>
              <CompareArrowsIcon />
            </IconButton>
            <ModalComponent
              open={open}
              onClose={handleModalClose}
              animeState={animeState}
              handleChange={handleChange}
              handleClick={handleClick}
              loading={loading}
            />
            {/* Agrega más información según sea necesario */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AnimeTable;
