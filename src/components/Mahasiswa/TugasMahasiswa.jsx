import React from "react";
import { 
    Card, 
    CardBody, 
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function CardDefault() {
    const data = [
        {
          label: "HTML",
          value: "html",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "React",
          value: "react",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
     
        {
          label: "Vue",
          value: "vue",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
     
        {
          label: "Angular",
          value: "angular",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
     
        {
          label: "Svelte",
          value: "svelte",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
      ];
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
            {/* Repeat similar blocks as needed */}
            <Tabs id="custom-animation" value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CardDefault;
