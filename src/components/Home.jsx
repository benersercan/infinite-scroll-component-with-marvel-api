import { useState, useEffect, useRef } from 'react'
import Container from './Container'
import Grid from './Grid'
import Card from './Card'
import { getHerosList } from '../libs/utils' // fetchHeros ,
import { useIntersectionObserver } from '../hooks/intersectionObserver'

const HERO_IMG = 'portrait_fantastic'

export default function Home() {
  const [heroes, setHeroes] = useState([])
  const [, setError] = useState('')
  const [count, setCount] = useState(20) //intersection Observe Count
  const ref = useRef(null)

  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      threshold: 0,
    },
    false
  )

  useEffect(() => {
    isBottomVisible && setCount(count + 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomVisible])

  useEffect(() => {
    getHerosList(count)
      .then((data) => {
        if (data.code !== 409) {
          setHeroes(data)
        } else {
          alert(data.status)
          return false
        }
      })
      .catch((err) => setError(err))
  }, [count])

  let cards

  if (heroes) {
    cards = heroes.map((hero, index) => (
      <Card
        index={index}
        name={hero.name}
        key={hero.id}
        id={hero.id}
        thumbnail={`${hero.thumbnail.path}/${HERO_IMG}.${hero.thumbnail.extension}`}
      />
    ))
  }

  return (
    <Container>
      <div className="title">
        <h1>Marvel Heroes</h1>
      </div>
      <Grid>{cards ? cards : null}</Grid>
      <div ref={ref} className="loader">
        Loading...
      </div>
    </Container>
  )
}
