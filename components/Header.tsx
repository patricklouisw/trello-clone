"use client";

import Image from "next/image";
import Avatar from "react-avatar";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { fetchSuggestion } from "@/lib/fetchSuggestion";

const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;

    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col items-center p-5 bg-gray-400/10 rounded-b-2xl md:flex-row">
        {/* Background Gradient */}
        <div
          className="
        absolute
        top-0
        left-0
        w-full
        h-96
        bg-gradient-to-br
        from-pink-400
        to-[#0055d1]
        rounded-b-md
        filter
        blur-3xl
        opacity-50
        -z-50
        "
        />

        {/* Logo Image */}
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          height={100}
          width={300}
          priority
          className="w-44 md:w-56 pb-10 md:pb-0  object-contain"
        />

        {/* Search Bar + Avatar */}
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Search Box */}
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          {/* Avatar */}
          <div className="">
            <Avatar name="Patrick Louis" round color="#0055d1" size="50" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light bg-white pr-5 shadow-xl rounded-xl w-fit italic max-w-3xl text-[#0055d1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055d1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your tasks for the day..."}
        </p>
      </div>
    </header>
  );
};

export default Header;
