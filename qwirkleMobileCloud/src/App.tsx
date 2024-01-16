import { Provider } from 'react-redux'
import './App.css'
import { store } from './redux/reduxStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/routeConfig'
import { useEffect } from 'react'

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
