import Header from "../../components/Header";
import hero1 from "../../assets/images/heroy.webp" //1920 x 900
import card1 from "../../assets/images/services-cards/organizate.webp"
import card2 from "../../assets/images/services-cards/listaImg.webp"
import card3 from "../../assets/images/services-cards/shareList.webp"
//import infoImg from "../../assets/images/info-section/Imagen-beneficio-1_-agenda-online@2x-8.webp"
import "./Landing.css";
import "../../index.css";
import Footer from "../../components/Footer";


const Landing = () => {


  return (
    <>
      <div className="">
        <Header />
        <div className="landing-content">
          <section id="hero">
            <div className='img-carousel'>
              <img src={hero1} alt="Oferta 1" />
            </div>
          </section>
          <section id="services">
            <div className="services-titles">
              <h2>Anime Tracker es la opción que te permite llevar el hilo de los anime que estás viendo</h2>
              <p>Déja de anotarlos en tu anotador y crea tu propia agenda de anime para que no te olvides de tus animes favoritos</p>
            </div>
            <div className="services-cards">
              <div className="services-card">
                <img src={card2} alt="Card 1" />
                <h3>Lista de animes</h3>
                <p>Organiza tus animes favoritos en una tabla fácil de usar para tu comodidad</p>
              </div>
              <div className="services-card">
                <img src={card1} alt="Card 2" />
                <h3>Seguimiento de animes</h3>
                <p>Haz un seguimiento de tu progreso en los animes que estás viendo</p>
              </div>
              <div className="services-card">
                <img src={card3} alt="Card 3" />
                <h3>Comparte tu lista</h3>
                <p>Muestrales a tus amigos y compara con ellos la lista de animes que creaste</p>
              </div>             
            </div>
          </section>
          {/* <section id="info">
            <div className="info-text">
              <h2>Información siempre disponible</h2>
              <p>Mantén el control de tu agenda: conoce el porcentaje de ocupación en tiempo real. <br />Accede a la información desde cualquier lugar y dispositivo con acceso a internet.</p>
              <h5>Información resguardada</h5>
              <p>Nuestro sistema de agendamiento online está diseñado para garantizar la seguridad y confidencialidad de tus datos los datos de tus clientes y de todo tu negocio.</p>
            </div>
            <div className="info-img">
              <img src={infoImg} alt="infoImg" />
            </div>
          </section> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Landing;