import { ReactNode } from 'react';
import { classNames } from 'shared/lib';
import cls from './Paper.module.scss';

interface PaperProps {
    className?: string,
    children: ReactNode,
}

export const Paper = ({ className, children }: PaperProps) => {
  return (
    <div className={classNames(cls.paper, {}, [ className ])}>
      {children}
    </div>
  );
};
