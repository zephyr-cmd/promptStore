import React, { useState, useEffect } from "react";
import { addPrompt } from "../database";

const PromptInput = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    // Retrieve the selected content from local storage
    browser.storage.local.get("selectedContent", (data) => {
      if (data.selectedContent) {
        setContent(data.selectedContent); // Pre-fill the content field
        browser.storage.local.remove("selectedContent"); // Clear selected content after loading
      }
    });
  }, []);

  const handleAddPrompt = async () => {
    if (content) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      await addPrompt(content, tagArray);
      onAdd();
      setContent("");
      setTags("");
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your prompt"
      />
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags, separated by commas"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleAddPrompt}
        >
          Save Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
