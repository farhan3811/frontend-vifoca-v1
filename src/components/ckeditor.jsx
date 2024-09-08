import React from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Editor from "../components/EditorMahasiswa";

function App() {
  return (
    <div className="container px-20">
      <Card className="mt-6 w-full my-10">
          <div className="flex flex-row bg-blue py-4">
            <div>
              <div className="card bg-base-100 w-96 m-6">
                <div className="card-body h-56">
                </div>
              </div>
            </div>
            <div>
              <Typography className="text-white mt-10 mr-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </Typography>
            </div>
          </div>
        <CardBody>
          <Editor />
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
