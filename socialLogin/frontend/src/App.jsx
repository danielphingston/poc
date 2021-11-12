import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const login = () => {
        console.log(userName);
        fetch("http://localhost:4000/login");
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    <label htmlFor="">username</label>
                    <input
                        onChange={(event) => setUserName(event.target.value)}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                    />
                </div>
                <button onClick={login}>submit</button>
            </header>
        </div>
    );
}

export default App;
