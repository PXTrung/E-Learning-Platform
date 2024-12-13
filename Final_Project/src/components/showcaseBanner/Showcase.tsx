import showcaseImage from "../../assets/images/E-Learning.png";

const Showcase = () => {
  return (
    <div className="showcase">
      <div className="showcase-container">
        <div className="showcase-left-content">
          <h2>EStu on Youtube</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum numquam
            voluptatem, quam ea ipsum inventore laborum ducimus cupiditate iusto
            nihil deleniti, sint et ullam Aliquid?
          </p>
          <div>
            <a className="btn btn-transparent">Join now</a>
          </div>
        </div>

        <div className="showcase-right-content">
          <img src={showcaseImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
