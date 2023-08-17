import classNames from 'classnames/bind'
// import { useUIOptions } from 'context'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { BotInfoInterface } from 'types/types'
// import { IRouterCrumb } from 'types/types'
import TopbarButton from 'components/TopbarButton/TopbarButton'
// import { BaseToolTip } from 'components/Menus'
import s from './Breadcrumbs.module.scss'

export const Breadcrumbs = () => {
  const client = useQueryClient()
  const { vaName } = useParams()

  const assistant = client.getQueryData<BotInfoInterface | undefined>(['dist', vaName])

  let crumbs = [assistant?.display_name]

  // const { UIOptions } = useUIOptions()
  // const { t } = useTranslation()
  // matches
  //   // Filter routes with crumbs
  //   .filter(match => Boolean((match.handle as IHandle)?.crumb))
  //   // Setting data to route crumbs
  //   .map(({ handle, data: routingName }) => {
  //     const { crumb } = handle as IHandle
  //     return crumb!({
  //       params: routingName as string,
  //       ui: UIOptions as any,
  //       t,
  //     })
  //   })
  //   .flat()
  let cx = classNames.bind(s)

  return (
    <div className={s.routes}>
      <TopbarButton to='/' dataTooltipId='home'>
        <HomeIcon />
      </TopbarButton>
      {crumbs?.map((item, i) => (
        <React.Fragment key={i}>
          <span className={s.slash} />
          <span className={cx('route')}>{item}</span>
        </React.Fragment>
      ))}
      {/* <BaseToolTip id='home' content={t('topbar.tooltips.home')} /> */}
    </div>
  )
}
