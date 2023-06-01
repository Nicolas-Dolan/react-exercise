import { useState, useEffect } from "react";
import { Heading, Box } from "@cruk/cruk-react-components";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";
import Results from "../Results";
import NASAForm from "../NASAForm";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState<NasaSearchParams | null>(
    null
  );
  const [validateErrors, setValidateErrors] = useState<Error[]>([]);

  function resetSearch() {
    setSearchParams(null);
    setValidateErrors([]);
  }

  const onSubmit: SubmitHandler<NasaSearchParams> = (requestData) => {
    resetSearch();
    setSearchParams(requestData);
  };

  const onSubmitError: SubmitErrorHandler<NasaSearchParams> = (errors) => {
    resetSearch();
    setValidateErrors(errors);
  };

  const { data, error, isFetching, refetch } = useNasaQuery(searchParams);

  useEffect(() => {
    if (searchParams) {
      refetch();
    }
  }, [searchParams]);

  return (
    <Box marginTop="s" paddingTop="s">
      <Heading h1>NASA Media Search</Heading>

      <NASAForm
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        isFetching={isFetching}
      />

      <Results
        data={data}
        error={error}
        isFetching={isFetching}
        noParams={!searchParams}
      />
    </Box>
  );
};

export default HomePage;
