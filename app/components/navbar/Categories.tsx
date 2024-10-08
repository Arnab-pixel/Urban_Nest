"use client";

import { TbBeach, TbPool } from "react-icons/tb";
import Container from "../Container";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { RiSnowflakeFill } from "react-icons/ri";
import { GiBoatFishing, GiCactus, GiCastle, GiIsland } from "react-icons/gi";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Arctic",
    icon: RiSnowflakeFill,
    description: "This property is in cold place!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has pools!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on as island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxirious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto ">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
