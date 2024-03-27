// 다른 컴포넌트를 감싸는 섹션
import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

function Section({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  // className과 'container' 클래스를 결합
  return <section className={cx(['container', className])}>{children}</section>
}

export default Section
