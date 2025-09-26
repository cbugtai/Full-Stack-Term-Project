import "./Header.css";

function Header() {
  return (
    <header>
      <img
        src="/logo-250-250.png"
        alt="application logo"
        className="app-logo"
      ></img>
      <div>
        <strong>Welcome to RRC Discount Ebay!</strong>
      </div>
    </header>
  );
}

export default Header;
