import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import { Element as Section } from "react-scroll";
import {
  AboutSection,
  BlogSection,
  ContactSection,
  HeroSection,
  PortfoliosSection,
  ResumeSection,
  ReviewsSection,
  ServicesSection,
  SkillsSection,
} from "../components/containers";
import { Layout } from "../components/layout";
import { SectionHeading } from "../components/utils";
import { getPostsByPage } from "../lib/blogging";

const Homepage1 = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>Bieber - React Personal Portfolio Template</title>
      </Head>

      {/* Start Hero Section */}
      <Section name="section-home">
        <HeroSection typed={false} />
      </Section>
      {/* End Hero Section */}

      {/* Start About Section */}
      <Section
        name="section-about"
        className="about-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="About Me" watermark="About" />
          <AboutSection />
        </div>
      </Section>
      {/* End About Section */}

      {/* Start Skills Section */}
      <Section
        name="section-skills"
        className="skills-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="My Skills" watermark="Skills" />
          <SkillsSection />
        </div>
      </Section>
      {/* End Skills Section */}

      {/* Start Service Section */}
      <Section
        name="section-service"
        className="services-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="My Services" watermark="Services" />
          <ServicesSection />
        </div>
      </Section>
      {/* End Service Section */}

      {/* Start Resume Section */}
      <Section
        name="section-resume"
        className="resume-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="My Resume" watermark="Resume" />
          <ResumeSection />
        </div>
      </Section>
      {/* End Resume Section */}

      {/* Start Portfolios Section */}
      <Section
        name="section-portfolios"
        className="portfolios-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="My Works" watermark="Works" />
          <PortfoliosSection />
        </div>
      </Section>
      {/* End Portfolios Section */}

      {/* Start Reviews Section */}
      <Section
        name="section-reviews"
        className="reviews-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="Client Reviews" watermark="Reviews" />
          <ReviewsSection />
        </div>
      </Section>
      {/* End Reviews Section */}

      {/* Start Blog Section */}
      <Section
        name="section-blog"
        className="news-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="Latest Blogs" watermark="Blogs" />
          <BlogSection posts={posts} />
        </div>
      </Section>
      {/* End Blog Section */}

      {/* Start Contact Section */}
      <Section
        name="section-contact"
        className="contact-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading title="Contact Us" watermark="Contact" />
          <ContactSection />
        </div>
      </Section>
      {/* End Contact Section */}

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </Layout>
  );
};

export default Homepage1;

export async function getStaticProps() {
  // const queryClient = new QueryClient();
  const { posts } = getPostsByPage();

  // await queryClient.prefetchQuery('services', getServices)

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      posts,
    },
    revalidate: 10,
  };
}
