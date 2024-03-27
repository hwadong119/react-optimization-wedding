import classNames from 'classnames/bind'
import styles from './Video.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(styles)

function Video() {
  return (
    <Section className={cx('container')}>
      <video
        autoPlay={true} // 자동 재생
        muted={true} // 무음
        loop={true} // 반복 재생
        poster="/assets/poster.jpg" // 재생 전에 표시될 포스터 이미지
      >
        <source src="/assets/main.mp4" type="video/mp4"></source>
      </video>
    </Section>
  )
}

export default Video
