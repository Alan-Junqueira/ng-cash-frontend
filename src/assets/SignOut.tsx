import { SVGAttributes } from 'react';

interface ISIgnOutIcon extends SVGAttributes<HTMLOrSVGElement> {}

export const SIgnOut = (props: ISIgnOutIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="transparent"
      viewBox="0 0 256 256"
      {...props}
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="174 86 216 128 174 170"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
      <line
        x1="104"
        y1="128"
        x2="216"
        y2="128"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <path
        d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  );
};
