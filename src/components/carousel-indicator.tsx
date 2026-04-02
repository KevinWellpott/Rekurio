"use client"

import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

type UseCarouselIndicatorType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useCarouselIndicator = (
  emblaApi: ReturnType<typeof useEmblaCarousel>[1],
): UseCarouselIndicatorType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
    return () => {
      emblaApi.off("reInit", onInit).off("reInit", onSelect).off("select", onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  return { selectedIndex, scrollSnaps, onDotButtonClick }
}

type ButtonProps = ComponentPropsWithRef<"button">

export const CarouselIndicator: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
)
