
import StrangeQuarkIcon from '@/assets/StrangeQuarkIcon';
import Link from 'next/link';
import { FaXTwitter } from "react-icons/fa6";
import { SiNextdotjs, SiRedux, SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-4 w-full mb-5 lg:mb-0">
      <div className="flex flex-col lg:flex-row justify-center items-center font-bold font-mono text-xl text-gray-800">
        <div className="flex items-center mx-auto">
          <p className="mx-2 my-2">Developed by:</p>
          <p className="mx-2 my-2 "><StrangeQuarkIcon /></p>
        </div>
        <div className="flex items-center mx-auto">
          <p className="mx-2 my-2">Powered by:</p>
          <p className="mx-2 my-2 text-2xl"><SiNextdotjs /></p>
          <p className="mx-2 my-2 text-2xl"><SiRedux /></p>
        </div>
        <div className="flex items-center mx-auto">
          <p className="mx-2 my-2">Peek Behind the Squares:</p>
          <p className="mx-2 my-2 text-2xl"><SiGithub /></p>
        </div>
        <div className="flex items-center mx-auto">
          <p className="mx-2 my-2">Socials:</p>
          <p className="mx-2 my-2"><Link href="https://www.linkedin.com/in/yasinbhimani25/"><SiLinkedin /></Link></p>
          <p className="mx-2 my-2"><Link href="https://www.instagram.com/yasinbhimani25/"><SiInstagram /></Link></p>
          <p className="mx-2 my-2"><Link href="https://twitter.com/MasterYasin007"><FaXTwitter /></Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;