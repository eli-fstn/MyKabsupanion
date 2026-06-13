import Navbar from "../../components/Navbar";
import TaskList from "../sections/TaskList";

function Dashboard() {
  return (
    <html className="scroll-smooth">
      <div className="bg-[#F4F4F4] min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="pt-16">
          <TaskList />
        </div>
      </div>
    </html>
    
  );
}

export default Dashboard