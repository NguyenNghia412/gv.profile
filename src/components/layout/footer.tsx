import Link from "next/link";

const Footer = () => {
  return (
    <div className="container mx-auto p-3 text-center text-slate-500 text-sm">
      © 2025 HUCE |{" "}
      <Link href={"https://ttcntt.huce.edu.vn"} target="_blank" className="text-blue-500 underline cursor-pointer">
        Trung tâm CNTT & CSDL
      </Link>
      . All rights reserved.
    </div>
  );
};

export default Footer;
