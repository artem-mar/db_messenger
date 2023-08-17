import ChatPage from 'pages/ChatPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AccessTokensModal, TokenRequiredModal } from 'components/Modals'

const App = () => {
  const vaName = localStorage.getItem('vaName') || 'aaa'
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/:vaName' element={<ChatPage />} />
          <Route path='*' element={<Navigate to={`/${vaName}`} />} />
        </Routes>
      </BrowserRouter>

      {/* <Outlet /> */}
      {/* <BaseSidePanel transition='left' /> */}
      <AccessTokensModal />
      <TokenRequiredModal />
      {/* <Toaster /> */}
    </>
  )
}

export default App
