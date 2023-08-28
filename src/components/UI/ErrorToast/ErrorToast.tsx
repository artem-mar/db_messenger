import { useTranslation } from 'react-i18next'
import { ReactComponent as AlertIcon } from 'assets/icons/attention.svg'
import s from './ErrorToast.module.scss'

export const ErrorToast = ({ text }: { text: string }) => {
  const { t } = useTranslation()

  return (
    <div className={s.toast}>
      <div className={s.attention}>
        <AlertIcon />
      </div>
      {t(text)}
    </div>
  )
}
