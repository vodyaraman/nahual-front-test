'use client'

import dynamic from "next/dynamic";

const DataPicker = dynamic(() => import('./date-picker/DataPicker'));

export default function MainContent() {
  return <DataPicker/>;
};
