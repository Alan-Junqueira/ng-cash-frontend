import { SVGAttributes } from 'react';

interface IEnvelopeIcon extends SVGAttributes<HTMLOrSVGElement> {}

export const Envelope = (props: IEnvelopeIcon) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33329 3.33331H16.6666C17.5833 3.33331 18.3333 4.08331 18.3333 4.99998V15C18.3333 15.9166 17.5833 16.6666 16.6666 16.6666H3.33329C2.41663 16.6666 1.66663 15.9166 1.66663 15V4.99998C1.66663 4.08331 2.41663 3.33331 3.33329 3.33331Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 5L9.99996 10.8333L1.66663 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
