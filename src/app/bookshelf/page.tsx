import React, { useEffect } from "react";
import Head from "next/head";
import BookShelf from "@/components/BookShelf/BookShelf";

interface Props {}
const BookShelfPage: React.FC<Props> = ({}) => {
  return (
    <React.Fragment>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rockstar.in/" />
        <meta
          property="og:title"
          content="rockstar | Best Online Platform to Learn Coding - 100% placement Assistance"
        />
        <title>
          rockstar | Best Online Platform to Learn Coding - 100% placement
          Assistance
        </title>
        <meta
          name="title"
          content="rockstar | Best Online Platform to Learn Coding - 100% placement Assistance"
        />
        <meta
          name="description"
          content="rockstar is a modern Edtech company in India that offers online job oriented courses with certificates and placement assistance. Learn more."
        />
        <meta
          property="og:description"
          content="rockstar is a modern Edtech company in India that offers online job oriented courses with certificates and placement assistance. Learn more."
        />
        <meta
          property="og:image"
          content="https://blog.rockstar.in/wp-content/uploads/2023/03/Build-your-dream-career-in-tech-Banner-Design-1.png"
        />
      </Head>
      <BookShelf />
    </React.Fragment>
  );
};

export default BookShelfPage;
