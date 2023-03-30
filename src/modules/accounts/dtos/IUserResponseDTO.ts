export interface IUserResponseDTO {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar_url(): string;
}
