// 用户登录请求参数
export interface LoginRequest {
    username: string;
    password: string;
}

// 用户注册请求参数
export interface RegisterRequest {
    username: string;
    password: string;
    email?: string;
    phone?: string;
}

// 用户信息
export interface UserInfo {
    id: number;
    username: string;
    email?: string;
    phone?: string;
    avatar?: string;
    role: string;
    status: number;
    createTime: string;
    updateTime: string;
    token: string;
    profile?: object;
    nickname?: string;
    avatarUrl?: string;
    points?: string;
    address?: string;
}

// 登录响应数据
export interface LoginResponse {
    message: string;
    data: UserInfo;
    code: number;
}

// 注册响应数据
export interface RegisterResponse {
    message: string;
    data: UserInfo;
    code: number;
}

// 获取用户信息响应
export interface GetUserInfoResponse {
    message: string;
    data: UserInfo;
    code: number;
}

// 更新用户信息请求参数
export interface UpdateUserRequest {
    email?: string;
    phone?: string;
    avatar?: string;
}

// 修改密码请求参数
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

// 通用API响应格式
export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}

// 分页请求参数
export interface PageRequest {
    page: number;
    pageSize: number;
    keyword?: string;
}

// 分页响应数据
export interface PageResponse<T = unknown> {
    list: T[];
    total: number;
    page: number;
    pageSize: number;
}





