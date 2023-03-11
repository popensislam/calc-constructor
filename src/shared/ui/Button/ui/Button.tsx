import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    theme: VariantButton,
    children: ReactNode,
    disabled?: boolean,
    onClick?: () => void
}

export enum VariantButton {
    equal = 'equal',
    layer = 'layer',
    doubleLayer = 'doubleLayer'
}

export const Button = ({ className, children, theme, disabled = false, onClick, ...rest }: ButtonProps) => {

  const onClickHandler = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <button onClick={onClickHandler} className={classNames(cls.button, { [ cls.disabled ]: disabled }, [ className, cls[ theme ] ])} {...rest}>{children}</button>
  );
};
