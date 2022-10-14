import React from "react";

type ButtonProps = {
  text: string;
  className: string;
  onClick: () => void;
};

export default function Button({ text, ...props }: ButtonProps) {
  return (
    <>
      <button {...props}>{text}</button>
    </>
  );
}
