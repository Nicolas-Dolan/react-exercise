import useNasaJSONQuery from "../../hooks/useNasaJSONQuery";
import { ItemsType } from "../../types";

type AudioResultProps = {
  item: ItemsType;
};

export const AudioResult = ({ item }: AudioResultProps) => {
  const { href } = item;
  const { data } = useNasaJSONQuery(href);
  if (!href) {
    return <p>Could not load audio</p>;
  }
  const audioSources =
    data && data.map((url) => <source src={url} key={url} type="audio/mp3" />);

  return (
    <>
      <audio controls>
        {audioSources}Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioResult;
