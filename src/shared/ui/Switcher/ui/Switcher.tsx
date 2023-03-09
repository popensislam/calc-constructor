import { FunctionComponent, SVGAttributes } from 'react';
import { classNames } from 'shared/lib';
import cls from './Switcher.module.scss';

interface SwitcherProps {
    className?: string,
    labelOne: string,
    IconOne?: FunctionComponent<SVGAttributes<SVGElement>>
    labelTwo: string,
    IconTwo?: FunctionComponent<SVGAttributes<SVGElement>>
    side: TSide,
    onChange: (arg: TSide) => void
}

export enum SwitcherVairants {
  LEFT = 'left',
  RIGHT = 'right'
}

type TSide = SwitcherVairants.LEFT | SwitcherVairants.RIGHT

export const Switcher = ({ className, labelOne, labelTwo, IconOne, IconTwo, side, onChange }: SwitcherProps) => {

  return (
    <div className={classNames(cls.switcher, {}, [ cls[ side ] ])}>
      <button className={cls.buttonElm} onClick={() => onChange(SwitcherVairants.LEFT)}>
        <IconOne className={cls.iconStrokeLeft}/>
        {labelOne}
      </button>
      <button className={cls.buttonElm} onClick={() => onChange(SwitcherVairants.RIGHT)}>
        <IconTwo className={cls.iconStrokeRight}/>
        {labelTwo}
      </button>
      <div className={cls.background}/>
    </div>
  );
};
