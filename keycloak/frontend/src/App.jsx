import { useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./config/axios";
import keycloak from "./config/keycloak";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [response, setResponse] = useState(null);
  const [useCase, setUseCase] = useState("");

  useEffect(() => {
    console.log(keycloak.authenticated);
    keycloak
      .init({ onLoad: "check-sso" })
      .then((authenticated) => {
        if (authenticated) {
          setAuthenticated(true);
          console.log("authenticated");
        } else {
          setAuthenticated(false);
          console.log("not authenticated");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function makeRequest(url) {
    axiosInstance
      .post(`${url}/${useCase}`, {
        useCase: useCase,
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((e) => {
        if (e.response) {
          setResponse(e.response.data.error);
          return;
        }
        setResponse(e.data);
      });
  }

  return (
    <div className="App">
      {authenticated ? (
        <div>
          <h1>Authenticated</h1>
          <div>
            <label htmlFor="useCase">Use Case: </label>
            <input
              type="text"
              id="useCase"
              onChange={(event) => {
                setUseCase(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={() => keycloak.logout()}>Logout</button>
            <button onClick={() => makeRequest("http://localhost:3000/admin")}>
              admin
            </button>
            <button onClick={() => makeRequest("http://localhost:3000/user")}>
              user
            </button>
            <button onClick={() => makeRequest("http://localhost:3000/all")}>
              all
            </button>
          </div>
          <div>
            <h2>{response}</h2>
          </div>
        </div>
      ) : (
        <div>
          <h1>Not Authenticated</h1>
          <button onClick={() => makeRequest("http://localhost:3000/all")}>
            all
          </button>
          <button onClick={keycloak.login}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
