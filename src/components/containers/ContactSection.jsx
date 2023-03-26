import { motion } from "framer-motion";
import Link from "next/link";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import { childrenAnimation } from "../../lib/motion";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const { data } = useQuery("information", getInformation);

  if (!data) return null;

  return (
    <div className="grid grid-cols-9 gap-7">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        variants={childrenAnimation}
        className="col-span-9 lg:col-span-4"
      >
        <div className="contact-information">
          <h4>Contact Information</h4>
          <p>
            Please feel free to contact me with any further questions. I am more than happy to sit down and explain my skills and experiences to you.
          </p>
          <span className="inline-block h-1 w-20 rounded-full bg-primary bg-opacity-20"></span>
          <div className="contact-blocks mt-5 space-y-5">
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiPhoneLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Contact on phone</h5>
                {data.phoneNumbers.map((number, index) => (
                  <p className="mb-0" key={index}>
                    <Link href={`tel:${number.split("-").join("")}`}>
                      <a className="no-underline">{number}</a>
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMailLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Contact on mail</h5>
                {data.emailAddress.map((email, index) => (
                  <p className="mb-0" key={index}>
                    <Link href={`mailto:${email}`}>
                      <a className="no-underline">{email}</a>
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            {/* <div className="contact-block card flex p-4 md:p-5">
              <span className="icon mr-4 inline-flex h-16 w-16 shrink-0 grow-0 basis-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                <RiMapPinLine />
              </span>
              <div className="content">
                <h5 className="mb-2">Contact address</h5>
                <p className="mb-0">
                  121 King Street, Melbourne, United States
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        variants={childrenAnimation}
        className="col-span-9 lg:col-span-5"
      >
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default ContactSection;
