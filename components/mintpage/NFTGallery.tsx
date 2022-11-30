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

// const LazyImage = (props: ImageProps) => {
//   const imageRef = useRef<HTMLImageElement>(null);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     if (!isLoaded && imageRef.current?.complete) {
//       setIsLoaded(true);
//     }
//   }, []);

//   return (
//     <Fade in={isLoaded}>
//       <Skeleton
//         startColor="#555"
//         endColor="#777"
//         isLoaded={isLoaded}
//         borderRadius="6px"
//         speed={0.2}
//       >
//         <Image
//           ref={imageRef}
//           boxShadow={"2px 2px 0px 2px #777"}
//           borderRadius="7px"
//           loading="lazy"
//           alt=""
//           onLoad={() => {
//             setIsLoaded(true);
//           }}
//           {...props}
//         />
//       </Skeleton>
//     </Fade>
//   );
// };

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
              src={`/nfts/${coffee}/${item}.png`}
              boxShadow={"2px 2px 0px 2px #777"}
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
                source: `/nfts/${coffee}/${x}.png`,
                srcset: `/nfts/${coffee}/${x}.png`,
                // caption: i,
              }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  );
}
