import "./search.css"

type SearchProps = {
    searchValue: string;
    handleSearchChange: (newValue: string) => void;
    handleSearchSubmit: () => void;
};

export function Search({
    searchValue, 
    handleSearchChange,
    handleSearchSubmit
}: SearchProps) {
    return(
        <form
            className="search-form"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
            }}
        >
            <input 
                type="text" 
                placeholder="Search sellers by name" 
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
            />
            <button type="submit">
                Search
            </button>
        </form>
    );
}
