import { FunctionComponent, SVGProps } from 'react';

export type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;

declare module 'react' {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
