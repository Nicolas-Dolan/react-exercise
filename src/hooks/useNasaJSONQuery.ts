import { useQuery } from "@tanstack/react-query";

export const useNasaJSONQuery = (url: string) =>
  useQuery<string[]>([url], () => fetch(url).then((res) => res.json()));

export default useNasaJSONQuery;
