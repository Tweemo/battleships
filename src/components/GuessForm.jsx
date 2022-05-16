import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { VStack, Input } from "@chakra-ui/react";

import { checkDist } from "../func";

import {guess} from '../actions/guess'
import {formGuess} from '../actions/oneGuess'
import { closestShip } from '../actions/closeShip'


function GuessForm() {
  const allShips = useSelector(state => state.shipPos)

  let bothShips = []
  allShips.length === 1 ? bothShips = [...allShips[0]] 
  : allShips.length === 2 ? bothShips = [...allShips[0], ...allShips[1]] 
  : <></>

  const dispatch = useDispatch()
  const [coords, setCoords] = useState({
    pos: ''
  })

  function changeHandler(e) {
    setCoords({
      ...coords,
      [e.target.name]: e.target.value
    })
  }

  function submitHandler(e) {
    e.preventDefault()

    let splitStr = coords.pos.split(',')
    if(splitStr[0] >= 1 && splitStr[0] <= 8 && splitStr[1] >= 1 && splitStr[1] <= 8) {
      let stringsToNum = {row: parseInt(splitStr[0]), col: parseInt(splitStr[1])}
      dispatch(guess(stringsToNum))
      dispatch(formGuess(stringsToNum))
      dispatch(closestShip(checkDist(bothShips, stringsToNum)))
      setCoords({
        pos: ''
      })
    } else {
      alert('Needs to be in the format x,y and between 1 and 8!')
    }
  }
  return (
    <VStack className="form">
      <form onSubmit={submitHandler}>
      {/* <FormControl onSubmit={submitHandler}> */}
        <Input variant='filled' name='pos' type='text' onChange={changeHandler} value={coords.pos} placeholder="row, column e.g 3,5"></Input>
      </form>
    </VStack>
  )
}

export default GuessForm