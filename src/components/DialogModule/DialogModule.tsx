import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { ReactComponent as Renew } from 'assets/icons/renew.svg'
import { ReactComponent as Send } from 'assets/icons/send.svg'
import { BotInfoInterface, ChatForm, ChatHistory } from 'types/types'
import { OPEN_AI_LM } from 'constants/constants'
import { useChat } from 'hooks/useChat'
import { useChatScroll } from 'hooks/useChatScroll'
import { getAvailableDialogSession } from 'utils/getAvailableDialogSession'
import { getLSApiKeyByName } from 'utils/getLSApiKeys'
import Button from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { Loader, TextLoader } from 'components/Loaders'
import s from './DialogModule.module.scss'

type Props = {
  bot: BotInfoInterface | undefined
}

const DialogModule = ({ bot }: Props) => {
  const cx = classNames.bind(s)
  const chatRef = useRef<HTMLDivElement>(null)
  const client = useQueryClient()
  const { vaName } = useParams()
  const [apiKey, setApiKey] = useState<string | null>(null)
  const { handleSubmit, reset, control } = useForm<ChatForm>({
    mode: 'onSubmit',
  })

  // const bot = client.getQueryData<BotInfoInterface | undefined>(['dist', vaName])

  const { send, renew, session, history, message, setSession, remoteHistory } = useChat()

  const checkIsChatSettings = () => {
    const isOpenAIModelInside = () => {
      return bot?.required_api_keys?.some(key => key?.name === 'openai_api_key')
    }
    // setErrorPanel(null)

    if (isOpenAIModelInside()) {
      const openaiApiKey = getLSApiKeyByName(OPEN_AI_LM)
      setApiKey(openaiApiKey)
    }

    return true
  }

  useEffect(() => {
    const availableSession = getAvailableDialogSession(bot?.name!)

    availableSession
      ? remoteHistory
          .mutateAsync(availableSession?.id)
          .then(() => {
            setSession(availableSession)
          })
          .finally(() => {
            setSession(availableSession) //FIX
          })
      : bot && renew.mutateAsync(bot?.name!)
  }, [bot])

  useChatScroll(chatRef, [history, message, remoteHistory])

  const handleSend = ({ message }: ChatForm) => {
    const isMessage = message?.replace(/\s/g, '').length > 0
    if (!isMessage) return

    const isChatSettings = checkIsChatSettings()
    if (!isChatSettings) return

    const id = session?.id!

    send.mutate(
      {
        dialog_session_id: id,
        text: message,
        openai_api_key: apiKey ?? undefined,
      },
      {
        // onError: () => setError('chat'),
      }
    )

    reset()
  }

  const handleRenewClick = () => {
    renew.mutateAsync(bot?.name!)
  }

  return (
    <section className={s.container}>
      <div className={s.messages}>
        <div className={s.chat} ref={chatRef}>
          {remoteHistory?.isLoading && !remoteHistory?.error ? (
            <div className={s.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            history.map((block: ChatHistory, i: number) => {
              return (
                <div
                  key={`${block?.author == 'bot'}${i}`}
                  className={cx(block?.author == 'bot' ? 'botContainer' : 'userContainer')}
                >
                  <span className={cx(block?.author == 'bot' ? 'botMessage' : 'message')}>
                    {block?.text}
                    {block?.author === 'bot' && (
                      <span className={s.skill}>Skill: {block?.active_skill?.display_name}</span>
                    )}
                  </span>
                </div>
              )
            })
          )}
          {send?.isLoading && (
            <>
              <div className={s.botContainer}>
                <span className={s.botMessage}>
                  <TextLoader />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <form className={s.form} onSubmit={handleSubmit(handleSend)}>
        <Button
          theme='secondary'
          clone
          props={{
            // disabled: renew.isLoading || send?.isLoading,
            onClick: handleRenewClick,
            'data-tooltip-id': 'renew',
          }}
        >
          <Renew />
        </Button>
        <Input
          big
          name='message'
          control={control}
          props={{
            placeholder: 'send',
          }}
        />
        <Button props={{ type: 'submit' }} clone theme='primary'>
          <Send />
        </Button>
      </form>
    </section>
  )
}
export default DialogModule
