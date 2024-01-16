import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/reduxStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/routeConfig'
import { useEffect } from 'react'

// TODO padding back mobile
// TODO focus after buttons
// TODO 1. char capital
// TODO s with one player
// TODO kleinere Tastatur / Platzproblem ab 5 SpielerInnen
// TODO Bilder
// TODO Spracherkennung

function App() {

  useEffect(() => {
    window.onbeforeunload = () => "";
  });

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
