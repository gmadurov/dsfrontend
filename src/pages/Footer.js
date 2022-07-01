import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="columns"> */}
      {/* <div className="column is-one-forth"></div> */}
      <div className="content has-text-centered">
        <h6>Copyright @ 2022</h6>
        <p>Version 20.4.0</p>
      </div>
      <div className="content has-text-right">
        <p href="https://bulma.io/documentation/">
          <b>Legal</b>
        </p>
        <Link to="/privacy">
          <p>Privacy</p>
        </Link>
      </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
