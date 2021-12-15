import React from 'react'
import adventure from './images/undraw_adventure.svg'

function QuizComponents({
  randomOptions,
  randomCountry,
  checkWin,
  nextButton,
  handleClick,
  rightAnswer,
  number,
}) {
  
  const countryOption = randomCountry?.name?.common
  let capital = randomCountry?.capital?.length > 1 ? randomCountry?.capital.join(' ') : randomCountry?.capital

  return (
    <>
      <header className='headings'>
        <h1>Country Quiz</h1>
      </header>
      <div role='main' className='main'>
        <div role='contentinfo' className='wrapper'>
          <img
            src={adventure}
            alt='winner of the world'
            className='headerImg'
          />
          <div role='contentinfo' className='content'>
            {number === 0 && (
              <h3>{capital} is the the capital of </h3>
            )}
            {number === 1 && <h3>{randomCountry?.demonyms?.eng.f} are people from </h3>}
            {number === 2 && (
              <header>
                <img src={randomCountry.flags.svg} className='images' />
                <h3>Which country does this flag belong to?</h3>
              </header>
            )}
          </div>

          <div role='option' className='btn-wrapper'>
            <button
              role='button'
              value={randomOptions[0]}
              onClick={handleClick}
              ref={
                randomOptions[0] === countryOption ? rightAnswer : null
              }>
              <div className='item'>A</div>
              <div className='name'> {randomOptions[0]}</div>
            </button>

            <button
            role='button'
              value={randomOptions[1]}
              onClick={handleClick}
              ref={
                randomOptions[1] === countryOption ? rightAnswer : null
              }>
              <div className='item'>B</div>
              <div className='name'> {randomOptions[1]}</div>
            </button>

            <button
            role='button'
              value={randomOptions[2]}
              onClick={handleClick}
              ref={
                randomOptions[2] === countryOption ? rightAnswer : null
              }>
              <div className='item'>C</div>
              <div className='name'>{randomOptions[2]} </div>
            </button>

            <button
            role='button'
              value={randomOptions[3]}
              onClick={handleClick}
              ref={
                randomOptions[3] === countryOption ? rightAnswer : null
              }>
              <div className='item'>D</div>
              <div className='name'> {randomOptions[3]}</div>
            </button>
          </div>
          <div role='button'>
            {nextButton && (
              <button role='button' className='next' onClick={checkWin}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizComponents
