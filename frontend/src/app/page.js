'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

export default function Home() {
  const [landmarks, setLandmarks] = useState([])
  const API ="http://localhost:5000/landmarks";

  const handleSelect = pt =>
      setLandmarks(prev => [...prev, pt])

  const persistLandmarks = async () => {
    const res = await fetch(`${API}/landmarks/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landmarks })
    })
    if (!res.ok) throw new Error('Failed to save landmarks')
    const created = await res.json()
    setLandmarks(created)
    return created
  }

  const handleAddNotes = async () => {
    if (!landmarks.length) return alert('No landmarks selected')
    try {
      const saved = await persistLandmarks()
      for (const lm of saved) {
        const note = prompt(`Note for [${lm.latitude},${lm.longitude}]:`)
        if (note) {
          await fetch(`${API}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ landmark_id: lm.id, text: note })
          })
        }
      }
      alert('Notes saved!')
    } catch (e) {
      console.error(e)
      alert('Error saving notes')
    }
  }

  const handleShowVisited = async () => {
    try {
      const res = await fetch(`${API}/visited`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      const list = data
          .map(v => `• [${v.landmark_id}] ${v.visited_date} by ${v.visitor_name}\n  Notes: ${v.notes||'<none>'}`)
          .join('\n')
      alert('Visited landmarks:\n' + list)
    } catch {
      alert('Error loading visited landmarks')
    }
  }

  const handleCreatePlan = async () => {
    if (!landmarks.length) return alert('No landmarks selected')
    try {
      const saved = await persistLandmarks()
      const planName = prompt('Plan name?')
      if (!planName) return
      const items = saved.map(lm => ({
        landmark_id: lm.id,
        note: prompt(`Plan note for [${lm.latitude},${lm.longitude}]:`) || ''
      }))
      const res = await fetch(`${API}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: planName, items })
      })
      if (!res.ok) throw new Error()
      alert('Visiting plan created!')
    } catch (e) {
      console.error(e)
      alert('Error creating plan')
    }
  }

  return (
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h2>Click on the Map to Add Landmarks</h2>
        <div style={{ width: '80%', margin: 'auto' }}>
          <Map landmarks={landmarks} onSelect={handleSelect} />
        </div>

        <h3>Selected Landmarks</h3>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          textAlign: 'left',
          width: '80%',
          margin: 'auto'
        }}>
          {landmarks.map((p, i) => (
              <li key={i}>
                Landmark {i+1}: Lat {p.latitude}, Lng {p.longitude}
              </li>
          ))}
        </ul>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleAddNotes}>Add Notes</button>
          <button onClick={handleShowVisited} style={{ marginLeft: 10 }}>
            Visited Landmarks
          </button>
          <button onClick={handleCreatePlan} style={{ marginLeft: 10 }}>
            Create Visiting Plans
          </button>
        </div>
      </div>
  )
}