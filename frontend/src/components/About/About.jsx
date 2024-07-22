import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the best</h2>
            <p className="text__para">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
              eaque totam adipisci sed velit deserunt aspernatur ex cupiditate
              quibusdam assumenda, fugiat officiis asperiores mollitia esse sit
              corrupti iusto, ipsa culpa.
            </p>

            <p className="text__para mt-[30px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
              repellat optio. Temporibus impedit, deleniti dolorum qui quidem ut
              neque ipsam magnam eius, quo fuga eum.
            </p>

            <Link to="/">
              <button className="btn">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
