# Prompt Store Extension

This extension is designed to help users save, categorize, and retrieve text prompts. It’s ideal for writers, developers, and AI enthusiasts who need a convenient way to organize and access text prompts in their workflow.

## Features

- **Prompt Storage**: Save prompts along with tags to categorize and organize.
- **Tag-based Search**: Quickly find prompts by tags.
- **Copy to Clipboard**: Copy prompts with a single click.
- **Persistent Storage**: Uses IndexedDB (via Dexie) to store prompts locally and persistently.

## Installation

1. Clone or download this repository.
2. Navigate to the project directory and install dependencies:

   ```bash
   npm install
   ```

3. Build the project using Vite:

   ```bash
   npm run build
   ```

4. After building, Vite will generate files in the `dist` directory. This is the directory to load in Firefox.

5. Open Mozilla Firefox and go to `about:debugging`.
6. Click on **This Firefox** in the sidebar.
7. Click **Load Temporary Add-on…** and select the `manifest.json` file located in the `dist` folder.
8. The extension will load temporarily for testing. For permanent installation, package the extension and publish it on the Mozilla Add-ons site.

## Usage

1. **Save a Prompt**:
   - Enter your prompt in the provided text area.
   - Add tags (comma-separated) to categorize the prompt.
   - Click **Save Prompt** to store it.
2. **Search by Tag**:
   - Enter a tag in the search field and click **Search** to filter prompts.
3. **Copy Prompt**:
   - Click **Copy** next to a prompt to copy it to the clipboard.
4. **Delete Prompt**:
   - Click **Delete** to remove a prompt from storage.

## File Structure

The project structure is organized as follows:

```
prompt-saver-extension/
├── dist/                        # Built files for the extension
│   ├── index.html
│   ├── manifest.json            # Manifest for the extension
│   ├── assets/                  # Compiled assets (CSS, JS)
|   ├── background.js             # Background script for context menu
│   └── ...
├── public/
│   ├── icons/                   # Extension icons
│   └── manifest.json            # Manifest template
├── src/
│   ├── index.js                 # Main entry point for React
│   ├── App.js                   # Main App component
│   ├── database.js              # Dexie setup for IndexedDB
|   ├── background.js             # Source for background script (compiled to /dist)
│   └── components/              # UI components
│       ├── PromptInput.js       # Input form to save prompts and tags
│       └── PromptList.js        # List of prompts with search, delete, and copy features
├── vite.config.js               # Vite configuration file
├── package.json                 # Project dependencies and scripts
└── README.md                    # Documentation
```

## Example

Upon opening the extension, you will see the **Prompt Store** interface that allows you to enter prompts and save them with tags. Use the search functionality to find prompts by tag, and copy prompts directly to the clipboard as needed.

## Technical Details

- **Vite**: Used for fast development and optimized build process.
- **Dexie.js**: Used for IndexedDB operations to handle prompt storage.
- **React.js**: Provides a component-based interface for easy interaction.
- **React-Toastify**: Displays notifications when prompts are created, copied & deleted.

## Development

### Prerequisites

- Node.js and npm should be installed on your system.

### Steps

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Use `npm run dev` to start a development server with live reloading.
4. To build the extension, run `npm run build`. The built files will appear in the `dist` directory, ready to be loaded into Firefox.

---

This README now includes Vite-specific setup instructions and details about building and testing the extension with the Vite build tool. Let me know if you need any other adjustments!
