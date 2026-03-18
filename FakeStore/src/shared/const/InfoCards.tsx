import { CiUser, CiMail, CiPhone, CiLocationOn } from "react-icons/ci";
import type { AuthResponse } from "@features/auth/types/AuthResponse";

export const InfoCards = ({
  user,
  fullAddress,
}: {
  user: AuthResponse;
  fullAddress: string;
}) => [
  {
    icon: <CiUser size={20} />,
    label: "Full Name",
    value: `${user.firstName} ${user.lastName}`,
  },
  {
    icon: <CiMail size={20} />,
    label: "Email",
    value: user.email,
  },
  {
    icon: <CiPhone size={20} />,
    label: "Phone",
    value: user.phone,
  },
  {
    icon: <CiLocationOn size={20} />,
    label: "Address",
    value: fullAddress || "—",
  },
];
