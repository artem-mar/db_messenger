import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Props } from 'assets/icons/properties.svg'
import s from './TopbarBtn.module.scss'

interface Props extends React.PropsWithChildren {
  handleClick: () => void
  active?: boolean
}

export const TopbarBtn = ({ children, handleClick, active }: Props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'topbar.tooltips' })
  const cx = classNames.bind(s)

  return (
    <button
      data-tooltip-id='viewType'
      onClick={handleClick}
      className={cx('display', active && 'active')}
    >
      {children}
    </button>
  )
}
