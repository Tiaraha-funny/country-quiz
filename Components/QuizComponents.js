import React from 'react'

//import all the component needed

import adventure from './images/undraw_adventure.svg'

//I destructure the variables needed instead of propping it by using props

function QuizComponents({
  randomOptions,
  randomCountry,
  checkWin,
  nextButton,
  handleClick,
  rightAnswer,
  number,
}) {
  //Return this component when the quiz is opened

  return (
    <>
      <header className='headings'>
        <h1>Country Quiz</h1>
      </header>
      <div className='main'>
        <div className='wrapper'>
          <img
            src={adventure}
            alt='winner of the world'
            className='headerImg'
          />
          <div className='content'>
            {number === 0 && (
              <h3>{randomCountry.capital} is the the capital of </h3>
            )}
            {number === 1 && <h3>{randomCountry.demonym} are people from </h3>}
            {number === 2 && (
              <header>
                <img src={randomCountry.flag} className='images' />
                <h3>Which country does this flag belong to?</h3>
              </header>
            )}
          </div>

          <div className='btn-wrapper'>
            <button
              value={randomOptions[0]}
              onClick={handleClick}
              ref={
                randomOptions[0] === randomCountry.name ? rightAnswer : null
              }>
              <div className='item'>A</div>
              <div className='name'> {randomOptions[0]}</div>
            </button>

            <button
              value={randomOptions[1]}
              onClick={handleClick}
              ref={
                randomOptions[1] === randomCountry.name ? rightAnswer : null
              }>
              <div className='item'>B</div>
              <div className='name'> {randomOptions[1]}</div>
            </button>

            <button
              value={randomOptions[2]}
              onClick={handleClick}
              ref={
                randomOptions[2] === randomCountry.name ? rightAnswer : null
              }>
              <div className='item'>C</div>
              <div className='name'>{randomOptions[2]} </div>
            </button>

            <button
              value={randomOptions[3]}
              onClick={handleClick}
              ref={
                randomOptions[3] === randomCountry.name ? rightAnswer : null
              }>
              <div className='item'>D</div>
              <div className='name'> {randomOptions[3]}</div>
            </button>
          </div>
          <div>
            {nextButton && (
              <button className='next' onClick={checkWin}>
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
