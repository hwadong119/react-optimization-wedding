import classNames from 'classnames/bind' 
import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import FullScreenMessage from './components/shared/FullScreenMessage'

// styles 객체를 사용하여 클래스 이름을 동적으로 결합합니다.
const cx = classNames.bind(styles)

function App() {
  // wedding 데이터 상태, 로딩 상태, 에러 상태를 관리하는 상태 변수 선언합니다.
  const [wedding, setWedding] = useState(null) // wedding 데이터 상태
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [error, setError] = useState(false) // 에러 상태 

  // 컴포넌트 마운트 시 청첩장 데이터를 불러옵니다.
  useEffect(() => {
    setLoading(true) // 데이터 로딩 시작
    fetch('http://localhost:8888/wedding')
      .then((response) => {
        // 응답이 성공적이지 않을 경우 에러를 발생시킵니다.
        if (response.ok === false) {
          // 응답이 실패할 경우 에러를 throw하여 catch 블록으로 이동
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return response.json() // 응답을 JSON 형태로 변환하여 반환
      })
      .then((data) => {
        setWedding(data) // 변환된 데이터를 상태에 저장
      })
      .catch((e) => {
        console.log('에러발생', e) // 에러 처리
        setError(true) // 에러 상태를 true로 설정
      })
      .finally(() => {
        setLoading(false) // 로딩 상태를 false로 설정
      })
  }, []) // useEffect의 의존성 배열에 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  // 로딩 중인 경우 FullScreenMessage 컴포넌트를 반환
  if (loading) {
    return <FullScreenMessage type="loading" />
  }

  // 에러가 발생했을 경우 FullScreenMessage 컴포넌트를 반환
  if (error) {
    return <FullScreenMessage type="error" />
  }

  // 로딩도, 에러도 아닌 모든 상태가 정상인 경우, wedding 데이터를 화면에 표시
  return <div className={cx('container')}>{JSON.stringify(wedding)}</div>
}

export default App
