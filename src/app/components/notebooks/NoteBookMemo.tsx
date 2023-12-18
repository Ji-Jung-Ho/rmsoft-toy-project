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

interface NoteDetailProps {
  selecNoteBookIdx: number | null;
  memoList: Note[];
  onClickNoteBookDetail: any;
  screenMode: string;
}

export default function NoteBookMemo({ selecNoteBookIdx, memoList, onClickNoteBookDetail, screenMode }: NoteDetailProps) {
  const selectedNote = memoList.find((item: Note) => item.idx === selecNoteBookIdx);
  // const selectedNote = memoList.find((item: Note) => item.memoList.memoidx === selecNoteBookIdx);

  const handleDeleteNote = (memoidx: number) => {
    // Note 삭제 로직을 수행합니다.
    const updatedMemoList = memoList.map((note: Note) => {
      if (note.idx === selecNoteBookIdx) {
        return {
          ...note,
          memoList: note.memoList.filter((memo) => memo.memoidx !== memoidx),
        };
      }
      return note;
    });

    // 로컬 스토리지와 상태를 업데이트합니다.
    localStorage.setItem("noteBookList", JSON.stringify(updatedMemoList));
    // setMemoList 함수를 사용하여 상태를 업데이트합니다.
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
        {selectedNote && selectedNote.memoList && selectedNote.memoList.length > 0 ? (
          selectedNote.memoList.map((subMemoList, subIdx) => (
            <li key={subIdx} className={`hover:bg-blue-100 dark:hover:bg-gray-100 dark:text-white ${subMainLi}`}>
              <button className="w-full h-full dark:hover:text-black" onClick={() => onClickNoteBookDetail(selecNoteBookIdx)}>
                <div className="">
                  <h2 className="flex items-center justify-between font-bold text-left text-[20px] truncate pb-6 w-[200px]">
                    {subMemoList.memoSubTitle ? subMemoList.memoSubTitle : "New Note"}
                    <button onClick={() => handleDeleteNote(subMemoList.memoidx)}>
                      <Image src="/img/delete.png" alt="delete-img" width={24} height={24} />
                    </button>
                  </h2>
                  <p className="truncate text-left">{subMemoList.memoContent ? subMemoList.memoContent : "No additional text"}</p>
                  {/* <button onClick={() => console.log("subMemoList.memoidx", subMemoList.memoidx)}>subMemoList.memoidx</button> */}
                </div>
              </button>
            </li>
          ))
        ) : (
          <li className={`hover:bg-blue-100 dark:hover:bg-gray-100 dark:text-white ${subMainLi}`}>
            <button className="w-full h-full dark:hover:text-black" onClick={() => onClickNoteBookDetail(selecNoteBookIdx)}>
              <div>
                <h2 className="font-bold text-left text-[20px] truncate pb-6">New Note</h2>
                <p className="truncate text-left">No additional text</p>
                <button onClick={() => console.log("selecNoteBookIdx", selecNoteBookIdx)}>selecNoteBookIdx</button>
              </div>
            </button>
          </li>
        )}
      </ul>
    </>
  );
}
