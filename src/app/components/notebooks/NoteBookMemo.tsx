import React, { useState } from "react";
import Image from "next/image";
import { subMainLi } from "@/app/styles/style";
import Editor from "../editor";

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

interface NoteDetailProps {
  selectMemoIdx: number | null;
  memoList: Note[];
  onClickNoteBookDetail: any;
  screenMode: string;
}

export default function NoteBookMemo({ selectMemoIdx, memoList, onClickNoteBookDetail, screenMode }: NoteDetailProps) {
  const selectedNote = memoList.find((item: Note) => item.idx === selectMemoIdx);

  const onClickDeleteMemo = (memoidx: number) => {
    const updatedMemoList = memoList.map((note: Note) => {
      if (note.idx === selectMemoIdx) {
        return {
          ...note,
          memoList: note.memoList.filter((memo) => memo.memoidx !== memoidx),
        };
      }
      return note;
    });

    localStorage.setItem("noteBookList", JSON.stringify(updatedMemoList));
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 h-[40px] dark:bg-gray-800 dark:border-b-[1px]">
        {selectedNote ? <h2 className="ml-4 truncate dark:text-white">{selectedNote.title}</h2> : <h2 className="ml-4 truncate">Select a Note</h2>}
        <Image src={screenMode === "dark" ? "/img/darkmode/option-white.png" : "/img/option.png"} alt="option-img" className="mr-4 " width={24} height={24} />
      </div>
      <ul
        id="memoList"
        className="overflow-hidden h-[97%] 
        scrollbar-thumb-gray-500 
        scrollbar-track-gray-100 
        scrollbar-thumb-rounded-full 
        scrollbar-thin
        hover:overflow-y-auto dark:bg-gray-800 
        hover:dark:scrollbar-thin 
        hover:dark:scrollbar-thumb-gray-500
        hover:dark:scrollbar-white 
        hover:dark:scrollbar-thumb-rounded-full"
      >
        {selectedNote &&
          selectedNote.memoList &&
          selectedNote.memoList.length > 0 &&
          selectedNote.memoList.map((subMemoList, subIdx) => (
            <li key={subIdx} className={`hover:bg-blue-100 dark:hover:bg-gray-100 dark:text-white ${subMainLi}`}>
              <button
                className="w-full h-full dark:hover:text-black"
                /* onClick={() => onClickNoteBookDetail(selecNoteBookIdx)} */ onClick={() => console.log("subMemoList.memoidx", subMemoList.memoidx)}
              >
                <div className="">
                  <button className="float-right" onClick={() => onClickDeleteMemo(subMemoList.memoidx)}>
                    <Image src="/img/delete.png" alt="delete-img" width={24} height={24} />
                  </button>
                  <h2 className="font-bold text-left text-[20px] pb-6 truncate">{subMemoList.memoSubTitle ? subMemoList.memoSubTitle : "New Note"}</h2>
                  <p className="truncate text-left">{subMemoList.memoContent ? subMemoList.memoContent : "No additional text"}</p>
                </div>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
