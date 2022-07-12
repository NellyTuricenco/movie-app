import DetailedPage from "../../views/DetailedPage";
import { movies } from "../../src/constants/movies";

export default DetailedPage;

export const getServerSideProps = async ({ res, query }) => {
  try {
    const id = query.params;
    return {
      props: {
        id: id,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};
