import './GlobalHero.css';

const GlobalHero = ({ title, breadcrumb, bgImage }) => {
  return (
    <div className="global-hero" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="global-hero-overlay"></div>
      <div className="container global-hero-content">
        <h1 className="global-hero-title">{title}</h1>
        {breadcrumb && <p className="global-hero-breadcrumb">{breadcrumb}</p>}
      </div>
    </div>
  );
};

export default GlobalHero;
