import "./Footer.css";

function Footer() {
  const currDate = new Date();
  const currYear = currDate.getUTCFullYear();

  return (
    <footer>
      <p>{`Copyright ©${currYear} RRC Marketplace Inc. All Rights Reserved.`} </p>
      <p className="gp-member">
        Group Members: Christian Bugtai, Nick Gowler, Pinyi Rao
      </p>
    </footer>
  );
}

export default Footer;
