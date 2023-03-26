import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import FullscreenMenu from "./FullscreenMenu";
import MobileFullmenu from "./MobileFullmenu";
import Sidemenu from "./Sidemenu";

const Layout2 = ({ children, blurred }) => {
  const [fullMenu, setFullMenu] = useState(false);
  const [fullMobileMenu, setFullMobileMenu] = useState(false);

  return (
    <div
      className={`wrapper relative min-h-screen w-full bg-grey ${
        blurred ? "blurredBg" : ""
      }`}
    >
      <button
        className="mobilemenu-trigger fixed left-0 top-[50vh] z-[60] block h-10 min-h-0 w-8 rounded-tl-none rounded-bl-none border-0 bg-primary bg-opacity-20 p-0 text-3xl text-primary lg:hidden"
        onClick={(e) => setFullMobileMenu(true)}
      >
        <RiArrowRightLine />
      </button>

      <Sidemenu
        fullMenu={fullMenu}
        fullMobileMenu={fullMobileMenu}
        fullMobileMenuHandler={setFullMobileMenu}
        fullMenuHandler={setFullMenu}
      />

      <AnimatePresence>
        {fullMenu && (
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: "0px" }}
            exit={{ y: "-100vh" }}
            transition={{
              duration: 0.5,
            }}
            className="fullscreen-menu fixed left-20 top-0 z-40 hidden min-h-screen bg-grey lg:block"
          >
            <FullscreenMenu fullMenuHandler={setFullMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullMobileMenu && (
          <motion.div
            initial={{ translateY: "100vh" }}
            animate={{ translateY: "0px" }}
            exit={{ translateY: "-100vh" }}
            transition={{
              duration: 0.5,
            }}
            className="fixed left-0 top-0 z-[70] block h-screen w-screen bg-grey-darken lg:hidden"
          >
            <MobileFullmenu fullMenuHandler={setFullMobileMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className={`page-content relative ml-0 bg-grey bg-opacity-95 lg:ml-20 ${
          blurred ? "backdrop-blur-lg backdrop-filter" : ""
        }`}
      >
        <div className="bglines fixed left-auto right-0 top-0 z-20 flex h-screen w-full justify-around">
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
          <span className="border-r border-white border-opacity-5"></span>
        </div>
        <div className="sitedata relative z-30 flex min-h-screen items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout2;
