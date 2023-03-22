import { Video } from "./components";

function App() {

  return (
    <div className="App bg-gray-900 h-screen">
       <div className="flex justify-center items-center h-screen">
        <Video src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}></Video>
       </div>
    </div>
  )
}

export default App;
