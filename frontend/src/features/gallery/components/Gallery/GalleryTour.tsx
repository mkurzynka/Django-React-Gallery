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
      description: (
        <p>
          This is a gallery that shows pictures fetched from the
          https://thispersondoesnotexist.com/ website.
          <br /> You can change the picture (upload JPG file) by clicking on the
          card or by dropping the file on it.
        </p>
      ),
      target: () => refGallery.current!,
    },
    {
      title: "Pagination",
      description: (
        <p>
          This is a custom pagination component. It allows you to move through
          the gallery pages. You can also jump to desired page using 'Go to'
          component."
        </p>
      ),
      target: () => refPagination.current!,
    },
    {
      title: "Settings",
      placement: "left",
      description: (
        <p>
          This is a button that will bring up app settings. The settings modal
          allows you to define a delay between next fetch request.
          <br />
          Setting value around 400-450 ms will ensure the image randomness.
          <br />
          <b>
            This feature was added, bacause the
            https://thispersondoesnotexist.com/ seems to use clock to schedule a
            new person generation rather than generate a new image on an every
            request.
          </b>
        </p>
      ),

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
