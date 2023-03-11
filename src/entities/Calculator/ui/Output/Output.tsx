import { useAppSelector } from 'app/providers/StoreProvider';
import { DragEventHandler } from 'react';
import { classNames } from 'shared/lib';
import cls from './Output.module.scss';

interface OutputProps {
    className?: string,
    otherAttributes?: DragEventHandler<HTMLDivElement>
}

export const Output = ({ className, ...otherAttributes }: OutputProps) => {

  const value = useAppSelector(state => state.calc.value);

  const notValid = 'NaN Infinity';

  const validValue = notValid.includes(value) ? 'Не определено' : String(value).slice(0, 11);

  return (
    <div className={classNames(cls.output, {}, [])} {...otherAttributes}>
      <input value={validValue} className={classNames(cls.input, {}, [ className ])} disabled/>
    </div>
  );
};
