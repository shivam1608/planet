import { Video } from "./components";

function App() {

  return (
    <div className="App bg-gray-900 h-screen">
       <div className="flex justify-center items-center h-screen">
        <Video className="w-5/12 md:w-6/12 lg:w-7/12 h-auto" src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}></Video>
       </div>
    </div>
  )
}

export default App;
