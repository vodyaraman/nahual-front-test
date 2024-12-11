import React from "react";
import Image from "next/image";

export default function Background() {
  return (
    <Image
      src="/background.png"
      alt=""
      width={1000}
      height={1000}
      style={{
        zIndex: '0',
        backgroundColor: '#000000',
        position: 'fixed',
        top: '-25vh',
        width: '100vw',
        height: '100vw',
        minWidth: '1000px',
        objectFit: 'fill',
        opacity: '0.45',
        filter: 'blur(5px)'
      }}
    />
  );
};
