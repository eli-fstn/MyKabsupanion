import maintenance from "../assets/illustrations/maintenance.svg";

function Error503() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* IMAGE */}
      <img src={maintenance} alt="Error 503" className="w-40 md:w-70 mb-6" />

      {/* STATUS CODE */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">We'll be right back.</h1>

      {/* DESCRIPTION */}
      <p className="text-gray-500 mt-4 text-xs md:text-lg">Kabsupanion is currently undergoing maintenance. Please check back soon!</p>
    </div>
  );
}

export default Error503;