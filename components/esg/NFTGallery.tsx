import {
  // chakra,
  Box,
  Skeleton,
  Stack,
  Image,
  ChakraProps,
  // ImageProps,
  // Fade,
} from "@chakra-ui/react";
import React, {
  useState,
  useCallback,

  // useRef, useEffect
} from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

const nfts = ["01", "02", "03", "04", "05"];

export default function NFTGallery({
  coffee,
  ...props
}: { coffee: string } & ChakraProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback(
    (event) => {
      console.log({
        eventTarget: event.currentTarget.id,
        coffee,
        viewerIsOpen,
        currentImage,
      });
      setCurrentImage(event.currentTarget.id);
      setViewerIsOpen(true);
    },
    [coffee, viewerIsOpen, currentImage]
  );

  const closeLightbox = () => {
    // setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <Stack
        key={coffee}
        direction="row"
        maxW="500px"
        mt="50px"
        minH={{ base: "auto", xl: "160px" }}
        mx={{ base: "auto", xl: "0" }}
        {...props}
      >
        {nfts.map((item, i) => (
          <Box
            key={i}
            id={`${i}`}
            onClick={openLightbox}
            _hover={{ cursor: "pointer" }}
          >
            <Image
              loading="eager"
              fallback={<Skeleton height="160px" width="120px" />}
              alt=""
              src={`/nfts/esg/${item}.jpg`}
              boxShadow={"2px 2px 0px 2px #1e5b54"}
              borderRadius="7px"
            />
          </Box>
        ))}
      </Stack>
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox} key={coffee}>
            <Carousel
              currentIndex={currentImage}
              views={nfts.map((x) => ({
                // ...x,
                source: `/nfts/esg/${x}.jpg`,
                srcset: `/nfts/esg/${x}.jpg`,
                // caption: i,
              }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  );
}
