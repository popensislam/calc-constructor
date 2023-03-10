import { ComputingSigns, ComputinsNumbers, Output } from 'entities/Calculator';
import { DragEvent, useState } from 'react';
import { classNames } from 'shared/lib';
import { Button, VariantButton } from 'shared/ui/Button';
import { Paper } from 'shared/ui/Paper';
import cls from './ConstructorCalculator.module.scss';

interface ConstructorCalculatorProps {
    className?: string
}

interface DragCard {
  id: number,
  elm: number
}

interface ITaken {
  elm: number,
  type: HoverTypeDrop
}

enum HoverTypeDrop {
  UP = 'up',
  DOWN = 'down'
}

export const ConstructorCalculator = ({ className }: ConstructorCalculatorProps) => {

  const [ taken, setTaken ] = useState<ITaken | null>(null);

  const [ arr, setArr ] = useState<DragCard[]>([
    { id: 1, elm: 0 },
    { id: 2, elm: 1 },
    { id: 3, elm: 2 },
    { id: 4, elm: 3 }
  ]);

  const [ currentItem, setCurrentItem ] = useState<DragCard | null>(null);

  /** DRAG AND DROP HANDLERS */

  const dragOverHandler = (e: DragEvent, i: number, type: HoverTypeDrop): void => {
    e.preventDefault();

    if (i !== taken?.elm) {
      setTaken({ elm: i, type: type });
    }
  };

  const dragEndHandler = (): void => {
    if (taken !== null) {
      setTaken(null);
    }
  };

  const dragLeaveHandler = (): void => {
    if (taken !== null) {
      setTaken(null);
    }
  };

  const dragStartHandler = (e: DragEvent, elm: DragCard): void => {
    setCurrentItem(elm);
  };

  const dropHandler = (e: DragEvent, card: DragCard, from: number, till: number): void => {
    e.preventDefault();

    const arrWithourTaken: DragCard[] = arr.filter((item) => item.id !== currentItem.id);

    /**
     * Put it in the begining
     */
    if (from === 0) {
      const result: DragCard[] = [ currentItem, ...arrWithourTaken ];
      setArr(result);
      setTaken(null);
      return;
    }

    /**
     * Put it in the end
     */
    if (from === arr.length - 1) {
      const result: DragCard[] = [ ...arrWithourTaken, currentItem ];
      setArr(result);
      setTaken(null);
      return;
    }

    /**
     * Slice array in 2 part to put taken one between them
     */

    const firstSliced: DragCard[] = arrWithourTaken.slice(0, till);
    const secondSliced: DragCard[] = arrWithourTaken.slice(from - 1);

    const resultArr: DragCard[] = [ ...firstSliced,
      currentItem,
      ...secondSliced ];

    setArr(resultArr);
    setTaken(null);
  };

  const components = [
    {
      id: 1,
      Component: () => (
        <Paper>
          <Output/>
        </Paper>
      ),
    },
    {
      id: 2,
      Component: () => (
        <Paper className={cls.signsWrapper}>
          <ComputingSigns/>
        </Paper>
      ),
    },
    {
      id: 3,
      Component: () => (
        <Paper className={cls.numbersWrapper}>
          <ComputinsNumbers/>
        </Paper>
      ),
    },
    {
      id: 4,
      Component: () => (
        <Paper>
          <Button theme={VariantButton.equal}>=</Button>
        </Paper>
      ),
    }
  ];

  return (
    <div>
      <div className={cls.calculator}>
        {arr.map((elm: DragCard, i: number) =>
          <div className={classNames(cls.dnd, {}, [ 'item' ])} key={i}>

            <div
              draggable={true}
              onDragEnd={dragEndHandler}
              onDragLeave={dragLeaveHandler}
              onDragOver={(e) => dragOverHandler(e, i, HoverTypeDrop.UP)}
              onDrop={(e) => dropHandler(e, elm, i, i - 1)}
              className={cls.wrapperLine}
            >
              <div
                className={classNames(
                  cls.line,
                  {
                    [ cls.bg ]:
                    taken !== null
                      ? i === taken.elm && HoverTypeDrop.UP === taken.type
                      : false
                  },
                  []
                )}
              />
            </div>

            <div
              onDragStart={(e) => dragStartHandler(e, elm)}
              draggable={true}
            >
              {components[ elm.elm ].Component()}
            </div>

            {i === components.length - 1 && (
              <div
                draggable={true}
                onDragEnd={dragEndHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={(e) => dragOverHandler(e, i, HoverTypeDrop.DOWN)}
                onDrop={(e) => dropHandler(e, elm, i, i - 1)}
                className={cls.wrapperLine}
              >
                <div
                  className={classNames(
                    cls.line,
                    {
                      [ cls.bg ]:
                      taken !== null
                        ? i === taken.elm && HoverTypeDrop.DOWN === taken.type
                        : false
                    },
                    [])}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
