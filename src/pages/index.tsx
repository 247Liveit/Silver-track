import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      
      <h2 className="font-heading my-2 text-2xl font-bold mb-10">
        ACS Tracking
      </h2>
      <Link className="bg-gray-300 p-3 rounded-2xl border-1" to={"/login"}>
        LOGIN
      </Link>
    </div>
  );
}
