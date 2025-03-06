// import "./App.css";
import EditableGoogleMap from "./components/EditableGoogleMap";
import EditableImage from "./components/EditableImage";
import ItemList from "./dashboard-items/ItemList";
import Orders from "./dashboard-orders/Orders";
import SampleSideBar from "./sidebar-sample/SampleSideBar";

function App() {
  return (
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
    </div>
  );
}

export default App;
