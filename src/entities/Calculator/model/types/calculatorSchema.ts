import { ReactElement } from 'react';

export interface CalculatorSchema {
    value: string,
    a: string,
    b: string,
    sign: string,
    empty: boolean,
    order: DragCard[],
}

export interface DragCard {
    id: number,
    elm: number,
    index?: number
}
