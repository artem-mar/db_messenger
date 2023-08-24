import { useUIOptions } from 'context'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { RIGHT_SP_IS_ACTIVE, TRIGGER_RIGHT_SP_EVENT } from 'constants/constants'
import { useAssistants } from 'hooks/useAssistants'
import { useChat } from 'hooks/useChat'
import { trigger } from 'utils/events'
import BaseContextMenu from 'components/BaseContextMenu/BaseContextMenu'
// import { BotInfoInterface, TTopbar } from 'types/types'
// import { usePreview } from 'context/PreviewProvider'
// import { VISIBILITY_STATUS } from 'constants/constants'
// import { useAssistants } from 'hooks/api'
// import { trigger } from 'utils/events'
import { ContextMenuButton } from 'components/Buttons'
import DumbAssistantSP from 'components/Panels/AssistantSidePanel/DumbAssitantSP'

interface Props {
  tooltipId: string
  // type: TTopbar
  // bot: BotInfoInterface
}

const MenuToolTip = ({ tooltipId }: Props) => {
  const { vaName } = useParams()
  const { UIOptions } = useUIOptions()
  const { t } = useTranslation('translation', {
    keyPrefix: 'topbar.ctx_menus',
  })

  const { renew } = useChat()

  const { getCachedDist } = useAssistants()
  const bot = getCachedDist(vaName!)
  const handleToggleProps = () => {
    trigger(TRIGGER_RIGHT_SP_EVENT, {
      isOpen: !UIOptions[RIGHT_SP_IS_ACTIVE],
      children: <DumbAssistantSP bot={bot!} />,
    })
  }

  const handleRestartDialog = async () => {
    await renew.mutateAsync(vaName!)
  }

  const handleShareClick = () => {
    trigger('ShareAssistantModal', {})
  }

  return (
    <BaseContextMenu tooltipId={tooltipId} place='bottom'>
      <ContextMenuButton
        type='dream'
        linkTo='http://deepdream.builders'
        name={t('main_burger.about')}
      />

      <ContextMenuButton
        name={t('assistant_burger.properties')}
        type='properties'
        handleClick={handleToggleProps}
      />
      <hr />
      <ContextMenuButton
        name={t('assistant_burger.renew')}
        type='renew'
        handleClick={handleRestartDialog}
      />

      <ContextMenuButton
        name={t('assistant_burger.share')}
        type='share'
        handleClick={handleShareClick}
      />
    </BaseContextMenu>
  )
}

export default MenuToolTip
