import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { useChat } from 'hooks/useChat'
import BaseContextMenu from 'components/BaseContextMenu/BaseContextMenu'
// import { BotInfoInterface, TTopbar } from 'types/types'
// import { usePreview } from 'context/PreviewProvider'
// import { VISIBILITY_STATUS } from 'constants/constants'
// import { useAssistants } from 'hooks/api'
// import { trigger } from 'utils/events'
import ContextMenuButton from 'components/ContextMenuButton/ContextMenuButton'

interface Props {
  tooltipId: string
  // type: TTopbar
  // bot: BotInfoInterface
}

const MenuToolTip = ({ tooltipId }: Props) => {
  const { vaName } = useParams()
  const queryClient = useQueryClient()
  const { t } = useTranslation('translation', {
    keyPrefix: 'topbar.ctx_menus',
  })

  const { renew } = useChat()

  const handleToggleProps = () => {}
  const handleRestartDialog = async () => {
    await renew.mutateAsync(vaName!)
    queryClient.invalidateQueries(['history', []])
  }

  const handleShareClick = () => {
    // trigger('ShareAssistantModal', distName)
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
