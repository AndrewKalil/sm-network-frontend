import { Text } from "@nextui-org/react";
import React from "react";

export const NoComments = () => {
  return (
    <div className="flex-1 overflow-y-auto flex justify-center items-center">
      <Text h3>
        There are currently no comments on this post. Start a conversation!
      </Text>
    </div>
  );
};
