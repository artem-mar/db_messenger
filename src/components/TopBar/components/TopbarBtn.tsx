import classNames from 'classnames/bind'
import { ReactComponent as Props } from 'assets/icons/properties.svg'
import s from './TopbarBtn.module.scss'

interface Props extends React.PropsWithChildren {
  handleClick: () => void
  active?: boolean
}

export const TopbarBtn = ({ children, handleClick, active }: Props) => {
  const cx = classNames.bind(s)

  return (
    <button
      data-tooltip-id='viewType'
      onClick={handleClick}
      className={cx('btn', active && 'active')}
    >
      {children}
    </button>
  )
}
