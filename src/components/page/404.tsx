import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const ClickPushHome = () => {
    navigate("/");
  };

  return (
    <NotFoundContainer>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! Page not found</h3>
            <h1>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </div>
          <h2>we are sorry, but the page you requested was not found</h2>
          <button
            style={{
              width: "350px",
              height: "80px",
              background: "#000",
              color: "#fff",
              fontFamily: "Suit",
              fontSize: "32px",
              cursor: "pointer",
            }}
            onClick={ClickPushHome}
          >
            Home
          </button>
        </div>
      </div>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  width: 100%;
  #notfound {
    position: relative;
    height: 100vh;
  }
  .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
  }
  .notfound-404 {
    position: relative;
    height: 240px;
  }
  .notfound-404 h1 {
    font-family: "Suit-Bold", sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 252px;
    font-weight: 900;
    margin: 0px;
    color: #262626;
    text-transform: uppercase;
    letter-spacing: -40px;
    margin-left: -20px;
  }
  .notfound-404 h1 > span {
    text-shadow: -8px 0px 0px #fff;
  }
  @media (max-width: 480px) {
    .notfound-404 h1 {
      font-size: 220px;
    }
  }
  .notfound-404 h3 {
    font-family: "Anisette-Bold", sans-serif;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #262626;
    margin: 0px;
    letter-spacing: 3px;
    padding-left: 6px;
  }
  h2 {
    font-family: "Anisette-Bold", sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    color: #000;
    margin-top: 0px;
    margin-bottom: 25px;
  }
`;
