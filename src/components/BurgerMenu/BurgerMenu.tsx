import { ReactComponent as Arrow } from 'assets/icons/arrow_down.svg'
import Logo from 'assets/icons/logo.png'
// import { BotInfoInterface, TTopbar } from 'types/types'
import MenuToolTip from 'components/MenuToolTip/MenuToolTip'
import s from './BurgerMenu.module.scss'

// interface Props {
//   dist: BotInfoInterface
// }

export const BurgerMenu = () => {
  return (
    <>
      <div className={s.menu} data-tip data-tooltip-id='main'>
        <img src={Logo} />
        <Arrow />
      </div>
      <MenuToolTip tooltipId={'main'} />
    </>
  )
}
