import "./Footer.css";

function Footer() {
  const currDate = new Date();
  const currYear = currDate.getUTCFullYear();

  return (
    <footer>
      <div>
        {`Copyright ©${currYear} Discount Ebay Inc. All Rights Reserved.`}{" "}
      </div>
      <div className="gp-member">
        Group Members: Christian Bugtai, Nick Gowler, Pinyi Rao
      </div>
    </footer>
  );
}

export default Footer;
