import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Home({ sessionData, posts }) {
  //console.log(sessionData);
  if (!sessionData) return <Login />;
  return (
    <div className="max-h-screen flex flex-col  bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />
      <main className="flex flex-1">
        {/* Sidebar */}
        <SideBar />
        {/* Feed */}
        <Feed posts={posts} />
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  //Get the user
  const session = await getSession(context);
  console.log(session);

  const posts = await getDocs(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  //console.log(docs);

  return {
    props: {
      sessionData: session,
      posts: docs,
    },
  };
}
