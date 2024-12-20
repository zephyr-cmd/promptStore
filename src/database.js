import Dexie from "dexie";

// Initialize the Dexie database
const db = new Dexie("PromptDatabase");
db.version(1).stores({
  prompts: "++id, content, tags, createdAt",
});

export default db;

export const addPrompt = async (content, tags) => {
  return db.prompts.add({
    content,
    tags,
    createdAt: new Date(),
  });
};

export const getPrompts = async () => {
  return db.prompts.toArray();
};

export const deletePrompt = async (id) => {
  return db.prompts.delete(id);
};

// Search prompts by partial tag match
export const searchPromptsByTag = async (tag) => {
  if (!tag) {
    return db.prompts.toArray();
  }

  // Use .filter to match prompts that include the tag partially
  return db.prompts
    .filter((prompt) => prompt.tags.some((t) => t.includes(tag)))
    .toArray();
};
