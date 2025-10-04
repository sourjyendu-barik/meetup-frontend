import { useParams } from "react-router";
import Header from "../components/Header";
import { IndianRupee, Clock4, MapPin } from "lucide-react";
import Speakecard from "../components/Speakercard";
import useFetch from "../useFetch";
export default function Details() {
  const current_id = useParams().id;
  // console.log(current_id);
  const { data, loading, error } = useFetch(
    `https://meetup-backend-two.vercel.app/meetings/id/68e0c402a96045ffa1475539`
  );
  console.log(data);
  return (
    <div className="bg-light">
      <Header />
      {loading && <p>Loading......</p>}
      {error && <p>Error whiling fetching data</p>}
      {data && (
        <section className="mb-4">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="col-md-8 mb-5">
                  <h1>{data.title}</h1>
                  <p className="mb-0">Hosted By:</p>
                  <p className="mt-0">
                    <strong>{data.hostedBy}</strong>
                  </p>
                  <img
                    src={data.image}
                    alt={data.title}
                    className="img-fluid rounded h-25"
                  />
                  <h3 className="mt-2">Details</h3>
                  <p>{data.details}</p>
                  <h3>Additional Information</h3>
                  <p className="mb-0">
                    <strong> Dress Code: </strong>
                    {data.additionalInfo.dressCode}
                  </p>
                  <p className="mt-0">
                    <strong> Age Restriction: </strong>
                    {data.additionalInfo.ageRestriction}
                  </p>
                  <h3>Event Tags:</h3>
                  <div className="mt-3">
                    {data.tags.map((tag, index) => {
                      return (
                        <span
                          key={index}
                          className="p-2 mx-2 text-white rounded bg-danger"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <article className="mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center py-2">
                        <Clock4 size={20} className="me-2" />
                        <p className="mb-0">
                          {data.schedule.date} at {data.schedule.startTime} to{" "}
                          <br />
                          {data.schedule.date}
                          {data.schedule.endTime}
                        </p>
                      </div>
                      {data.schedule.mode === "offline" && (
                        <div className="d-flex align-items-center py-2">
                          <MapPin size={20} className="me-2" />
                          <p className="mb-0">{data.schedule.address}</p>
                        </div>
                      )}
                      {data.payment.type === "paid" && (
                        <div className="d-flex align-items-center py-2">
                          <IndianRupee size={20} className="me-2" />
                          <p className="mb-0">{data.payment.price}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
                <section className="mb-3">
                  <h3>Speakers:({data.speakers.length})</h3>
                  <div className="row">
                    {data.speakers.map((speaker, index) => (
                      <div key={index} className="col-6">
                        <Speakecard details={speaker} />
                      </div>
                    ))}
                  </div>
                </section>

                <button className="btn btn-danger d-block mx-auto w-50">
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
