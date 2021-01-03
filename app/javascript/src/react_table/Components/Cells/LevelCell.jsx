import React from 'react'

export default function (index) {
  return function ({ level, value }) {
    return (
      <span>
        {level === index && value}
      </span>
    )
  }
}
