import { AxiosError } from 'axios'
import { useUIOptions } from 'context'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { KEYS_MISSING } from 'constants/constants'
import { useAssistants } from 'hooks/useAssistants'
import { checkRequiredKeysAvailability } from 'utils/checkRequiredKeysAvailability'
import DialogModule from 'components/DialogModule/DialogModule'
import { ShareAssistantModal } from 'components/Modals/ShareAssistantModal/ShareAssistantModal'
import { Sidebar } from 'components/SideBar/Sidebar'
import { Topbar } from 'components/TopBar/Topbar'
import { Main, PageErrorHandler } from 'components/UI'

const ChatPage = () => {
  const { vaName } = useParams()
  vaName && localStorage.setItem('vaName', vaName)

  const { getDist } = useAssistants()
  const { data: bot, error } = getDist({ distName: vaName })
  const { setUIOption } = useUIOptions()

  useEffect(() => {
    setUIOption({
      name: KEYS_MISSING,
      value: !checkRequiredKeysAvailability(bot!),
    })
  }, [bot])

  return !error ? (
    <>
      <Topbar />
      <Sidebar>
        <div style={{ height: '100%' }}></div>
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #F0F0F3',
            paddingTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        ></div>
      </Sidebar>
      <Main>
        <DialogModule bot={bot} />
      </Main>
      <ShareAssistantModal />
    </>
  ) : (
    <PageErrorHandler error={error as AxiosError} />
  )
}

export default ChatPage
