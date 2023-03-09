import { useAppDispatch } from 'app/providers/StoreProvider';
import { calculatorActions, ComputingSigns, ComputinsNumbers, Output } from 'entities/Calculator';
import { Button, VariantButton } from 'shared/ui/Button';
import cls from './RuntimeCalculator.module.scss';

import EyeIcon from 'shared/assets/icon/eye.svg';
import SelectorIcon from 'shared/assets/icon/selector.svg';

interface RuntimeCalculatorProps {
    className?: string
}

export const RuntimeCalculator = ({ className }: RuntimeCalculatorProps) => {

  const dispatch = useAppDispatch();

  const getResult = () => {
    dispatch(calculatorActions.equal());
    dispatch(calculatorActions.clear());
  };

  return (
    <div className={cls.calculator}>
      <Output/>
      <ComputingSigns/>
      <ComputinsNumbers/>
      <Button onClick={getResult} theme={VariantButton.equal}>=</Button>
    </div>
  );
};
