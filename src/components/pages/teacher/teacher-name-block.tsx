import Image from "next/image";

export interface TeacherNameBlockProps {
    hoTen: string
    hocHam: string
    donVi: string
    avatar?:string;
}

const TeacherNameBlock: React.FC<TeacherNameBlockProps> = (props) => {
  return <div className="border shadow-md">
    <div className="relative w-full h-[367px]">
      <Image
        src={props?.avatar ?? "/images/home-bg.jpg"}
        alt=""
        fill
        className="object-cover" // or object-cover, object-center
      />
    </div>
    <div className="flex flex-row items-center space-x-5 p-5">
      <div className="relative w-[110px] h-[110px]">
        <Image
          src={"/images/noava.png"}
          alt=""
          width={110}
          height={110}
          className="object-cover shadow-md absolute -top-[50%]" // or object-cover, object-center
        />
      </div>
      <div className="w-1/3">
        <p>{props.hoTen}</p>
        <p className="text-slate-400 font-semibold">{props.hocHam}</p>
      </div>
      <div>
        <p>Trường Đại học xây dựng Hà Nội</p>
        <p className="text-slate-400 font-semibold">Đơn vị: {props.donVi}</p>
      </div>
    </div>
  </div>;
};

export default TeacherNameBlock;
