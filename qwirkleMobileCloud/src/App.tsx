import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/reduxStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/routeConfig'
import { useEffect } from 'react'

// TODO Bilder
// TODO kleinere Tastatur / Platzproblem ab 5 SpielerInnen
// TODO Spracherkennung
// TODO Spieler*in
// TODO input dauerhaft
// TODO Farbe Spieler'in
// TODO padding back mobile

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
