import { AxiosError } from 'axios'
import classNames from 'classnames/bind'
import { useUIOptions } from 'context'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BotInfoInterface, ChatForm, ChatHistory } from 'types/types'
import {
  OPEN_AI_LM,
  RIGHT_SP_IS_ACTIVE,
  START_DIALOG_MODAL_IS_OPEN,
} from 'constants/constants'
import { useChat } from 'hooks/useChat'
import { useChatScroll } from 'hooks/useChatScroll'
import { getAvailableDialogSession } from 'utils/getAvailableDialogSession'
import { getLSApiKeyByName } from 'utils/getLSApiKeys'
import { Button } from 'components/Buttons'
import { Input } from 'components/Input/Input'
import { Loader, TextLoader } from 'components/Loaders'
import { StartDialogModal } from 'components/Modals'
import SvgIcon from 'components/SvgIcon/SvgIcon'
import { ErrorToast } from 'components/UI/ErrorToast/ErrorToast'
import s from './DialogModule.module.scss'

type Props = {
  bot: BotInfoInterface | undefined
  error: AxiosError | null
}

const errTextMapping: { [key: string]: string } = {
  '403': 'dialog_module.error_toast.no_access',
  '404': 'dialog_module.error_toast.not_found',
  default: 'dialog_module.error_toast.default',
}

const DialogModule = ({ bot, error }: Props) => {
  const { t } = useTranslation()
  const cx = classNames.bind(s)
  const chatRef = useRef<HTMLDivElement>(null)
  const { UIOptions } = useUIOptions()
  const spIsActive = UIOptions[RIGHT_SP_IS_ACTIVE]

  const errStatus = error?.response?.status || 'default'
  const errorText = errTextMapping[errStatus]

  const [apiKey, setApiKey] = useState<string | null>(null)
  const { handleSubmit, reset, control } = useForm<ChatForm>({
    mode: 'onSubmit',
  })

  const [formDisabled, setFormDisabled] = useState<boolean>(
    UIOptions[START_DIALOG_MODAL_IS_OPEN]
  )

  const { send, renew, session, history, message, setSession, remoteHistory } =
    useChat()

  const checkIsChatSettings = () => {
    const isOpenAIModelInside = () => {
      return bot?.required_api_keys?.some(key => key?.name === 'openai_api_key')
    }

    if (isOpenAIModelInside()) {
      const openaiApiKey = getLSApiKeyByName(OPEN_AI_LM)
      setApiKey(openaiApiKey)
    }

    return true
  }

  useEffect(() => {
    const availableSession = getAvailableDialogSession(bot?.name!)

    availableSession
      ? remoteHistory.mutateAsync(availableSession?.id).finally(() => {
          setSession(availableSession) //FIX
        })
      : bot && renew.mutateAsync(bot?.name!)
  }, [bot])

  useEffect(() => {
    setFormDisabled(UIOptions[START_DIALOG_MODAL_IS_OPEN] || !bot || error)
  }, [UIOptions[START_DIALOG_MODAL_IS_OPEN], renew, send, bot, error])

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
    <section className={cx(s.container, spIsActive && s.withSP)}>
      <div className={s.messages}>
        <div className={s.chat} ref={chatRef}>
          {remoteHistory?.isLoading && !remoteHistory?.error ? (
            <div className={s.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            !error &&
            history.map((block: ChatHistory, i: number) => {
              return (
                <div
                  key={`${block?.author == 'bot'}${i}`}
                  className={cx(
                    block?.author == 'bot' ? 'botContainer' : 'userContainer'
                  )}
                >
                  <span
                    className={cx(
                      block?.author == 'bot' ? 'botMessage' : 'message'
                    )}
                  >
                    {block?.text}
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
        {error && <ErrorToast text={errorText} />}
        {bot && <StartDialogModal />}
      </div>
      <form className={s.form} onSubmit={handleSubmit(handleSend)}>
        <Button
          theme='secondary'
          clone
          props={{
            disabled: formDisabled || renew.isLoading,
            onClick: handleRenewClick,
            'data-tooltip-id': 'renew',
          }}
        >
          <SvgIcon iconName='renew' />
        </Button>
        <Input
          big
          name='message'
          control={control}
          props={{
            placeholder: t('dialog_module.message_field.placeholder'),
            disabled: formDisabled,
          }}
        />
        <Button
          props={{
            type: 'submit',
            disabled: formDisabled || send.isLoading,
          }}
          clone
          theme='primary'
        >
          <SvgIcon iconName='send' />
        </Button>
      </form>
      <div className={s.prevention}>
        <SvgIcon iconName='exclamation' />
        {t('dialog_module.chat_warning')}
      </div>
    </section>
  )
}
export default DialogModule
