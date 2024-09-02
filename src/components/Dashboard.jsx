import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="card rounded-none card-side bg-base-100 shadow-xl">
        <div className="grid grid-cols-4 gap-4">
          <div>
            {" "}
            <div className="card-body col-span-3">
              <h2 className="card-title">New movie is released!</h2>
              <p>Click the button to watch on Jetflix app.</p>
            </div>
          </div>
          <div>09</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
