import "../styles/RightBg.css";
import insuranceImage from "../assets/insurance.svg";

const RightBg = () => {
    return (
      <div class="col-md-6 bg-section d-flex flex-column">
      <img src={insuranceImage} alt="no image" class="img" />
            <div class="card-body text-center">
            <h3 class="mt-2">confirm  API's endpoints, methods, and integrations are functioning as expected.</h3>
            </div>
      </div>
    );
  };
  
  export default RightBg;
  