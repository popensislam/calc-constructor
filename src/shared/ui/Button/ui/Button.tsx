import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    theme: VariantButton,
    children: ReactNode
}

export enum VariantButton {
    equal = 'equal',
    layer = 'layer',
    doubleLayer = 'doubleLayer'
}

export const Button = ({ className, children, theme, ...rest }: ButtonProps) => {


  return (
    <button className={classNames(cls.button, {}, [ className, cls[ theme ] ])} {...rest}>{children}</button>
  );
};
