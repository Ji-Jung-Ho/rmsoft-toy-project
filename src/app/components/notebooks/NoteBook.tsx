import React from "react";
import Image from "next/image";

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

interface NoteBookProps {
  isMenuOpen: boolean;
  onClickNoteBookDetail: any;
}

export default function NoteBook({ isMenuOpen, onClickNoteBookDetail, memoList }: NoteBookProps) {
  return (
    <div
      id="notebookcompont"
      className={`flex flex-col w-[1670px] border-r-2 border-gray-200  ${isMenuOpen ? "" : "translatex-[-250px]"
        } transition-transform duration-500 ease-in-out z-3`}
    >
      <div className="flex justify-between items-center bg-gray-100 h-[40px] border-gray-200 border-b-2  dark:bg-gray-800">
        <div className="left-menu h-[40px] flex items-center dark:text-white">
          <h2 className="ml-8 w-[130px] truncate">Notebooks</h2>
        </div>
        <div className="w-[500px] right-menu flex justify-around">
          <div className="flex justify-center items-center">
            <button className="w-[48px] h-[30px] border-[1px] bg-white p-2 flex items-center justify-center">
              <Image src="/img/grid.png" alt="search-img" width={16} height={16} />
            </button>
            <button className="w-[48px] h-[30px] border-[1px] bg-white p-2 flex items-center justify-center">
              <Image src="/img/menu.png" alt="search-img" width={16} height={16} />
            </button>
          </div>
          <div className="flex justify-center items-center relative">
            <Image src="/img/search.png" alt="search-img" className="h-[24px] absolute top-[3px] left-[10px] " width={24} height={24} />
            <input
              type="text"
              placeholder="Search"
              className="w-[200px] pl-[40px]  hover:ring-1 hover:ring-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-[1px] border-gray-400 rounded-[5px]"
            />
          </div>
          <div className="flex justify-center items-center">
            <button>
              <Image src="/img/plus-black.png" alt="plus-black-img" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        {noteBookList.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-center text-gray-500 dark:text-white">You can organize notes of same topic into notebooks.</p>
            <button className="mt-[8px] px-4 py-2 border-0 font-bold text-blue-400 hover:text-blue-700" onClick={onClickOpenNoteAddModal}>
              Create New Notebook
            </button>
          </div>
        ) : (
          <ul className="dark:text-white">
            {noteBookList.map((item, idx) => (
              <li key={idx} className="pl-4 border-b-2 h-[50px] hover:bg-gray-200 dark:border-b-[1px]">
                <button className="w-full h-full flex items-center truncate" onClick={() => onClickNoteBookDetail(item.idx)}>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
