import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function PlayButton({
  handleStart
}: {
  handleStart: () => void
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <button
      onClick={handleStart}
      className='px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
    >
      <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
    </button>
  )
}