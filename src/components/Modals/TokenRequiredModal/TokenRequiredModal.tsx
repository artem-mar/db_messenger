import React, { useState } from 'react'
import BaseModal from '../BaseModal/BaseModal'

const TokenRequiredModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  return <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}></BaseModal>
}

export default TokenRequiredModal
