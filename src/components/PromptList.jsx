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
            <p className="text-sm text-gray-500">
              Tags: {prompt.tags.join(", ")}
            </p>
            <div className="flex items-center justify-between mt-2">
              <button
                className="text-red-500 bg-gray-200/50 hover:bg-gray-300/50 p-2 rounded-md"
                onClick={() => handleDelete(prompt.id)}
              >
                Delete
              </button>
              <button
                className="text-blue-500 bg-gray-200/50 hover:bg-gray-300/50 p-2 rounded-md"
                onClick={() => handleCopy(prompt.content)}
              >
                Copy
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptList;
