import { useAppDispatch } from 'app/providers/StoreProvider';
import { calculatorActions } from 'entities/Calculator';
import { Button, VariantButton } from 'shared/ui/Button';
import cls from './ComputingSigns.module.scss';

interface ComputingSignsProps {
    className?: string
}

export const ComputingSigns = ({ className }: ComputingSignsProps) => {

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
        <Button key={sign} className={cls.button} onClick={() => chooseSign(sign)} theme={VariantButton.layer}>{sign}</Button>
      )}
    </div>
  );
};
