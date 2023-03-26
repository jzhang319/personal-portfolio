import Head from "next/head";
import { PortfoliosSection } from "../components/containers";
import { Layout2 } from "../components/layout";
import { SectionHeading } from "../components/utils";

const works = () => {
  return (
    <Layout2>
      <Head>
        <title>Portfolios - Bieber - React Personal Portfolio Template</title>
      </Head>

      {/* Start Portfolios Section */}
      <section
        name="section-portfolios"
        className="portfolios-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="My Works" watermark="Works" animated={false} />
          <PortfoliosSection />
        </div>
      </section>
      {/* End Portfolios Section */}

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </Layout2>
  );
};

export default works;
