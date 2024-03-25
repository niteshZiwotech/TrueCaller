import React from 'react'

const MainWrapper = (props) => {
    // logic local storeage checking installation id 
    console.log("Hello");
  return (
    <>
    {React.cloneElement(props.children)}
    </>
  )
}

export default MainWrapper