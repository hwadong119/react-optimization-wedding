import { parseISO, format, getDay } from 'date-fns'
import classNames from 'classnames/bind'
import styles from './Heading.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(styles)

// 렌더링 할 때마다 선언되지 않도록 밖에 선언
const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

// date 프로퍼티로부터 결혼식 날짜를 받음
function Heading({ date }: { date: string }) {
  // 받은 문자열을 Date 객체로 변환
  const  weddingDate = parseISO(date)

  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}

export default Heading