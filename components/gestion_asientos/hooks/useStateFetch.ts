import { useState } from "react"

const useFetching = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  return {
    isLoading,
    setIsLoading,
    error,
    setError,
  }
}

export default useFetching
