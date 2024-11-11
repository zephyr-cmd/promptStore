import React, { useState } from "react";
import PromptInput from "./components/PromptInput";
import PromptList from "./components/PromptList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    setRefresh(!refresh); // Toggle to reload the list
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Prompt Store</h1>
      <PromptInput onAdd={handleAdd} />
      <PromptList key={refresh} />
      <ToastContainer />
    </div>
  );
};

export default App;
