import { DragEvent, DragEventHandler } from 'react';
import { classNames } from 'shared/lib';
import Img from 'shared/assets/icon/img.svg';
import cls from './SpaceGet.module.scss';

interface SpaceGetProps {
    className?: string,
    onDropHandler: DragEventHandler
}

export const SpaceGet = ({ className, onDropHandler }: SpaceGetProps) => {


  const dragOverHandler = (e: DragEvent): void => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.background = '#F0F9FF';
  };

  const dragEndHandler = (e: DragEvent): void => {
    const target = e.target as HTMLDivElement;
    target.style.background = 'transparent';
  };

  const dragLeaveHandler = (e: DragEvent): void => {
    const target = e.target as HTMLDivElement;
    target.style.background = 'transparent';
  };

  return (
    <div
      draggable={true}
      onDragEnd={dragEndHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={onDropHandler}
      className={classNames(cls.space, {}, [ className ])}
    >
      <Img/>
      <h3 className={cls.title}>Перетащите сюда</h3>
      <p className={cls.desc}>любой элемент из левой панели</p>
    </div>
  );
};
