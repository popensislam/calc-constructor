import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { calculatorActions, ComputingSigns, ComputinsNumbers, Output } from 'entities/Calculator';
import { Button, VariantButton } from 'shared/ui/Button';
import cls from './RuntimeCalculator.module.scss';

interface RuntimeCalculatorProps {
    className?: string
}

export const RuntimeCalculator = ({ className }: RuntimeCalculatorProps) => {

  const dispatch = useAppDispatch();
  const order = useAppSelector(state => state.calc.order);

  const getResult = () => {
    dispatch(calculatorActions.equal());
    dispatch(calculatorActions.clear());
  };

  const ComponentsOrder = [
    <Output key={1}/>,
    <ComputingSigns key={2}/>,
    <ComputinsNumbers key={3}/>,
    <Button key={4} onClick={getResult} theme={VariantButton.equal}>=</Button>
  ];


  return (
    <div className={cls.calculator}>
      {order.length === 0
        ?
        <>
          {ComponentsOrder.map((Component) =>
            Component
          )}
        </>
        :
        <>
          {order.map((item) =>
            ComponentsOrder[ item.elm ]
          )}
        </>
      }
    </div>
  );
};
