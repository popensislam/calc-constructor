import { useAppSelector } from 'app/providers/StoreProvider';
import { DragCard } from 'entities/Calculator';
import { useState, DragEvent, DragEventHandler, ReactElement } from 'react';
import { classNames } from 'shared/lib';
import cls from './CalculatorElements.module.scss';

interface CalculatorElementsProps {
    className?: string,
    dragStartHandler: (e: DragEvent, elm: DragCard, i: number) => void,
    components: IComponents[]
}

interface IComponents {
    id: number,
    taken: boolean,
    Component: () => ReactElement
  }

export const CalculatorElements = ({ className, dragStartHandler, components }: CalculatorElementsProps) => {

  const order = useAppSelector(state => state.calc.order);
  const [ arrToTake, setArrToTake ] = useState<DragCard[]>(order);

  const dragOverHandlerToTake = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={cls.toTake}>
      {arrToTake.map((elm: DragCard, i: number) =>
        <div
          className={classNames(cls.grab, { [ cls.bgDark ]: components[ elm.elm ].taken })} key={elm.id}
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, elm, i)}
          onDragOver={dragOverHandlerToTake}
        >
          {components[ elm.elm ]?.Component()}
        </div>
      )}
    </div>
  );
};
