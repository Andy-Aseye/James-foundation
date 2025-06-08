import { cx } from "@/src/utils";
import Link from "next/link";
import React from "react";

const Tag = ({ link = "#", name, ...props }) => {
  return (
    <Link
      href={link}
      className={cx(
        "inline-block text-black rounded-full capitalize hover:scale-105 transition-all ease duration-200 text-xs",
      )}
      style={{border: "1px solid #AAABAD", padding: "0.25rem 0.75rem", backgroundColor: "#F8F9FA"}}
    >
      {name.toLowerCase()}
    </Link>
  );
};

export default Tag;
