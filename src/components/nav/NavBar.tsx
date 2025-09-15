import "./NavBar.css";

const category: string[] = [
  "Text Books",
  "Electronics",
  "Furnitures",
  "Clothes",
  "Vehicles",
  "Others",
];

function NavBar() {
  return (
    <nav>
      <ul>
        {category.map((c, i) => (
          <li key={i}>
            <a href="#">{c}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
