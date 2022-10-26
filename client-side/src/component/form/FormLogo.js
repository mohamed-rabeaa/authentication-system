import React from 'react'

export default function FormLogo({text}) {
  return (
    <div>
      <img
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">
        {text}
      </h2>
    </div>
  )
}
