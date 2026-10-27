import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const contactItems = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    content: (
      <p className="text-slate-600">
        Phòng 309, nhà A1
        <br />
        Trường Đại học Xây dựng Hà Nội
      </p>
    ),
  },
  {
    icon: Phone,
    label: "Điện thoại",
    content: <p className="text-slate-600">0243.8691435</p>,
  },
  {
    icon: Mail,
    label: "Email",
    content: (
      <Link href="mailto:khcn@huce.edu.vn" className="text-blue-600 hover:underline">
        khcn@huce.edu.vn
      </Link>
    ),
  },
  {
    icon: Globe,
    label: "Website",
    content: (
      <Link href="http://khcn.huce.edu.vn/" target="_blank" className="text-blue-600 hover:underline">
        khcn.huce.edu.vn
      </Link>
    ),
  },
];

const AboutPage = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-primaryBlue text-white font-myriad py-4 px-6 mb-6 shadow-md">
        <h2 className="text-lg tracking-wide">THÔNG TIN LIÊN HỆ</h2>
        <p className="text-sm text-blue-200 mt-1">
          Phòng Khoa học Công nghệ — Trường Đại học Xây dựng Hà Nội
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactItems.map(({ icon: Icon, label, content }) => (
          <div key={label} className="border shadow-md p-6 flex items-start gap-4">
            <div className="bg-secondaryBlue text-white p-3 rounded shrink-0">
              <Icon size={22} />
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">{label}</p>
              {content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
