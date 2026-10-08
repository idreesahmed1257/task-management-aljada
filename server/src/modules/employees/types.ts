export interface CreateEmployeeBody {
  name: string;
  email: string;
  position: string;
}

export interface UpdateEmployeeBody {
  name?: string;
  email?: string;
  position?: string;
}
