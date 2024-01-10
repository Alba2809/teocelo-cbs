function ArrowRoutes({ day }) {
  return (
    <div className="flex items-center relative">
      <div className="bg-[#6D1610] h-10 lg:h-20 w-[125px] lg:w-[250px] flex justify-center items-center shrink-0 lg:text-3xl text-xl text-white font-extrabold font-sans">
        <p>{day}</p>
      </div>
      <div className="lg:w-20 lg:h-20 w-10 h-10 lg:-ml-6 -ml-3 overflow-hidden z-40">
        <div className="lg:w-20 lg:h-20 w-10 h-10 transform rotate-45 bg-[#6D1610] lg:-ml-4 -ml-2"></div>
      </div>
      <div className="lg:w-20 lg:h-20 w-10 h-10 lg:-ml-14 -ml-7 overflow-hidden z-30">
        <div className="lg:w-20 lg:h-20 w-10 h-10 transform rotate-45 bg-white lg:-ml-4 -ml-2"></div>
      </div>
      <div className="lg:w-20 lg:h-20 w-10 h-10 lg:-ml-10 -ml-5 overflow-hidden z-20">
        <div className="lg:w-20 lg:h-20 w-10 h-10 transform rotate-45 bg-[#6D1610] lg:-ml-6 -ml-3"></div>
      </div>
      <div className="lg:w-20 lg:h-20 w-10 h-10 lg:-ml-16 -ml-8 overflow-hidden z-10">
        <div className="lg:w-20 lg:h-20 w-10 h-10 transform rotate-45 bg-white lg:-ml-4 -ml-2"></div>
      </div>
      <div className="lg:w-20 lg:h-20 w-10 h-10 lg:-ml-11 -ml-[1.35rem] overflow-hidden">
        <div className="lg:w-20 lg:h-20 w-10 h-10 transform rotate-45 bg-[#6D1610] lg:-ml-6 -ml-3"></div>
      </div>
    </div>
  );
}

export default ArrowRoutes;
