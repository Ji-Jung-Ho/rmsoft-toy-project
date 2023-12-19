import React from "react";
import Image from "next/image";
import { subMainLi } from "@/app/styles/style";

interface Note {
  idx: number;
  title: string;
  content: string;
  subtitle: string;
  memoList: Array<{
    memoSubTitle: string;
    memoContent: string;
    memoidx: number;
  }>;
}

interface AllNote {
  onClickNoteBookDetail: any;
  memoList: Note[];
  screenMode: string;
}

export default function AllNotes({ memoList, onClickNoteBookDetail, screenMode }: AllNote) {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 h-[40px] dark:bg-gray-800 dark:border-b-[1px]">
        <h2 className="ml-4 dark:text-white">All Notes</h2>
        <Image src={screenMode === "dark" ? "/img/darkmode/option-white.png" : "/img/option.png"} alt="option-img" className="mr-4 " width={24} height={24} />
      </div>
      <ul className="overflow-y-auto h-[100%] ">
        {memoList.map((note, idx) => (
          <li key={idx} className={`hover:bg-blue-100 dark:hover:bg-gray-100 dark:text-white ${subMainLi}`}>
            <button className="w-full h-full dark:hover:text-black" onClick={() => onClickNoteBookDetail(note.idx)}>
              <div>
                <h2 className="font-bold text-left text-[20px] truncate pb-6">
                  {note.memoList?.[0]?.memoSubTitle ? note.memoList[0]?.memoSubTitle : "New Note"}
                </h2>
                <p className="truncate text-left">{note.memoList?.[0]?.memoContent ? note.memoList[0]?.memoContent : "No additional text"}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
