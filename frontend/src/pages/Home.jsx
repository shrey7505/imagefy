import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import Review from "../components/Review";
import GenerateBtn from "../components/GenerateBtn";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps/>
      <Description/>
      <Review/>
      <GenerateBtn/>
     
    </div>
  );
};

export default Home;
