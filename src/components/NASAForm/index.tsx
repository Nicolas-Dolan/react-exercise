import {
  useForm,
  SubmitHandler,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { TextField, Box, Button, Select } from "@cruk/cruk-react-components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NasaSearchParams } from "../../types";

const mediaTypes = ["audio", "video", "image"] as const;

const inputSchema = z
  .object({
    keywords: z
      .string()
      .min(2, "Keywords must have at least 2 characters.")
      .max(50, "Keywords must have at most 50 characters."),
    mediaType: z.enum(mediaTypes, {
      errorMap: () => ({ message: "Please select a media type." }),
    }),
    yearStart: z.coerce
      .number({
        invalid_type_error: "Please enter a valid number.",
      })
      .min(1900, "Year start must be after 1900.")
      .max(new Date().getFullYear(), "Year start must not be in the future.")
      .optional()
      .or(z.literal("")),
  })
  .partial({
    yearStart: true,
  });

type FormProps = {
  onSubmit: SubmitHandler<NasaSearchParams>;
  onSubmitError: SubmitErrorHandler<NasaSearchParams>;
  isFetching: boolean;
};

export const NASAForm = ({
  onSubmit,
  onSubmitError,
  isFetching,
}: FormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inputSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <Controller
        name="keywords"
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <Box>
            <TextField
              label="Keywords"
              onChange={onChange}
              value={value as string | undefined}
              required
              hasError={!!errors.keywords}
              errorMessage={errors.keywords?.message as string | undefined}
            />
          </Box>
        )}
      />
      <Controller
        name="mediaType"
        control={control}
        render={({ field: { onChange } }) => (
          <Box>
            <Select
              label="Media Type"
              defaultValue=""
              onChange={onChange}
              required
              hasError={!!errors.mediaType}
              errorMessage={errors.mediaType?.message as string | undefined}
            >
              <option disabled value="">
                Choose Media Type
              </option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </Select>
          </Box>
        )}
      />
      <Controller
        name="yearStart"
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <Box>
            <TextField
              label="Year Start"
              onChange={onChange}
              value={value as string | undefined}
              hasError={!!errors.yearStart}
              errorMessage={errors.yearStart?.message as string | undefined}
            />
          </Box>
        )}
      />

      <Button
        type="submit"
        disabled={isFetching || !!Object.keys(errors).length}
      >
        {isFetching ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default NASAForm;
