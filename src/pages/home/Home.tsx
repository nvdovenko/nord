import { Link } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="banner full-width">
        <img src="/pictures/banner1.jpg" alt="New Collection" />
        <div className="overlay lower">
          <p>NEW</p>
          <Link to="/catalog" className="shop-button">
            Discover now
          </Link>
        </div>
      </div>

      <div className="double-vertical">
        <div className="banner vertical">
          <img src="/pictures/banner2.jpg" alt="For her" />
          <div className="overlay">
            <p>FOR HER</p>
            <Link to="/catalog" className="shop-button">
              Shop
            </Link>
          </div>
        </div>
        <div className="banner vertical">
          <img src="/pictures/banner3.png" alt="For him" />
          <div className="overlay">
            <p>FOR HIM</p>
            <Link to="/catalog" className="shop-button">
              Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="banner wide-short">
        <img src="/pictures/banner4.jpg" alt="Limited edition" />
        <div className="overlay center">
          <p>LIMITED</p>
          <Link to="/catalog" className="shop-button">
            Don't miss out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
