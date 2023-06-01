import Image from "next/image";
import { ItemsType } from "../../types";

type ImageResultProps = {
  item: ItemsType;
};

export const ImageResult = ({ item }: ImageResultProps) => {
  const src = item.links[0]?.href;
  const alt = item.data[0]?.title;

  if (!src) {
    return <p>Could not load image</p>;
  }

  return (
    <>
      <Image src={src || ""} alt={alt || ""} width="300px" height="200px" />
    </>
  );
};

export default ImageResult;
