import React from "react";
import Image from "next/image";

export default function Todo() {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 h-[40px] border-b-2">
        <h2 className="ml-4">Todo</h2>
        <Image src="/img/option.png" alt="option-img" className="mr-4 " width={24} height={24} />
      </div>
    </>
  );
}
