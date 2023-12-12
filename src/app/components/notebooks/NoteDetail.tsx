import React from "react";
import Image from "next/image";
import { subMainLi } from "@/app/styles/style";

interface Note {
  idx: number;
  title: string;
  content: string;
  subtitle: string;
}

interface NoteDetailProps {
  selectedIdx: number | null;
  memoList: Note[];
  onClickNoteBookDetail: any;
}

export default function NoteDetail({ selectedIdx, memoList, onClickNoteBookDetail }: NoteDetailProps) {
  const selectedNote = memoList.find((item: Note) => item.idx === selectedIdx);

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 h-[40px]">
        {selectedNote ? <h2 className="ml-4 truncate">{selectedNote.title}</h2> : <h2 className="ml-4 truncate">Select a Note</h2>}
        <Image src="/img/option.png" alt="option-img" className="mr-4 " width={24} height={24} />
      </div>
      <ul className="overflow-y-auto">
        {memoList.map((item, idx) => (
          <li key={idx} className={`hover:bg-blue-100  ${subMainLi}`}>
            <button className="w-full h-full" onClick={() => onClickNoteBookDetail(item.idx)}>
              <h2 className="font-bold text-left text-[20px] truncate pb-6">{item.subtitle ? item.subtitle : "New Note"}</h2>
              <p className="truncate">{item.content ? item.content : "No additional text"}</p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
