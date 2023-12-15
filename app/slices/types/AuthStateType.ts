
type AuthUserType = {
    name: string,
    email: string,
    id: number,
    role_id?: number
}

export type AuthStateType = {
    isLogin: boolean,
    user: AuthUserType | null,
    token: string | null
}
