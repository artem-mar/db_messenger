import { useUIOptions } from 'context'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowDown from 'assets/icons/arrow_dwn.svg'
import { ReactComponent as Cup } from 'assets/icons/emoji_cup.svg'
import { ReactComponent as Smile } from 'assets/icons/emoji_wink.svg'
import { BotInfoInterface } from 'types/types'
import { ACTIVE_ASSISTANT_SP_ID } from 'constants/constants'
import { Button } from 'components/Buttons'
import { SidePanelHeader } from 'components/Panels'
import s from './DumbAssitantSP.module.scss'

interface Props {
  bot: BotInfoInterface
}

const DumbAssistantSP = ({ bot }: Props) => {
  const { t } = useTranslation()
  const { setUIOption } = useUIOptions()

  const authorImgScr = bot.author.picture
  const authorFullname =
    bot.author.fullname ||
    [bot.author.given_name, bot.author.family_name].join(' ').trim()
  const isAuthor = Boolean(authorImgScr || authorFullname)

  const url = 'http://localhost:5173'

  const dispatchTrigger = (isOpen: boolean) => {
    setUIOption({
      name: ACTIVE_ASSISTANT_SP_ID,
      value: isOpen ? `info_${bot?.id}` : null,
    })
  }

  useEffect(() => {
    dispatchTrigger(true)
    return () => dispatchTrigger(false)
  }, [])

  return (
    <>
      <SidePanelHeader>
        <ul role='tablist'>
          <li role='tab' aria-selected>
            {t('tabs.properties')}
          </li>
        </ul>
      </SidePanelHeader>
      <div className={s.botInfoSidePanel}>
        <div className={s.header}>
          <span className={s.name}>{bot?.display_name}</span>
        </div>
        {isAuthor && (
          <div className={s.author}>
            {authorImgScr && <img src={bot?.author?.picture} />}
            {authorFullname && <span>{authorFullname}</span>}
          </div>
        )}

        <div className={s.scroll}>
          <div className={s.container}>
            <p className={s.desc}>{bot?.description}</p>
          </div>
        </div>
        <span className={s.like}>
          Like this AI Assistant?
          <Smile />
          <Cup />
        </span>
        <div className={s.btns}>
          <div className={s.link}>
            <span>Make you own with Dream Builder</span>
            <img src={ArrowDown} />
          </div>

          <a href={url} target='_blank' rel='noopener noreferrer'>
            <Button theme='primary'>
              {t('sidepanels.assistant.btns.open_db')}
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}

export default DumbAssistantSP
