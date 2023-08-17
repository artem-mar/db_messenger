import { useUIOptions } from 'context'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import store from 'store2'
import { KEYS_MISSING } from 'constants/constants'
import { useAssistants } from 'hooks/useAssistants'
import { checkRequiredKeysAvailability } from 'utils/checkRequiredKeysAvailability'
import DialogModule from 'components/DialogModule/DialogModule'
import { Main } from 'components/Main/Main'
import { Sidebar } from 'components/SideBar/Sidebar'
import { Topbar } from 'components/TopBar/Topbar'

const ChatPage = () => {
  const { vaName } = useParams()
  vaName && localStorage.setItem('vaName', vaName)

  const { getDist } = useAssistants()
  const { data: dist } = getDist({ distName: vaName })

  const { setUIOption } = useUIOptions()

  const { getCachedDist } = useAssistants()
  const bot = getCachedDist(store.get('vaName'))
  useEffect(() => {
    setUIOption({ name: KEYS_MISSING, value: !checkRequiredKeysAvailability(bot!) })
  }, [bot])

  return (
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
        >
          {/* <DeepyHelperTab /> */}
          {/* <SettingsTab /> */}
        </div>
      </Sidebar>
      <Main>
        <DialogModule bot={dist} />
      </Main>
    </>
  )
}

export default ChatPage
