export type User = {
  id: number;
  email: string;
  passwordHash?: string;
  displayName: string;
  phone?: string;
  role: string;
  isAdmin: boolean;
  internalNote?: string;
  createdAt: string;
  updatedAt: string;
};

export type Vehicle = {
  id: number;
  ownerId: number;
  brand: string;
  model: string;
  plateNumber: string;
  vin: string;
  mileage: number;
  owner?: User;
  orders?: RepairOrder[];
};

export type Comment = {
  id: number;
  orderId: number;
  userId: number;
  content: string;
  createdAt: string;
  user?: User;
};

export type RepairOrder = {
  id: number;
  userId: number;
  vehicleId: number;
  title: string;
  description: string;
  status: string;
  totalPrice: number;
  internalStatus: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  vehicle?: Vehicle;
  comments?: Comment[];
};
