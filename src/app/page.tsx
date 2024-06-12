import React, { useEffect } from "react";
import Head from "next/head";
import HomePage from "@/components/HomePage/HomePage";

interface Props {}
const Home: React.FC<Props> = ({}) => {
  return (
    <React.Fragment>
      <HomePage />
    </React.Fragment>
  );
};

export default Home;
