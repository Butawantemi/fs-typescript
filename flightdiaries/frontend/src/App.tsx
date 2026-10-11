import { useEffect, useState } from "react";
import { Visibility, Weather, type DiaryEntry } from "./type";
import diaryService from "./diaryServices";
import axios from "axios";


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState<string>("09/02/2026")
  const [weather, setWeather] = useState<Weather>("sunny")
  const [visibility, setVisibility] = useState<Visibility>("good")
  const [comment, setComment] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
     diaryService.getAll().then(initialDiaries => setDiaries(initialDiaries))
  }, [])


  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const diaryToAdd = {
      date, weather, visibility, comment
    }
    diaryService.create(diaryToAdd).then(newDiary => {
      setDiaries(diaries.concat(newDiary))
      setComment("")
      setDate("")
    }).catch((error: unknown) => {
     if(axios.isAxiosError(error) ) {
      setError(error.response?.data.toString())

      setTimeout(() => {
        setError("")
      }, 5000)
     }
    })
  }


  return (
  <div>
    <h1>Add new entry: </h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div style={{padding: "1rem"}}>
      <form onSubmit={handleCreate}>
        <p>date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/></p>
        <p>weather: {(Object.values(Weather) as Weather[]).map(w => <span key={w}>{w} <input type="radio" name="weather" value={w} checked={weather === w} onChange={() => setWeather(w)} /></span>)}</p>
        <p>visibility: {(Object.values(Visibility) as Visibility[]).map(v => <span key={v}>{v} <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={() => setVisibility(v)}/></span>)}</p>
        <p>comment: <input type="text" value={comment} onChange={e => setComment(e.target.value)}/></p>
        <button type="submit">add</button>
      </form>
    </div>

    <h1>Diary Entries</h1>
    {diaries.map(diary => <div style={{border: "1px solid #707070", marginBottom: "1rem", padding: "1rem", width: "200px"}} key={diary.id}><h4><strong>{diary.date}</strong></h4><p>Visibility: {diary.visibility}</p><p>Weather: {diary.weather}</p></div>)}
  </div>
  )
}

export default App;