import "../styles/RightBg.css";
import insuranceImage from "../assets/insurance.svg";

const RightBg = () => {
  return (
    <div className="right-bg-section">
      <img src={insuranceImage} alt="no image" className="right-bg-img" />
      <div className="right-bg-text">
        <h3 className="right-bg-info">
          confirm API's endpoints, methods, and integrations are functioning as expected.
        </h3>
      </div>
    </div>
  );
};

export default RightBg;