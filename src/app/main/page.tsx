"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { NotoBookNaviBarOption, commonNaviBarOption } from "@/app/styles/style";
import AllNotes from "@/app/components/allnotes/AllNotes";
import Uncategorized from "@/app/components/allnotes/Uncategorized";
import Todo from "@/app/components/allnotes/Todo";
import Unsynced from "@/app/components/allnotes/Unsynced";
import Editor from "@/app/components/editor";
import NoteBookAddModal from "@/app/components/NoteBookAddModal";
import NoteBook from "@/app/components/notebooks/NoteBook";
import NoteBookDeleteModal from "../components/NoteBookDeleteModal";
import NoteDetail from "../components/notebooks/NoteDetail";
import ConfirmModal from "../components/ConfirmModal";

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

export default function Page() {
  // 사이드 메뉴 클릭 상태 변수
  const [isAllNotesVisible, setAllNotesVisible] = useState(true);
  const [isNoteBooks, setIsNoteBooks] = useState(true);
  const [isTags, setIsTags] = useState(true);

  // 사이드 메뉴 호버 상태 변수
  const [isAllNotesHover, setIsAllNotesHover] = useState(false);
  const [isNoteBooksHover, setIsNoteBooksHover] = useState(false);
  const [isTagsHover, setIsTagsHover] = useState(false);

  // 사이드 메뉴 링크
  const [isAllNotesComponent, setIsAllNotesComponent] = useState(true);
  const [isUncategoriedComponent, setIsUncategoriedComponent] = useState(false);
  const [isTodoComponent, setIsTodoComponent] = useState(false);
  const [isUnsyncedComponent, setIsUnsyncedComponent] = useState(false);
  const [isNoteBookComponent, setIsNoteBookComponent] = useState(false);
  const [isNoteDetailComponent, setIsNoteDetailComponent] = useState(false);

  // 메뉴 토글 상태 변수
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // 노트북 List
  const [noteBookList, setNoteBookList] = useState<NoteBook[]>(JSON.parse(localStorage.getItem("NotebookList") || "[]"));
  // 내가 선택한 노트북의 idx
  const [selectedNoteBookIdx, setSelectedNoteBookIdx] = useState(0);
  // 노트 List
  const [noteList, setNoteList] = useState<Note[]>([]);
  // NoteIdx
  const [selectedNoteIdx, setSelectedNoteIdx] = useState(0);
  // 다크모드 설정 상태 변수
  const [screenMode, SetScreenMode] = useState("nomal");
  // 메모 추가 모달 가시성 상태 변수
  const [isNoteAddModalOpen, setIsNoteAddModalOpen] = useState(false);

  // 메모 삭제 모달 가시성 상태 변수
  const [isNoteDeleteModalOpen, setIsNoteDeleteModalOpen] = useState(false);

  // 컨펌 모달 가시성 상태 변수
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  // 노트북안의 메모 값을 담는 변수
  const [memoList, setMemoList] = useState<Note[]>([]);

  // 내가 선택한 노트북의 idx
  const [selecNoteBookIdx, setSelecNoteBookIdx] = useState(0);

  // 선택한 노트의 idx
  const [selectMemoIdx, setSelectMemoIdx] = useState(0);

  // 다크모드 설정 상태 변수
  const [screenMode, SetScreenMode] = useState("nomal");

  // Menu 토글 이벤트
  const AllNotesToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAllNotesVisible(!isAllNotesVisible);
  };
  const NoteBooksToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNoteBooks(!isNoteBooks);
  };
  const TagsToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsTags(!isTags);
  };
  const NavMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // 로컬에 저장된 데이터를 반영해주는 useEffect 훅
  useEffect(() => {
    const loadMemoList = () => {
      const titleList = JSON.parse(localStorage.getItem("NotebookList") || "[]");
      setNoteBookList(titleList);
    };

    loadMemoList();

    const intervalId = setInterval(() => {
      loadMemoList();
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  // NoteBookList의 NoteList
  useEffect(() => {
    setNoteList(noteBookList.find((el) => el.idx === selectedNoteBookIdx)?.noteList ?? []);
  }, [noteBookList, selectedNoteBookIdx]);

  // 사이드 메뉴 클릭 시 상태 업데이트
  const onClickAllNotesMenu = () => {
    setIsAllNotesComponent(true);
    setIsUncategoriedComponent(false);
    setIsTodoComponent(false);
    setIsUnsyncedComponent(false);
    setIsNoteBookComponent(false);
    setIsNoteDetailComponent(false);
    setSelectedNoteBookIdx(0);
    setSelectedNoteIdx(0);
  };
  const onClickUncategoriedMenu = () => {
    setIsUncategoriedComponent(true);
    setIsAllNotesComponent(false);
    setIsTodoComponent(false);
    setIsUnsyncedComponent(false);
    setIsNoteBookComponent(false);
    setIsNoteDetailComponent(false);
  };
  const onClickTodoMenu = () => {
    setIsTodoComponent(true);
    setIsUncategoriedComponent(false);
    setIsAllNotesComponent(false);
    setIsUnsyncedComponent(false);
    setIsNoteBookComponent(false);
    setIsNoteDetailComponent(false);
  };
  const onClickUnsyncedMenu = () => {
    setIsUnsyncedComponent(true);
    setIsUncategoriedComponent(false);
    setIsTodoComponent(false);
    setIsAllNotesComponent(false);
    setIsNoteBookComponent(false);
    setIsNoteDetailComponent(false);
  };
  const onClickNoteBookMenu = () => {
    setIsNoteBookComponent(true);
    setIsUnsyncedComponent(false);
    setIsUncategoriedComponent(false);
    setIsTodoComponent(false);
    setIsAllNotesComponent(false);
    setIsNoteDetailComponent(false);
    setSelectedNoteBookIdx(0);
    setSelectedNoteIdx(0);
  };
  const onClickNoteBookDetail = (idx: any) => {
    setIsNoteDetailComponent(true);
    setIsNoteBookComponent(false);
    setIsUnsyncedComponent(false);
    setIsUncategoriedComponent(false);
    setIsTodoComponent(false);
    setIsAllNotesComponent(false);

    setSelectMemoIdx(idx);
    setSelecNoteBookIdx(idx);
    // console.log(idx);
  };
  // const handleAllNotesLinkClick = () => {
  // };
  // const handleAllNotesLinkClick = () => {
  // };
  // const handleAllNotesLinkClick = () => {
  // };

  // 노트 추가 모달 열기
  const onClickOpenNoteAddModal = () => {
    setIsNoteAddModal(true);
  };
  // 노트 추가 모달 닫기
  const onClickCloseNoteAddModal = () => {
    setIsNoteAddModal(false);
  };
  // 노트북 삭제 모달 열기
  const onClickOpenNoteBookDelModal = (idx: any) => {
    setIsNoteBookDeleteModal(true);

    // idx를 객체 형식으로 DeleteNote 로컬스토리지에 저장
    localStorage.setItem("DeleteNote", JSON.stringify({ idx }));

    // console.log("idx = ", idx);
    // console.log("memoList = ", memoList);
  };

  //노트 삭제 모달 열기
  const onClickOpenNoteDelModal = () => { };

  // 로컬에 저장된 데이터 삭제하는 클릭 이벤트
  const onClickMemoDelete = () => {
    const noteToDelete = JSON.parse(localStorage.getItem("DeleteNote") || "{}");
    const updatedMemoList = memoList.filter((memo) => memo.idx !== noteToDelete.idx);

    localStorage.setItem("noteBookList", JSON.stringify(updatedMemoList));
    setMemoList(updatedMemoList);

    onClickCloseNoteDelModal();

    // console.log(noteToDelete.id);
    // console.log(updatedMemoList);
  };

  // 노트 삭제 모달 닫기
  const onClickCloseNoteDelModal = () => {
    setIsNoteDeleteModalOpen(false);
  };

  const addNewMemo = () => {
    // 로컬 스토리지에서 이전 메모 리스트를 불러옴
    const storedMemoList = JSON.parse(localStorage.getItem("noteBookList") || "[]");

    // 노트북이 있는지 여부를 확인
    const hasNotebook = storedMemoList.length > 0;

    if (!hasNotebook) {
      // 노트북이 없는 경우, confirmModal을 띄움
      setIsConfirmModal(true);
    } else {
      // 선택된 노트북의 인덱스를 찾아서 해당 노트북의 subMemoList에 새로운 메모를 추가
      const updatedMemoList = storedMemoList.map((memo: any) => {
        if (memo.idx === selecNoteBookIdx) {
          const memoList = Array.isArray(memo.memoList) ? memo.memoList : [];

          // console.log("memo.memoList", memo.memoList);
          const newMemo = {
            memoidx: memo.memoList.length + 1,
            memosubtitle: memoSubTitle,
            memocontent: memoContent,
          };
          return { ...memo, memoList: [newMemo, ...memoList] };
        }
        return memo;
      });

      // 로컬 스토리지와 상태를 업데이트
      localStorage.setItem("noteBookList", JSON.stringify(updatedMemoList));
      setMemoList(updatedMemoList);

      // 아래 코드는 예시이므로 실제 로직에 맞게 수정 필요
      console.log("새로운 메모가 추가되었습니다.");
    }
  };

  // confirmModal에서 취소를 눌렀을 때 실행되는 함수
  const handleCancel = () => {
    setIsConfirmModal(false);
  };

  // 로컬에 저장된 노트북 삭제 이벤트
  const onClickNoteBookDelete = () => {
    const noteToDelete = JSON.parse(localStorage.getItem("DeleteNoteBook") || "{}");
    const updatedNoteBookList = noteBookList.filter((notebook) => notebook.idx !== noteToDelete.idx);
    localStorage.setItem("NotebookList", JSON.stringify(updatedNoteBookList));
    setNoteBookList(updatedNoteBookList);
    onClickCloseNoteDelModal();
  };

  // 노트 삭제 모달 닫기
  const onClickCloseNoteDelModal = () => {
    setIsNoteBookDeleteModal(false);
  };

  const AllNotesMenu = { display: isAllNotesVisible ? "flex" : "none" };
  const NoteBooksMenu = { display: isNoteBooks ? "flex" : "none" };
  const TagsMenu = { display: isTags ? "flex" : "none" };
  const clickimageSrc = isAllNotesVisible ? "/img/arrotw-right-bold.png" : "/img/arrotw-right-bold.png";
  const hoverImageSrc = isAllNotesVisible ? "/img/arrotw-right-bold-balck.png" : "/img/arrotw-right-bold-balck.png";

  // 다크/기본 모드 설정 토글 이벤트
  const toggleDarkMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      // 다크모드 -> 기본모드
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      SetScreenMode("nomal");
    } else {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      SetScreenMode("dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const addNewNote = () => {
    // 노트북 리스트가 없을 경우
    if (noteBookList.length === 0) {
      setIsConfirmModal(true);
    } else {
      // 선택한 노트북이 없을 경우
      if (!selectedNoteBookIdx) {
        alert("select NoteBook");
      } else {
        // 새로운 노트가 있을 경우
        if (noteList.find((el) => !el.title && !el.content)) {
        } else {
          // 새로운 노트가 없을 경우
          localStorage.setItem(
            "NotebookList",
            JSON.stringify(
              noteBookList.map((el) =>
                el.idx === selectedNoteBookIdx ? { ...el, noteList: [{ idx: noteList.length + 1, title: "", content: "" }, ...noteList] } : el
              )
            )
          );
          // 새로운 노트에 포커스
          setSelectedNoteIdx(noteList.length + 1);
        }
      }
    }
  };

  return (
    <>
      <div
        className={`min-w-[1400px] max-w-[1920px] h-[100vh] dark:bg-gray-800  ${isNoteAddModalOpen ? "blur-sm" : ""} || ${isNoteDeleteModalOpen ? "blur-sm" : ""
          } || ${isConfirmModal ? "blur-sm" : ""}`}
      >
        <header className="border-r-2 border-b-2 ">
          <div id="top-header" className="w-full h-full flex justify-between ">
            <ul className="flex items-center ">
              <li className="pl-[16px] h-[32px]">
                <button onClick={NavMenuToggle}>
                  <Image
                    src={screenMode === "dark" ? "/img/darkmode/menu-white.png" : "/img/menu.png"}
                    alt={screenMode === "dark" ? "menu-white-img" : "menu-img"}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
              <li className="h-[32px]">
                <button>
                  <Image
                    src={screenMode === "dark" ? "/img/darkmode/arrow-left-white.png" : "/img/arrow-left.png"}
                    alt={screenMode === "dark" ? "arrow-left-white-img" : "arrow-left-img"}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
              <li className="h-[32px]">
                <button>
                  <Image
                    src={screenMode === "dark" ? "/img/darkmode/arrow-right-white.png" : "/img/arrow-right.png"}
                    alt={screenMode === "dark" ? "arrow-right-white-img" : "arrow-right-img"}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
              <li className="flex relative h-[32px]">
                <Image src="/img/search.png" alt="search-img" className="h-[24px] absolute top-[4px] left-[10px] " width={24} height={24} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[400px] pl-[40px]  hover:ring-1 hover:ring-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-[1px] border-gray-400 rounded-[5px]"
                />
              </li>
            </ul>
            <ul className="flex items-center">
              <li>
                <button onClick={toggleDarkMode} className="flex items-center mr-4">
                  <Image
                    src={screenMode === "dark" ? "/img/darkmode/sun-white.png" : "/img/moon.png"}
                    alt={screenMode === "dark" ? "darkMode-img" : "nomalMode-img"}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
              <li>
                <button className="p-[10px] m-2 bg-blue-500 rounded-[5px] hover:bg-blue-600" onClick={addNewNote}>
                  <span className="text-white">New Note</span>
                </button>
              </li>
              <li className="ml-[32px] h-[32px]">
                <button>
                  <Image
                    src={screenMode === "dark" ? "/img/darkmode/copy-white.png" : "/img/copy.png"}
                    alt={screenMode === "dark" ? "copy-white-img" : "copy-img"}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
              <li className="pr-[16px] ml-[32px] h-[32px]">
                <button>
                  <Image
                    src={screenMode === "dark" ? "/img/darkmode/settings-white.png" : "/img/settings.png"}
                    alt={screenMode === "dark" ? "settings-white-img" : "settings-img"}
                    width={32}
                    height={32}
                  />
                </button>
              </li>
            </ul>
          </div>
        </header>
        <main id="noteBook" className="flex min-w-[1400px] max-w-[1920px] h-full">
          <aside
            id="sideNavBar"
            className="w-[250px] h-full transition-transform duration-700 ease-in-out  border-gray-200 border-r-2  border-b-2 dark:bg-gray-800 "
          >
            <div className="flex h-full">
              <nav className="flex">
                <ul className="w-[250px]">
                  <li className="w-full">
                    <ul className="flex justify-center flex-col dark:text-white">
                      <li onClick={onClickAllNotesMenu} className="flex items-center h-[40px] hover:bg-gray-100">
                        <div className="flex items-center w-full cursor-pointer dark:text-red-500">
                          <button onClick={AllNotesToggle}>
                            <Image
                              src={isAllNotesHover ? hoverImageSrc : clickimageSrc}
                              className={`${isAllNotesVisible ? "rotate-90" : ""}`}
                              alt="arrow-right-img"
                              width={24}
                              height={24}
                              onMouseEnter={() => {
                                setIsAllNotesHover(true);
                              }}
                              onMouseLeave={() => {
                                setIsAllNotesHover(false);
                              }}
                            />
                          </button>
                          <Image
                            src={screenMode === "dark" ? "/img/darkmode/sticky-note-white.png" : "/img/sticky-note.png"}
                            alt={screenMode === "dark" ? "sticky-note-white-img" : "sticky-note-img"}
                            className="mr-[8px]"
                            width={24}
                            height={24}
                          />
                          All Notes
                        </div>
                      </li>
                      <li style={AllNotesMenu} className="  py-2 px-6 h-[40px] items-center hover:bg-gray-100 dark:hover:text-black">
                        <button onClick={onClickUncategoriedMenu} className={` ${commonNaviBarOption}`}>
                          <Image src="/img/filte.png" alt="uncategorized-img" className="mr-[8px] h-[100%]" width={24} height={24} />
                          Uncategorized
                        </button>
                      </li>
                      <li style={AllNotesMenu} className="  py-2 px-6 h-[40px] items-center hover:bg-gray-100 dark:hover:text-black">
                        <button onClick={onClickTodoMenu} className={commonNaviBarOption}>
                          <Image src="/img/check.png" alt="todo-img" className="mr-[8px]" width={24} height={24} />
                          Todo
                        </button>
                      </li>
                      <li style={AllNotesMenu} className="  py-2 px-6 h-[40px] items-center hover:bg-gray-100 dark:hover:text-black">
                        <button onClick={onClickUnsyncedMenu} className={commonNaviBarOption}>
                          <Image src="/img/cloud-off.png" alt="unsynced-img" className="mr-[8px]" width={24} height={24} />
                          Unsynced
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li id="asd" className="">
                    <ul className="flex justify-center flex-col relative dark:text-white">
                      <li className="flex items-center h-[40px]">
                        <div className="flex items-center">
                          <button onClick={NoteBooksToggle} className="w-[24px] h-[24px]">
                            <Image
                              src={isNoteBooksHover ? hoverImageSrc : clickimageSrc}
                              className={`${isNoteBooks ? "rotate-90" : ""}`}
                              alt="arrow-right-img"
                              width={24}
                              height={24}
                              onMouseEnter={() => {
                                setIsNoteBooksHover(true);
                              }}
                              onMouseLeave={() => {
                                setIsNoteBooksHover(false);
                              }}
                            />
                          </button>
                        </div>
                        <button onClick={onClickNoteBookMenu} className="flex w-full items-center h-full text-blue-800 dark:text-red-500">
                          NOTEBOOKS
                        </button>
                        {/* 메모 추가 버튼 */}
                        <button onClick={onClickOpenNoteAddModal} className="group flex items-center relative">
                          <Image
                            src={screenMode === "dark" ? "/img/darkmode/plus-white.png" : "/img/plus-blue.png"}
                            alt={screenMode === "dark" ? "plus-white-img" : "plus-blue-img"}
                            width={24}
                            height={24}
                          />
                          <span className="w-[110px] bg-gray-600 absolute top-[-26px] right-[-45px] rounded opacity-0 transition-opacity group-hover:opacity-100 text-[14px] z-5 text-white ">
                            New NoteBook
                          </span>
                          <Image
                            src="/img/down-triangle.png"
                            alt="speech-bubble-img"
                            className="absolute bottom-[16px] left-[2px] opacity-0 transition-opacity group-hover:opacity-100 "
                            width={16}
                            height={16}
                          />
                        </button>
                      </li>
                      {/* 새로 추가된 노트북이 저장되야함 */}
                      {noteBookList.map((notebook, idx) => (
                        <li style={NoteBooksMenu} key={idx} className="py-2 pl-6 pr-4 h-[40px] hover:bg-gray-100 justify-between dark:hover:text-black">
                          <a
                            href="#!"
                            onClick={() => onClickNoteBookDetail(item.idx)}
                            // onClick={() => console.log(idx)}
                            className={`truncate ${NotoBookNaviBarOption}`}
                          >
                            {item.title}
                          </a>
                          <button onClick={() => onClickOpenNoteBookDelModal(item.idx)}>
                            <Image src="/img/delete.png" alt="delete-img" width={24} height={24} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="">
                    <ul className="flex justify-center flex-col dark:text-white">
                      <li className="flex items-center  h-[40px]">
                        <div className="flex items-center ">
                          <button onClick={TagsToggle}>
                            <Image
                              src={isTagsHover ? hoverImageSrc : clickimageSrc}
                              className={`${isTags ? "rotate-90" : ""}`}
                              alt="arrow-right-img"
                              width={24}
                              height={24}
                              onMouseEnter={() => {
                                setIsTagsHover(true);
                              }}
                              onMouseLeave={() => {
                                setIsTagsHover(false);
                              }}
                            />
                          </button>
                        </div>
                        <button className="flex w-full items-center h-full text-blue-800 dark:text-red-500">TAGS</button>
                      </li>
                      <li style={TagsMenu} className="py-2 pl-6 h-[40px] items-center hover:bg-gray-100 dark:hover:text-black">
                        <button className={NotoBookNaviBarOption}>#UpNote</button>
                      </li>
                    </ul>
                  </li>
                  <li className=" ml-6 h-[40px] flex items-center">
                    <button className="flex w-full items-center h-full text-blue-800 dark:text-red-500">TEMPLATES</button>
                  </li>
                  <li className=" ml-6 h-[40px] flex items-center">
                    <button className="flex w-full items-center h-full text-blue-800 dark:text-red-500">TRASH</button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          {isNoteBookComponent ? (
            <NoteBook isMenuOpen={isMenuOpen} onClickNoteBookDetail={onClickNoteBookDetail} memoList={memoList} />
          ) : (
            <div
              className={`min-w-[1400px] max-w-[1920px] flex ${isMenuOpen ? "" : "translate-x-[-250px]"
                } transition-transform duration-500 ease-in-out z-3 bg-white w-full flex dark:bg-gray-800`}
            >
              <aside id="subMain" className="min-w-[250px] max-w-[250px] border-y-2 border-r-2 border-bg-gray-200">
                {isUncategoriedComponent ? <Uncategorized /> : ""}
                {isTodoComponent ? <Todo /> : ""}
                {isUnsyncedComponent ? <Unsynced /> : ""}
                {isAllNotesComponent ? (
                  <AllNotes selecNoteBookIdx={selecNoteBookIdx} memoList={memoList} onClickNoteBookDetail={onClickNoteBookDetail} screenMode={screenMode} />
                ) : (
                  ""
                )}
                {isNoteBookMemoComponent ? (
                  <NoteBookMemo
                    selecNoteBookIdx={selecNoteBookIdx}
                    memoList={memoList}
                    onClickNoteBookDetail={onClickNoteBookDetail}
                    screenMode={screenMode}
                    onClickOpenNoteDelModal={onClickOpenNoteDelModal}
                  />
                ) : (
                  ""
                )}
              </aside>
              {/* 에디터 */}

              {/* 노트북안에 있는 메모리스트를 불러옴 */}
              {/* 노트북 idx를 비교하여 선택한 idx의 memolist의 memoidx를 보여줌 */}
              {memoList.map((memo: any, idx) =>
                isNoteBookMemoComponent && selecNoteBookIdx === memo.idx ? (
                  <Editor key={idx} selecNoteBookIdx={selecNoteBookIdx} memoList={memoList} screenMode={screenMode} />
                ) : (
                  ""
                )
              )}

              {isAllNotesComponent ? <Editor selecNoteBookIdx={selecNoteBookIdx} memoList={memoList} screenMode={screenMode} /> : ""}
              {isUncategoriedComponent ? <Editor selecNoteBookIdx={selecNoteBookIdx} memoList={memoList} screenMode={screenMode} /> : ""}
              {isTodoComponent ? <Editor selecNoteBookIdx={selecNoteBookIdx} memoList={memoList} screenMode={screenMode} /> : ""}
              {isUnsyncedComponent ? <Editor selecNoteBookIdx={selecNoteBookIdx} memoList={memoList} screenMode={screenMode} /> : ""}
            </div>
          )}
        </main>
      </div>
      {isNoteAddModalOpen && <NoteAddModal onClickCloseNoteAddModal={onClickCloseNoteAddModal} />}
      {isNoteDeleteModalOpen && <NoteDeleteModal closeDelModal={onClickCloseNoteDelModal} memoTitleDelete={onClickMemoDelete} />}
      {isConfirmModal && <ConfirmModal onClickOpenNoteAddModal={onClickOpenNoteAddModal} handleCancel={handleCancel} />}
    </>
  );
}
