import { useAppDispatch } from 'app/providers/StoreProvider';
import { classNames } from 'shared/lib';
import { Button, VariantButton } from 'shared/ui/Button';
import { calculatorActions } from 'entities/Calculator';
import cls from './ComputinsNumbers.module.scss';

interface ComputinsNumbersProps {
    className?: string,
    disabled?: boolean
}

export const ComputinsNumbers = ({ className, disabled = false }: ComputinsNumbersProps) => {

  const dispatch = useAppDispatch();

  const numbers: string[] = [ '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9', ];

  const chooseNumber = (elm: string): void => {
    dispatch(calculatorActions.choose(elm));
  };

  return (
    <div className={cls.numbers}>
      {numbers.map((elm: string) =>
        <Button
          key={elm}
          className={cls.buttonGrid}
          theme={VariantButton.layer}
          onClick={() => chooseNumber(elm)}
          disabled={disabled}
        >{elm}</Button>
      )}
      <Button
        theme={VariantButton.layer}
        className={classNames(cls.buttonGrid, {}, [ cls.zero ])}
        onClick={() => chooseNumber('0')}
        disabled={disabled}
      >0</Button>
      <Button
        theme={VariantButton.layer}
        className={classNames(cls.buttonGrid, {}, [ cls.sign ])}
        onClick={() => chooseNumber('.')}
        disabled={disabled}
      >,</Button>
    </div>
  );
};
