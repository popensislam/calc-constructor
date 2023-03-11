import { ComputingSigns, ComputinsNumbers, Output } from 'entities/Calculator';
import { DragEvent, ReactElement, useState } from 'react';
import { classNames } from 'shared/lib';
import { Button, VariantButton } from 'shared/ui/Button';
import { Paper } from 'shared/ui/Paper';
import { SpaceGet } from 'shared/ui/SpaceGet';
import cls from './ConstructorCalculator.module.scss';

interface ConstructorCalculatorProps {
    className?: string
}

interface IComponents {
  id: number,
  taken: boolean,
  Component: () => ReactElement
}

interface DragCard {
  id: number,
  elm: number,
  index?: number
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

  const [ arr, setArr ] = useState<DragCard[]>([]);

  const [ arrToTake, setArrToTake ] = useState<DragCard[]>([
    { id: 1, elm: 0 },
    { id: 2, elm: 1 },
    { id: 3, elm: 2 },
    { id: 4, elm: 3 }
  ]);

  const [ currentItem, setCurrentItem ] = useState<DragCard | null>(null);
  const [ components, setComponents ] = useState<IComponents[]>([
    {
      id: 1,
      taken: false,
      Component: () => (
        <Paper>
          <Output/>
        </Paper>
      ),
    },
    {
      id: 2,
      taken: false,
      Component: () => (
        <Paper className={cls.signsWrapper}>
          <ComputingSigns/>
        </Paper>
      ),
    },
    {
      id: 3,
      taken: false,
      Component: () => (
        <Paper className={cls.numbersWrapper}>
          <ComputinsNumbers/>
        </Paper>
      ),
    },
    {
      id: 4,
      taken: false,
      Component: () => (
        <Paper>
          <Button theme={VariantButton.equal}>=</Button>
        </Paper>
      ),
    }
  ]);

  /** DRAG AND DROP HANDLERS */

  /** add style when it under comp */
  const dragOverHandler = (e: DragEvent, i: number, type: HoverTypeDrop): void => {
    e.preventDefault();

    if (i !== taken?.elm) {
      setTaken({ elm: i, type: type });
    }
  };

  /** remove styles */
  const dragEndHandler = (): void => {
    if (taken !== null) {
      setTaken(null);
    }
  };

  /** remove styles */
  const dragLeaveHandler = (): void => {
    if (taken !== null) {
      setTaken(null);
    }
  };

  /** save taken item */
  const dragStartHandler = (e: DragEvent, elm: DragCard, i: number): void => {
    setCurrentItem({ ...elm, index: i });
  };

  /** drop */
  const dropHandler = (e: DragEvent, card: DragCard, from: number, type: HoverTypeDrop): void => {
    e.preventDefault();

    const foundIndex = arr.findIndex((item) => item.id === currentItem.id);

    if (foundIndex === -1) {
      const newComponents = components.map((item) => {
        if (item.id === components[ currentItem.elm ].id) {
          return { ...item, taken: true };
        } else {
          return item;
        }
      });
      setComponents(newComponents);
    }

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
    if (type === HoverTypeDrop.DOWN) {
      const result: DragCard[] = [ ...arrWithourTaken, currentItem ];
      setArr(result);
      setTaken(null);
      return;
    }

    /**
     * Slice array in 2 part to put taken one between them
     */

    const firstSliced: DragCard[] = arrWithourTaken.slice(0, currentItem.index < from ? from - 1 : from);
    const secondSliced: DragCard[] = arrWithourTaken.slice(currentItem.index < from ? from - 1 : from);

    setArr([ ...firstSliced,
      currentItem,
      ...secondSliced ]);

    setTaken(null);
  };

  const dragOverHandlerToTake = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDropHandlerSpace = () => {

    const newComponents = components.map((item) => {
      if (item.id === components[ currentItem.elm ].id) {
        return { ...item, taken: true };
      } else {
        return item;
      }
    });
    setComponents(newComponents);

    setArr([ ...arr, currentItem ]);

  };

  return (
    <div className={classNames(cls.constructorCalc, { [ cls.consPad ]: arr.length !== 0 }, [])}>

      <div className={cls.toTake}>
        {arrToTake.map((elm: DragCard, i: number) =>
          <div
            className={classNames(cls.bg, { [ cls.bgDark ]: components[ elm.elm ].taken })} key={elm.id}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, elm, i)}
            onDragOver={(e) => dragOverHandlerToTake(e)}
          >
            {components[ elm.elm ]?.Component()}
          </div>
        )}
      </div>

      {arr.length !== 0
        ? (
          <div className={cls.calculator}>
            {arr.map((elm: DragCard, i: number) =>
              <div className={classNames(cls.dnd, {}, [ 'item' ])} key={i}>

                <div
                  draggable={true}
                  onDragEnd={dragEndHandler}
                  onDragLeave={dragLeaveHandler}
                  onDragOver={(e) => dragOverHandler(e, i, HoverTypeDrop.UP)}
                  onDrop={(e) => dropHandler(e, elm, i, HoverTypeDrop.UP)}
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
                  onDragStart={(e) => dragStartHandler(e, elm, i)}
                  draggable={true}
                >
                  {components[ elm.elm ]?.Component()}
                </div>

                {i === arr.length - 1 && (
                  <div
                    draggable={true}
                    onDragEnd={dragEndHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={(e) => dragOverHandler(e, i, HoverTypeDrop.DOWN)}
                    onDrop={(e) => dropHandler(e, elm, i, HoverTypeDrop.DOWN)}
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
        )
        : (
          <SpaceGet onDropHandler={onDropHandlerSpace}/>
        )
      }
    </div>
  );
};
