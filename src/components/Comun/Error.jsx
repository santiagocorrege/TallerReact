import React from 'react'
import {Alert} from '@mui/material'

const Error = ({errorRegistro}) => {
  return (
    <>
    {
    errorRegistro
    ? 
    <Alert severity="error" sx={{mt:0, mb:1}}>{errorRegistro}</Alert>    
    : <></>
    } 
    </>
  )
}

export default Error
