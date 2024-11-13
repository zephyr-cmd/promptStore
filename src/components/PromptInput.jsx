import React, { useState, useEffect } from "react";
import { addPrompt } from "../database";

// Check for browser storage compatibility
const storage = browser?.storage?.local || chrome?.storage?.local;

const PromptInput = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Retrieve the selected content from storage
    storage.get("selectedContent", (data) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error retrieving selected content:",
          chrome.runtime.lastError
        );
      } else if (data.selectedContent) {
        setContent(data.selectedContent); // Pre-fill content field
        storage.remove("selectedContent"); // Clear selected content after loading
      }
    });
  }, []);

  const handleAddPrompt = async () => {
    if (content) {
      setIsLoading(true);
      try {
        const tagArray = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean); // Ignore empty tags
        const sanitizedContent = sanitizeInput(content);
        const sanitizedTags = tagArray.map(sanitizeInput);

        await addPrompt(sanitizedContent, sanitizedTags);
        onAdd(); // Notify parent component of the addition
        setContent("");
        setTags("");
      } catch (error) {
        console.error("Error adding prompt:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to sanitize input
  const sanitizeInput = (input) => {
    const div = document.createElement("div");
    div.textContent = input; // Set as text content to escape HTML tags
    return div.innerHTML;
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
          className={`p-2 text-white rounded ${
            content && !isLoading
              ? "bg-blue-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleAddPrompt}
          disabled={!content || isLoading}
        >
          {isLoading ? "Saving..." : "Save Prompt"}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
