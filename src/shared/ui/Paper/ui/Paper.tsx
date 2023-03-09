import { ReactNode } from 'react';
import cls from './Paper.module.scss';

interface PaperProps {
    className?: string,
    children: ReactNode
}

export const Paper = ({ className, children }: PaperProps) => {
  return (
    <div className={cls.paper}>
      {children}
    </div>
  );
};
