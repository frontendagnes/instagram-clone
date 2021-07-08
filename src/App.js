import "./App.css";
//components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import PostSender from "./components/PostSender/PostSender";
function App() {
  return (
    <div className="app">
      
      <div className="app__header">
        <Header />
      </div>
      <div className="app__conatiner">
        <div className="app__feed">
          <Feed />
        </div>
        <div className="app_sidebar">
          <Sidebar />
        </div>
        <div className="app__postSender">
            <PostSender />
        </div>
      </div>
    </div>
  );
}

export default App;
