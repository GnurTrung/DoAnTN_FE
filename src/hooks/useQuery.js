import { useLocation } from "react-router-dom";

const useQuery = () => {
  const { search } = useLocation();
  return Object.fromEntries(new URLSearchParams(search));
};

export default useQuery;
