import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Blog, Breadcrumb } from "../../components/elements";
import { createSlug } from "../../lib";
import {
  getAllCategories,
  getPagesPath,
  getPostsByPage,
  getRecentPosts,
} from "../../lib/blogging";
import { childrenAnimation } from "../../lib/motion";
import { Layout } from "../../components/layout";

const Posts = ({ posts, hasMore, categories, recentPosts }) => {
  const [mounted, setMounted] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const router = useRouter();
  const { slug: page } = router.query;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setUniqueCategories([...new Set(categories)]);
  }, [categories]);

  if (!mounted) return <p className="text-center">Loading...</p>;
  if (!posts) return null;

  return (
    <Layout>
      <Head>
        <title>Blogs - Bieber - React Personal Portfolio Template</title>
      </Head>
      <Breadcrumb
        title="Blogs"
        paths={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Blogs",
            link: "",
          },
        ]}
      />
      <div className="blogs py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-9">
              <div className="grid grid-cols-2 gap-7">
                {posts &&
                  posts?.map((post, index) => (
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * index }}
                      variants={childrenAnimation}
                      className="col-span-2 sm:col-span-1"
                      key={index}
                    >
                      <Blog post={post} />
                    </motion.div>
                  ))}
              </div>
              <div className="flex gap-3 pt-10 text-center">
                {page !== "1" && (
                  <Link href={`/posts/${String(parseInt(page) - 1)}`}>
                    <a className="btn btn-small">
                      <span>Prev</span>
                    </a>
                  </Link>
                )}
                {hasMore && (
                  <Link href={`/posts/${String(parseInt(page) + 1)}`}>
                    <a className="btn btn-small">
                      <span>Next</span>
                    </a>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <div className="widget sticky top-[107px] mt-8 space-y-10 lg:mt-0">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  variants={childrenAnimation}
                  className="widget widget-category card rounded p-4"
                >
                  <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
                    Categories
                  </h5>
                  <ul className="styledlist mb-0 list-none pl-0">
                    {uniqueCategories.map((category, i) => (
                      <li key={i}>
                        <Link href={`/category/${createSlug(category)}/1`}>
                          <a className="clearfix hover:text-primary">
                            {category}
                            <span className="float-right">
                              (
                              {
                                categories.filter((cat) => cat === category)
                                  .length
                              }
                              )
                            </span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  variants={childrenAnimation}
                  className="widget widget-recentpost card rounded p-4"
                >
                  <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
                    Recent Posts
                  </h5>
                  <ul className="mb-0 list-none pl-0">
                    {recentPosts.map((post, index) => (
                      <li key={index} className="mb-4 last:mb-0">
                        <p className="mb-0">
                          <Link href={`/postdetails/${post.slug}`}>
                            <a className="text-heading no-underline hover:text-primary hover:underline">
                              {post.title}{" "}
                            </a>
                          </Link>
                        </p>
                        <small className="text-body">
                          {`${new Date(post.date).toLocaleDateString("en-us", {
                            month: "short",
                          })} ${new Date(post.date).toLocaleDateString(
                            "en-us",
                            {
                              day: "2-digit",
                            }
                          )}, ${new Date(post.date).getFullYear({
                            year: "numeric",
                          })}`}
                        </small>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Posts;

export function getStaticPaths() {
  const paths = getPagesPath();

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params: { slug } }) {
  const { posts, hasMore } = getPostsByPage(parseInt(slug));
  const categories = getAllCategories();
  const recentPosts = getRecentPosts();

  return {
    props: {
      posts,
      hasMore,
      categories,
      recentPosts,
    },
    revalidate: 10,
  };
}
