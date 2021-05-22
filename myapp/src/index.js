import ReactDOM from 'react-dom'
import App from './App.js'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
  {
    id: 4,
    content: 'Testing by adding and giving important as false',
    date: '2021-05-14T19:13:02.298Z',
    important: false
  }
]

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)