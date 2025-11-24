export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  display_name: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    user_id: string;
    username: string;
    created_at: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    user_id: string;
    username: string;
    created_at: string;
    profile: {
      display_name: string;
      monedas: number;
    };
  };
}

export interface UserSession {
  user_id: string;
  username: string;
  email?: string;
  created_at: string;
  profile?: {
    display_name: string;
    monedas: number;
  };
}
