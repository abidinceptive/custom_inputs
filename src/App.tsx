// import "./App.css";
import { APIProvider as GoogleMapAPIProvider } from "@vis.gl/react-google-maps";

import EditableGoogleMap from "./components/EditableGoogleMap";
import EditableGoogleMap2 from "./components/EditableGoogleMap2";
import EditableImage from "./components/EditableImage";
import MapExample from "./components/MapExample";
import MapView, { GOOGLE_MAPS_API_KEY } from "./components/MapView";
import ItemList from "./dashboard-items/ItemList";
import Orders from "./dashboard-orders/Orders";
import SampleSideBar from "./sidebar-sample/SampleSideBar";

function App() {
  return (
    <GoogleMapAPIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="flex justify-center items-center min-h-screen w-screen flex-col gap-5">
        <div className="w-[95vw] max-w-md">
          <EditableImage
            labelT="Image"
            imgSrc="https://placehold.co/600x400"
            onSaveImage={async (file) => {
              console.log(file);
            }}
          />
        </div>
        <div className="w-[95vw] max-w-md">
          <EditableGoogleMap
            labelT="Address"
            locationData={null}
            onSaveLocation={async (location) => {
              console.log(location);
            }}
          />
        </div>
        <div className="overflow-x-auto max-w-full">
          <ItemList />
        </div>
        <div>
          <SampleSideBar />
        </div>
        <div>
          <Orders />
        </div>
        <div>
          <MapView />
        </div>
        <MapExample />
        <div className="w-[95vw] max-w-md">
          <EditableGoogleMap2
            labelT="Address"
            locationData={null}
            onSaveLocation={async (location) => {
              console.log(location);
            }}
          />
        </div>
      </div>
    </GoogleMapAPIProvider>
  );
}

export default App;
