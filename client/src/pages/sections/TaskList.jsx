function TaskList({ studentName="Juan", tasks=5 }) {
  return(
    <section className="min-h-screen p-10">
      <div className="">
        <h1 className="text-[2.8rem] font-bold font-[amaranth] text-[#003A02]">Hello there,<span className="font-[parisienne] font-bold pl-3 text-[3.3rem]">{studentName}!</span></h1>
        <div className="mt-3">
          <p className="font-bold text-[1.3rem]">Today's Tasks</p>
          <p className="text-[1rem]">You have <span className="text-[#003A02] font-bold text-[1.3rem]">{tasks}</span> tasks ongoing. Stay focused and complete them on time!</p>
        </div>
      </div>
      <div className="mt-5">
        <button></button>
      </div>
    </section>
  );
}

export default TaskList
