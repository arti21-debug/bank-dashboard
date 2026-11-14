import MaskGroup_1 from "@/icons/people-transfer/MaskGroup_1.svg";
import MaskGroup_2 from "@/icons/people-transfer/MaskGroup_2.svg";
import MaskGroup_3 from "@/icons/people-transfer/MaskGroup_3.svg";

export interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

export const CONTACTS = [
  { id: 1, name: "Livia Bator", role: "CEO", avatar: MaskGroup_1 },
  { id: 2, name: "Randy Press", role: "Director", avatar: MaskGroup_2 },
  { id: 3, name: "Workman", role: "Director", avatar: MaskGroup_3 },
  { id: 4, name: "Workman", role: "Director", avatar: MaskGroup_3 },
  { id: 5, name: "Workman", role: "Director", avatar: MaskGroup_3 },
  { id: 6, name: "Workman", role: "Director", avatar: MaskGroup_3 },
];

export const getContactById = (id: number | null) =>
  id === null ? undefined : CONTACTS.find((c) => c.id === id);