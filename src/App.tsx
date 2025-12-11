import './App.css'
import SimpleWorldMap from "./components/mapbox/Map.tsx";
import {Layout} from "./components/layout/Layout.tsx";

function App() {

  return (
      <div className="App">
          <Layout>
        <h1>My Map</h1>
        <SimpleWorldMap />
          </Layout>
      </div>

)
}

export default App
