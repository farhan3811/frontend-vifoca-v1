import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function CardDefault() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="container py-16 px-20 bg-ground">
      <Card className="w-full flex items-center justify-center py-6 px-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQTpxbRPhcSYYe6erG9owPSWKJkYjSFu8X65PUK0S-SJOBYEkaPU_x1yJt44T9ehLpLU&usqp=CAU"
          className="flex items-center justify-between"
          width={150}
          alt="profile-picture"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 mt-2 font-title"
        >
          Gerak Parabola
        </Typography>
        <Typography className="text-center font-title">
          Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
          lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
          elementum tellus.
        </Typography>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Card className="mt-6 h-96">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium font-title"
              >
                Tutorial
              </Typography>
            </CardBody>
            <Typography className="flex justify-center items-center rounded-md">
              <iframe
                width="560"
                height="280"
                src="https://www.youtube.com/embed/FDjqhoWwb40?si=qVTCK18CT4lHLobe"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </Typography>
          </Card>
        </div>
        <div>
          <Card className="mt-6 h-96">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium font-title"
              >
                Latihan
              </Typography>
            </CardBody>
            <div className="px-8">
              <Accordion
                open={open === 1}
                className="mb-2 rounded border border-blue-gray-100 px-4"
              >
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2 ">
                    {" "}
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className={`border-b-0 font-tiitle text-sm transition-colors ${
                        open === 1 ? "text-black hover:!text-blue-700" : ""
                      }`}
                    >
                      Judul Soal
                    </AccordionHeader>
                  </div>
                  <div className="flex justify-end items-center mr-4">
                    <button className="btn btn-sm bg-sulit font-title font-medium text-white">Sulit</button>
                  </div>
                  <div className="flex justify-end items-center">
                    <button className="btn btn-sm px-10 bg-blue font-title font-medium text-white">Kerjakan</button>
                  </div>
                </div>
                <AccordionBody className="pt-0 text-base font-title">
                  We&apos;re not always in the position that we want to be at.
                  We&apos;re constantly growing. We&apos;re constantly making
                  mistakes. We&apos;re constantly trying to express ourselves
                  and actualize our dreams.
                </AccordionBody>
              </Accordion>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CardDefault;
