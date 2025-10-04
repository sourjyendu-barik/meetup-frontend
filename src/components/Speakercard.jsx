export default function Speakecard({ details }) {
  const { image, name, role } = details;
  return (
    <div className="card text-center">
      <img
        src={image}
        alt={role}
        className="rounded-circle m-4"
        style={{
          width: "8rem",
          height: "8rem",
          objectPosition: "60% 50%",

          objectFit: "cover",
        }}
      />

      <div className="card-body">
        <p className="mb-0">
          <strong>{name}</strong>
        </p>
        <p className="mt-0">{role}</p>
      </div>
    </div>
  );
}
