import type { Component, JSX } from "solid-js"

export type ValidComponentStrict = keyof JSX.IntrinsicElements | Component
