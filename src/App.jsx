import { useEffect, useState } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Card from "./components/Card";
import useFetch from "./useFetch";

function App() {
  const { data, loading, error } = useFetch(
    "https://meetup-backend-two.vercel.app/meetings"
  );

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // 🔍 Filter function
  const filterData = (term, type) => {
    let results = data;

    if (type) {
      results = results.filter((event) => event.schedule.mode === type);
    }

    if (term) {
      const lower = term.toLowerCase();
      results = results.filter(
        (event) =>
          event.title.toLowerCase().includes(lower) ||
          event.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    }

    setFilteredData(results);
  };

  //  Handle dropdown (event type)
  const handleChange = (event) => {
    const type = event.target.value;
    setEventType(type);
    filterData(searchTerm, type);
  };

  //  Handle search input from Header
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterData(term, eventType);
  };

  return (
    <div className="bg-light">
      <Header onSearch={handleSearch} allData={filteredData} />
      <section>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h2>Meetup Events</h2>
            <select onChange={handleChange} className="form-select w-25">
              <option disabled selected>
                Select Event Type
              </option>
              <option value="">Both</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      </section>
      <main className="container">
        {loading && <p>Loading......</p>}
        {error && <p>Error whiling fetching data</p>}
        {filteredData && filteredData.length > 0 && (
          <section>
            <div>
              <div className="row gx-5">
                {filteredData.map((current_data, index) => (
                  <Card key={index} data={current_data} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
