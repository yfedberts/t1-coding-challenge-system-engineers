
export interface ServerResponseDTO<T> {
    success: boolean;
    message?: string;
    data?: T;
}
