export interface LoginDto {
  login: string;
  password: string;
}

export interface UserDto {
  login: string;
  token: string;
}

export interface RegisterDto {
  login: string;
  password: string;
}

async function login(loginDto: LoginDto): Promise<UserDto> {
  const response = await fetch("api/account/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDto),
  });
  if (response.status === 401) {
    return Promise.reject(new Error("Błędne dane logowania"));
  } else if (!response.ok) {
    return Promise.reject(new Error("Błąd serwera"));
  }
  const body = await response.json();
  return body;
}

async function register(registerDto: RegisterDto): Promise<UserDto> {
  const response = await fetch("api/account/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerDto),
  });
  
  if (!response.ok) {
    return Promise.reject(new Error("Błąd serwera"));
  }
  const body = await response.json();
  return body;
}

export const authService = {
  login,
  register,
};
