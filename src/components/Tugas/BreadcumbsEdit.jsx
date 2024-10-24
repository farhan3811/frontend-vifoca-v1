import React from 'react'
import {  Breadcrumbs } from "@material-tailwind/react";
const breadcumbs = () => {
  return (
    <Breadcrumbs separator="" className="mb-4 bg-transparent">
    <a href="#" className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 14 16"
      >
        <path
          d="M6.25 12.75H10.75C10.875 12.75 11 12.6562 11 12.5V11.5C11 11.375 10.875 11.25 10.75 11.25H6.25C6.09375 11.25 6 11.375 6 11.5V12.5C6 12.6562 6.09375 12.75 6.25 12.75ZM3.5 13H4.5C4.75 13 5 12.7812 5 12.5V11.5C5 11.25 4.75 11 4.5 11H3.5C3.21875 11 3 11.25 3 11.5V12.5C3 12.7812 3.21875 13 3.5 13ZM3.5 9H4.5C4.75 9 5 8.78125 5 8.5V7.5C5 7.25 4.75 7 4.5 7H3.5C3.21875 7 3 7.25 3 7.5V8.5C3 8.78125 3.21875 9 3.5 9ZM6.25 8.75H10.75C10.875 8.75 11 8.65625 11 8.5V7.5C11 7.375 10.875 7.25 10.75 7.25H6.25C6.09375 7.25 6 7.375 6 7.5V8.5C6 8.65625 6.09375 8.75 6.25 8.75ZM3.5 5H4.5C4.75 5 5 4.78125 5 4.5V3.5C5 3.25 4.75 3 4.5 3H3.5C3.21875 3 3 3.25 3 3.5V4.5C3 4.78125 3.21875 5 3.5 5ZM6.25 4.75H10.75C10.875 4.75 11 4.65625 11 4.5V3.5C11 3.375 10.875 3.25 10.75 3.25H6.25C6.09375 3.25 6 3.375 6 3.5V4.5C6 4.65625 6.09375 4.75 6.25 4.75ZM13 0H1C0.4375 0 0 0.46875 0 1V15C0 15.5625 0.4375 16 1 16H13C13.5312 16 14 15.5625 14 15V1C14 0.46875 13.5312 0 13 0ZM12.5 14.5H1.5V1.5H12.5V14.5Z"
          fill="#333333"
        />
      </svg>
    </a>
    <a href="/latihan" className="text-lg font-title text-black">
      <span>Latihan</span> &nbsp;
      <span>/</span>&nbsp;
      <span>Edit Latihan</span>
    </a>
  </Breadcrumbs>
  )
}

export default breadcumbs