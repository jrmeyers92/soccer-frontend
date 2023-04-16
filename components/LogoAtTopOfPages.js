import Image from "next/image";
import Link from "next/link";
import Logo from "../public/images/Logo.png";

const LogoAtTopOfPages = () => {
  return (
    <div className="border-b w-full flex items-center justify-center bg-primary-500">
      <Link href="/" passHref>
        <a className="mr-8">
          <Image
            src={Logo}
            height={50}
            width={50}
            alt="Glendale Logo"
            className="cursor-pointer"
          />
        </a>
      </Link>
    </div>
  );
};

export default LogoAtTopOfPages;
