import { useState } from 'react'

const Statistics = (props) => {
  if((props.good+props.neutral+props.bad)==0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.good+props.bad+props.neutral} />
      <StatisticLine text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
      <StatisticLine text="positive" value={props.good/(props.good+props.bad+props.neutral)*100 + "%"} />
      </table>
    </div>
  )
}

const StatisticLine = (props)=>{
  return (
    <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
    </tbody>

  )
}

const Button = (props)=>{
  return (
  <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood=()=>{
    setGood(good + 1)
  }
  const handleNeutral=()=>{
    setNeutral(neutral + 1)
  }
  const handleBad=()=>{
    setBad(bad + 1)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const handleDote = ()=>{
    setSelected(Math.floor(Math.random() * 8))
  }

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const handleVote = () => {
  const copy = [...votes]
  copy[selected] += 1
  setVotes(copy)
}
 const maxVote=()=>{
    for(let i=0;i<votes.length;i++){
      let max = Math.max(...votes)
      if(votes[i]===max){
        return anecdotes[i]
      }
    }
 }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleDote} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{maxVote()}</p>
    </div>
    
  )
}

export default App