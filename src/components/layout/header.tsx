import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { menus } from "@/constants/menu";

const Header = () => {
  return (
    <>
      <header className="bg-[#002a5c]">
        <div className="container mx-auto px-2 py-4">
          <div className="flex flex-row space-x-2 text-white">
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
      <div className="bg-[#001e42]">
        <div className="container mx-auto p-2 text-white">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {menus &&
                  menus.map((m, i) => (
                    <NavigationMenuLink
                      key={`${i}`}
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={m.link} className="font-sans">
                        {m.label}
                      </Link>
                    </NavigationMenuLink>
                  ))}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
