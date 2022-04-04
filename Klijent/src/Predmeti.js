import React, { useEffect } from 'react'

const Predmeti = () => {
  const [predmeti, setPredmeti] = useState([])

  useEffect(() => {
    const res = fetch("http://localhost:5000/api/predmet");
    const json = res.json()
    
    setPredmeti(json.data)
  })

  return (
    <>
      <div>
        {predmeti.map(predmet => {
          <p>{predmet.name}</p>
        })}
      </div>
    </>
  )
}