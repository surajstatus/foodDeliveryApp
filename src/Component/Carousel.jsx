import React from 'react'

const Carousel = () => {
  const randomImages = 'https://source.unsplash.com/random/900x900/?burger';
  const randomImages1 = 'https://source.unsplash.com/random/900x900/?fastfood';
  const randomImages2 = 'https://source.unsplash.com/random/900x900/?icecream';

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
        <div className="carousel-inner" id='Carousel'>
          {/* search Btn */}
          <div className='carousel-caption' style={{ zIndex: '20' }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active">
            <img src={randomImages} className="d-block w-100" style={{ filter: 'brightness(50%)', objectFit: 'contain !important' }} />
          </div>
          <div className="carousel-item">
            <img src={randomImages1} className="d-block w-100" style={{ filter: 'brightness(50%)', objectFit: 'contain !important' }} />
          </div>
          <div className="carousel-item">
            <img src={randomImages2} className="d-block w-100" style={{ filter: 'brightness(50%)', objectFit: 'contain !important' }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousel
