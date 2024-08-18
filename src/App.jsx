import { useState, useRef, useEffect } from "react"
import "./App.css"

function App() {
  const [size, setSize] = useState({ width: 350, height: 300 })
  const resizing = useRef({ width: false, height: false })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing.current.height) {
        setSize((prev) => ({
          ...prev,
          height: Math.min(Math.max(prev.height - e.movementY, 100), 600),
        }))
      } else if (resizing.current.width) {
        setSize((prev) => ({
          ...prev,
          width: Math.min(Math.max(prev.width + e.movementX, 100), 1000),
        }))
      }
      // these statements are written for one-sided interaction and limit size
    }

    const handleMouseUp = () => {
      resizing.current = { width: false, height: false }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    // unmounting
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        className="button top"
        onMouseDown={() => (resizing.current.height = true)}
      ></div>
      <div className="wrapper">
        <div
          className="block"
          style={{ width: `${size.width}px`, height: `${size.height}px` }}
        >
          resizeable block
        </div>
        <div
          className="button"
          onMouseDown={() => (resizing.current.width = true)}
        ></div>
      </div>
    </>
  )
}

export default App
