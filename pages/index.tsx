import fs from "fs/promises";
import { GetStaticProps } from "next";
import Link from "next/link";

const HomePage = (props: any) => {
  const { users } = props;
  return (
    <ul>
      {users.map((x: Product) => (
        <li key={x.id}>
          <Link href={`/${x.id}`}>{x.username}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await (await fetch("http://localhost:3000/user")).json();

  if (users.length === 0) {
    return {
      notFound: true,
    };
  }

  if (!users) {
    return {
      notFound: true,
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      users,
    },
    revalidate: 10,
    notFound: false,
  };
};

export interface Product {
  id: string;
  username: string;
}

export default HomePage;
