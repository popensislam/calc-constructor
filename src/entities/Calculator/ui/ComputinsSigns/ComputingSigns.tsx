import { useAppDispatch } from 'app/providers/StoreProvider';
import { calculatorActions } from 'entities/Calculator';
import { Button, VariantButton } from 'shared/ui/Button';
import cls from './ComputingSigns.module.scss';

interface ComputingSignsProps {
    className?: string,
    disabled?: boolean
}

export const ComputingSigns = ({ className, disabled = false }: ComputingSignsProps) => {

  const dispatch = useAppDispatch();

  const signs: string[] = [ '/',
    'x',
    '-',
    '+' ];

  const chooseSign = (elm: string) => {
    dispatch(calculatorActions.chooseSign(elm));
  };

  return (
    <div className={cls.signs}>
      {signs.map((sign: string) =>
        <Button disabled={disabled} key={sign} className={cls.button} onClick={() => chooseSign(sign)} theme={VariantButton.layer}>{sign}</Button>
      )}
    </div>
  );
};
