
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  tags: string[];
  blocked: boolean;
  lastContact: string;
}

export const getTagColor = (tag: string): string => {
  switch (tag) {
    case "Cliente":
      return "bg-blue-500";
    case "Premium":
      return "bg-purple-500";
    case "Lead":
      return "bg-amber-500";
    case "Quente":
      return "bg-red-500";
    case "Frio":
      return "bg-sky-500";
    case "Prospect":
      return "bg-emerald-500";
    case "Regular":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};
