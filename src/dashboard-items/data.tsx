import { ReactNode } from "react";
import {
  Fish,
  IceCreamBowl,
  GlassWater,
  Coffee,
  Sandwich,
  Sticker,
} from "lucide-react";

// TODO: move to another file
export const restaurantCategories = [
  "mutton",
  "chicken",
  "camel",
  "fish",
  "veg",
  "snacks",
  "hotdrinks",
  "softdrinks",
  "juices",
  "desserts",
  "others",
];

const renderCategoryIcon = (key: string) => {
  switch (key) {
    case "fish":
      return Fish;
    case "desserts":
      return IceCreamBowl;
    case "juices":
      return GlassWater;
    case "hotdrinks":
      return Coffee;
    case "snacks":
      return Sandwich;

    default:
      return Sticker;
  }
};

export const restaurantCategoryDetail: {
  label: string;
  value: string;
  icon?: React.ComponentType;
}[] = restaurantCategories.map((menu) => ({
  label: String(menu).charAt(0).toUpperCase() + String(menu).slice(1),
  icon: renderCategoryIcon(menu),
  value: menu,
}));

export const restaurantMenu = [
  "breakfast",
  "lunch",
  "dinner",
  "anytime",
  "special",
];

const renderMenuIcon = (id: string): ReactNode => {
  let letter = "";
  let bgColor = "";

  switch (id) {
    case "breakfast":
      letter = "B";
      bgColor = "bg-blue-600";
      break;
    case "lunch":
      letter = "L";
      bgColor = "bg-red-600";
      break;
    case "dinner":
      letter = "D";
      bgColor = "bg-yellow-600";
      break;
    case "anytime":
      letter = "A";
      bgColor = "bg-green-600";
      break;
    case "special":
      letter = "S";
      bgColor = "bg-fuchsia-600";
      break;

    default:
      break;
  }
  return (
    <div
      key={id}
      className={
        "h-5 w-5 flex items-center justify-center rounded-full text-white text-sm " +
        bgColor
      }
    >
      {letter}
    </div>
  );
};

export const restaurantMenuDetail: {
  label: string;
  value: string;
  reactElement?: ReactNode;
}[] = restaurantMenu.map((menu) => ({
  label: String(menu).charAt(0).toUpperCase() + String(menu).slice(1),
  reactElement: renderMenuIcon(menu),
  value: menu,
}));
