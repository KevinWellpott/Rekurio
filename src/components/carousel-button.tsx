"use client"

import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const useCarouselButtons = (
  emblaApi: ReturnType<typeof useEmblaCarousel>[1],
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev())
    setNextBtnDisabled(!api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick }
}

type ButtonProps = ComponentPropsWithRef<"button">

export const PrevButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    <ChevronLeft className="size-5" />
    {children}
  </button>
)

export const NextButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    <ChevronRight className="size-5" />
    {children}
  </button>
)
