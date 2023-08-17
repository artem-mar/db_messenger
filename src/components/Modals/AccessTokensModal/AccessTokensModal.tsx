import { useUIOptions } from 'context'
import { useEffect, useState } from 'react'
import { KEYS_MISSING, TOKEN_KEY_MODAL_IS_OPEN } from 'constants/constants'
import { useObserver } from 'hooks/useObserver'
import { AccessTokensModule } from 'components/AccessTokensModule/AccessTokensModule'
import { BaseModal } from 'components/Modals'
import { ConfirmApiTokenUpdate } from '../ConfirmApiTokenUpdateModal/ConfirmApiTokenUpdateModal'
import s from './AccessTokensModal.module.scss'

export const AccessTokensModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { setUIOption, UIOptions } = useUIOptions()

  const handleEventUpdate = () => setIsOpen(true)

  useEffect(() => {
    setUIOption({ name: TOKEN_KEY_MODAL_IS_OPEN, value: isOpen })
  }, [isOpen])

  useObserver('AccessTokensModal', handleEventUpdate)

  return (
    <>
      <BaseModal
        id='accessTokensModal'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalClassName={s.accessTokensModal}
        closeOnBackdropClick={!UIOptions[KEYS_MISSING]}
      >
        <AccessTokensModule />
      </BaseModal>
      <ConfirmApiTokenUpdate />
    </>
  )
}
