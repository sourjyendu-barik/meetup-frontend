import { Link } from "react-router";

export default function Card({ data }) {
  const { title, image, schedule, _id } = data;

  return (
    <div className="col-md-4 mt-3">
      <div className="card border-0 position-relative">
        <Link to={`/detail/${_id}`}>
          <img src={image} alt={title} className="img-fluid rounded" />
        </Link>

        <span className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-white text-dark rounded small">
          {schedule.mode === "online" ? "Online Event" : "Offline Event"}
        </span>

        <p className="mb-1">
          {schedule.date}, {schedule.startTime} , {schedule.endTime} IST
        </p>
        <h5 className="mt-0">{title}</h5>
      </div>
    </div>
  );
}
