import React, { useEffect, useRef, useState } from "react";
// @ts-ignore TODO Add type reference
import { renderIcon } from "@download/blockies";
import Image from "next/image";

const BlockieIdenticon = ({
  address,
  diameter,
  alt = "",
  borderRadius,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}: {
  address: string;
  diameter: number;
  alt?: string;
  borderRadius?: string;
  onClick?: () => void;
}) => {
  const [dataUrl, setDataUrl] = useState<string>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    renderIcon({ seed: address.toLowerCase() }, canvas);
    const updatedDataUrl = canvas?.toDataURL();

    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl);
    }
  }, [dataUrl, address]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {dataUrl && (
        <Image
          src={dataUrl || ""}
          height={diameter}
          width={diameter}
          style={{
            borderRadius,
          }}
          alt={alt}
          onClick={onClick}
        />
      )}
    </>
  );
};

// BlockieIdenticon.propTypes = {
//   address: PropTypes.string.isRequired,
//   diameter: PropTypes.number.isRequired,
//   alt: PropTypes.string,
//   borderRadius: PropTypes.string,
// };

export default BlockieIdenticon;
