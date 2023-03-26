import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "../components/elements";
import { Layout } from "../components/layout";
import { toBase64, shimmer, imageLoader } from "../lib/utils";

const NotFound = () => {
  return (
    <Layout>
      <Head>
        <title>Not Found - Bieber - React Personal Portfolio Template</title>
      </Head>

      {/* Start NotFound Section */}
      <section className="section-notfound">
        <Breadcrumb title="Page not found" />
        <div className="not-found-wrapper pb-24 pt-10 lg:pt-14 lg:pb-28 xl:pt-16 xl:pb-32">
          <div className="container mx-auto">
            <div className="not-found text-center">
              <Image
                loader={imageLoader}
                unoptimized={true}
                src="/images/notfound.svg"
                height={500}
                width={500}
                alt="not found"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(500, 500)
                )}`}
              />
              <div>
                <Link href="/">
                  <a className="btn btn-large">
                    <span>Back to home</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End NotFound Section */}
    </Layout>
  );
};

export default NotFound;
