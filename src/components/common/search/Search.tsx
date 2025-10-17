interface SearchProps {
    searchValue: string, 
    toggleSearch?: Boolean
    handleSearchChange: (newValue: string) => void,
}
export function Search({searchValue, handleSearchChange, toggleSearch=true}: SearchProps) {
    return(
        <form className="search-form" action="#">
            <input type="text" 
                name="field-term" 
                placeholder="Search sellers by name" 
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
            />
            {toggleSearch && <input type="submit" value="Search" />}
        </form>
    );
}
