import React from "react";
import { ThreeDot } from "react-loading-indicators";

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center">
          <ThreeDot
            variant="bounce"
            color="#10487A"
            size="large"
            text="Vifoca"
            textColor="#NaNNaNNaN"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
