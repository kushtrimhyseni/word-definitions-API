import React from "react";

const Navbar = () => {
  return (
    <div className="container-fluid w-full relative bg-[#eee] p-6">
      <div className="flex flex-wrap items-center justify-between max-w-[1140px] mx-auto">
        <span className="inline-block pt-1 pb-1 mr-4 text-xl whitespace-no-wrap">
          Free Dictionary API
        </span>
        <span>GitHub</span>
      </div>
    </div>
  );
};

export default Navbar;
