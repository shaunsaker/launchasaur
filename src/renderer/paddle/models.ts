export interface PaddleProps {
  Setup: ({ vendor, debug }: { vendor: string; debug: boolean }) => void;
  Checkout: {
    open: ({
      product,
      email,
      successCallback,
    }: {
      product: string;
      email: string;
      successCallback: (data: any, error: Error) => void; // TODO: what is the type of this data
    }) => void;
  };
}
