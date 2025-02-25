import "./App.css";
import EditableGoogleMap from "./components/EditableGoogleMap";
import EditableImage from "./components/EditableImage";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col">
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
    </div>
  );
}

export default App;
