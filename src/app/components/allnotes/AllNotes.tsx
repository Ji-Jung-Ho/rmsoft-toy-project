import React from "react";
import Image from "next/image";
import { subMainLi } from "@/app/styles/style";

interface Note {
  idx: number;
  title: string;
  content: string;
}

interface NoteBook {
  idx: number;
  title: string;
  noteList: Note[];
}

interface AllNote {
  onClickNoteBookDetail: any;
  noteBookList: NoteBook[];
  screenMode: string;
}

export default function AllNotes({ noteBookList, onClickNoteBookDetail, screenMode }: AllNote) {
  // 모든 noteBook을 합친 배열
  const AllNoteList = noteBookList.map((el) => el.noteList);

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 h-[40px] border-b-2 dark:bg-gray-800 dark:border-b-[1px]">
        <h2 className="ml-4 dark:text-white">All Notes</h2>
        <Image src={screenMode === "dark" ? "/img/darkmode/option-white.png" : "/img/option.png"} alt="option-img" className="mr-4 " width={24} height={24} />
      </div>
      <ul className="overflow-y-auto h-[100%]">
        {/* 모든 노트북이 아닌 모든 노트가 보여야함 */}
        {AllNoteList.map((note, idx) => (
          <li key={idx} className={`hover:bg-blue-100 dark:hover:bg-gray-100 dark:text-white ${subMainLi}`}>
            <button className="w-full h-full dark:hover:text-black" onClick={() => onClickNoteBookDetail(note[0].idx)}>
              <h2 className="font-bold text-left text-[20px] truncate pb-6">{note[0].title ? note[0].title : "New Note"}</h2>
              <p className="truncate text-left">{note[0].content ? note[0].content : "No additional text"}</p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
