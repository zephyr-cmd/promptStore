import React, { useState, useEffect } from "react";
import { getPrompts, deletePrompt, searchPromptsByTag } from "../database";
import { Bounce, toast } from "react-toastify";

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    const allPrompts = await getPrompts();
    setPrompts(allPrompts);
  };

  const handleDelete = async (id) => {
    await deletePrompt(id);
    toast("Prompt deleted successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    loadPrompts();
  };

  // Automatically searches as user types
  const handleSearchTagChange = async (e) => {
    const tag = e.target.value;
    setSearchTag(tag);

    if (tag.trim() === "") {
      loadPrompts();
    } else {
      const results = await searchPromptsByTag(tag);
      setPrompts(results);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast("Prompt copied to clipboard!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch(() => {
        toast.error("Failed to copy prompt", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          className="flex-grow size-2/3 p-2 border rounded"
          value={searchTag}
          onChange={handleSearchTagChange}
          placeholder="Search by tag"
        />
      </div>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt.id} className="mb-2 p-2 border rounded relative">
            <p>{prompt.content}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 ">
                Tags: {prompt.tags.join(", ")}
              </p>
              <div className="flex items-center justify-between gap-5">
                <button
                  className="text-red-500 bg-gray-200/50 hover:bg-gray-300/50 p-2 rounded-md"
                  onClick={() => handleDelete(prompt.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  className="text-blue-500 bg-gray-200/50 hover:bg-gray-300/50 p-2 rounded-md"
                  onClick={() => handleCopy(prompt.content)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptList;
