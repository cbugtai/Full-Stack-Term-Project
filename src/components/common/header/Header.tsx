import "./Header.css";

function Header() {
  return (
    <header>
      <img
        src="/logo-250-250.png"
        style={{ width: "25px", height: "25px" }}
        alt="application logo"
      ></img>
      <div>
        <strong>Welcome to RRC Discount Ebay!</strong>
      </div>
    </header>
  );
}

export default Header;
