import { useState } from "react";
import { Text, Box, Heading, Collapse } from "@cruk/cruk-react-components";
import { ItemsType, MediaType } from "../../types";
import ImageResult from "./ImageResult";
import AudioResult from "./AudioResult";
import VideoResult from "./VideoResult";

type ResultProps = {
  item: ItemsType;
};

const Result = ({ item }: ResultProps) => {
  const [descVisible, setDescVisible] = useState(false);

  const description = item.data[0]?.description;
  const id = item.data[0]?.nasa_id;
  const mediaType = item.data[0]?.media_type || null;
  const mediaComponents = {
    image: <ImageResult item={item} />,
    audio: <AudioResult item={item} />,
    video: <VideoResult item={item} />,
  };
  const title = item.data[0]?.title;
  const dateCreated = item.data[0]?.date_created;
  const date = dateCreated
    ? new Date(dateCreated).toLocaleDateString("en-uk", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Box backgroundColor="primary">
      <Heading h5 textColor="textOnPrimary">
        {title}
      </Heading>
      {date && <Text textColor="textOnPrimary">{date}</Text>}
      {mediaType && mediaComponents[mediaType as MediaType]}
      <hr style={{ marginTop: "1rem" }} />
      <Collapse
        id={id || "id"}
        headerTitleText={descVisible ? "Hide description" : "View description"}
        headerTitleTextColor="textOnPrimary"
        onOpenChange={setDescVisible}
      >
        <Text textColor="textOnPrimary">{description}</Text>
      </Collapse>
    </Box>
  );
};

export default Result;
