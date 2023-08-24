import { useUIOptions } from 'context'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import store from 'store2'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as TickCircle } from 'assets/icons/tick-circle.svg'
import { KEYS_MISSING } from 'constants/constants'
import s from './StartDialogModal.module.scss'

const StartDialogModal = () => {
  const { UIOptions } = useUIOptions()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(
    !store.get('started') && !UIOptions[KEYS_MISSING]
  )
  const handleClose = () => {
    setIsOpen(false)
    store('started', true)
  }
  return (
    isOpen && (
      <div className={s.modal}>
        <div className={s.container}>
          <div className={s.header}>
            <div className={s.circle}>
              <TickCircle />
            </div>
            {t('modals.start_chat.header')}
            <button onClick={handleClose}>
              <CloseIcon className={s.close} />
            </button>
          </div>
          <div className={s.body}>
            <p>
              <Trans i18nKey='modals.start_chat.p1' />
            </p>
            <p>
              <Trans i18nKey='modals.start_chat.p2' />
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default StartDialogModal
