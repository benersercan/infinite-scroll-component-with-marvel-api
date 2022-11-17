import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchHero, fetchHeroComics } from '../libs/utils'

export default function HeroDetails() {
  let { id } = useParams()
  const [hero, setHero] = useState()
  const [heroComics, setHeroComics] = useState()

  let name, description, thumbnailPath, thumbnailExtension, thumbnailUrl

  useEffect(() => {
    fetchHero(id)
      .then((data) => setHero(data))
      .catch((err) => console.error(err))
    fetchHeroComics(id)
      .then((data) => setHeroComics(data.data.results))
      .catch((err) => console.error(err))
  }, [id])

  if (hero) {
    name = hero.data.results[0].name
    description = hero.data.results[0].description
    thumbnailPath = hero.data.results[0].thumbnail.path
    thumbnailExtension = hero.data.results[0].thumbnail.extension
    thumbnailUrl = `${thumbnailPath}.${thumbnailExtension}`
  }

  if (!hero) return

  return (
    <div className="container large">
      <div className="hero__details-container">
        <img src={thumbnailUrl} alt="hero full size" />
        <div className="hero__details">
          <h4>Hero Name : </h4>
          <p>{name}</p>
          {description ? (
            <>
              <h4>Description</h4>
              <p>{description}</p>
            </>
          ) : null}
          <div className="hero__comics">
            <h4>Comics Listed By Date Limit:10 </h4>
            <ul>
              {heroComics
                ? heroComics.map((comic,index) => (
                    <li key={index}>{comic.title}</li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
