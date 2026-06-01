import './FloatingAura.css';
import aura1 from '../assets/aura1.png';
import aura2 from '../assets/aura2.png';
import aura3 from '../assets/aura3.png';
import aura4 from '../assets/aura4.png';


export default function FloatingAura() {
  return (
   
        <div className="container">
        <div className="row">

            <div className="col-md-3 mb-4">
                 <div className="aura-wrapper">
      <div className="blob-aura"></div>
      <img src={aura1} alt="Natural Ingredients" className="face-image" />
      </div>
                <h5>🌿 Natural Ingredients</h5>
                <p>Made with pure and skin-friendly natural extracts.</p>
            </div>

            <div className="col-md-3 mb-4">
              <div className="aura-wrapper">
      <div className="blob-aura"></div>
      <img src={aura2} alt=" Science-Based" className="face-image" />
      </div>
                <h5>🧪 Science-Based</h5>
                <p>Formulated with proven ingredients for real results.</p>
            </div>

            <div className="col-md-3 mb-4">
              <div className="aura-wrapper">
      <div className="blob-aura"></div>
      <img src={aura3} alt="Deep Hydration" className="face-image" />
      </div>
                <h5>💧 Deep Hydration</h5>
                <p>Keeps your skin soft, smooth, and moisturized.</p>
            </div>

            <div className="col-md-3 mb-4">
              <div className="aura-wrapper">
      <div className="blob-aura"></div>
      <img src={aura4} alt="Cruelty-Free" className="face-image" />
      </div>
                <h5>🐰 Cruelty-Free</h5>
                <p>Never tested on animals. Safe and ethical skincare.</p>
            </div>
            </div>
            
    </div>
  
    
  );
}
