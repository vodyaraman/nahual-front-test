'use client'

import dynamic from "next/dynamic";

const DataPicker = dynamic(() => import('./date-picker/DataPicker'));
const FireAnimation = dynamic(() => import('./timeline-decor/TimelineDecor'))

export default function MainContent() {
  return (
    <>
      <FireAnimation />
      <DataPicker />
    </>
  )
};
