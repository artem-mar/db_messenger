import { useUIOptions } from 'context'
import { useParams } from 'react-router-dom'
import { ReactComponent as Alert } from 'assets/icons/alert.svg'
import { ReactComponent as Key } from 'assets/icons/key.svg'
import { ReactComponent as Props } from 'assets/icons/properties.svg'
import { ReactComponent as Share } from 'assets/icons/share.svg'
import {
  KEYS_MISSING,
  RIGHT_SP_IS_ACTIVE,
  SHARE_MODAL_IS_OPEN,
  TOKEN_KEY_MODAL_IS_OPEN,
  TRIGGER_RIGHT_SP_EVENT,
} from 'constants/constants'
import { useAssistants } from 'hooks/useAssistants'
import { trigger } from 'utils/events'
import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu'
import DumbAssistantSP from 'components/Panels/AssistantSidePanel/DumbAssitantSP'
import { Breadcrumbs } from 'components/TopBar/components/Breadcrumbs/Breadcrumbs'
import s from './Topbar.module.scss'
import { TopbarBtn } from './components/TopbarBtn'

export const Topbar = () => {
  const { UIOptions } = useUIOptions()
  const { vaName } = useParams()
  const { getCachedDist } = useAssistants()
  const bot = getCachedDist(vaName!)

  const handleEnterToken = () => {
    trigger('AccessTokensModal', {})
  }

  const handleShare = () => {
    trigger('ShareAssistantModal', {})
  }

  const handlePropsOpen = () => {
    trigger(TRIGGER_RIGHT_SP_EVENT, {
      isOpen: !UIOptions[RIGHT_SP_IS_ACTIVE],
      children: <DumbAssistantSP bot={bot!} />,
    })
  }

  return (
    <div className={s.topbar}>
      <BurgerMenu />
      <div className={s.crumbs}>
        <Breadcrumbs />
      </div>
      <div className={s.btns}>
        <TopbarBtn
          active={UIOptions[TOKEN_KEY_MODAL_IS_OPEN] || UIOptions[KEYS_MISSING]}
          handleClick={handleEnterToken}
        >
          <Key />
          {UIOptions[KEYS_MISSING] && <Alert className={s.alertIcon} />}
        </TopbarBtn>
        <TopbarBtn
          active={UIOptions[SHARE_MODAL_IS_OPEN]}
          handleClick={handleShare}
        >
          <Share />
        </TopbarBtn>
        <TopbarBtn
          active={UIOptions[RIGHT_SP_IS_ACTIVE]}
          handleClick={handlePropsOpen}
        >
          <Props />
        </TopbarBtn>
      </div>
    </div>
  )
}
