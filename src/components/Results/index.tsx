import { useState, useMemo, useEffect } from "react";
import {
  Text,
  Box,
  Loader,
  ErrorText,
  Pagination,
} from "@cruk/cruk-react-components";
import { NasaResponse } from "../../types";
import Result from "./Result";

type ResultsProps = {
  data: NasaResponse | undefined;
  error: unknown;
  isFetching: boolean;
  noParams: boolean;
};

export const Results = ({
  data,
  error,
  isFetching,
  noParams,
}: ResultsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesStartIndex = useMemo(() => (currentPage - 1) * 10, [currentPage]);
  const pagesEndIndex = useMemo(() => pagesStartIndex + 10, [pagesStartIndex]);
  const results = data?.collection.items || null;

  useEffect(() => {
    if (isFetching) {
      setCurrentPage(1);
    }
  }, [isFetching]);

  if (noParams) {
    return <></>;
  }

  if (isFetching) {
    return (
      <Box marginTop="s">
        <Loader />
      </Box>
    );
  }

  if ((error as Error)?.message) {
    return (
      <Box marginTop="s">
        <ErrorText>{(error as Error).message}</ErrorText>
      </Box>
    );
  }

  if (results?.length) {
    return (
      <Box marginTop="s">
        {results.slice(pagesStartIndex, pagesEndIndex).map((result) => (
          <Box key={result.data[0]?.nasa_id}>
            <Result item={result} />
          </Box>
        ))}
        <Pagination
          current={currentPage}
          items={results.length}
          perPage={10}
          pagerCallback={setCurrentPage}
        />
      </Box>
    );
  }
  return (
    <Box marginTop="s">
      <Text>No results found for this query.</Text>
    </Box>
  );
};

export default Results;
