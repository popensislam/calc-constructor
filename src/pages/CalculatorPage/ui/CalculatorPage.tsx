import { useEffect, useState } from 'react';
import { Switcher, SwitcherVairants } from 'shared/ui/Switcher';
import { RuntimeCalculator } from 'widgets/RuntimeCalculator';
import cls from './CalculatorPage.module.scss';
import EyeIcon from 'shared/assets/icon/eye.svg';
import SelectorIcon from 'shared/assets/icon/selector.svg';
import { classNames } from 'shared/lib';
import { ConstructorCalculator } from 'widgets/ConstructorCalculator';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { calculatorActions } from 'entities/Calculator';

export const CalculatorPage = () => {

  const dispatch = useAppDispatch();
  const [ side, setSide ] = useState(SwitcherVairants.LEFT);
  const [ none, setNone ] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setNone(side === SwitcherVairants.LEFT ? SwitcherVairants.RIGHT : SwitcherVairants.LEFT);
    }, 300);

    if (side === SwitcherVairants.RIGHT) {
      dispatch(calculatorActions.emptyValue());
    }

  }, [ dispatch, side ]);

  const runtimeMods = { [ cls.show ]: side === SwitcherVairants.LEFT, [ cls.none ]: none === SwitcherVairants.LEFT };
  const constructorMods = { [ cls.show ]: side === SwitcherVairants.RIGHT, [ cls.none ]: none === SwitcherVairants.RIGHT };

  return (
    <div className={cls.calculator}>
      <div className={cls.switcher}>
        <Switcher
          labelOne='Runtime'
          labelTwo='Constructor'
          IconOne={EyeIcon}
          IconTwo={SelectorIcon}
          side={side}
          onChange={(arg) => setSide(arg)}
        />
      </div>

      <div className={classNames(cls.content, runtimeMods, [])}>
        <RuntimeCalculator/>
      </div>
      <div className={
        classNames(cls.contentConstructor, constructorMods, [])}>
        <ConstructorCalculator/>
      </div>
    </div>
  );
};
