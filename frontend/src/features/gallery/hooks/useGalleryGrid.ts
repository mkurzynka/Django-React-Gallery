import { useContext } from "react";
import { NUMBER_OF_PICTURES_PER_PAGE } from "../../../utils/constants";
import { SettingsContext } from "../components/GalleryContext";

export const useGalleryGrid = (page: number) => {
  const { delay } = useContext(SettingsContext);

  const delays = Array(NUMBER_OF_PICTURES_PER_PAGE)
    .fill(1)
    .map((_item, index) => (delay ? index * delay + 1 : undefined));

  const indexes = Array(NUMBER_OF_PICTURES_PER_PAGE)
    .fill(1)
    .map((_item, index) => (page - 1) * NUMBER_OF_PICTURES_PER_PAGE + index);

  return { delays, indexes };
};
