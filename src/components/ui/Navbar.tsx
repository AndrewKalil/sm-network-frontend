import React from "react";

import { Spacer, Text } from "@nextui-org/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex w-full flex-row items-center justify-start py-0  px-5 bg-slate-700">
      <Link href={"/"} className="flex items-center hover:cursor-pointer">
        <Text css={{ color: "rgb(134 239 172 / 1)" }} h2>
          SM
        </Text>
        <Spacer />
        <Text className="text-white" h4>
          Community
        </Text>
      </Link>
      <Spacer css={{ flex: 1 }} />
    </div>
  );
};
