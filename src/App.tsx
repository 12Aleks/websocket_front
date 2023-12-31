import './App.css';
import {socket, WebsocketContext} from "./contexts/WebsocketContext";
import Websocket from "./components/Websocket";

function App() {
  return (
      <WebsocketContext.Provider value={socket}>
           <Websocket/>
      </WebsocketContext.Provider>
  );
}

export default App;
