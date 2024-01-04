import { NavLink } from "react-router-dom";

export default function NavBar({SetSearch , search}) {
    const handleSearch = (e) => {
        SetSearch(e.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Movies & Shows
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                </form>
            </div>
        </nav>
    );
}
