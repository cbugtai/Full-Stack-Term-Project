import "./Header.css";

function Header() {
  return (
    <header>
      <img
        src="/logo-250-250.png"
        height={25}
        width={25}
        alt="application logo"
      ></img>
      <div>
        <strong>Welcome to RRC Discount Ebay!</strong>
      </div>
    </header>
  );
}

export default Header;
