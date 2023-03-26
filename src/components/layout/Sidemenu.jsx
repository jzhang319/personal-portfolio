import Image from "next/image";
import Link from "next/link";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import { imageLoader } from "../../lib/utils";

const Sidemenu = ({ fullMenu, fullMenuHandler }) => {
  const { data } = useQuery("information", getInformation);

  if (!data) return null;

  return (
    <div className="sidemenu fixed left-0 top-0 z-40 hidden h-screen w-20 flex-wrap justify-between overflow-hidden border-r border-white border-opacity-10 bg-grey-darken py-8 text-center lg:flex">
      <div className="h-[40%] w-full">
        <Link href="/homepage1">
          <a className="herosection-image fiximage relative z-20 inline-block h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-primary align-middle">
            <Image
              loader={imageLoader}
              unoptimized={true}
              src={data.thumbImage}
              alt={data.fullName}
              height={60}
              width={60}
              layout="responsive"
              priority={true}
            />
          </a>
        </Link>
      </div>
      <div className="flex h-20 w-full basis-[80px] items-center justify-center">
        <button
          className="inline-block w-auto border-0 p-0 text-center align-middle text-4xl leading-none"
          onClick={() => fullMenuHandler(!fullMenu)}
        >
          {fullMenu ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>
      <div className="flex h-[40%] w-full items-end justify-center self-end">
        <p className="copyrightvertical rotate-180 text-left">
          <span className="whitespace-nowrap">
            &copy; {new Date().getFullYear()}{" "}
          </span>
          <Link href="/">
            <a className="block font-medium text-heading no-underline hover:text-primary lg:inline">
              Jack Zhang
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sidemenu;
