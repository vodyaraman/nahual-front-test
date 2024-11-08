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
        zIndex: '-1',
        backgroundColor: '#000000',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        minWidth: '1000px',
        objectFit: 'cover',
      }}
    />
  );
};
