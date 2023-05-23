"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { Suspense } from "react";

import dynamic from "next/dynamic";
// ...

const PromptCardList = dynamic(() => import("./PromptCardList.jsx"));

import Loading from "./loading.js";

const Feed = (params) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchAllPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag) ||
        regex.test(item.creator.email)
    );
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchresults = filterPrompts(e.target.value);
        setSearchResults(searchresults);
      }, 500)
    );
  };

  useEffect(() => {
    if (params.search) {
      handleTagClick(params.search);
    }
  }, [allPosts]);

  useEffect(() => {
    fetchAllPosts().then(() => setIsLoading(false));
  }, []);

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchresults = filterPrompts(tag);
    setSearchResults(searchresults);
  };

  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts, tag or username"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          required
          className="search_input peer"
        />
      </form>
      {/* <Suspense fallback={<Loading />}>
         
      </Suspense> */}
      {isLoading ? (
        <Loading />
      ) : searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </div>
  );
};

export default Feed;
