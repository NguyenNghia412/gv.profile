import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white min-h-screen max-h-screen">
      <header className="bg-[#002a5c]">
        <div className="container mx-auto px-2 py-4">
          <div className="flex flex-row space-x-2">
            <Image
              src={"/images/logo_trans.png"}
              width={70}
              height={70}
              alt=""
            />
            <div>
              <h3
                style={{
                  letterSpacing: "0.5px",
                }}
                className="font-myriad font-[19px] mt-2 mb-0"
              >
                TRƯỜNG ĐẠI HỌC XÂY DỰNG HÀ NỘI
              </h3>
              <h4
                style={{
                  letterSpacing: "0.5px",
                }}
                className="font-myriad font-[19px]"
              >
                Hanoi University of Civil Engineering
              </h4>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
