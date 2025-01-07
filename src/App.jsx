import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [fullData, setFullData] = useState(null)
  const [slicedData, setSlicedData] = useState(null)
  const [paginationNo,setPaginationNumber] = useState([])
  const [currPage, setCurrPage] = useState(null)

  const getData = async() => {
    const jsonedResponse = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
    const response = await jsonedResponse.json()
    console.log("Response", response)
    setFullData(response)
    const slicedArr = response.slice(0,5)
    console.log("Sliced", slicedArr)
    setSlicedData(slicedArr)
    const totalPages = Math.ceil(response.length / 5)
    console.log("totalPages", totalPages)
    const pageArr = new Array(totalPages)
    for(let i = 0; i < pageArr.length; i++){
      pageArr[i] = i+1
    }
    console.log("Pages", pageArr).
    setCurrPage(1)
    setPaginationNumber(pageArr)
  }
  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    if(currPage){
      const end = 5 * currPage <= fullData?.length ? 5 * currPage : fullData?.length
      const start = (currPage-1) * 5
      console.log("On Page", {start, end})
      const slicedArr = fullData.slice(start,end)
      console.log("New Sliced", slicedArr)
      setSlicedData(slicedArr)}
  },[currPage])

  return (
    <>
      <h1>FrontEnd Assignment</h1>
      <div>
        <div style={{display:'flex'}}>
          {['S.No', 'Percentage Funded', 'Amount pledged'].map((columnHeader) => {
            return (
              <div style={{ borderStyle:'solid', borderWidth: '1px', width: '160px' }}>
                <p style={{marginLeft: 8, padding: 8}}>{columnHeader}</p>
              </div>
            )
          })}
        </div>
        {
         slicedData?.map((slice)=>{return(<div style={{display:'flex'}}>
          {[slice['s.no'],slice['percentage.funded'] ,slice['amt.pledged'] ].map((columnHeader) => {
            return (
              <div style={{ borderStyle:'solid', borderWidth: '1px',  width: '160px'  }}>
                <p style={{marginLeft: 8, padding: 8}}>{columnHeader}</p>
              </div>
            )
          })}
        </div>)})
        }
      </div>
      <div style={{display:'flex', justifyContent: 'flex-end'}}>
        <button onClick={() => {
          const newcurrPage = currPage-1
          setCurrPage(newcurrPage)
        }}>{'<'}</button>
        <input type='text' style={{width: '40px', alignItems:'center', textAlign:'center'}} value={currPage} 
          onKeyDown={
            (e) => {
              if(e.key === 'Enter'){
                console.log("ON Submit")
                const end = 5 * currPage <= fullData.length ? 5 * currPage : fullData.length
            const start = (currPage-1) * 5
            console.log("On Page", {start, end})
            const slicedArr = fullData.slice(start,end)
            console.log("New Sliced", slicedArr)
            setSlicedData(slicedArr)
              }
             
            }
          }
        onChange={(e) => {
          const newcurrPage = Number(e.target.value)
          setCurrPage(newcurrPage)
          }} />
      <button onClick={() => {
          const newcurrPage = currPage+1
          setCurrPage(newcurrPage)
        }}>{'>'}</button>
      </div>
    </>
  )
}

export default App
