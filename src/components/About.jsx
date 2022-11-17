import React from 'react'

export default function About() {
  return (
    <div className="container large">
      <div className="hero__details-container">
        Merhaba Öncelikle review için vakit ayırdığınız için teşekkür ederim.Açıklama getirmek istediğim noktalar mevcut; 
        <ul>
          <li>Tasarım anlamında pek iyileştirme yapamadıysam lütfen kusura bakmayın.</li>
          <li>Çok az sayıda request olduğu için projeye axios import edip custom bir Interceptor yaratma gereği duymadım.Aslında error handling noktasında daha temiz bir kod olabilirdi.</li>
          <li>React Hooks ve React Router kullandım.</li>
          <li>Infinite Scroll için Intersection Observer API'den yararlandım. Tekrar kullanılabilir kılmak için, custom hook olarak yazmayı tercih ettim.</li>
          <li>Marvel API normalde Kahraman Detay endpoint'inde aslında bize "comics" datasını dönüyor. 
              Fakat hepsinin texti farklı standartta olduğu için buradan yıl değerini parse edip Client tarafta kendim sort() işlemi yapamadım.
              Malesef sıralı data için endpoint'e tekrar istek atmak zorunda kaldım.(Pek içime sinmesede)
          </li>
          <li>Bonus olarak test yazamadığım için pek mutsuzum, bu konuda bilgi eksikliğimi en kısa sürede kapatmaya çalışacağım.</li>
          <li>Fazla geç göndermek istemediğim için mutlaka atladığım şeyler olmuştur,Review sürecinden sonra bana geri bildirimde bulunursanız, bildirimleriniz doğrultusunda süreçte tecrübe edinmiş olmaktan dolayı çok mutlu olacağımı da bildirmek isterim :-) </li>
        </ul>
      </div>
    </div>
  )
}
