import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/reduxStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/routeConfig'
import { useEffect } from 'react'

// TODO Texte statt variierenden Symbolen
// TODO button Pille weg
// TODO Spracherkennung
// TODO optimize deploy by only loading old and overwriting rest
// TODO Button add points mobile size

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

// detail meinung abgeben, was nicht gefallen, zu jedem stibam punkt
