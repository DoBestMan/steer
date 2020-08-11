export type AsyncResponse<T> =
  | {
      data: T;
      isSuccess: true;
    }
  | {
      error: {
        code: string;
        message?: string;
        statusCode: number;
      };
      isSuccess: false;
    };
