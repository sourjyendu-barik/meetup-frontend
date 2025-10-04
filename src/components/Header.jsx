import { useState } from "react";
import { NavLink } from "react-router";

export default function Header({ onSearch, allData }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lower = value.toLowerCase();
    const matched = allData
      .map((event) => [event.title, ...event.tags])
      .flat()
      .filter((item) => item.toLowerCase().includes(lower));

    // remove duplicates
    const unique = [...new Set(matched)];

    setSuggestions(unique.slice(0, 5)); // show top 5
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <header className="bg-light">
      <div className="container p-2">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img
                src="https://cdn.freebiesupply.com/logos/large/2x/meetup-2-logo-png-transparent.png"
                alt="Meet up"
                className="d-inline-block align-text-top"
                width={120}
                height={40}
              />
            </NavLink>
            <div style={{ position: "relative", width: "300px" }}>
              <input
                type="text"
                placeholder="Search by title or tag"
                className="form-control"
                value={input}
                onChange={handleInput}
              />
              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{ top: "100%", zIndex: 1000 }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>
        <hr />
      </div>
    </header>
  );
}
