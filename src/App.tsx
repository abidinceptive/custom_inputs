import "./App.css";
import EditableImage from "./components/EditableImage";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[95vw] max-w-md">
        <EditableImage
          labelT="Image"
          imgSrc="https://placehold.co/600x400"
          onSaveImage={async (file) => {
            console.log(file);
          }}
        />
      </div>
    </div>
  );
}

export default App;
