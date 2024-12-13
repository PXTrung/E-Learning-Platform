const ErrorPage = () => {
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
          Some Thing Went Wrong
        </h1>
        <p
          style={{
            fontSize: "2rem",
            margin: "1rem auto",
          }}
        >
          We are working our best to bring our website back to normal. Please
          hesitate!
        </p>
        <br></br>
        <div
          style={{
            width: "200px",
            height: "100px",
            margin: "0 auto",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ErrorPage;
