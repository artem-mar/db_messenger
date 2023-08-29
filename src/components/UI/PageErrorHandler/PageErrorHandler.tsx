import { AxiosError } from 'axios'
import { getErrorMessage } from 'utils/getErrorMessage'
import SvgIcon from 'components/SvgIcon/SvgIcon'
import s from './PageErrorHandler.module.scss'

interface IProps {
  error: AxiosError
}

const PageErrorHandler = ({ error }: IProps) => {
  const status = error?.response?.status || 404
  const { title, message } = getErrorMessage(status)
  return (
    // Fix on SVG
    <div className={s.pageErrorHandler}>
      <div className={s.status}>{status}</div>
      <div className={s['bg-info']}>
        <SvgIcon iconName={`error_${status}`} svgProp={{ className: s.icon }} />
        <div className={s['bg-info-semi-circle']}></div>
        <div className={s.info}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.message}>{message}</p>
        </div>
      </div>
      <div className={s['bg-front-circle']}></div>
      <div className={s['bg-back-circle']}></div>
    </div>
  )
}

export default PageErrorHandler
