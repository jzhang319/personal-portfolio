import Head from "next/head";
import {
  AboutSection,
  ReviewsSection,
  ServicesSection,
} from "../components/containers";
import { Layout2 } from "../components/layout";
import { SectionHeading } from "../components/utils";

const about = () => {
  return (
    <Layout2>
      <Head>
        <title>About - Bieber - React Personal Portfolio Template</title>
      </Head>

      {/* Start About Section */}
      <section className="about-section pt-24 lg:pt-28 xl:pt-32">
        <div className="container mx-auto">
          <SectionHeading title="About Me" watermark="About" animated={false} />
          <AboutSection />
        </div>
      </section>
      {/* End About Section */}

      {/* Start Service Section */}
      <section
        name="section-service"
        className="services-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            title="My Services"
            watermark="Services"
            animated={false}
          />
          <ServicesSection />
        </div>
      </section>
      {/* End Service Section */}

      {/* Start Reviews Section */}
      <section
        name="section-reviews"
        className="reviews-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading
            title="Client Reviews"
            watermark="Reviews"
            animated={false}
          />
          <ReviewsSection />
        </div>
      </section>
      {/* End Reviews Section */}

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </Layout2>
  );
};

export default about;
