import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "6rem",
            margin: "0 auto",
            color: "red",
          }}
        >
          404 - Page Not Found
        </h1>
        <p
          style={{
            fontSize: "2rem",
            margin: "1rem auto",
          }}
        >
          The page you are looking for does not exist.
        </p>
        <br></br>
        <div
          style={{
            width: "200px",
            height: "100px",
            margin: "0 auto",
          }}
        >
          <button className="btn" onClick={handleClick}>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
