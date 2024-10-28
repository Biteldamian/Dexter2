# Dexter - AI-Powered File Management Assistant

Dexter is an intelligent file management system that uses local LLMs (via Ollama) to organize, index, and analyze your files. It provides a modern web interface for managing your knowledge base and orchestrating AI-powered tasks.

![Dexter Interface](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000)

## Features

- 📁 **Smart File Management**: Automatically indexes and organizes files
- 🧠 **Knowledge Base**: Builds and maintains a searchable knowledge repository
- 🤖 **Task Orchestration**: Executes AI-powered tasks using local LLMs
- ⚙️ **Configurable Settings**: Customize behavior and API endpoints

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- [Ollama](https://ollama.ai) installed locally

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dexter.git
cd dexter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

### Ollama Setup

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull the required model:
```bash
ollama pull llama2
```

### Application Settings

Configure the following settings in the Settings panel:

- **Watch Folder Path**: Directory to monitor for new files
- **Ollama API Endpoint**: URL of your Ollama instance (default: http://localhost:11434)
- **Update Interval**: How often to check for file changes (in seconds)
- **Max Concurrent Tasks**: Number of simultaneous AI tasks

## Architecture

Dexter consists of several key components:

- **File Manager**: Handles file indexing and organization
- **Knowledge Base**: Stores and retrieves processed information
- **Task Orchestrator**: Manages AI task execution
- **Settings Manager**: Handles application configuration

## API Integration

### Ollama API

The application uses Ollama for local LLM capabilities. To change the model:

1. Update the Ollama endpoint in settings
2. Pull your preferred model using `ollama pull <model-name>`
3. Update the model name in the settings

### File Watching

File watching is implemented using `chokidar`. Configure watch patterns in settings:

```javascript
{
  "watchFolder": "/path/to/folder",
  "watchPatterns": ["**/*.txt", "**/*.md", "**/*.pdf"]
}
```

## Development

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## TODO

### High Priority
- [ ] Implement file content indexing
- [ ] Add SQLite database integration
- [ ] Create API endpoints for file operations
- [ ] Implement real-time file watching
- [ ] Add error handling for API calls

### Medium Priority
- [ ] Add file type previews
- [ ] Implement search functionality
- [ ] Create task scheduling system
- [ ] Add user authentication
- [ ] Implement file metadata extraction

### Low Priority
- [ ] Add dark mode support
- [ ] Create plugin system
- [ ] Add file sharing capabilities
- [ ] Implement data export/import
- [ ] Add keyboard shortcuts

### Future Enhancements
- [ ] Add support for more LLM providers
- [ ] Implement collaborative features
- [ ] Create mobile responsive design
- [ ] Add file type conversions
- [ ] Implement advanced search filters