import { ComputingSigns, ComputinsNumbers, Output } from 'entities/Calculator';
import { Button, VariantButton } from 'shared/ui/Button';
import cls from './ConstructorCalculator.module.scss';

interface ConstructorCalculatorProps {
    className?: string
}

export const ConstructorCalculator = ({ className }: ConstructorCalculatorProps) => {
  return (
    <div>
      <div className={cls.calculator}>
        <Output/>
        <ComputingSigns/>
        <ComputinsNumbers/>
        <Button theme={VariantButton.equal}>=</Button>
      </div>
    </div>
  );
};
