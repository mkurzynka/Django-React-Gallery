import { Button, Tour, TourProps } from "antd";
import { MutableRefObject, useState } from "react";

interface GalleryTourProps {
  refPagination: MutableRefObject<null | HTMLDivElement>;
  refSetting: MutableRefObject<null | HTMLDivElement>;
  refGallery: MutableRefObject<null | HTMLDivElement>;
}

export default function GalleryTour({
  refPagination,
  refSetting,
  refGallery,
}: GalleryTourProps) {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const steps: TourProps["steps"] = [
    {
      title: "Gallery",
      description:
        "This is gallery. It shows pictures that are fetched form the \
        https://thispersondoesnotexist.com/ website. You can change the picture \
        (upload PNG file) by clicking on it or droping the file onto the card.",
      target: () => refGallery.current!,
    },
    {
      title: "Pagination",
      description:
        "This is custom paginatin component. It allows you to move \
        through gallery pages and jump to any page.",
      target: () => refPagination.current!,
    },
    {
      title: "Settings",
      placement: "left",
      description:
        "This is button will bring up app settings. \
      Settings modal allows you to define a delay between next fetch request.\
      Setting value around 350-400 ms will ensure image randomness.\
      This feature was added, bacause the https://thispersondoesnotexist.com/ \
      seems to be using clock to schedule \
      new person generation rather than generate new image on every request",

      target: () => refSetting.current!,
    },
  ];

  return (
    <>
      <Button onClick={() => setIsTourOpen(true)}>Begin tour</Button>
      <Tour
        open={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        steps={steps}
      />
    </>
  );
}
