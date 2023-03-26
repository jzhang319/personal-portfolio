import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink, Element as Section } from "react-scroll";
import { Logo, SectionHeading } from "../components/utils";
import { imageLoader } from "../lib/utils";

const index = ({ pages }) => {
  return (
    <div className="previewpage bg-grey-darken">
      <header className="header relative z-50 border-b border-white border-opacity-10">
        <div className="container mx-auto">
          <div className="header-inner flex items-center justify-between py-3">
            <Logo url="/" />
            <div className="header-button hidden lg:block">
              {/* <Link href="https://themeforest.net/user/nuclear_themes/portfolio">
                <a className="btn">
                  <span>Buy Now</span>
                </a>
              </Link> */}
            </div>
          </div>
        </div>
      </header>
      <main className="previewmain bg-grey">
        <div className="herosection herosection-bg ">
          <div className="herosection-inner flex min-h-[50vh] items-center bg-grey-darken bg-opacity-90">
            <div className="container mx-auto">
              <div className="herosection-content py-20 text-center">
                <h1 className="text-primary">Jack Zhang</h1>
                <p className="lead">
                  I'm a Full-Stack Developer. I focused on crafting clean &
                  user-friendly experiences, I am passionate about building
                  excellent softwares that improve the lives of those around me.
                </p>
                <ScrollLink
                  activeClass="active"
                  to="section-demos"
                  spy={true}
                  smooth="easeInQuad"
                  offset={0}
                  duration={1000}
                  className="btn btn-large mt-4"
                >
                  <span className="pl-2">View Demos</span>
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>

        {/* Start demos section */}
        <Section
          name="section-demos"
          className="demos-section py-24 lg:py-28 xl:py-32"
        >
          <div className="container mx-auto">
            <SectionHeading title="Demos" watermark="Demos" />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {pages.map((page) => (
                <div className="col-span-1" key={page.id}>
                  <Link href={page.path}>
                    <a className="card hovercard block overflow-hidden">
                      <div className="imagebox overflow-hidden rounded">
                        <Image
                          loader={imageLoader}
                          unoptimized={true}
                          src={page.image}
                          height={337}
                          width={650}
                          alt={page.title}
                        />
                      </div>
                      <h5 className="py-3 text-center">{page.title}</h5>
                    </a>
                  </Link>
                </div>
              ))}
              <div className="col-span-1">
                <Link href="/">
                  <a className="card hovercard block overflow-hidden">
                    <div className="imagebox overflow-hidden rounded">
                      <Image
                        loader={imageLoader}
                        unoptimized={true}
                        src="/images/demo/coming-soon.jpg"
                        height={337}
                        width={650}
                        alt="Comming Soon"
                      />
                    </div>
                    <h5 className="py-3 text-center">More Demos Coming Soon</h5>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Section>
        {/* End demos section */}
        <resume />
      </main>
      <footer className="footer bg-grey-darken">
        <div className="contianer mx-auto">
          <p className="mb-0 py-4 text-center">
            &copy; {new Date().getFullYear()}, All right reserved
            <Link href="/">
              <a className="pl-1.5 font-medium text-heading no-underline hover:text-primary">
                Jack Zhang
              </a>
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      pages: [
        {
          id: 1,
          title: "Home Version 1",
          image: "/images/demo/homepage-1.jpg",
          path: "/homepage1",
        },
        {
          id: 2,
          title: "Home Version 2",
          image: "/images/demo/homepage-2.jpg",
          path: "/homepage2",
        },
        {
          id: 3,
          title: "Home Version 3",
          image: "/images/demo/homepage-3.jpg",
          path: "/homepage3",
        },
      ],
    },
  };
}

export default index;
