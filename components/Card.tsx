import React, { useState, useImperativeHandle } from "react";
import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";

import styles from "../styles/Card.module.css";

const Card = React.forwardRef(
  ({ tokenId }: { tokenId?: string | string[] }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useImperativeHandle(ref, () => ({
      toggleCardFlip() {
        toggleCardFlip();
      },
    }));

    function toggleCardFlip() {
      console.log("test");
      setIsFlipped(!isFlipped);
    }

    return (
      <Box
        mx="auto"
        className={styles.cardContainer}
        onClick={() => toggleCardFlip()}
        transform={"preserve-3d"}
        transition="transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      >
        <div
          className={
            isFlipped ? `${styles.card} ${styles.flipped}` : styles.card
          }
        >
          <div>
            <Image
              alt="nft"
              src="/nft-image.png"
              width="200px"
              style={{ margin: "0 auto" }}
            />
          </div>
          <div className={styles.back}>
            <Image
              alt="QR code"
              src="/demo-qrcode.png"
              width="200px"
              style={{ margin: "0 auto" }}
            />
          </div>
        </div>
        <Center>{tokenId}</Center>
      </Box>
    );
  }
);

Card.displayName = "Card";

export default Card;
