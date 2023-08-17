import { useUIOptions } from 'context'
import { ReactComponent as Alert } from 'assets/icons/alert.svg'
import { ReactComponent as Key } from 'assets/icons/key.svg'
import { ReactComponent as Props } from 'assets/icons/properties.svg'
import { ReactComponent as Share } from 'assets/icons/share.svg'
import { KEYS_MISSING, TOKEN_KEY_MODAL_IS_OPEN } from 'constants/constants'
import { trigger } from 'utils/events'
import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu'
import { Breadcrumbs } from 'components/TopBar/components/Breadcrumbs/Breadcrumbs'
import s from './Topbar.module.scss'
import { TopbarBtn } from './components/TopbarBtn'

export const Topbar = () => {
  const { UIOptions } = useUIOptions()

  const handleEnterTokenClick = () => {
    trigger('AccessTokensModal', {})
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
          handleClick={handleEnterTokenClick}
        >
          <Key />
          {UIOptions[KEYS_MISSING] && <Alert className={s.alertIcon} />}
        </TopbarBtn>
        <TopbarBtn handleClick={() => {}}>
          <Share />
        </TopbarBtn>
        <TopbarBtn handleClick={() => {}}>
          <Props />
        </TopbarBtn>
      </div>
    </div>
  )
}
