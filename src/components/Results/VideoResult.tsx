// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/media-has-caption */
import useNasaJSONQuery from "../../hooks/useNasaJSONQuery";
import { ItemsType } from "../../types";

type VideoResultProps = {
  item: ItemsType;
};

export const VideoResult = ({ item }: VideoResultProps) => {
  const { href } = item;

  const { data } = useNasaJSONQuery(href);

  if (!href) {
    return <p>Could not load video</p>;
  }

  const videoSources =
    data && data.map((url) => <source src={url} key={url} type="video/mp4" />);

  return (
    <>
      <video width="320" height="240" controls>
        {videoSources}
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default VideoResult;
