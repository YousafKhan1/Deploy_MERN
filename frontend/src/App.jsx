import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");  // State for feedback messages

  axios.defaults.withCredentials = true;
  axios.post('https://deploy-mern-vercel-api.vercel.app/register', { name, email, password })
  .then(result => console.log(result))
  .catch(err => console.log(err));



  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password) {
      setMessage("Please fill out all fields.");
      return;
    }

    axios.post("https://deploy-mern-vercel-api.vercel.app/register", { name, email, password })
      .then((result) => {
        console.log(result);
        setMessage("Registration successful!");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Registration failed. Please try again.");
      });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const attemptRequest = (retries = 3) => {
//         axios.post('https://deploy-mern-vercel-pi.vercel.app/register', {name, email, password})
//         .then(result => console.log(result))
//         .catch(err => {
//             console.log(err);
//             if (retries > 0) {
//                 setTimeout(() => attemptRequest(retries - 1), 1000);
//             }
//         });
//     };

//     attemptRequest();
// };


  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        {message && <p>{message}</p>}  {/* Display feedback messages */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p>Already Have an Account?</p>
          <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
