import { useUIOptions } from 'context'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import store from 'store2'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as TickCircle } from 'assets/icons/tick-circle.svg'
import { KEYS_MISSING, START_DIALOG_MODAL_IS_OPEN } from 'constants/constants'
import s from './StartDialogModal.module.scss'

const StartDialogModal = () => {
  const { UIOptions, setUIOption } = useUIOptions()
  const { t } = useTranslation()
  const dialogIsStarted = Boolean(store.get('started'))
  const [isOpen, setIsOpen] = useState(!dialogIsStarted)

  const handleClose = () => {
    store('started', true)
    setUIOption({ name: START_DIALOG_MODAL_IS_OPEN, value: false })
  }

  useEffect(() => {
    setIsOpen(!UIOptions[KEYS_MISSING] && !dialogIsStarted)
    setUIOption({
      name: START_DIALOG_MODAL_IS_OPEN,
      value: !UIOptions[KEYS_MISSING] && !dialogIsStarted,
    })
  }, [UIOptions[KEYS_MISSING], dialogIsStarted])

  return (
    isOpen && (
      <div className={s.modal}>
        <div className={s.container}>
          <button onClick={handleClose}>
            <CloseIcon className={s.close} />
          </button>
          <div className={s.header}>
            <div className={s.circle}>
              <TickCircle />
            </div>
            {t('modals.start_chat.header')}
          </div>
          <div className={s.body}>
            <p>
              <Trans i18nKey='modals.start_chat.p1' />
            </p>
            <br />
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
