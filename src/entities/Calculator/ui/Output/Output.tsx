import { useAppSelector } from 'app/providers/StoreProvider';
import { HTMLAttributes, DragEventHandler } from 'react';
import cls from './Output.module.scss';

interface OutputProps {
    className?: string,
    otherAttributes?: DragEventHandler<HTMLDivElement>
}

export const Output = ({ className, ...otherAttributes }: OutputProps) => {

  const value = useAppSelector(state => state.calc.value);
  return (
    <div className={cls.output} {...otherAttributes}>
      <input value={String(value).slice(0, 11)} className={cls.input} disabled/>
    </div>
  );
};
