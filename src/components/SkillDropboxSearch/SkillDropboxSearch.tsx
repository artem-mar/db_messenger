import classNames from 'classnames/bind'
import React, { useRef, useState } from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow_down.svg'
import { ReactComponent as LoupeIcon } from 'assets/icons/loupe.svg'
import { useObserver } from 'hooks/useObserver'
import s from './SkillDropboxSearch.module.scss'

interface Item {
  id: string
  name: string
  display_name: string
  disabled?: boolean
}

interface Props {
  list: Item[]
  name: string
  control: Control<any>
  selectedItemId?: string
  rules?: RegisterOptions
  isOpen?: boolean
  label?: string
  props?: React.InputHTMLAttributes<HTMLInputElement>
  fullWidth?: boolean
  fullHeight?: boolean
  withoutSearch?: boolean
  small?: boolean
  onSelectItem?: (id: string) => void
  className?: string
  disabled?: boolean
}

const SkillDropboxSearch = ({
  name,
  control,
  selectedItemId,
  rules,
  isOpen: propIsOpen,
  list,
  label,
  props,
  fullWidth,
  fullHeight,
  withoutSearch,
  small,
  onSelectItem,
  className,
  disabled,
}: Props) => {
  const getActiveItem = (id: string) => list?.find(item => item.id === id)

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: selectedItemId ? getActiveItem(selectedItemId) : undefined,
  })
  const [isOpen, setIsOpen] = useState(propIsOpen !== undefined)
  const dropboxRef = useRef<HTMLDivElement | null>(null)
  let cx = classNames.bind(s)

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropboxRef.current?.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  const handleSearchClick = (e: React.MouseEvent) => {
    if (disabled) return
    const targetIsInput =
      (e.target as HTMLElement).tagName.toLocaleUpperCase() === 'INPUT'
    if (!isOpen && targetIsInput) setIsOpen(true)
    if (!targetIsInput) setIsOpen(prev => !prev)
  }

  const handleItemClick = (item: Item) => {
    field.onChange(getActiveItem(item.id) ?? undefined)
    onSelectItem && onSelectItem(item.id)
    setIsOpen(false)
  }

  useObserver('click' as any, handleClickOutside)

  return (
    <div
      ref={dropboxRef}
      className={cx(
        'skillDropboxSearch',
        isOpen && 'open',
        error && 'error',
        fullWidth && 'fullWidth',
        fullHeight && 'fullHeight',
        small && 'small',
        className && className
      )}
      onFocus={() => !disabled && setIsOpen(true)}
    >
      {label && (
        <span id='label' className={s.label}>
          {label}
        </span>
      )}

      <div
        className={cx(s.search, disabled && s.disabled)}
        onClick={handleSearchClick}
      >
        {!withoutSearch && <LoupeIcon className={s.icon} />}
        <input
          {...props}
          {...field}
          value={field.value?.display_name || ''}
          className={s.input}
          readOnly
        />
        {!disabled && <ArrowDownIcon className={cx('icon', 'arrowDown')} />}
      </div>

      <ul className={s.list}>
        {list?.map((item, i) => {
          return (
            <li
              key={`key-${i}`}
              className={cx(
                'item',
                item.id === field.value?.id && 'activeItem',
                item?.disabled && 'disabled'
              )}
              onClick={() => !item?.disabled && handleItemClick(item)}
            >
              <span>{item.display_name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SkillDropboxSearch
