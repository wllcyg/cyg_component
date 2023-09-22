import React, {lazy, Suspense} from "react";

function withLazyLoading(Component:string): React.FC {
  const LazyComponent = lazy(() => import(Component));
  const LazyLoadingWrapper: React.FC = (props) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
  return LazyLoadingWrapper;
}

