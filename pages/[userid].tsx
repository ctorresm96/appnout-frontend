import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";

const UserDetailPage = (props: any) => {
  const { user } = props;
  return (
    <Fragment>
      <h1>{user.username}</h1>
      <h1>{user.password}</h1>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const userId = params?.userid;
  const user = await (
    await fetch("http://localhost:3000/user/" + userId)
  ).json();

  if (!user) {
    return <p>Loading...</p>;
  }

  return {
    props: {
      user,
    },
    revalidate: 10,
    notFound: false,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { userid: "cde2820a-b206-4643-8d3f-85c27fd5afaf" },
      },
      {
        params: { userid: "226dece9-aa09-4e78-8faa-51ae9d9cc7f3" },
      },
    ],
    fallback: "blocking",
  };
};

export default UserDetailPage;
