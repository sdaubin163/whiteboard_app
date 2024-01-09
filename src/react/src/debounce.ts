// 定时执行
type AnyFunction<T = unknown> = (this: T, ...args: any[]) => any;

function debounce<F extends AnyFunction>(func: F, delay: number): F {
  let timeoutId: NodeJS.Timeout | null = null;

  return function(this: ThisParameterType<F>, ...args: any[])  {
    clearTimeout(timeoutId as NodeJS.Timeout);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  } as F;
}

export default debounce;
