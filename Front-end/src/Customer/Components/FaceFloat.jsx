// src/components/FaceFloat.jsx
import '../CSS/FaceFloat.css';
import faceImage from '../../assets/face.jpg';

export default function FaceFloat() {
  return (
    <div className="face-container">
      <img src={faceImage} alt="Floating Face" className=" img-fluid face-img" />
    </div>
  );
}
