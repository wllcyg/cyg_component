import  {lazy,  Suspense} from "react";
import {createHashRouter} from "react-router-dom";

const withLazyLoading = (Component:string) => {
  const LazyComponent = lazy(() => import(Component));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const LazyLoadingWrapper = (props) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
  return <LazyLoadingWrapper />;
};
// 获取路由
const pages = import.meta.glob('/src/views/**/index.tsx')
console.log(pages)
const route = createHashRouter([
  {
    path: '/',
    element: withLazyLoading('../App.tsx'),

  },
]);
export default route
