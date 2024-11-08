import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode as a named import
import './App.css';

function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential); // Use jwtDecode here
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "356463161957-d7vcohppcq0uh5nvi77iuehf1aijfssg.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    }
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length !== 0 &&
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      
      { user &&
        <div>
          <img src={user.picture} alt={user.name}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
