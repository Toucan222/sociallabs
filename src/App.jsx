import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { tools } from './tools'
import ToolCard from './components/ToolCard'
import './styles/global.scss'

export default function App() {
  const [activeToolId, setActiveToolId] = useState(null)
  const [toolsList, setToolsList] = useState(tools)

  // Load votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('toolVotes')
    if (savedVotes) {
      const votes = JSON.parse(savedVotes)
      const updatedTools = tools.map(tool => ({
        ...tool,
        upvotes: votes[tool.id] || tool.upvotes
      }))
      setToolsList(sortToolsByVotes(updatedTools))
    }
  }, [])

  const sortToolsByVotes = (tools) => {
    return [...tools].sort((a, b) => b.upvotes - a.upvotes)
      .map((tool, index) => ({ ...tool, rank: index + 1 }))
  }

  const handleUpvote = (toolId) => {
    const savedVotes = JSON.parse(localStorage.getItem('toolVotes') || '{}')
    const updatedTools = toolsList.map(tool => {
      if (tool.id === toolId) {
        const newVotes = (savedVotes[toolId] || tool.upvotes) + 1
        savedVotes[toolId] = newVotes
        return { ...tool, upvotes: newVotes }
      }
      return tool
    })
    
    localStorage.setItem('toolVotes', JSON.stringify(savedVotes))
    setToolsList(sortToolsByVotes(updatedTools))
  }

  const activeTool = toolsList.find(tool => tool.id === activeToolId)

  return (
    <div className="app-container">
      <NavBar />
      
      <main className="main-content">
        {!activeToolId ? (
          <div className="tools-grid">
            {toolsList.map(tool => (
              <ToolCard
                key={tool.id}
                {...tool}
                onAction={() => setActiveToolId(tool.id)}
                onUpvote={() => handleUpvote(tool.id)}
              />
            ))}
          </div>
        ) : (
          <div className="tool-detail">
            <button
              className="back-button"
              onClick={() => setActiveToolId(null)}
            >
              ← Back to Tools
            </button>
            <h2>{activeTool.title}</h2>
            <activeTool.component />
          </div>
        )}
      </main>
    </div>
  )
}
